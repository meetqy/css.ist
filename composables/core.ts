import { useMediaQuery } from "@vueuse/core";

// 是否是移动端
export const isMobile = () => useMediaQuery("(max-width: 1024px)").value;

/**
 * 生产环境?
 * @returns boolean
 */
export const useProduction = () => process.env.NODE_ENV === "production";

/**
 * cloudflare image
 * @param id      cloudflare image id
 * @param type    变体 灵活变体(暂时不支持) => https://developers.cloudflare.com/images/cloudflare-images/transform/flexible-variants/
 * @param format  format https://developers.cloudflare.com/images/cloudflare-images/transform/flexible-variants/#format
 */
export const useCF = (
  id: string,
  type: "public" | "sm" | "2xl" | string,
  format?: "webp" | "avif" | "json"
): string => {
  const baseURL =
    "https://css.ist/cdn-cgi/imagedelivery/C1c8i0JtRURCOUA0iRLBpQ";
  return `${baseURL}/${id}/${type}?format=${format || "webp"}`;
};

export const useCFContentVLazy = (
  path: string,
  url: string,
  type: "public" | "sm" | "2xl"
) => {
  const _url = url.includes(" ") ? url.split(" ")[0] : url;

  return {
    src: useCFContent(path, _url, type),
    loading: useCFContent(path, _url, "smplaceholder"),
  };
};

/**
 * 处理 content image alt
 * @param title 标题
 * @param tags  标签
 * @param src   链接 => 1.png light macbook en 需要兼容 -> 1.png
 */
export const useImgAltContent = (
  title: string,
  tags: string[],
  src: string,
  suffix: string
): string => {
  if (src.includes(" ")) {
    const type = src.split(" ");
    return `${title} template. theme/${type[1]}, device/${type[2]}, language/${type[3]}`;
  } else {
    return `${title} template in ${tags.join(
      "/"
    )}, based on tailwindcss,daisyui. ${suffix}`;
  }
};

/**
 * 模板预览图专用
 * @param path      nuxt-content path
 * @param filename  .yml previews 中的名称
 * @param type      变体
 */
export const useCFContent = (
  path: string,
  url: string,
  type: "public" | "sm" | "2xl" | "smplaceholder"
): string => {
  if (
    path === useRuntimeConfig().public.dev_template_path &&
    !useProduction()
  ) {
    return `/introduce/${url}`.replaceAll("//", "/");
  }

  const id = `wcao${path}/${url}`
    .replaceAll("//", "/")
    .replaceAll("/", "-")
    .replace(/\.(jpg|png|jpeg|gif)/g, "");

  return useCF(id, type, "webp");
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
