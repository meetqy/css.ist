import _sfc_main$2 from './ContentRenderer.d4e1a678.mjs';
import { _ as _sfc_main$1 } from './ContentQuery.cd208b61.mjs';
import { u as useRoute, a as useHead } from './server.mjs';
import { v as vue_cjs_prod } from '../handlers/renderer.mjs';
import './ContentRendererMarkdown.b8673984.mjs';
import 'html-tags';
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
import 'slugify';
import 'unenv/runtime/mock/proxy';
import 'stream';

const useContentHead = (_content, to = useRoute()) => {
  const content = vue_cjs_prod.unref(_content);
  const refreshHead = (data = content) => {
    if (!to.path || !data) {
      return;
    }
    const head = Object.assign({}, (data == null ? void 0 : data.head) || {});
    head.title = head.title || (data == null ? void 0 : data.title);
    head.meta = [...head.meta || []];
    const description = (head == null ? void 0 : head.description) || (data == null ? void 0 : data.description);
    if (description && head.meta.filter((m) => m.name === "description").length === 0) {
      head.meta.push({
        name: "description",
        content: description
      });
    }
    const image = (head == null ? void 0 : head.image) || (data == null ? void 0 : data.image);
    if (image && head.meta.filter((m) => m.property === "og:image").length === 0) {
      if (typeof image === "string") {
        head.meta.push({
          property: "og:image",
          content: head.image
        });
      }
      if (typeof image === "object") {
        const imageKeys = [
          "src",
          "secure_url",
          "type",
          "width",
          "height",
          "alt"
        ];
        for (const key of imageKeys) {
          if (key === "src" && image.src) {
            head.meta.push({
              property: "og:image",
              content: image[key]
            });
          } else if (image[key]) {
            head.meta.push({
              property: `og:${key}`,
              content: image[key]
            });
          }
        }
      }
    }
    {
      useHead(head);
    }
  };
  vue_cjs_prod.watch(() => vue_cjs_prod.unref(_content), refreshHead, { immediate: true });
};
const _sfc_main = vue_cjs_prod.defineComponent({
  name: "ContentDoc",
  props: {
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    excerpt: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      required: false,
      default: () => useRoute().path
    },
    query: {
      type: Object,
      required: false,
      default: void 0
    },
    head: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  render(ctx) {
    const slots = vue_cjs_prod.useSlots();
    const { tag, excerpt, path, query, head } = ctx;
    const contentQueryProps = Object.assign(query || {}, { path, find: "one" });
    const emptyNode = (slot, data) => vue_cjs_prod.h("pre", null, JSON.stringify({ message: "You should use slots with <ContentDoc>", slot, data }, null, 2));
    return vue_cjs_prod.h(_sfc_main$1, contentQueryProps, {
      default: (slots == null ? void 0 : slots.default) ? ({ data, refresh, isPartial }) => {
        var _a;
        if (head) {
          useContentHead(data);
        }
        return (_a = slots.default) == null ? void 0 : _a.call(slots, { doc: data, refresh, isPartial, excerpt, ...this.$attrs });
      } : ({ data }) => {
        if (head) {
          useContentHead(data);
        }
        return vue_cjs_prod.h(_sfc_main$2, { value: data, excerpt, tag, ...this.$attrs }, { empty: (bindings) => (slots == null ? void 0 : slots.empty) ? slots.empty(bindings) : emptyNode("default", data) });
      },
      empty: (bindings) => {
        var _a;
        return ((_a = slots == null ? void 0 : slots.empty) == null ? void 0 : _a.call(slots, bindings)) || vue_cjs_prod.h("p", null, "Document is empty, overwrite this content with #empty slot in <ContentDoc>.");
      },
      "not-found": (bindings) => {
        var _a;
        return ((_a = slots == null ? void 0 : slots["not-found"]) == null ? void 0 : _a.call(slots, bindings)) || vue_cjs_prod.h("p", null, "Document not found, overwrite this content with #not-found slot in <ContentDoc>.");
      }
    });
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentDoc.9a2c3096.mjs.map
