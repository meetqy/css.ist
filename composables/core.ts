/**
 * 生产环境?
 * @returns boolean
 */
export const useProduction = () => process.env.NODE_ENV === "producton";

/**
 * 网站基础配置
 */
export const websiteConfig = {
  name: "muzak",
  asset: "https://strapi.wcao.cc",
};

/**
 *
 */

export const useAsset = (url: string, opts?: string) => {
  return `${websiteConfig.asset}/uploads/${opts || "f_webp,w_500"}${url}`;
};

/**
 * material icon fill
 */
export const iconFill = `font-variation-settings: "FILL" 1, "wght" 100, "GRAD" 0, "opsz" 48;`;

/**
 * unsplash.com
 */
export const useUnsplash = (path) => `https://source.unsplash.com${path}`;
