import { u as useRoute, o as drawerContentScroll, p as drawerContentPullUpEnd, v as vLazy, m as getContentByTag, l as __nuxt_component_3, j as __nuxt_component_0$1 } from './server.mjs';
import { useStorage } from '@vueuse/core';
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
  __name: "[name]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { params } = route;
    const { name } = params;
    const storage = useStorage("tag-list-data", []);
    const scrollStorage = useStorage("tag-scroll", 0);
    const pageSize = 15;
    const pageIndex = vue_cjs_prod.ref(1);
    if (storage.value.length > 0) {
      pageIndex.value = Math.ceil(storage.value.length / pageSize);
    }
    const end = vue_cjs_prod.ref(false);
    const list = vue_cjs_prod.ref([]);
    vue_cjs_prod.watch(route, (a) => {
      if (a.name === "slug") {
        scrollStorage.value = drawerContentScroll.value.y;
      } else {
        storage.value = [];
        scrollStorage.value = 0;
      }
    });
    const getData = async () => await getContentByTag(name, {
      pageIndex: pageIndex.value,
      pageSize
    });
    vue_cjs_prod.watch(drawerContentPullUpEnd, async (val) => {
      if (end.value)
        return;
      pageIndex.value++;
      const res = await getData();
      if (res.length > 0) {
        list.value = list.value.concat(res);
        storage.value = list.value;
      } else {
        end.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (list.value) {
              _push2(`<main class="p-12 min-h-screen"${_scopeId}><h1 class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(name))}</h1><div class="columns-3 gap-8 mt-8"${_scopeId}><!--[-->`);
              serverRenderer.exports.ssrRenderList(list.value, (item) => {
                _push2(`<div class="mb-8 w-full overflow-hidden"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                  to: item._path
                }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "object-cover max-h-96 border border-base-300 object-top w-full h-full rounded-box cursor-zoom-in" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.light || item.previews[0]))))}${_scopeId2}>`);
                    } else {
                      return [
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", { class: "object-cover max-h-96 border border-base-300 object-top w-full h-full rounded-box cursor-zoom-in" }, null, 512), [
                          [_directive_lazy, vue_cjs_prod.unref(vLazy)(item.light || item.previews[0])]
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="px-2"${_scopeId}><h3 class="text-lg mt-4 mb-2 font-medium capitalize"${_scopeId}>${serverRenderer.exports.ssrInterpolate(item.title)}</h3><p${_scopeId}><!--[-->`);
                serverRenderer.exports.ssrRenderList(item.tags, (tag) => {
                  _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                    to: `/tag/${tag}`,
                    key: tag,
                    class: "btn btn-xs mr-2 font-normal btn-primary"
                  }, {
                    default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${serverRenderer.exports.ssrInterpolate(tag)}`);
                      } else {
                        return [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></p></div></div>`);
              });
              _push2(`<!--]--></div><div class="flex justify-between items-center mt-24"${_scopeId}><div class="flex-1 border-t border-dotted"${_scopeId}></div><span class="px-12 text-base-300 font-thin font-sans"${_scopeId}>end</span><div class="flex-1 border-t border-dotted"${_scopeId}></div></div></main>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              list.value ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("main", {
                key: 0,
                class: "p-12 min-h-screen"
              }, [
                vue_cjs_prod.createVNode("h1", { class: "capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(name)), 1),
                vue_cjs_prod.createVNode("div", { class: "columns-3 gap-8 mt-8" }, [
                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(list.value, (item) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                      class: "mb-8 w-full overflow-hidden",
                      key: item._id
                    }, [
                      vue_cjs_prod.createVNode(_component_NuxtLink, {
                        to: item._path
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", { class: "object-cover max-h-96 border border-base-300 object-top w-full h-full rounded-box cursor-zoom-in" }, null, 512), [
                            [_directive_lazy, vue_cjs_prod.unref(vLazy)(item.light || item.previews[0])]
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      vue_cjs_prod.createVNode("div", { class: "px-2" }, [
                        vue_cjs_prod.createVNode("h3", { class: "text-lg mt-4 mb-2 font-medium capitalize" }, vue_cjs_prod.toDisplayString(item.title), 1),
                        vue_cjs_prod.createVNode("p", null, [
                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.tags, (tag) => {
                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_NuxtLink, {
                              to: `/tag/${tag}`,
                              key: tag,
                              class: "btn btn-xs mr-2 font-normal btn-primary"
                            }, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"]);
                          }), 128))
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                vue_cjs_prod.createVNode("div", { class: "flex justify-between items-center mt-24" }, [
                  vue_cjs_prod.createVNode("div", { class: "flex-1 border-t border-dotted" }),
                  vue_cjs_prod.createVNode("span", { class: "px-12 text-base-300 font-thin font-sans" }, "end"),
                  vue_cjs_prod.createVNode("div", { class: "flex-1 border-t border-dotted" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tag/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_name_.ad70c3a9.mjs.map
