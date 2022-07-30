import { x as websiteConfig, y as useUnsplash, j as __nuxt_component_0$1 } from './server.mjs';
import { _ as _imports_0 } from './logo.222c07ba.mjs';
import { s as serverRenderer, v as vue_cjs_prod } from '../handlers/renderer.mjs';
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
  __name: "template",
  __ssrInlineRender: true,
  setup(__props) {
    const themes = ["light", "dark", "cupcake", "bumblebee", "emerald"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="drawer"><input id="my-drawer-2" type="checkbox" class="drawer-toggle"><div class="drawer-content"><label for="my-drawer-2" class="drawer-button lg:hidden flex justify-between pl-4 border-b border-base-200/50 sticky top-0 bg-base-100 z-20"><div class="flex justify-center items-center"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0)} class="w-8 h-8 mr-2"> ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(websiteConfig).name)}</div><button class="btn btn-square btn-ghost hover:bg-transparent"><label class="swap swap-rotate"><input type="checkbox"><span class="material-symbols-outlined swap-on"> light_mode </span><span class="material-symbols-outlined swap-off"> dark_mode </span></label></button></label><div class="sticky top-0 z-30 bg-base-100 text-base-content"><div class="navbar h-16 bg-base-100 pl-4 hidden lg:flex border-b border-base-200"><div class="flex-1"></div><div class="flex-none"><button class="btn btn-square btn-ghost"><span class="material-symbols-outlined"> fullscreen_exit </span></button></div></div></div>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="drawer-side"><label for="my-drawer-2" class="drawer-overlay"></label><aside class="w-80 pb-12"><div class="z-20 sticky top-0 h-16 flex items-center justify-center border-b border-base-200 bg-base-100">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn-ghost hover:bg-transparent"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0)} class="w-10 h-10 mr-2"${_scopeId}> ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(websiteConfig).name)}`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0,
                class: "w-10 h-10 mr-2"
              }),
              vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(websiteConfig).name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="min-h-full border-r border-base-200 lg:bg-transparent bg-base-100"><ul class="menu p-4 overflow-y-auto w-full text-base-content border-base-200"><!--[-->`);
      serverRenderer.exports.ssrRenderList(themes, (item) => {
        _push(`<li><a>${serverRenderer.exports.ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul><img class="w-72 h-72 rounded-box m-auto"${serverRenderer.exports.ssrRenderAttr("src", vue_cjs_prod.unref(useUnsplash)("/random/288x0"))}></div></aside></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/template.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=template.0ee86c45.mjs.map
