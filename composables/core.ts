/**
 * 生产环境?
 * @returns boolean
 */
export const useProduction = () => process.env.NODE_ENV === "production";

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
 * image cloudflare
 * @param path      nuxt-content path
 * @param filename  previews中的名称
 * @param type      string 灵活变体   https://developers.cloudflare.com/images/cloudflare-images/transform/flexible-variants/
 * @returns
 */
export const useCF = (
  path = "",
  url = "",
  type: "public" | "sm" | "2xl" | string
) => {
  if (useProduction()) {
    const baseURL = "https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ";
    const id = `wcao${path}/${url}`
      .replaceAll("//", "/")
      .replaceAll("/", "-")
      .replace(/\.(jpg|png|jpeg|gif)/g, "");

    return `${baseURL}/${id}/${type}`;
  } else {
    return `/introduce/${url}`.replaceAll("//", "/");
  }
};

/**
 * material icon fill
 */
export const iconFill =
  'font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;';

/**
 * 根据tag获取数据
 */
export const getContentByTag = (
  tagName: string | string[],
  page?: { pageIndex: number; pageSize: number },
  type?: "$contains" | "$in"
) => {
  const pageIndex = page?.pageIndex || 1;
  const pageSize = page?.pageSize || 12;

  const tags: { [key: string]: string | string[] } = {};
  tags[type || "$contains"] = tagName;

  return queryContent("introduce")
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
