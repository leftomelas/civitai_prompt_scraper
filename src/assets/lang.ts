const i18n: {
  [id: string]: { [locale: string]: string };
} = {
  networkRequestTimeout: {
    en: 'Time until network timeout (in seconds)',
    ja: 'ネットワークタイムアウトまでの時間（秒）',
    'zh-CN': '网络超时前的时间（秒）',
    'zh-TW': '網絡超時前的時間（秒）',
  },
  buttonLabel: {
    en: 'Download images with JSON',
    ja: 'ダウンロード',
    'zh-CN': '下载图像和JSON',
    'zh-TW': '下載圖像和JSON',
  },
  buttonProgressLabel: {
    en: 'downloading',
    ja: 'ダウンロード中',
    'zh-CN': '下载中',
    'zh-TW': '下載中',
  },
  buttonCompleteLabel: {
    en: 'done',
    ja: '完了',
    'zh-CN': '完成',
    'zh-TW': '完成',
  },
  openShowMore: {
    en: 'Automatically open "Show More"',
    ja: 'Show Moreを自動で開く',
    'zh-CN': '显示"Show More"自动打开',
    'zh-TW': '顯示"Show More"自動打開',
  },
  continueWithFetchError: {
    en: 'Ignore image fetching errors and save a zip',
    ja: '画像取得エラーを無視してzipを保存する',
    'zh-CN': '忽略圖像採集錯誤，保存壓縮文件',
    'zh-TW': '忽略图像采集错误，保存压缩文件',
  },
  modelPreviewFilenameFormat: {
    en: 'Zip file name format: model',
    ja: 'zipファイル名書式: モデル',
    'zh-CN': 'Zip文件名格式：模型',
    'zh-TW': 'Zip文件名格式：模型',
  },
  galleryFilenameFormat: {
    en: 'Zip file name format: gallery',
    ja: 'zipファイル名書式: ギャラリー',
    'zh-CN': 'Zip文件名格式：画廊',
    'zh-TW': 'Zip文件名格式：畫廊',
  },
  configPanelTitle: {
    en: 'civitai_prompt_scraper settings',
    ja: 'civitai_prompt_scraper 設定',
    'zh-CN': 'civitai_prompt_scraper 設置',
    'zh-TW': 'civitai_prompt_scraper 设置',
  },
  configPanelMenu: {
    en: 'Edit Settings',
    ja: '設定を編集',
    'zh-CN': '编辑设置',
    'zh-TW': '編輯設置',
  },
  availableVariables: {
    en: 'Available identifiers:',
    ja: '利用可能な識別子:',
    'zh-CN': '可用的标识符:',
    'zh-TW': '可用的標識符:',
  },
  saveConfig: {
    en: 'Save',
    ja: '保存',
    'zh-CN': '保存',
    'zh-TW': '保存',
  },
  cancelConfig: {
    en: 'Cancel',
    ja: 'キャンセル',
    'zh-CN': '取消',
    'zh-TW': '取消',
  },
  parsingNextDataError: {
    en: 'Parsing __NEXT_DATA__ failed. Reloading the page might solve it.',
    ja: '__NEXT_DATA__の読み込みに失敗しました。ページをリロードすると解消する場合があります。',
    'zh-CN': '解析__NEXT_DATA__失败。重新加载页面可能会解决这个问题。',
    'zh-TW': '解析__NEXT_DATA__失败。重新加载页面可能会解决这个问题。',
  },
  modelIdNotFoundError: {
    en: 'modelId is not found.',
    ja: 'modelIdが見つかりません',
    'zh-CN': '没有找到modelId',
    'zh-TW': '沒有找到modelId',
  },
  modelVersionIdNotFoundError: {
    en: 'modelVersionId is not found.',
    ja: 'modelVersionIdが見つかりません',
    'zh-CN': '没有找到modelVersionId',
    'zh-TW': '沒有找到modelVersionId',
  },
  configValueNotFoundError: {
    en: 'config value is not found.',
    ja: '設定値が見つかりません',
    'zh-CN': '未找到设定值',
    'zh-TW': '未找到設定值',
  },
  galleryAutoDownload: {
    en: 'automatically start downloading gallery images',
    ja: 'ギャラリーを自動でダウンロードする',
    'zh-CN': '自动下载画廊',
    'zh-TW': '自動下載畫廊',
  },
  startingDownload: {
    en: 'download starting...',
    ja: 'ダウンロードを開始',
    'zh-CN': '开始下载',
    'zh-TW': '開始下載',
  },
  downloadModelAsWell: {
    en: 'download model as well',
    ja: '同時にモデルもダウンロードする',
    'zh-CN': '也下载模型',
    'zh-TW': '也下載模型',
  },
  preferModelNameToLoRAName: {
    en: 'prefer model names to LoRA names for {modelName}',
    ja: '{modelName}の値としてLoRA名よりモデル名を優先する',
    'zh-CN': '优先选择模型名称而不是 LoRA 名称作为 {modelName} 的值',
    'zh-TW': '優先選擇模型名稱而不是 LoRA 名稱作為 {modelName} 的值',
  },
  preferOptimizedImages: {
    en: 'prefer dowloading optimized images',
    ja: '最適化された画像を優先してダウンロードする',
    'zh-CN': '更喜欢下载优化的图像',
    'zh-TW': '更喜歡下載優化的圖像',
  },
};

const getLocale = () => {
  return window.navigator.language;
};

export const getI18nLabel = (labelName: string) => {
  const locale = getLocale();
  return i18n[labelName][locale] ?? i18n[labelName]['en'];
};

export const getButtonLabel = () => getI18nLabel('buttonLabel');

export const getButtonProgressLabel = () => getI18nLabel('buttonProgressLabel');

export const getButtonCompleteLabel = () => getI18nLabel('buttonCompleteLabel');
