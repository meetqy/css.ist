import { u as useRoute, G as allThemes } from './server.mjs';
import { useColorMode } from '@vueuse/core';
import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import 'ufo';
import 'html-tags';
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
  __name: "template",
  __ssrInlineRender: true,
  setup(__props) {
    const { path, query } = useRoute();
    const langs = {
      en: "english",
      zh: "\u4E2D\u6587"
    };
    const lang = vue_cjs_prod.ref(query.lang || "en");
    const mode = useColorMode({
      modes: allThemes
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "drawer" }, _attrs))}><input id="my-drawer" type="checkbox" class="drawer-toggle"><div class="drawer-content"><div id="template-priview" class="fixed left-0 w-full top-0"${serverRenderer.exports.ssrRenderAttr("data-theme", vue_cjs_prod.unref(mode))}>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="fixed left-0 md:left-2 top-1/3 z-50 flex flex-col"><div class="btn btn-primary btn-md btn-square md:scale-100 scale-75 drawer-button shadow-md md:mb-2"><span class="material-symbols-outlined"> chevron_left </span></div><label for="my-drawer" class="btn btn-square btn-md md:scale-100 scale-75 drawer-button shadow-md"><span class="material-symbols-outlined"> flaky </span></label></div></div><div class="drawer-side"><label for="my-drawer" class="drawer-overlay"></label><ul class="menu w-80 bg-base-100 p-4"><li class="menu-title"><a>Choose Theme</a></li><div class="dropdown mt-2"><label tabindex="1"><input type="text" class="input input-bordered w-72 focus:outline-none focus:border-primary focus:border-2" placeholder="Choose a Theme"${serverRenderer.exports.ssrRenderAttr("value", vue_cjs_prod.unref(mode))}></label><div tabindex="1" class="dropdown-content max-h-96 grid-cols-1 w-72 p-4 pt-0 bg-base-300 rounded-box overflow-y-scroll"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(allThemes), (item) => {
        _push(`<div${serverRenderer.exports.ssrRenderAttr("data-set-theme", item)} class="${serverRenderer.exports.ssrRenderClass([{ outline: item === vue_cjs_prod.unref(mode) }, "outline-base-content mt-4 overflow-hidden w-full rounded-lg outline-2 outline-offset-2"])}" data-act-class="outline"><div${serverRenderer.exports.ssrRenderAttr("data-theme", item)} class="bg-base-100 text-base-content w-full cursor-pointer font-sans"><div class="grid grid-cols-5 grid-rows-3"><div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"><div class="flex-grow text-sm font-bold">${serverRenderer.exports.ssrInterpolate(item)}</div><div class="flex flex-shrink-0 flex-wrap gap-1"><div class="bg-primary w-2 rounded"></div><div class="bg-secondary w-2 rounded"></div><div class="bg-accent w-2 rounded"></div><div class="bg-neutral w-2 rounded"></div></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><li class="menu-title mt-4"><a>Choose Language</a></li><div class="dropdown mt-2"><label tabindex="2"><input type="text" class="input input-bordered w-72 focus:outline-none focus:border-primary focus:border-2" placeholder="Choose a Theme"${serverRenderer.exports.ssrRenderAttr("value", langs[lang.value])}></label><div tabindex="2" class="dropdown-content max-h-96 grid-cols-1 w-72 p-4 pt-0 bg-base-300 rounded-box overflow-y-scroll"><!--[-->`);
      serverRenderer.exports.ssrRenderList(langs, (v, k) => {
        _push(`<div class="${serverRenderer.exports.ssrRenderClass([{ outline: k === lang.value }, "mt-4 overflow-hidden w-full rounded-lg outline-primary"])}"><div class="bg-base-100 text-base-content w-full cursor-pointer font-sans px-4 py-3 flex justify-between"><span>${serverRenderer.exports.ssrInterpolate(k)}</span><span class="capitalize">${serverRenderer.exports.ssrInterpolate(v)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></ul></div></div>`);
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
//# sourceMappingURL=template.f7a137f6.mjs.map
