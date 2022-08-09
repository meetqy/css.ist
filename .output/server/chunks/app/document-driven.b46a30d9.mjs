import { f as useContent, l as useRequestEvent, a as useContentHead, m as __nuxt_component_0$1, _ as _sfc_main$c, n as _sfc_main$b, o as _sfc_main$a } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "document-driven",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useContent();
    if (!page.value && true) {
      const event = useRequestEvent();
      event.res.statusCode = 404;
    }
    useContentHead(page);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_ContentRenderer = _sfc_main$c;
      const _component_DocumentDrivenEmpty = _sfc_main$b;
      const _component_DocumentDrivenNotFound = _sfc_main$a;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "document-driven-page" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, {
        name: ((_a = vue_cjs_prod.unref(page)) == null ? void 0 : _a.layout) || "default"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vue_cjs_prod.unref(page)) {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_ContentRenderer, {
                key: vue_cjs_prod.unref(page)._id,
                value: vue_cjs_prod.unref(page)
              }, {
                empty: vue_cjs_prod.withCtx(({ value }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer.exports.ssrRenderComponent(_component_DocumentDrivenEmpty, { value }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vue_cjs_prod.createVNode(_component_DocumentDrivenEmpty, { value }, null, 8, ["value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_DocumentDrivenNotFound, null, null, _parent2, _scopeId));
            }
          } else {
            return [
              vue_cjs_prod.unref(page) ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_ContentRenderer, {
                key: vue_cjs_prod.unref(page)._id,
                value: vue_cjs_prod.unref(page)
              }, {
                empty: vue_cjs_prod.withCtx(({ value }) => [
                  vue_cjs_prod.createVNode(_component_DocumentDrivenEmpty, { value }, null, 8, ["value"])
                ]),
                _: 1
              }, 8, ["value"])) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_DocumentDrivenNotFound, { key: 1 }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/pages/document-driven.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=document-driven.b46a30d9.mjs.map
