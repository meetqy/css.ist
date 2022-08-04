/**
 * 生产环境?
 * @returns boolean
 */
export const useProduction = () => process.env.NODE_ENV === "producton";

/**
 * 网站基础配置
 */
export const websiteConfig: {
  name: string;
  asset: string;
} = {
  name: "wcao.cc",
  asset: "https://strapi.wcao.cc",
};

/**
 * strapi assets
 */
export const useAsset = (url: string, opts?: string) => {
  return url.replace("/uploads/", `/uploads/${opts || "f_webp,w_500"}/`);
};

/**
 * material icon fill
 */
export const iconFill =
  'font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;';

/**
 * unsplash.com
 * https://source.unsplash.com/random/800x600
 */
export const useMockPic = (path: string) => {
  // console.log((Math.random() * 1000).toFixed(0));
  return "https://picsum.photos" + path;
  // return `https://source.unsplash.com${path}${query}`;
};

/**
 * 根据tag获取数据
 */
export const getContentByTag = async (
  tagName: string | string[],
  page?: { pageIndex: number; pageSize: number },
  type?: "$contains" | "$in"
) => {
  const pageIndex = page?.pageIndex || 1;
  const pageSize = page?.pageSize || 12;

  const tags: { [key: string]: string | string[] } = {};
  tags[type || "$contains"] = tagName;

  return await queryContent("introduce")
    .where({
      tags,
    })
    .only(["_id", "_path", "title", "tags", "previews", "light", "dark"])
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .find();
};

// drawer-content 触底
export const drawerContentPullUpEnd = ref<number>(0);

// drawer-content 滚动距离
export const drawerContentScroll = ref();

// drawer-content 元素
export const drawerContentElement = ref(null);

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
