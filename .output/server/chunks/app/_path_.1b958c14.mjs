import { u as useRoute, x as _sfc_main$7, y as _sfc_main$6, z as _sfc_main$5, A as _sfc_main$4, B as _sfc_main$3 } from './server.mjs';
import { s as serverRenderer, v as vue_cjs_prod } from '../handlers/renderer.mjs';
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
  __name: "[path]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { path } = route.params;
    const templates = {
      1: _sfc_main$7,
      2: _sfc_main$6,
      3: _sfc_main$5,
      4: _sfc_main$4,
      5: _sfc_main$3
    };
    return (_ctx, _push, _parent, _attrs) => {
      serverRenderer.exports.ssrRenderVNode(_push, vue_cjs_prod.createVNode(vue_cjs_prod.resolveDynamicComponent(templates[vue_cjs_prod.unref(path)]), _attrs, null), _parent);
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
//# sourceMappingURL=_path_.1b958c14.mjs.map
