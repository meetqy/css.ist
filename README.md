# wcao.cc

- [youweb.cc](https://youweb.cc)
- [wcao.cc](https://wcao.cc)

## UI 主题公共资源

- [color-mode](https://color-mode.nuxtjs.org/)
- [nuxt tailwindcss](https://tailwindcss.nuxtjs.org/examples/daisyui)
- [material-icons](https://fonts.google.com/icons)
- [unsplash](https://source.unsplash.com)

### material icons 使用

```html
<!-- outlined icon -->
<span class="material-symbols-outlined">settings</span>

<!-- fill icon -->
<span class="material-symbols-outlined" :style="iconFill">settings</span>
```

## 目录

```tree
- layouts
    - default                           # 默认框架
    - full                              # 模板全屏
    - template                          # 模板展示 - 主题切换、语言切换等
- components
    - core                              # 外部架子公用组件
    - template                          # 模板
- introduce                             # 模板介绍 markdown
- pages
    - template/[path]                   # 模板展示
    - page/[pageIndex]                  # 首页分页
    - tag/[name]/[pageIndex]            # 标签分页
    - index                             # 首页
    - about                             # 关于我
```
