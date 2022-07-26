# Nuxt 3 Minimal Starter

[youweb.cc](https://youweb.cc)

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
- components
    - core                      # 外部架子公用组件
    - template                  # 模板
- pages
    - detail                    # 模板展示
    - page/[pageIndex]          # 首页分页
    - tag/[pageIndex]           # 标签分页
    - index                     # 首页
```
