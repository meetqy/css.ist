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
  name: "css.ist",
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
  if (
    path === useRuntimeConfig().public.dev_template_path &&
    !useProduction()
  ) {
    return `/introduce/${url}`.replaceAll("//", "/");
  }

  const baseURL = "https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ";
  const id = `wcao${path}/${url}`
    .replaceAll("//", "/")
    .replaceAll("/", "-")
    .replace(/\.(jpg|png|jpeg|gif)/g, "");

  return `${baseURL}/${id}/${type}`;
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
      _extension: "yml",
    })
    .only(["_id", "_path", "title", "tags", "previews"])
    .sort({ _path: -1, $numeric: 1 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .find();
};

// drawer-content 触底
export const drawerContentPullUpEnd = ref<number>(0);

// drawer-content 滚动距离
export const drawerContentScroll = ref();

// drawer-content 元素
export const drawerContentElement = ref<HTMLInputElement | null>(null);
// drawer-side 元素
export const drawerSideElement = ref<HTMLImageElement | null>(null);

export type Position = {
  left: number | string;
  top: number | string;
  width: number | string;
  height: number | string;
};
export const nextImgProps = ref<{
  start: Position;
  end: Position;
  src: string;
  status: "target-to-full" | "full-to-target" | "waiting";
}>();

// 跳转介绍界面动画
//
export const toIntroduce = (
  e: Event,
  query?: { _path: string; offsetLeft: number }
) => {
  const target = e.target as HTMLImageElement;
  const contentTarget = drawerContentElement.value;
  if (!contentTarget) return;

  if (query?._path) {
    navigateTo(query?._path);
  }

  nextImgProps.value = {
    start: {
      left:
        target.offsetLeft -
        (query?.offsetLeft || 0) -
        contentTarget.scrollLeft +
        "px",
      top: target.offsetTop - contentTarget.scrollTop + 96 + "px",
      width: target.clientWidth + "px",
      height: target.clientHeight + "px",
    },
    end: {
      left: 0,
      top: 0,
      width: "calc(100% - 320px)",
      height: "calc(100% - 64px)",
    },
    src: target.src,
    status: "target-to-full",
  };
};
