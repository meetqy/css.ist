import { g as useContent, v as vLazy, l as __nuxt_component_3 } from './server.mjs';
import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import 'ufo';
import 'swiper/vue';
import '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'h3';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'fs';
import 'pathe';
import 'url';
import 'defu';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'unist-util-position';
import 'html-tags';
import 'slugify';
import 'unenv/runtime/mock/proxy';
import 'stream';

const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useContent();
    const activePreviewIndex = vue_cjs_prod.ref(0);
    const full = vue_cjs_prod.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_3;
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vue_cjs_prod.unref(page)) {
              _push2(`<div class="w-full"${_scopeId}>`);
              if (vue_cjs_prod.unref(page).previews) {
                _push2(`<div class="bg-base-100 p-2 shadow rounded fixed right-4 top-20 z-50 opacity-80"${_scopeId}><!--[-->`);
                serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(page).previews, (item, i) => {
                  _push2(`<div${_scopeId}><div class="${serverRenderer.exports.ssrRenderClass([{
                    "border-primary !border-solid": activePreviewIndex.value === i
                  }, "p-1 border-2 border-base-200 overflow-hidden rounded"])}"${_scopeId}><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "object-cover w-24 h-24 object-top m-0 p-0" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item))))}${_scopeId}></div><p class="text-center text-base-content/50 font-serif"${_scopeId}> 0${serverRenderer.exports.ssrInterpolate(i + 1)}</p></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="fixed right-4 bottom-8 z-50"${_scopeId}><div class="btn btn-primary btn-square btn-sm mr-2"${_scopeId}><span class="material-symbols-outlined"${_scopeId}> chevron_left </span></div><div class="btn btn-primary btn-circle btn-sm"${_scopeId}><span class="material-symbols-outlined"${_scopeId}> expand_less </span></div></div><div class="container m-auto bg-info/5 pb-8 rounded-b"${_scopeId}><article class="prose max-w-full px-4 pt-8"${_scopeId}><h1${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(page).title)}</h1>`);
              if (vue_cjs_prod.unref(page).previews) {
                _push2(`<div${_scopeId}><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
                  class: [
                    "m-auto object-top object-cover transition-all",
                    full.value ? "w-full cursor-zoom-out" : "w-1/2 cursor-zoom-in aspect-square"
                  ]
                }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(vue_cjs_prod.unref(page).previews[activePreviewIndex.value]))))}${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-center mt-8"${_scopeId}><span${_scopeId}>tags:</span><!--[-->`);
              serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(page).tags, (item) => {
                _push2(`<div class="btn btn-primary btn-xs ml-2"${_scopeId}>${serverRenderer.exports.ssrInterpolate(item)}</div>`);
              });
              _push2(`<!--]--></div></article></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vue_cjs_prod.unref(page) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                key: 0,
                class: "w-full"
              }, [
                vue_cjs_prod.unref(page).previews ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                  key: 0,
                  class: "bg-base-100 p-2 shadow rounded fixed right-4 top-20 z-50 opacity-80"
                }, [
                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(page).previews, (item, i) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                      key: i,
                      onClick: ($event) => activePreviewIndex.value = i
                    }, [
                      vue_cjs_prod.createVNode("div", {
                        class: ["p-1 border-2 border-base-200 overflow-hidden rounded", {
                          "border-primary !border-solid": activePreviewIndex.value === i
                        }]
                      }, [
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", { class: "object-cover w-24 h-24 object-top m-0 p-0" }, null, 512), [
                          [_directive_lazy, vue_cjs_prod.unref(vLazy)(item)]
                        ])
                      ], 2),
                      vue_cjs_prod.createVNode("p", { class: "text-center text-base-content/50 font-serif" }, " 0" + vue_cjs_prod.toDisplayString(i + 1), 1)
                    ], 8, ["onClick"]);
                  }), 128))
                ])) : vue_cjs_prod.createCommentVNode("", true),
                vue_cjs_prod.createVNode("div", { class: "fixed right-4 bottom-8 z-50" }, [
                  vue_cjs_prod.createVNode("div", {
                    class: "btn btn-primary btn-square btn-sm mr-2",
                    onClick: ($event) => _ctx.$router.back()
                  }, [
                    vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined" }, " chevron_left ")
                  ], 8, ["onClick"]),
                  vue_cjs_prod.createVNode("div", { class: "btn btn-primary btn-circle btn-sm" }, [
                    vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined" }, " expand_less ")
                  ])
                ]),
                vue_cjs_prod.createVNode("div", { class: "container m-auto bg-info/5 pb-8 rounded-b" }, [
                  vue_cjs_prod.createVNode("article", { class: "prose max-w-full px-4 pt-8" }, [
                    vue_cjs_prod.createVNode("h1", null, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(page).title), 1),
                    vue_cjs_prod.unref(page).previews ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", { key: 0 }, [
                      vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", {
                        class: [
                          "m-auto object-top object-cover transition-all",
                          full.value ? "w-full cursor-zoom-out" : "w-1/2 cursor-zoom-in aspect-square"
                        ],
                        onClick: ($event) => full.value = !full.value
                      }, null, 10, ["onClick"]), [
                        [_directive_lazy, vue_cjs_prod.unref(vLazy)(vue_cjs_prod.unref(page).previews[activePreviewIndex.value])]
                      ])
                    ])) : vue_cjs_prod.createCommentVNode("", true),
                    vue_cjs_prod.createVNode("div", { class: "flex items-center mt-8" }, [
                      vue_cjs_prod.createVNode("span", null, "tags:"),
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(page).tags, (item) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", { class: "btn btn-primary btn-xs ml-2" }, vue_cjs_prod.toDisplayString(item), 1);
                      }), 256))
                    ])
                  ])
                ])
              ])) : vue_cjs_prod.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_.d3ec0065.mjs.map
