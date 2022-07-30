import { m as getContentByTag, q as queryContent, l as __nuxt_component_3, n as __nuxt_component_1$1 } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogContent = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => getContentByTag("blog", {
      pageIndex: 1,
      pageSize: 12
    })), __temp = await __temp, __restore(), __temp);
    const cardContent = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => getContentByTag("card", {
      pageIndex: 1,
      pageSize: 12
    })), __temp = await __temp, __restore(), __temp);
    const pageContent = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => getContentByTag("page", {
      pageIndex: 1,
      pageSize: 12
    })), __temp = await __temp, __restore(), __temp);
    const recommendContent = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => queryContent("introduce").where({
      recommend: true
    }).limit(8).find()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_3;
      const _component_CoreSwiper = __nuxt_component_1$1;
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pb-12"${_scopeId}><section class="w-full lg:px-12 px-6 mt-12"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_CoreSwiper, {
              title: "recommend",
              data: vue_cjs_prod.unref(recommendContent),
              loop: true,
              breakpoints: {
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                1280: {
                  slidesPerView: 1,
                  spaceBetween: 40
                },
                1536: {
                  slidesPerView: 2,
                  spaceBetween: 40
                }
              }
            }, null, _parent2, _scopeId));
            _push2(`</section><section class="w-full lg:px-12 px-6 mt-12"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_CoreSwiper, {
              title: "Blog",
              data: vue_cjs_prod.unref(blogContent),
              cat: {
                name: "see all",
                to: "/tag/blog"
              },
              breakpoints: {
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                1280: {
                  slidesPerView: 1,
                  spaceBetween: 40
                },
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
              }
            }, null, _parent2, _scopeId));
            _push2(`</section><section class="w-full lg:px-12 px-6 mt-12"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_CoreSwiper, {
              title: "fashion",
              data: vue_cjs_prod.unref(cardContent),
              "content-on-image": true,
              "image-scale": true,
              cat: {
                name: "see all",
                to: "/tag/fashion"
              },
              breakpoints: {
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 40
                },
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
              }
            }, null, _parent2, _scopeId));
            _push2(`</section><section class="w-full lg:px-12 px-6 mt-12"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_CoreSwiper, {
              title: "page",
              data: vue_cjs_prod.unref(pageContent),
              "image-circle": true,
              cat: {
                name: "see all",
                to: "/tag/page"
              },
              breakpoints: {
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 40
                },
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
              }
            }, null, _parent2, _scopeId));
            _push2(`</section></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "pb-12" }, [
                vue_cjs_prod.createVNode("section", { class: "w-full lg:px-12 px-6 mt-12" }, [
                  vue_cjs_prod.createVNode(_component_CoreSwiper, {
                    title: "recommend",
                    data: vue_cjs_prod.unref(recommendContent),
                    loop: true,
                    breakpoints: {
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                      1280: {
                        slidesPerView: 1,
                        spaceBetween: 40
                      },
                      1536: {
                        slidesPerView: 2,
                        spaceBetween: 40
                      }
                    }
                  }, null, 8, ["data"])
                ]),
                vue_cjs_prod.createVNode("section", { class: "w-full lg:px-12 px-6 mt-12" }, [
                  vue_cjs_prod.createVNode(_component_CoreSwiper, {
                    title: "Blog",
                    data: vue_cjs_prod.unref(blogContent),
                    cat: {
                      name: "see all",
                      to: "/tag/blog"
                    },
                    breakpoints: {
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                      1280: {
                        slidesPerView: 1,
                        spaceBetween: 40
                      },
                      1536: {
                        slidesPerView: 4,
                        spaceBetween: 40
                      }
                    }
                  }, null, 8, ["data"])
                ]),
                vue_cjs_prod.createVNode("section", { class: "w-full lg:px-12 px-6 mt-12" }, [
                  vue_cjs_prod.createVNode(_component_CoreSwiper, {
                    title: "fashion",
                    data: vue_cjs_prod.unref(cardContent),
                    "content-on-image": true,
                    "image-scale": true,
                    cat: {
                      name: "see all",
                      to: "/tag/fashion"
                    },
                    breakpoints: {
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                      1280: {
                        slidesPerView: 2,
                        spaceBetween: 40
                      },
                      1536: {
                        slidesPerView: 4,
                        spaceBetween: 40
                      }
                    }
                  }, null, 8, ["data"])
                ]),
                vue_cjs_prod.createVNode("section", { class: "w-full lg:px-12 px-6 mt-12" }, [
                  vue_cjs_prod.createVNode(_component_CoreSwiper, {
                    title: "page",
                    data: vue_cjs_prod.unref(pageContent),
                    "image-circle": true,
                    cat: {
                      name: "see all",
                      to: "/tag/page"
                    },
                    breakpoints: {
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                      1280: {
                        slidesPerView: 2,
                        spaceBetween: 40
                      },
                      1536: {
                        slidesPerView: 4,
                        spaceBetween: 40
                      }
                    }
                  }, null, 8, ["data"])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.aa8ef685.mjs.map
