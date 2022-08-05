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
    loading: "/loading.svg",
  };
};

/**
 * unsplash 图片
 */
export const useUnsplash = (src: string, opts?: string) => {
  return (
    "https://source.unsplash.com" +
    src +
    opts +
    "?" +
    useNuxtApp().$Mock.Random.natural(0, 1000)
  );
};

/**
 * 随机图片 不完全测试，好像比unsplash 随机图快一些，不容易出现404
 */
export const usePicsum = (opts: string) => {
  const url = `https://picsum.photos${opts}`;

  return useNuxtApp().$Mock
    ? `${url}?t=${useNuxtApp().$Mock.Random.natural(0, 1000)}`
    : url;
};
