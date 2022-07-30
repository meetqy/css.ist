import { u as useRoute, r as __nuxt_component_0, s as __nuxt_component_1, t as __nuxt_component_2, l as __nuxt_component_3 } from './server.mjs';
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
  __name: "[path]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { path } = route.params;
    const { full, lang } = route.query;
    const templates = {
      1: __nuxt_component_0,
      2: __nuxt_component_1,
      8: __nuxt_component_2
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_3;
      if (vue_cjs_prod.unref(full)) {
        serverRenderer.exports.ssrRenderVNode(_push, vue_cjs_prod.createVNode(vue_cjs_prod.resolveDynamicComponent(templates[vue_cjs_prod.unref(path)]), _attrs, null), _parent);
      } else {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, vue_cjs_prod.mergeProps({ name: "template" }, _attrs), {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              serverRenderer.exports.ssrRenderVNode(_push2, vue_cjs_prod.createVNode(vue_cjs_prod.resolveDynamicComponent(templates[vue_cjs_prod.unref(path)]), null, null), _parent2, _scopeId);
            } else {
              return [
                (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.resolveDynamicComponent(templates[vue_cjs_prod.unref(path)])))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/template/[path].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_path_.ef4b3a74.mjs.map
