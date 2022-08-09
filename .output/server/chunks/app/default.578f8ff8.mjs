import { _ as _sfc_main$1, a as __nuxt_component_1 } from './footer.70d08b99.mjs';
import { C as drawerContentPullUpEnd, D as drawerContentScroll, q as queryContent, t as useAsset, E as websiteConfig, F as usePicsum, j as __nuxt_component_0$2 } from './server.mjs';
import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import { useStorage, useInfiniteScroll, useScroll } from '@vueuse/core';
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
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const storage = useStorage("tag-list-data", []);
    const drawerContent = vue_cjs_prod.ref(null);
    useInfiniteScroll(drawerContent, () => drawerContentPullUpEnd.value++, {
      distance: 100
    });
    drawerContentScroll.value = useScroll(drawerContent);
    const res = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => queryContent("introduce").only(["tags"]).find()), __temp = await __temp, __restore(), __temp);
    const navs = [...new Set(res.map((item) => item.tags).flat(1))];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CoreDark = _sfc_main$1;
      const _component_CoreFooter = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<main${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "outside", {}, null, _push, _parent);
      _push(`<div class="drawer drawer-mobile"><input id="my-drawer-2" type="checkbox" class="drawer-toggle"><div id="drawer-content" class="drawer-content"><label for="my-drawer-2" class="drawer-button lg:hidden flex justify-between pl-4 border-b border-base-200/50 sticky top-0 bg-base-100 z-20"><div class="flex justify-center items-center font-seri"><img${serverRenderer.exports.ssrRenderAttr("src", vue_cjs_prod.unref(useAsset)("/logo.png"))} class="w-8 h-8 mr-2"> ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(websiteConfig).name)}</div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_CoreDark, null, null, _parent));
      _push(`</label><div class="sticky top-0 z-30 bg-base-100 text-base-content"><div class="navbar h-16 bg-base-100 pl-4 hidden lg:flex border-b border-base-200"><div class="flex-1"><input type="text" class="input w-72 input-bordered h-10" placeholder="search here..."></div><div class="flex-none">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_CoreDark, null, null, _parent));
      _push(`</div></div></div>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(serverRenderer.exports.ssrRenderComponent(_component_CoreFooter, null, null, _parent));
      _push(`</div><div class="drawer-side"><label for="my-drawer-2" class="drawer-overlay"></label><aside class="w-80 bg-base-100"><div class="z-20 sticky top-0 h-16 flex items-center justify-center border-b border-base-200 bg-base-100">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn-ghost text-2xl normal-case hover:bg-transparent hidden lg:flex font-serif"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", vue_cjs_prod.unref(useAsset)("/logo.png"))} class="w-10 h-10 mr-2"${_scopeId}> ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(websiteConfig).name)}`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: vue_cjs_prod.unref(useAsset)("/logo.png"),
                class: "w-10 h-10 mr-2"
              }, null, 8, ["src"]),
              vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(websiteConfig).name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<input class="input input-bordered h-10 w-10/12 lg:hidden" placeholder="search here ..."></div><div class="bg-base-100 border-r border-base-200 p-4 font-serif" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100% - 64px)" })}"><ul class="menu rounded-box p-2 capitalize"><li class="border-b border-base-200 pb-2">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="material-symbols-outlined"${_scopeId}> home </span> home `);
          } else {
            return [
              vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined" }, " home "),
              vue_cjs_prod.createTextVNode(" home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="material-symbols-outlined"${_scopeId}> person </span> about `);
          } else {
            return [
              vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined" }, " person "),
              vue_cjs_prod.createTextVNode(" about ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="menu-title mt-2"><a>tags</a></li><!--[-->`);
      serverRenderer.exports.ssrRenderList(navs, (item) => {
        _push(`<li>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: "/tag/" + item,
          onClick: ($event) => storage.value = []
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
        _push(`</li>`);
      });
      _push(`<!--]--></ul><img class="w-72 h-72 rounded-box mx-auto mt-4"${serverRenderer.exports.ssrRenderAttr("src", vue_cjs_prod.unref(usePicsum)("/288/288"))}></div></aside></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.578f8ff8.mjs.map
