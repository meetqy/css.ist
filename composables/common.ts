/**
 * template、core 公用hooks
 */

/**
 * 懒加载
 * @param src
 * @returns
 */
export const vLazy = (src: string) => {
  return {
    src,
    // loading: useCF("css.ist-logo", "w=600&h=200"),
  };
};

// 使用图片
export const usePicsum = (opts: string) => {
  const url = `https://picsum.photos${opts}`;

  return `https://css.ist/api/picsum?url=${url}&t=${Math.random()}`;
};

export const getWebConfig = (lang?: "en" | "zh") => {
  if (!lang) lang = "en";
  return baseInfo[lang];
};

// 基本信息
export const baseInfo = {
  en: {
    title: "css.ist",
    time: "25 May, 2022",
    subtitle:
      "share responsive web design and many themes templates/components/web pages. based on tailwindcss, daisyui.",
  },
  zh: {
    title: "css.ist",
    time: "2022年5月25日",
    subtitle: "分享响应式、多主题模板/组件/网页，基于tailwindcss、daisyui。",
  },
};
