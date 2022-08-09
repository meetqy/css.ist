import { r as getContentByTag, s as __nuxt_component_0 } from './server.mjs';
import { u as useAsyncData } from './asyncData.c4e23f0d.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("firstStage", () => {
      return Promise.all([getContentByTag("firstStage")]);
    }, "$Mt0jLIYsfi")), __temp = await __temp, __restore(), __temp);
    const [firstStage] = data.value;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CoreSwiper = __nuxt_component_0;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "pb-12" }, _attrs))}><section class="w-full lg:px-12 px-6 mt-12">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_CoreSwiper, {
        title: "firstStage",
        data: vue_cjs_prod.unref(firstStage),
        "allow-touch-move": true,
        cat: { to: "/tag/firstStage", name: "see all" },
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
      }, null, _parent));
      _push(`</section></div>`);
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
//# sourceMappingURL=index.98237f7b.mjs.map
