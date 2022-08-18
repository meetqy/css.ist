<p align="center">
<img width='125' src="https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ/35605933-f760-4275-a17c-1ccd36186400/sm"/>
</p>

<div align='center'>
  
# wcao.cc 
*卧槽 - 表示一种惊讶，赞美*
  
 ![version](https://img.shields.io/github/package-json/v/meetqy/wcao.cc) ![all templates](https://img.shields.io/github/directory-file-count/meetqy/wcao.cc/components/template?color=red&label=all%20templates) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) ![MIT](https://img.shields.io/github/license/meetqy/wcao.cc) ![Vercel](https://vercelbadge.vercel.app/api/meetqy/wcao.cc) 
  
**wcao.cc** 分享**响应式**、**多主题**模板和组件，基于 tailwind、daisyui
  
   ☀️[wcao.cc](https://wcao.cc) · ☔ [youweb.cc](https://youweb.cc) · 💡[dev.wcao.cc](https://dev.wcao.cc)
  
</div>

---

## 🐹 模板特点

- 使用`mockjs`生成随机数据，可以覆盖 80%的场景，比如段落过长、过短等
- 支持中/英文展示，有些网页因为语言问题，可能会导致偏差很大
- 支持响应式，所有模板至少能够适配 `mac`、`ipad`、`iphone`
- 基于 daisyui，所以支持大量主题，后期也能根据自己的喜欢自定义主题

## 🐶 模板中公用资源、方法

- [color-mode](https://color-mode.nuxtjs.org/)
- [nuxt tailwindcss](https://tailwindcss.nuxtjs.org/examples/daisyui)
- [material-icons](https://fonts.google.com/icons)
- [picsum.photos](https://picsum.photos/)
- [mockjs](http://mockjs.com)
- [unsplash](https://unsplash.com)

## 🐭 目录

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

## 🐱 截图

_home_
![home](https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ/3bf43943-b161-4f84-6300-950b46570100/public)

_introduce_
![introduce](https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ/95087266-b9b7-4261-58c6-6f88f2172a00/public)

_preview template - theme_
![preview template - theme](https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ/2c3be84f-d76a-4db3-a350-9de16463bd00/public)

_preview template - language_
![preview template - language](https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ/9001aa78-95ab-4ede-66ea-1f42ab2dcc00/public)

### 🐰 Mock Data/多语言

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

### 🐺 Material Icons 使用

```html
<!-- outlined icon -->
<span class="material-symbols-outlined">settings</span>

<!-- fill icon -->
<span class="material-symbols-outlined" :style="iconFill">settings</span>
```

## 🐸 规范

- 每个模板预览图使用**dark**模式 pc 端**全屏图 1920x1080**
- 模板中图片资源 `useUnsplash`/`usePicsum`
- 基本信息使用 `baseInfo`
- 菜单、导航 `templateMenu`
- 联系方式 svg `templateContacts`

## 🐯 命名

模板太多，命名就有点困难，所以用以下游戏角色名字，代替。

- [League of Legends Wiki](https://leagueoflegends.fandom.com/wiki/List_of_champions)

## 🐨 封面图、预览图

ishot 带壳截图，最低规格 `ipad dark`、`ipad light`、`mac dark`、`mac light`、`iphone dark`、`iphone light`

## 🐻‍❄️ 版本管理及维护

1. iusses 中创建分支
2. 完成之后合并到 dev
3. 触发 vercel 发布 dev 版本
4. [dev 分支] `yarn dry-run` 查看自动生成 version
5. [dev 分支] `yarn release` 升级版本
6. 合并到 main 分支
7. 触发 vercel 发布稳定版

### 🐮 域名

- _vps_: [wcao.cc](https://wcao.cc)
- _vercel_: [youweb.cc](https://youweb.cc)
- _vercel_development_: [dev.wcao.cc](https://dev.wcao.cc)
