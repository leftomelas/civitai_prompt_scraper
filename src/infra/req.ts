import { BlobReader, TextReader, ZipWriter } from '@zip.js/zip.js';
import { getI18nLabel } from '../assets/lang';
import { getConfig } from './config_panel';
import { optimizeUrl, unoptimizeUrl } from '../domain/logic';
import {
  GalleryImagesResponse,
  ModelResponse,
  ModelVersionResponse,
} from '../domain/types';

const extractFilebasenameFromImageUrl = (url: string) => {
  const filename = url.split('/').slice(-1)[0];
  return filename.split('.')[0];
};

const API_URL = 'https://civitai.com/api/v1';

const HEADERS = {
  'Accept-Encoding': 'gzip, deflate, br',
  Origin: 'https://civitai.com',
  Referer: 'https://civitai.com/',
  Cookie: document.cookie,
};

export const fetchModelData = async (modelId: string) => {
  const response = await fetch(`${API_URL}/models/${modelId}`, {
    method: 'GET',
    headers: HEADERS,
  });
  if (response.status >= 400) {
    throw new Error(` ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as ModelResponse;
};

export const fetchModelVersionData = async (modelVersionId: string) => {
  const response = await fetch(`${API_URL}/model-versions/${modelVersionId}`, {
    method: 'GET',
    headers: HEADERS,
  });
  if (response.status >= 400) {
    throw new Error(` ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as ModelVersionResponse;
};

export const fetchModelInfoByModleIdOrModelVersionId = async (
  modelId: string | undefined,
  modelVersionId: string | undefined
) => {
  const id = modelId
    ? modelId
    : modelVersionId
    ? (await fetchModelVersionData(modelVersionId)).modelId.toString()
    : '';

  if (!id) {
    throw new Error(getI18nLabel('modelIdNotFoundError'));
  }

  const modelInfo = await fetchModelData(id);
  return modelInfo;
};

export const fetchGalleryData = async (
  modelId?: string | null,
  postId?: string | null,
  modelVersionId?: string | null,
  username?: string | null
) => {
  let url = `${API_URL}/images`;
  const params = ['limit=20'];

  if (postId) {
    params.push(`postId=${postId}`);
  }
  if (modelId) {
    // params.push(`modelId=${modelId}`);
  }
  if (modelVersionId) {
    params.push(`modelVersionId=${modelVersionId}`);
  }
  if (username) {
    params.push(`username=${username}`);
  }

  if (params.length > 0) {
    url = `${url}?${params.join('&')}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: HEADERS,
  });
  if (response.status >= 400) {
    throw new Error(` ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as GalleryImagesResponse;
  return data.items as GalleryImagesResponse['items'];
};

export const fetchImg = async (
  url: string
): Promise<{ blob: Blob; contentType: string } | null> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept:
          'image/webp,image/jpeg,image/avif;q=0.9,image/apng;q=0.8,image/*;q=0.7',
        ...HEADERS,
      },
      signal: AbortSignal.timeout(5000),
    });
    const contentType = response.headers.get('content-type') || '';
    const blob = await response.blob();

    return {
      blob,
      contentType,
    };
  } catch (error) {
    if (url.includes('optimized=true')) {
      return fetchImg(unoptimizeUrl(url));
    }
    throw error;
  }
};

export const fetchImgs =
  (zipWriter: ZipWriter<Blob>, addedNames: Set<string>) =>
  async (imgInfo: { url: string; hash: string; meta: unknown }[]) =>
    await Promise.all(
      imgInfo.map(async (x) => {
        try {
          const response = await fetchImg(optimizeUrl(x.url));
          if (!response) {
            throw new Error(`response is null: ${x.url}`);
          }
          const { blob, contentType } = response;

          let name =
            extractFilebasenameFromImageUrl(x.url) ||
            x.hash.replace(/[;:?*.]/g, '_');
          while (addedNames.has(name)) {
            name += '_';
          }

          const filename =
            (contentType && `${name}.${contentType.split('/')[1]}`) ||
            `${name}.png`;

          await zipWriter.add(filename, new BlobReader(blob));
          addedNames.add(name);

          if (x.meta) {
            const jsonFilename = name + '.json';
            await zipWriter.add(
              jsonFilename,
              new TextReader(JSON.stringify(x.meta, null, '\t'))
            );
          }
        } catch (e) {
          if (getConfig('continueWithFetchError')) {
            console.log('fetchImg throws an error: ', e);
            return;
          }
          throw e;
        }
      })
    );
