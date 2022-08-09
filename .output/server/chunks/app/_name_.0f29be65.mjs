import { u as useRoute, v as vLazy, t as useAsset, r as getContentByTag, j as __nuxt_component_0$2 } from './server.mjs';
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
  __name: "[name]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { params } = route;
    const { name } = params;
    const { data: list } = useAsyncData(`tag/${name}`, () => getContentByTag(name), "$xNx0cDrC53");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(`<main${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "lg:p-12 p-4 min-h-screen" }, _attrs))}><h1 class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(name))}</h1><div class="2xl:columns-3 lg:columns-2 lg:gap-8 columns-1 gap-2 mt-8"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(list), (item) => {
        _push(`<div class="mb-8 w-full overflow-hidden">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: item._path
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "object-cover bg-base-200/20 border border-base-300 object-top w-full h-full rounded-box cursor-zoom-in" }, serverRenderer.exports.ssrGetDirectiveProps(
                _ctx,
                _directive_lazy,
                vue_cjs_prod.unref(vLazy)(
                  vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                    format: "webp",
                    w: 960
                  })
                )
              )))}${_scopeId}>`);
            } else {
              return [
                vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", { class: "object-cover bg-base-200/20 border border-base-300 object-top w-full h-full rounded-box cursor-zoom-in" }, null, 512), [
                  [
                    _directive_lazy,
                    vue_cjs_prod.unref(vLazy)(
                      vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                        format: "webp",
                        w: 960
                      })
                    )
                  ]
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="px-2"><h3 class="text-lg mt-4 mb-2 font-medium capitalize">${serverRenderer.exports.ssrInterpolate(item.title)}</h3><p><!--[-->`);
        serverRenderer.exports.ssrRenderList(item.tags, (tag) => {
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            key: tag,
            to: `/tag/${tag}`,
            class: "btn btn-xs mr-2 font-normal btn-primary"
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(tag)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></p></div></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-between items-center lg:mt-24 mt-12"><div class="flex-1 border-t border-dotted border-base-content/20"></div><span class="px-12 text-base-content/50 font-medium font-sans"> end </span><div class="flex-1 border-t border-dotted border-base-content/20"></div></div></main>`);
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
//# sourceMappingURL=_name_.0f29be65.mjs.map
