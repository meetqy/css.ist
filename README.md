# wcao.cc [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) ![MIT](https://img.shields.io/github/license/meetqy/wcao.cc)

**wcao.cc** 分享**响应式**、**多主题**模板和组件，基于 tailwind、daisyui

- [wcao.cc](https://wcao.cc)
- 备用网站: [youweb.cc](https://youweb.cc)

## 模板中公用资源、方法

- [color-mode](https://color-mode.nuxtjs.org/)
- [nuxt tailwindcss](https://tailwindcss.nuxtjs.org/examples/daisyui)
- [material-icons](https://fonts.google.com/icons)
- [picsum.photos](https://picsum.photos/)
- [mockjs](http://mockjs.com)
- [unsplash](https://unsplash.com)

### Mock Data/多语言

```js
const { lang = "en" } = useRoute().query;

const data = Mock.mock({
  "en|4-15": [
    {
      "id|+1": 1,
      title: "@title",
      paragraph: "@paragraph(1,5)",
      "tags|1-5": ["@word"],
      "image|0-1": [useSplash("/random/800x600")],
    },
  ],
  zh: [
    {
      "id|+1": 1,
      title: "@ctitle",
      paragraph: "@cparagraph(1,5)",
      "tags|1-5": ["@cword"],
      "image|0-1": [useSplash("/random/800x600")],
    },
  ],
})[lang];
```

### Material Icons 使用

```html
<!-- outlined icon -->
<span class="material-symbols-outlined">settings</span>

<!-- fill icon -->
<span class="material-symbols-outlined" :style="iconFill">settings</span>
```

## 规范

- 每个模板预览图使用**dark**模式 pc 端**全屏图 1920x1080**
- 模板中图片资源 `useUnsplash`/`usePicsum`
- 基本信息使用 `baseInfo`
- 菜单、导航 `templateMenu`
- 联系方式 svg `templateContacts`

## 目录

```tree
- layouts
    - default                           # 默认框架
    - template                          # 模板展示 - 主题切换、语言切换等
- components
    - core                              # 外部架子公用组件
    - template                          # 模板
- composables
    - core                              # 核心 hooks
    - template                          # 模板 mock类 hooks
    - common                            # 公用hooks
- introduce                             # 模板介绍 markdown
- content                               # 默认@nuxt/content 存放模板外的其他md页面
- pages
    - template/[path]                   # 模板展示
    - tag/[name]                        # 标签分页
    - index                             # 首页
    - about                             # 关于我
    - [...slug].vue                     # 介绍详情
```

## 命名

模板太多，命名就有点困难，所以用以下游戏角色名字，代替。

- [League of Legends Wiki](https://leagueoflegends.fandom.com/wiki/List_of_champions)
