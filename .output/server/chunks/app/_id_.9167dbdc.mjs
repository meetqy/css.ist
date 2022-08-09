import { f as useContent, r as getContentByTag, v as vLazy, t as useAsset, j as __nuxt_component_0$2 } from './server.mjs';
import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'ufo';
import 'html-tags';
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
import 'node:url';
import 'ipx';
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
import 'slugify';
import 'unenv/runtime/mock/proxy';
import 'stream';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { page } = useContent();
    const activePreviewIndex = vue_cjs_prod.ref(0);
    const full = vue_cjs_prod.ref(false);
    const onTap = (swiper) => {
      activePreviewIndex.value = swiper.clickedIndex;
      swiper.slideTo(swiper.clickedIndex);
    };
    const res = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => getContentByTag(
      page.value.tags,
      {
        pageIndex: 1,
        pageSize: 12
      },
      "$in"
    )), __temp = await __temp, __restore(), __temp);
    const moreContent = res.filter((item) => item._id !== page.value._id);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      if (vue_cjs_prod.unref(page)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "w-full" }, _attrs))}><div class="fixed right-4 bottom-8 z-50 flex justify-center items-center"><div class="btn btn-primary btn-square btn-sm mr-2"><span class="material-symbols-outlined"> chevron_left </span></div><div class="btn btn-circle btn-sm"><span class="material-symbols-outlined !text-lg"> rocket </span></div></div><div class="w-full bg-info/5 pb-8 rounded-b"><div class="lg:container"><article class="md:prose prose-sm prose-p:mb-0 prose-h2:mb-0 !max-w-full px-4 pt-4">`);
        if (vue_cjs_prod.unref(page).previews) {
          _push(`<div class="shadow flex items-center justify-between bg-base-100 overflow-hidden rounded-box flex-col lg:flex-row lg:pl-4 pt-4 lg:pt-0"><h1 class="!m-0">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(page).title)}</h1><div class="w-full lg:w-1/3 flex justify-end mt-4 lg:mt-0">`);
          _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Swiper), {
            "slides-per-view": 4,
            "space-between": 12,
            class: "flex-1 bg-base-300",
            onTap
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(page).previews, (item, i) => {
                  _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(SwiperSlide), { key: i }, {
                    default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
                          class: [
                            "w-full h-24 object-cover object-top !m-1 outline-4 outline",
                            activePreviewIndex.value === i ? "outline-primary" : "outline-base-100"
                          ]
                        }, serverRenderer.exports.ssrGetDirectiveProps(
                          _ctx,
                          _directive_lazy,
                          vue_cjs_prod.unref(vLazy)(
                            vue_cjs_prod.unref(useAsset)(item, vue_cjs_prod.unref(page)._path, {
                              format: "webp",
                              s: "300x300"
                            })
                          )
                        )))}${_scopeId2}>`);
                      } else {
                        return [
                          vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", {
                            class: [
                              "w-full h-24 object-cover object-top !m-1 outline-4 outline",
                              activePreviewIndex.value === i ? "outline-primary" : "outline-base-100"
                            ]
                          }, null, 2), [
                            [
                              _directive_lazy,
                              vue_cjs_prod.unref(vLazy)(
                                vue_cjs_prod.unref(useAsset)(item, vue_cjs_prod.unref(page)._path, {
                                  format: "webp",
                                  s: "300x300"
                                })
                              )
                            ]
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(page).previews, (item, i) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), { key: i }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", {
                          class: [
                            "w-full h-24 object-cover object-top !m-1 outline-4 outline",
                            activePreviewIndex.value === i ? "outline-primary" : "outline-base-100"
                          ]
                        }, null, 2), [
                          [
                            _directive_lazy,
                            vue_cjs_prod.unref(vLazy)(
                              vue_cjs_prod.unref(useAsset)(item, vue_cjs_prod.unref(page)._path, {
                                format: "webp",
                                s: "300x300"
                              })
                            )
                          ]
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            to: `${vue_cjs_prod.unref(page)._path.replace("introduce", "template")}`,
            class: "w-12 shrink-0 bg-primary flex justify-center items-center !no-underline"
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="material-symbols-outlined text-primary-content"${_scopeId}> fullscreen </span>`);
              } else {
                return [
                  vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined text-primary-content" }, " fullscreen ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(page).previews, (item, i) => {
          _push(`<!--[-->`);
          if (vue_cjs_prod.unref(page).previews) {
            _push(`<div style="${serverRenderer.exports.ssrRenderStyle(activePreviewIndex.value === i ? null : { display: "none" })}" class="w-full relative flex-shrink-0 rounded-box bg-base-200 max-h-[80vh] overflow-y-auto transition-all mt-8 shadow"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
              class: ["transition-all object-contain duration-300 ease-in-out m-auto cursor-zoom-out !my-0 min-h-[368px]", full.value ? "w-full" : "w-1/3"]
            }, serverRenderer.exports.ssrGetDirectiveProps(
              _ctx,
              _directive_lazy,
              vue_cjs_prod.unref(vLazy)(
                vue_cjs_prod.unref(useAsset)(item, vue_cjs_prod.unref(page)._path, {
                  format: "webp",
                  w: "1920"
                })
              )
            )))}></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><p class="mt-8 flex items-center"><span class="material-symbols-outlined"> sell </span><span class="ml-1 uppercase">tags:</span><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(page).tags, (item) => {
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            key: item,
            to: `/tag/${item}`,
            class: "btn btn-primary btn-xs ml-2 !no-underline !text-primary-content"
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(item)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></p>`);
        if (vue_cjs_prod.unref(page).source) {
          _push(`<div class="mt-4 flex items-center"><span class="material-symbols-outlined"> my_location </span><span class="ml-1 uppercase">source:</span> \u300A<span class="line-clamp-1"><a${serverRenderer.exports.ssrRenderAttr("href", vue_cjs_prod.unref(page).source)} target="_blank" class="text-primary uppercase">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(page).source)}</a></span>\u300B </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h2 class="capitalize">more</h2><div class="grid transition-all xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4"><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(moreContent), (item) => {
          _push(`<div class="cursor-zoom-in"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "w-full aspect-video object-contain rounded-box border border-base-200 shadow bg-base-200/20" }, serverRenderer.exports.ssrGetDirectiveProps(
            _ctx,
            _directive_lazy,
            vue_cjs_prod.unref(vLazy)(
              vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                format: "webp",
                w: 480
              })
            )
          )))}><p class="px-2">${serverRenderer.exports.ssrInterpolate(item.title)}</p></div>`);
        });
        _push(`<!--]--></div></article></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/introduce/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.9167dbdc.mjs.map
