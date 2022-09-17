/**
 * 模板 静态常量数据
 */

// 联系方式 svg
export const templateContacts = {
  facebook: `<svg
    class="inline-block w-4 h-4 fill-current"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
    ></path>
  </svg>`,
  twitter: `<svg
  class="inline-block w-4 h-4 fill-current"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
  ></path>
</svg>`,
  instagram: `<svg
class="inline-block w-4 h-4 fill-current"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
>
<path
  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
></path>
<rect x="2" y="9" width="4" height="12"></rect>
<circle cx="4" cy="4" r="2"></circle>
</svg>`,
  github: `<svg
class="inline-block w-4 h-4 fill-current"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
>
<path
  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
></path>
</svg>`,
};

// icons
export const templateIcons = (
  num: number,
  style?: string,
  className?: string
) => {
  return [
    `<span class="material-symbols-outlined">add_to_drive</span>`,
    `<span class="material-symbols-outlined">android</span>`,
    `<span class="material-symbols-outlined">atr</span>`,
    `<span class="material-symbols-outlined">clear_night</span>`,
    `<span class="material-symbols-outlined">cloudy_snowing</span>`,
    `<span class="material-symbols-outlined">g_translate</span>`,
    `<span class="material-symbols-outlined">home_app_logo</span>`,
    `<span class="material-symbols-outlined">macro_off</span>`,
    `<span class="material-symbols-outlined">matter</span>`,
    `<span class="material-symbols-outlined">mode_heat</span>`,
    `<span class="material-symbols-outlined">polymer</span>`,
    `<span class="material-symbols-outlined">quick_phrases</span>`,
    `<span class="material-symbols-outlined">translate</span>`,
    `<span class="material-symbols-outlined">view_in_ar_new</span>`,
    `<span class="material-symbols-outlined">webhook</span>`,
    `<span class="material-symbols-outlined">youtube_activity</span>`,
  ][num].replace(
    `class="material-symbols-outlined"`,
    `class="material-symbols-outlined ${className}" style="${style}"`
  );
};

// 菜单合计 mock
export const templateMenu = {
  en: [
    {
      icon: "home",
      text: "home",
    },
    {
      icon: "person",
      text: "About",
    },
    {
      icon: "content_copy",
      text: "Categories",
    },
    {
      icon: "search",
      text: "Search",
    },
    {
      icon: "collections_bookmark",
      text: "Archive",
    },
  ],
  zh: [
    {
      icon: "home",
      text: "主页",
    },
    {
      icon: "person",
      text: "关于我",
    },
    {
      icon: "content_copy",
      text: "分类",
    },
    {
      icon: "search",
      text: "搜索",
    },
    {
      icon: "collections_bookmark",
      text: "归档",
    },
  ],
};

// 所有可使用主题
export const allThemes = {
  light: "light",
  dark: "dark",
  polar_dark_frost: "polar_dark_frost",
  snow_night_frost: "snow_night_frost",
  cupcake: "cupcake",
  bumblebee: "bumblebee",
  emerald: "emerald",
  corporate: "corporate",
  synthwave: "synthwave",
  retro: "retro",
  cyberpunk: "cyberpunk",
  valentine: "valentine",
  halloween: "halloween",
  garden: "garden",
  forest: "forest",
  aqua: "aqua",
  lofi: "lofi",
  pastel: "pastel",
  fantasy: "fantasy",
  wireframe: "wireframe",
  black: "black",
  luxury: "luxury",
  dracula: "dracula",
  cmyk: "cmyk",
  autumn: "autumn",
  business: "business",
  acid: "acid",
  lemonade: "lemonade",
  night: "night",
  coffee: "coffee",
  winter: "winter",
};

// 所有按钮类型
export const allBtnType = [
  "btn-primary",
  "btn-secondary",
  "btn-accent",
  "btn-info",
  "btn-success",
  "btn-warning",
  "btn-error",
];
