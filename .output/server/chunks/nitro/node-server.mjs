globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, lazyEventHandler, useQuery, useCookie, createApp, createRouter } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase, kebabCase, pascalCase, camelCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import overlay from 'unstorage/drivers/overlay';
import memory$1 from 'unstorage/drivers/memory';
import { promises } from 'fs';
import { dirname, resolve, extname } from 'pathe';
import { fileURLToPath } from 'url';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import { createIPX, createIPXMiddleware } from 'ipx';
import defu from 'defu';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { all } from 'mdast-util-to-hast';
import { detab } from 'detab';
import { u } from 'unist-builder';
import { encode } from 'mdurl';
import { position } from 'unist-util-position';
import htmlTags from 'html-tags';
import slugify from 'slugify';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"content":{"base":"_content","tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"highlight":false,"wsUrl":"","documentDriven":{"page":true,"navigation":true,"surround":true,"globals":{},"layoutFallbacks":["theme"],"injectPage":true}}},"content":{"cacheVersion":2,"cacheIntegrity":"cN8Gkpfl2c","transformers":[],"base":"_content","watch":{"ws":{"port":4000,"showURL":false}},"sources":{"0":{"name":"template-introduce","prefix":"/introduce","driver":"fs","base":"/Users/meetqy/Desktop/wcao.cc/introduce"}},"ignores":["\\.","-"],"locales":[],"highlight":false,"markdown":{"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"remarkPlugins":{},"rehypePlugins":{}},"yaml":{},"csv":{},"navigation":{"fields":["layout"]},"documentDriven":true},"ipx":{"dir":"","domains":[],"sharp":{},"alias":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject$1(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject$1(obj[key])) {
      if (isObject$1(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {
  ['nitro:bundled:cache:content:content-index.json']: {
    import: () => import('../raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"100-bJfEIai+M6t+gvZE1IqWqKNLFzY\"","mtime":"2022-08-09T09:47:20.005Z"}
  },
  ['nitro:bundled:cache:content:content-navigation.json']: {
    import: () => import('../raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"161-HGbWHOM/W+Yh7WfWUofY2BD2LWY\"","mtime":"2022-08-09T09:47:20.005Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:1.md']: {
    import: () => import('../raw/1.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"35f-X70Lo3qPkZ2/WMINOwKsHyMtxbM\"","mtime":"2022-08-09T09:47:20.006Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:2.md']: {
    import: () => import('../raw/2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"32d-cv2VzPMVkHCnTL7yy0It2CR6KNk\"","mtime":"2022-08-09T09:47:20.006Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:3.md']: {
    import: () => import('../raw/3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"39c-b0YxsmFY2PcDC/9omGzOZcyi71s\"","mtime":"2022-08-09T09:47:20.005Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:4.md']: {
    import: () => import('../raw/4.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"358-Ku1YpgYyJt5Py203w+HY81I+cBU\"","mtime":"2022-08-09T09:47:20.006Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:5.md']: {
    import: () => import('../raw/5.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"368-aIrKdkLr01guJlkgIjimF9+10IM\"","mtime":"2022-08-09T09:47:20.006Z"}
  }
};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const bundledStorage = ["/cache/content"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memory$1(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      return decodeURI(parseURL(event.req.originalUrl || event.req.url).pathname).replace(/\/$/, "/index");
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: _error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"1083e-J2snuqghLA259qCCv1v4L7jIVx8\"",
    "mtime": "2022-08-09T09:47:04.859Z",
    "path": "../public/favicon.ico"
  },
  "/loading.svg": {
    "type": "image/svg+xml",
    "etag": "\"40b-5XbibGoHN4rtmxzANOiHvK53roY\"",
    "mtime": "2022-08-09T09:47:04.859Z",
    "path": "../public/loading.svg"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"abd7-DlzpDbMjvdL9zLsvCdBvwlw0vTg\"",
    "mtime": "2022-08-09T09:47:04.858Z",
    "path": "../public/logo.png"
  },
  "/_nuxt/1-bca80886.mjs": {
    "type": "application/javascript",
    "etag": "\"3f14-dIQcC+WQCL9mI7zBbSQ0jz1ZvyA\"",
    "mtime": "2022-08-09T09:47:04.856Z",
    "path": "../public/_nuxt/1-bca80886.mjs"
  },
  "/_nuxt/2-554b9abf.mjs": {
    "type": "application/javascript",
    "etag": "\"8b6-di2OQ+rJuIwYwZywwB968b9nejk\"",
    "mtime": "2022-08-09T09:47:04.855Z",
    "path": "../public/_nuxt/2-554b9abf.mjs"
  },
  "/_nuxt/3-6d9969fc.mjs": {
    "type": "application/javascript",
    "etag": "\"150f-t/LfVV1msJtQtX040mlUZEx4c7g\"",
    "mtime": "2022-08-09T09:47:04.854Z",
    "path": "../public/_nuxt/3-6d9969fc.mjs"
  },
  "/_nuxt/4-a4096042.mjs": {
    "type": "application/javascript",
    "etag": "\"1268-hhJh71CDm4fI5IdHcEwTR3P32KU\"",
    "mtime": "2022-08-09T09:47:04.854Z",
    "path": "../public/_nuxt/4-a4096042.mjs"
  },
  "/_nuxt/5-32044f6b.mjs": {
    "type": "application/javascript",
    "etag": "\"1d43-AlCU9dEAZfOc6IObdsUBO7+cfv4\"",
    "mtime": "2022-08-09T09:47:04.853Z",
    "path": "../public/_nuxt/5-32044f6b.mjs"
  },
  "/_nuxt/ContentDoc-f2b8fe66.mjs": {
    "type": "application/javascript",
    "etag": "\"549-yT7PVn1n/v56LmZrcJrInGzMbO8\"",
    "mtime": "2022-08-09T09:47:04.852Z",
    "path": "../public/_nuxt/ContentDoc-f2b8fe66.mjs"
  },
  "/_nuxt/ContentList-6a1df8a8.mjs": {
    "type": "application/javascript",
    "etag": "\"353-8Zo05PvW+zheQUl+BAkvCAt6Aks\"",
    "mtime": "2022-08-09T09:47:04.852Z",
    "path": "../public/_nuxt/ContentList-6a1df8a8.mjs"
  },
  "/_nuxt/ContentNavigation-71f94b7d.mjs": {
    "type": "application/javascript",
    "etag": "\"3c27-Z4A1ov44fC/YsHwtqJhJ13BYuOY\"",
    "mtime": "2022-08-09T09:47:04.851Z",
    "path": "../public/_nuxt/ContentNavigation-71f94b7d.mjs"
  },
  "/_nuxt/ContentNavigation.fb1c1af1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15cd-b0j/QEgs6fxBXM0xoJb4rxRmgA0\"",
    "mtime": "2022-08-09T09:47:04.851Z",
    "path": "../public/_nuxt/ContentNavigation.fb1c1af1.css"
  },
  "/_nuxt/ContentQuery-c578faa8.mjs": {
    "type": "application/javascript",
    "etag": "\"88b-XJU6/9Lg0sDWopG12mODaer01qM\"",
    "mtime": "2022-08-09T09:47:04.847Z",
    "path": "../public/_nuxt/ContentQuery-c578faa8.mjs"
  },
  "/_nuxt/Markdown-1597c22e.mjs": {
    "type": "application/javascript",
    "etag": "\"3c2-tZcg96ncmoV3x9w91bTp98ofmbw\"",
    "mtime": "2022-08-09T09:47:04.847Z",
    "path": "../public/_nuxt/Markdown-1597c22e.mjs"
  },
  "/_nuxt/ProseA-9e2eaa92.mjs": {
    "type": "application/javascript",
    "etag": "\"139-UJEd8j9jRdT2OvBOG4BRMOF9WXo\"",
    "mtime": "2022-08-09T09:47:04.846Z",
    "path": "../public/_nuxt/ProseA-9e2eaa92.mjs"
  },
  "/_nuxt/ProseBlockquote-793c74d3.mjs": {
    "type": "application/javascript",
    "etag": "\"c1-vDRlK+cwBomjwqWJBS1Cks+701I\"",
    "mtime": "2022-08-09T09:47:04.846Z",
    "path": "../public/_nuxt/ProseBlockquote-793c74d3.mjs"
  },
  "/_nuxt/ProseCode-e5167883.mjs": {
    "type": "application/javascript",
    "etag": "\"13e-HBnt5b5BgQvjrepPdiY3PW1uOm0\"",
    "mtime": "2022-08-09T09:47:04.845Z",
    "path": "../public/_nuxt/ProseCode-e5167883.mjs"
  },
  "/_nuxt/ProseCode.c12da1e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e-GbvrqT5j9gSWlpa8e36U/Kv6Zx0\"",
    "mtime": "2022-08-09T09:47:04.845Z",
    "path": "../public/_nuxt/ProseCode.c12da1e5.css"
  },
  "/_nuxt/ProseCodeInline-a2b31cbc.mjs": {
    "type": "application/javascript",
    "etag": "\"bb-TCRgSqNiQad9VRmY1CzuNnP+Nhc\"",
    "mtime": "2022-08-09T09:47:04.844Z",
    "path": "../public/_nuxt/ProseCodeInline-a2b31cbc.mjs"
  },
  "/_nuxt/ProseEm-75f88658.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-lyY4tTewvgfISuHg+VW7GN2Bguk\"",
    "mtime": "2022-08-09T09:47:04.843Z",
    "path": "../public/_nuxt/ProseEm-75f88658.mjs"
  },
  "/_nuxt/ProseH1-7c659acf.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-fsU3mmQslepLMz/xaJP52LpkrSI\"",
    "mtime": "2022-08-09T09:47:04.843Z",
    "path": "../public/_nuxt/ProseH1-7c659acf.mjs"
  },
  "/_nuxt/ProseH2-6da66db9.mjs": {
    "type": "application/javascript",
    "etag": "\"107-hOKb04u/0fLLqWl9y3iD3gdIsWw\"",
    "mtime": "2022-08-09T09:47:04.842Z",
    "path": "../public/_nuxt/ProseH2-6da66db9.mjs"
  },
  "/_nuxt/ProseH3-828f2f64.mjs": {
    "type": "application/javascript",
    "etag": "\"107-k/MA2rd9WadquWmGA4HBM1AmTaE\"",
    "mtime": "2022-08-09T09:47:04.841Z",
    "path": "../public/_nuxt/ProseH3-828f2f64.mjs"
  },
  "/_nuxt/ProseH4-484d7a82.mjs": {
    "type": "application/javascript",
    "etag": "\"107-PKBer/Hw65+T4uI/1ogazInkQa8\"",
    "mtime": "2022-08-09T09:47:04.841Z",
    "path": "../public/_nuxt/ProseH4-484d7a82.mjs"
  },
  "/_nuxt/ProseH5-5249caa2.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-ablZ0ugjdTVI4nbQEjAhXSQzvVA\"",
    "mtime": "2022-08-09T09:47:04.840Z",
    "path": "../public/_nuxt/ProseH5-5249caa2.mjs"
  },
  "/_nuxt/ProseH6-e77ac386.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-YLjFlQCyCg62dNfcQANt4ytr+SQ\"",
    "mtime": "2022-08-09T09:47:04.839Z",
    "path": "../public/_nuxt/ProseH6-e77ac386.mjs"
  },
  "/_nuxt/ProseHr-61d28663.mjs": {
    "type": "application/javascript",
    "etag": "\"95-NEBIC8n9hun+VlxElrUVZL8Ay94\"",
    "mtime": "2022-08-09T09:47:04.838Z",
    "path": "../public/_nuxt/ProseHr-61d28663.mjs"
  },
  "/_nuxt/ProseImg-ac1a4e17.mjs": {
    "type": "application/javascript",
    "etag": "\"18b-7pcB88QfFEDN+Jzu1r2vnwZg41c\"",
    "mtime": "2022-08-09T09:47:04.838Z",
    "path": "../public/_nuxt/ProseImg-ac1a4e17.mjs"
  },
  "/_nuxt/ProseLi-a33eeccf.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-gGCmRWfLmQZQiy1MLS+ENdAq61U\"",
    "mtime": "2022-08-09T09:47:04.837Z",
    "path": "../public/_nuxt/ProseLi-a33eeccf.mjs"
  },
  "/_nuxt/ProseOl-876db0c5.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-pjG54rmNFeshkCbsIxKizqkECwA\"",
    "mtime": "2022-08-09T09:47:04.836Z",
    "path": "../public/_nuxt/ProseOl-876db0c5.mjs"
  },
  "/_nuxt/ProseP-292cb289.mjs": {
    "type": "application/javascript",
    "etag": "\"b3-wqKnjnUpkvBogtNnRzgrPRc6dYI\"",
    "mtime": "2022-08-09T09:47:04.836Z",
    "path": "../public/_nuxt/ProseP-292cb289.mjs"
  },
  "/_nuxt/ProseStrong-3cc714ab.mjs": {
    "type": "application/javascript",
    "etag": "\"b8-ntiMvdIaQADI3R4zUHlfy1tba78\"",
    "mtime": "2022-08-09T09:47:04.835Z",
    "path": "../public/_nuxt/ProseStrong-3cc714ab.mjs"
  },
  "/_nuxt/ProseTable-c7840477.mjs": {
    "type": "application/javascript",
    "etag": "\"bc-tCax80H017YcpVuB+qGUwOvXjLY\"",
    "mtime": "2022-08-09T09:47:04.834Z",
    "path": "../public/_nuxt/ProseTable-c7840477.mjs"
  },
  "/_nuxt/ProseTbody-71710099.mjs": {
    "type": "application/javascript",
    "etag": "\"bc-E9hN6X82ku+6aCMP8qgxMKkCxtk\"",
    "mtime": "2022-08-09T09:47:04.834Z",
    "path": "../public/_nuxt/ProseTbody-71710099.mjs"
  },
  "/_nuxt/ProseTd-79627d1e.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-P517NOCd/OehsZ5EqZSdJKy4C9Y\"",
    "mtime": "2022-08-09T09:47:04.833Z",
    "path": "../public/_nuxt/ProseTd-79627d1e.mjs"
  },
  "/_nuxt/ProseTh-6aa81e10.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-q+l0mXJ9R7iUGNH0IdGT68v9Dqo\"",
    "mtime": "2022-08-09T09:47:04.832Z",
    "path": "../public/_nuxt/ProseTh-6aa81e10.mjs"
  },
  "/_nuxt/ProseThead-dedcf662.mjs": {
    "type": "application/javascript",
    "etag": "\"bc-+2hogSROXZDp+JWV5Xsj9LlEUmE\"",
    "mtime": "2022-08-09T09:47:04.832Z",
    "path": "../public/_nuxt/ProseThead-dedcf662.mjs"
  },
  "/_nuxt/ProseTr-7e722850.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-VqDhHrLwETpHhjoNKhfcdH37Vts\"",
    "mtime": "2022-08-09T09:47:04.831Z",
    "path": "../public/_nuxt/ProseTr-7e722850.mjs"
  },
  "/_nuxt/ProseUl-05cd91d1.mjs": {
    "type": "application/javascript",
    "etag": "\"b4-IXvU52H95Sqj856ygSglCHaAPCk\"",
    "mtime": "2022-08-09T09:47:04.830Z",
    "path": "../public/_nuxt/ProseUl-05cd91d1.mjs"
  },
  "/_nuxt/_id_-da369b7b.mjs": {
    "type": "application/javascript",
    "etag": "\"fb0-+F7tlt60a/+GxVikC3QycpZ9wYE\"",
    "mtime": "2022-08-09T09:47:04.829Z",
    "path": "../public/_nuxt/_id_-da369b7b.mjs"
  },
  "/_nuxt/_name_-bc9c4210.mjs": {
    "type": "application/javascript",
    "etag": "\"625-AlkvMXlLr9MAFX+36cHFlamNUKs\"",
    "mtime": "2022-08-09T09:47:04.829Z",
    "path": "../public/_nuxt/_name_-bc9c4210.mjs"
  },
  "/_nuxt/_path_-2ad80476.mjs": {
    "type": "application/javascript",
    "etag": "\"197-jHsAnsOS/t5iMH6cjdPWh8E1BWo\"",
    "mtime": "2022-08-09T09:47:04.828Z",
    "path": "../public/_nuxt/_path_-2ad80476.mjs"
  },
  "/_nuxt/asyncData-59ecad1e.mjs": {
    "type": "application/javascript",
    "etag": "\"86a-Uy0RZTuDTszP+exGOYcQS0bQhRQ\"",
    "mtime": "2022-08-09T09:47:04.827Z",
    "path": "../public/_nuxt/asyncData-59ecad1e.mjs"
  },
  "/_nuxt/dark-0ac7f3e2.mjs": {
    "type": "application/javascript",
    "etag": "\"271-V95Y6vilf9zZxxPSINQ6R/m4Gd0\"",
    "mtime": "2022-08-09T09:47:04.827Z",
    "path": "../public/_nuxt/dark-0ac7f3e2.mjs"
  },
  "/_nuxt/default-5982df88.mjs": {
    "type": "application/javascript",
    "etag": "\"b7e-fHY9kX3catXC1jDnbGyRHGXZ5m4\"",
    "mtime": "2022-08-09T09:47:04.826Z",
    "path": "../public/_nuxt/default-5982df88.mjs"
  },
  "/_nuxt/document-driven-99c5c1e3.mjs": {
    "type": "application/javascript",
    "etag": "\"250-ZohpqcoOEwNMn8HTUq0VhLN4qjE\"",
    "mtime": "2022-08-09T09:47:04.825Z",
    "path": "../public/_nuxt/document-driven-99c5c1e3.mjs"
  },
  "/_nuxt/entry-0effd9e2.mjs": {
    "type": "application/javascript",
    "etag": "\"72258-e2tmirmjxThdoZhcVFfKw88MEjE\"",
    "mtime": "2022-08-09T09:47:04.824Z",
    "path": "../public/_nuxt/entry-0effd9e2.mjs"
  },
  "/_nuxt/entry.6217ba83.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23bdb-fEngiKRCn13LzvWRMRTOw3Tbnu8\"",
    "mtime": "2022-08-09T09:47:04.823Z",
    "path": "../public/_nuxt/entry.6217ba83.css"
  },
  "/_nuxt/error-404-a300c153.mjs": {
    "type": "application/javascript",
    "etag": "\"821-f53xCorGrYx1KBU69vEWXFbtiuk\"",
    "mtime": "2022-08-09T09:47:04.822Z",
    "path": "../public/_nuxt/error-404-a300c153.mjs"
  },
  "/_nuxt/error-404.314f7075.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11bd-kF6SKfdJYaoPOx5XSNB4IuKqq6c\"",
    "mtime": "2022-08-09T09:47:04.821Z",
    "path": "../public/_nuxt/error-404.314f7075.css"
  },
  "/_nuxt/error-500-b34cce75.mjs": {
    "type": "application/javascript",
    "etag": "\"6ca-tmRilWUk6MX4eafgCPz+vuz27B0\"",
    "mtime": "2022-08-09T09:47:04.821Z",
    "path": "../public/_nuxt/error-500-b34cce75.mjs"
  },
  "/_nuxt/error-500.4e3461e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af4-ckENJljqPJ6JYcymKbQpp8F2r1I\"",
    "mtime": "2022-08-09T09:47:04.820Z",
    "path": "../public/_nuxt/error-500.4e3461e5.css"
  },
  "/_nuxt/error-component-b03db1c0.mjs": {
    "type": "application/javascript",
    "etag": "\"425-CXOtW4MFx0v18mffb7A7TmVLGsw\"",
    "mtime": "2022-08-09T09:47:04.819Z",
    "path": "../public/_nuxt/error-component-b03db1c0.mjs"
  },
  "/_nuxt/footer-b543150a.mjs": {
    "type": "application/javascript",
    "etag": "\"92a-ouJ65ghZgzrQtIBRJBLGMCmR07c\"",
    "mtime": "2022-08-09T09:47:04.819Z",
    "path": "../public/_nuxt/footer-b543150a.mjs"
  },
  "/_nuxt/head-f671d1fa.mjs": {
    "type": "application/javascript",
    "etag": "\"375-hkHyDm0prYAj0UXC2ZQwoP2WDbo\"",
    "mtime": "2022-08-09T09:47:04.818Z",
    "path": "../public/_nuxt/head-f671d1fa.mjs"
  },
  "/_nuxt/index-b7f8f65d.mjs": {
    "type": "application/javascript",
    "etag": "\"2f7-tKlH9hvPp6zWl4TWOVFwRNEIr3k\"",
    "mtime": "2022-08-09T09:47:04.817Z",
    "path": "../public/_nuxt/index-b7f8f65d.mjs"
  },
  "/_nuxt/index-bcb6b50e.mjs": {
    "type": "application/javascript",
    "etag": "\"10e-FffOzlX+wdKo7SLwvWxPB4e9Yv4\"",
    "mtime": "2022-08-09T09:47:04.817Z",
    "path": "../public/_nuxt/index-bcb6b50e.mjs"
  },
  "/_nuxt/index-ee311efc.mjs": {
    "type": "application/javascript",
    "etag": "\"2a88-EhS6WoRIIHY8hKjhFpzUoPnw/r8\"",
    "mtime": "2022-08-09T09:47:04.816Z",
    "path": "../public/_nuxt/index-ee311efc.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"5677-/sWYVEr22FzXi++kWTwORfL1Bqk\"",
    "mtime": "2022-08-09T09:47:04.815Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/swiper-c6bc3fbb.mjs": {
    "type": "application/javascript",
    "etag": "\"15f6-OaZDOB3S9RaEFmOhQNxsGAlMWtw\"",
    "mtime": "2022-08-09T09:47:04.814Z",
    "path": "../public/_nuxt/swiper-c6bc3fbb.mjs"
  },
  "/_nuxt/swiper-slide-60886f4c.mjs": {
    "type": "application/javascript",
    "etag": "\"48ac-5dmZdXgwcqIRM1UOBRO7DvCiu68\"",
    "mtime": "2022-08-09T09:47:04.814Z",
    "path": "../public/_nuxt/swiper-slide-60886f4c.mjs"
  },
  "/_nuxt/template-a37b3662.mjs": {
    "type": "application/javascript",
    "etag": "\"fbd-+clyV6NeBat7V8tRCg1IObfQSAM\"",
    "mtime": "2022-08-09T09:47:04.813Z",
    "path": "../public/_nuxt/template-a37b3662.mjs"
  },
  "/_nuxt/template-ea22702c.mjs": {
    "type": "application/javascript",
    "etag": "\"d5d-/MiinZjyXzHwmBNGNOwj0KxgxRU\"",
    "mtime": "2022-08-09T09:47:04.812Z",
    "path": "../public/_nuxt/template-ea22702c.mjs"
  },
  "/_nuxt/web-socket-8d5d0d28.mjs": {
    "type": "application/javascript",
    "etag": "\"350-NAj7LIYmnNYOEEl1bIAUWyrZ1+c\"",
    "mtime": "2022-08-09T09:47:04.812Z",
    "path": "../public/_nuxt/web-socket-8d5d0d28.mjs"
  },
  "/_nuxt/welcome-8741f5fc.mjs": {
    "type": "application/javascript",
    "etag": "\"2ed6-GMMm+vzEHo6oKn9MY0RZwLimeVE\"",
    "mtime": "2022-08-09T09:47:04.810Z",
    "path": "../public/_nuxt/welcome-8741f5fc.mjs"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = ["/_nuxt"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _HN2OgK = lazyEventHandler(() => {
  const ipxOptions = {
    ...useRuntimeConfig().ipx || {},
    dir: fileURLToPath$1(new URL("../public", globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.req, event.res);
  });
});

const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => Array.isArray(value) ? value : value ? [value] : [];

const arrayParams = ["sort", "where", "only", "without"];
const createQuery = (fetcher, intitialParams) => {
  const queryParams = {
    ...intitialParams
  };
  for (const key of arrayParams) {
    if (queryParams[key]) {
      queryParams[key] = ensureArray(queryParams[key]);
    }
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const query = {
    params: () => queryParams,
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), q]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    find: () => fetcher(query),
    findOne: () => {
      queryParams.first = true;
      return fetcher(query);
    },
    findSurround: (surroundQuery, options) => {
      queryParams.surround = { query: surroundQuery, ...options };
      return fetcher(query);
    },
    locale: (_locale) => query.where({ _locale })
  };
  return query;
};

function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    $not: (item, condition) => !match(item, condition),
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    $type: (item, condition) => typeof item === String(condition),
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    $lt: (item, condition) => {
      return item < condition;
    },
    $lte: (item, condition) => {
      return item <= condition;
    },
    $gt: (item, condition) => {
      return item > condition;
    },
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}

function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before || 1;
    after = after || 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const pipelines = [
    (data, params) => data.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery))),
    (data, params) => ensureArray(params.sort).forEach((options) => sortList(data, options)),
    (data, params) => params.surround ? surround(data, params.surround) : data,
    (data, params) => params.skip ? data.slice(params.skip) : data,
    (data, params) => params.limit ? data.slice(0, params.limit) : data,
    (data, params) => apply(withoutKeys(params.without))(data),
    (data, params) => apply(withKeys(params.only))(data),
    (data, params) => params.first ? data[0] : data
  ];
  return async (query) => {
    const data = await getContentsList();
    return pipelines.reduce(($data, pipe) => pipe($data, query.params()) || $data, data);
  };
}

const defineTransformer = (transformer) => {
  return transformer;
};

const csv = defineTransformer({
  name: "csv",
  extensions: [".csv"],
  parse: async (_id, content, options = {}) => {
    const csvToJson = await import('csvtojson').then((m) => m.default || m);
    const parsed = await csvToJson({ output: "json", ...options }).fromString(content);
    return {
      _id,
      _type: "csv",
      body: parsed
    };
  }
});

function flattenNodeText(node) {
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

function emphasis(h, node) {
  return h(node, "em", node.attributes, all(h, node));
}

function parseThematicBlock(lang) {
  if (!lang) {
    return {
      language: void 0,
      highlights: void 0,
      fileName: void 0
    };
  }
  const language = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokens = lang.match(/{([^}]+)}/);
  const filenameTokens = lang.match(/\[(.+)\]/);
  return {
    language: language ? language[0] : void 0,
    highlights: parseHighlightedLines(highlightTokens && highlightTokens[1]),
    filename: Array.isArray(filenameTokens) ? filenameTokens[1] : void 0
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}
function wrap(nodes, loose = false) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push(u("text", "\n"));
  }
  while (++index < nodes.length) {
    if (index) {
      result.push(u("text", "\n"));
    }
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push(u("text", "\n"));
  }
  return result;
}

const code = (h, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename } = parseThematicBlock(lang);
  const code = node.value ? detab(node.value + "\n") : "";
  return h(
    node.position,
    "code",
    {
      language,
      filename,
      highlights,
      code
    },
    [h(node, "pre", {}, [h(node, "code", { __ignoreMap: "" }, [u("text", code)])])]
  );
};

function html(h, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (tagName === "code") {
    node.value = node.value.replace(tagName, "code-inline");
  }
  return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
}

function heading(h, node) {
  return h(node, "h" + node.depth, all(h, node));
}

function link(h, node) {
  const props = {
    ...node.attributes || {},
    href: encode(node.url)
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "a", props, all(h, node));
}

function list(h, node) {
  const props = {};
  const name = `${node.ordered ? "ol" : "ul"}`;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    props.className = ["contains-task-list"];
  }
  return h(node, name, props, wrap(all(h, node), true));
}

function listItem(h, node, parent) {
  const result = all(h, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  let wrapped = [];
  let index;
  let child;
  if (typeof node.checked === "boolean") {
    result.unshift(
      h({}, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props.className = ["task-list-item"];
  }
  const length = result.length;
  index = -1;
  while (++index < length) {
    child = result[index];
    if (child.tagName === "p" && !loose) {
      wrapped = wrapped.concat(child.children || []);
    } else {
      wrapped.push(child);
    }
  }
  return h(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  const length = children.length;
  let index = -1;
  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  const children = node.children || [];
  return spread === void 0 || spread === null ? children.length > 1 : spread;
}

function table(h, node) {
  const rows = node.children;
  const align = node.align || [];
  const result = rows.map((row, index) => {
    const childres = row.children;
    const name = index === 0 ? "th" : "td";
    let pos = node.align ? align.length : childres.length;
    const out = [];
    while (pos--) {
      const cell = childres[pos];
      out[pos] = h(cell, name, { align: align[pos] }, cell ? all(h, cell) : []);
    }
    return h(row, "tr", wrap(out, true));
  });
  const body = result[1] && h(
    {
      start: position(result[1]).start,
      end: position(result[result.length - 1]).end
    },
    "tbody",
    wrap(result.slice(1), true)
  );
  return h(node, "table", wrap([h(result[0].position, "thead", wrap([result[0]], true))].concat(body || []), true));
}

function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return all(h, node);
    }
  }
  return h(node, "p", all(h, node));
}

function image(h, node) {
  const props = {
    ...node.attributes,
    src: encode(node.url),
    alt: node.alt
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "img", props);
}

function blockquote(h, node) {
  return h(node, "blockquote", wrap(all(h, node), true));
}

function strong(h, node) {
  return h(node, "strong", node.attributes, all(h, node));
}

function inlineCode(h, node) {
  return h(node, "code-inline", node.attributes, [
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
}

function thematicBreak(h, node) {
  return h(node, "hr");
}

function containerComponent(h, node) {
  const hast = h(node, node.tagName, node.attributes, all(h, node));
  hast.attributes = node.attributes;
  hast.fmAttributes = node.fmAttributes;
  return hast;
}

const handlers$1 = {
  emphasis,
  code,
  paragraph,
  html,
  link,
  list,
  listItem,
  heading,
  table,
  image,
  blockquote,
  strong,
  inlineCode,
  thematicBreak,
  containerComponent
};

function compiler(_options) {
  function parseAsJSON(node) {
    if (Array.isArray(node)) {
      return node.map(parseAsJSON).filter(Boolean);
    }
    if (node.type === "element") {
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children.flatMap((child) => {
          if (child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {}
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      return {
        type: "element",
        tag: node.tagName,
        props: node.properties,
        children: parseAsJSON(node.children || [])
      };
    }
    if (node.type === "text") {
      if (node.value === "\n") {
        return null;
      }
      return {
        type: "text",
        value: node.value
      };
    }
    if (node.type === "comment") {
      return null;
    }
    node.children = parseAsJSON(node.children || []);
    return node;
  }
  this.Compiler = function(root) {
    return {
      type: "root",
      children: parseAsJSON(root.children || [])
    };
  };
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || typeof vnode.children === "string";
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value;
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).join("");
  }
  return "";
}

const usePlugins = (plugins, stream) => {
  for (const plugin of Object.values(plugins)) {
    if (plugin) {
      const { instance, ...options } = plugin;
      stream.use(instance, options);
    }
  }
};
function generateBody(content, options) {
  const rehypeOptions = {
    handlers: handlers$1,
    allowDangerousHtml: true
  };
  return new Promise((resolve, reject) => {
    const stream = unified().use(remarkParse);
    if (options.mdc) {
      stream.use(remarkMDC);
    }
    usePlugins(options.remarkPlugins, stream);
    stream.use(remark2rehype, rehypeOptions);
    usePlugins(options.rehypePlugins, stream);
    stream.use(compiler, options);
    stream.process(
      {
        value: content,
        data: options.data
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        Object.assign(options.data, file?.data || {});
        resolve(file?.result);
      }
    );
  });
}
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type !== "text" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

const useDefaultOptions = () => ({
  mdc: true,
  toc: {
    depth: 2,
    searchDepth: 2
  },
  tags: {},
  remarkPlugins: {
    "remark-emoji": {
      instance: remarkEmoji
    },
    "remark-squeeze-paragraphs": {
      instance: remarkSqueezeParagraphs
    },
    "remark-gfm": {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    "rehype-slug": {
      instance: rehypeSlug
    },
    "rehype-external-links": {
      instance: rehypeExternalLinks
    },
    "rehype-sort-attribute-values": {
      instance: rehypeSortAttributeValues
    },
    "rehype-sort-attributes": {
      instance: rehypeSortAttributes
    },
    "rehype-raw": {
      instance: rehypeRaw,
      passThrough: ["element"]
    }
  }
});
async function parse(file, userOptions = {}) {
  const options = defu(userOptions, useDefaultOptions());
  const { content, data } = await parseFrontMatter(file);
  const body = await generateBody(content, { ...options, data });
  let toc;
  if (data.toc !== false) {
    const tocOption = defu(data.toc || {}, options.toc);
    toc = generateToc(body, tocOption);
  }
  const excerptString = useExcerpt(content);
  const excerpt = excerptString ? await generateBody(excerptString, { ...options, data }) : void 0;
  const heading = contentHeading(body);
  return {
    body: {
      ...body,
      toc
    },
    meta: {
      _empty: content.trim().length === 0,
      title: heading.title,
      description: heading.description,
      excerpt,
      ...data
    }
  };
}
function useExcerpt(content, delimiter = /<!--\s*?more\s*?-->/i) {
  if (!delimiter) {
    return "";
  }
  let idx = -1;
  const match = delimiter.exec(content);
  if (match) {
    idx = match.index;
  }
  if (idx !== -1) {
    return content.slice(0, idx);
  }
  return content;
}

const markdown = defineTransformer({
  name: "markdown",
  extensions: [".md"],
  parse: async (_id, content, options = {}) => {
    const config = { ...options };
    config.rehypePlugins = await importPlugins(config.rehypePlugins);
    config.remarkPlugins = await importPlugins(config.remarkPlugins);
    const parsed = await parse(content, config);
    return {
      ...parsed.meta,
      body: parsed.body,
      _type: "markdown",
      _id
    };
  }
});
async function importPlugins(plugins = {}) {
  const resolvedPlugins = {};
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: await import(name).then((m) => m.default || m),
        ...plugin
      };
    } else {
      resolvedPlugins[name] = false;
    }
  }
  return resolvedPlugins;
}

const yaml = defineTransformer({
  name: "Yaml",
  extensions: [".yml", ".yaml"],
  parse: async (_id, content) => {
    const { data } = await parseFrontMatter(`---
${content}
---`);
    let parsed = data;
    if (Array.isArray(data)) {
      console.warn(`YAML array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = { body: data };
    }
    return {
      ...parsed,
      _id,
      _type: "yaml"
    };
  }
});

const SEMVER_REGEX = /^(\d+)(\.\d+)*(\.x)?$/;
const describeId = (_id) => {
  const [_source, ...parts] = _id.split(":");
  const [, filename, _extension] = parts[parts.length - 1].match(/(.*)\.([^.]+)$/);
  parts[parts.length - 1] = filename;
  const _path = parts.join("/");
  return {
    _source,
    _path,
    _extension,
    _file: _extension ? `${_path}.${_extension}` : _path
  };
};
const pathMeta = defineTransformer({
  name: "path-meta",
  extensions: [".*"],
  transform(content, options = {}) {
    const { locales = [], defaultLocale = "en" } = options;
    const { _source, _file, _path, _extension } = describeId(content._id);
    const parts = _path.split("/");
    const _locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
    const filePath = parts.join("/");
    return {
      _path: generatePath(filePath),
      _draft: isDraft(filePath),
      _partial: isPartial(filePath),
      _locale,
      ...content,
      title: content.title || generateTitle(refineUrlPart(parts[parts.length - 1])),
      _source,
      _file,
      _extension
    };
  }
});
const isDraft = (path) => !!path.match(/\.draft(\/|\.|$)/);
const isPartial = (path) => path.split(/[:/]/).some((part) => part.match(/^_.*/));
const generatePath = (path) => withLeadingSlash(withoutTrailingSlash(path.split("/").map((part) => slugify(refineUrlPart(part), { lower: true })).join("/")));
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function refineUrlPart(name) {
  name = name.split(/[/:]/).pop();
  if (SEMVER_REGEX.test(name)) {
    return name;
  }
  return name.replace(/(\d+\.)?(.*)/, "$2").replace(/^index(\.draft)?$/, "").replace(/\.draft$/, "");
}

const json = defineTransformer({
  name: "Json",
  extensions: [".json", ".json5"],
  parse: async (_id, content) => {
    let parsed;
    if (typeof content === "string") {
      if (_id.endsWith("json5")) {
        parsed = (await import('json5').then((m) => m.default || m)).parse(content);
      } else if (_id.endsWith("json")) {
        parsed = destr(content);
      }
    }
    if (Array.isArray(parsed)) {
      console.warn(`JSON array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = {
        body: parsed
      };
    }
    return {
      ...parsed,
      _id,
      _type: "json"
    };
  }
});

const TRANSFORMERS = [
  csv,
  markdown,
  json,
  yaml,
  pathMeta
];
function getParser(ext, additionalTransformers = []) {
  let parser = additionalTransformers.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  if (!parser) {
    parser = TRANSFORMERS.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  }
  return parser;
}
function getTransformers(ext, additionalTransformers = []) {
  return [
    ...additionalTransformers.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform),
    ...TRANSFORMERS.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform)
  ];
}
async function transformContent(id, content, options = {}) {
  const { transformers = [] } = options;
  const file = { _id: id, body: content };
  const ext = extname(id);
  const parser = getParser(ext, transformers);
  if (!parser) {
    console.warn(`${ext} files are not supported, "${id}" falling back to raw content`);
    return file;
  }
  const parserOptions = options[camelCase(parser.name)] || {};
  const parsed = await parser.parse(file._id, file.body, parserOptions);
  const matchedTransformers = getTransformers(ext, transformers);
  const result = await matchedTransformers.reduce(async (prev, cur) => {
    const next = await prev || parsed;
    const transformOptions = options[camelCase(cur.name)] || {};
    return cur.transform(next, transformOptions);
  }, Promise.resolve(parsed));
  return result;
}

const isPreview = (event) => {
  const previewToken = useQuery(event).previewToken || useCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = useQuery(event).previewToken || useCookie(event, "previewToken");
  return { key };
};

async function getContentIndex(event) {
  let contentIndex = await cacheStorage.getItem("content-index.json");
  if (!contentIndex) {
    const data = await serverQueryContent(event).find();
    contentIndex = data.reduce((acc, item) => {
      if (!acc[item._path]) {
        acc[item._path] = item._id;
      } else if (item._id.startsWith("content:")) {
        acc[item._path] = item._id;
      }
      return acc;
    }, {});
    await cacheStorage.setItem("content-index.json", contentIndex);
  }
  return contentIndex;
}
async function getIndexedContentsList(event, query) {
  const params = query.params();
  const path = params?.where?.find((wh) => wh._path)?._path;
  if (!isPreview(event) && (typeof path === "string" || path instanceof RegExp)) {
    const index = await getContentIndex(event);
    const keys = Object.keys(index).filter((key) => path.test ? path.test(key) : key === String(path)).map((key) => index[key]);
    const contents = await Promise.all(keys.map((key) => getContent(event, key)));
    return contents;
  }
  return getContentsList(event);
}

const transformers = [];

const sourceStorage = prefixStorage(useStorage(), "content:source");
const cacheStorage = prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const contentIgnores = contentConfig.ignores.map(
  (p) => typeof p === "string" ? new RegExp(`^${p}|:${p}`) : p
);
const invalidKeyCharacters = `'"?#/`.split("");
const contentIgnorePredicate = (key) => {
  if (key.startsWith("preview:") || contentIgnores.some((prefix) => prefix.test(key))) {
    return false;
  }
  if (invalidKeyCharacters.some((ik) => key.includes(ik))) {
    console.warn(`Ignoring [${key}]. File name should not contain any of the following characters: ${invalidKeyCharacters.join(", ")}`);
    return false;
  }
  return true;
};
const getContentsIds = async (event, prefix) => {
  let keys = [];
  {
    keys = await cacheParsedStorage.getKeys(prefix);
  }
  if (keys.length === 0) {
    keys = await sourceStorage.getKeys(prefix);
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewPrefix = `preview:${key}:${prefix || ""}`;
    const previewKeys = await sourceStorage.getKeys(previewPrefix);
    if (previewKeys.length) {
      const keysSet = new Set(keys);
      await Promise.all(
        previewKeys.map(async (key2) => {
          const meta = await sourceStorage.getMeta(key2);
          if (meta?.__deleted) {
            keysSet.delete(key2.substring(previewPrefix.length));
          } else {
            keysSet.add(key2.substring(previewPrefix.length));
          }
        })
      );
      keys = Array.from(keysSet);
    }
  }
  return keys.filter(contentIgnorePredicate);
};
const getContentsList = async (event, prefix) => {
  const keys = await getContentsIds(event, prefix);
  const contents = await Promise.all(keys.map((key) => getContent(event, key)));
  return contents;
};
const getContent = async (event, id) => {
  const contentId = id;
  if (!contentIgnorePredicate(id)) {
    return { _id: contentId, body: null };
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewId = `preview:${key}:${id}`;
    const draft = await sourceStorage.getItem(previewId);
    if (draft) {
      id = previewId;
    }
  }
  const cached = await cacheParsedStorage.getItem(id);
  if (cached) {
    return cached.parsed;
  }
  const meta = await sourceStorage.getMeta(id);
  const hash$1 = hash({
    meta,
    version: contentConfig.cacheVersion,
    integrity: contentConfig.cacheIntegrity
  });
  if (cached?.hash === hash$1) {
    return cached.parsed;
  }
  const body = await sourceStorage.getItem(id);
  if (body === null) {
    return { _id: contentId, body: null };
  }
  const parsed = await parseContent(contentId, body);
  await cacheParsedStorage.setItem(id, { parsed, hash: hash$1 }).catch(() => {
  });
  return parsed;
};
async function parseContent(id, content, opts = {}) {
  const nitroApp = useNitroApp();
  const options = defu(
    opts,
    {
      markdown: contentConfig.markdown,
      csv: contentConfig.csv,
      yaml: contentConfig.yaml,
      highlight: contentConfig.highlight,
      transformers: transformers,
      pathMeta: {
        defaultLocale: contentConfig.defaultLocale,
        locales: contentConfig.locales
      }
    }
  );
  const file = { _id: id, body: content };
  await nitroApp.hooks.callHook("content:file:beforeParse", file);
  const result = await transformContent(id, file.body, options);
  await nitroApp.hooks.callHook("content:file:afterParse", result);
  return result;
}
const createServerQueryFetch = (event, path) => (query) => {
  if (path) {
    if (query.params().first) {
      query.where({ _path: withoutTrailingSlash(path) });
    } else {
      query.where({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
    }
  }
  if (!query.params().sort?.length) {
    query.sort({ _file: 1, $numeric: true });
  }
  return createPipelineFetcher(() => getIndexedContentsList(event, query))(query);
};
function serverQueryContent(event, path, ...pathParts) {
  if (typeof path === "string") {
    path = withLeadingSlash(joinURL(path, ...pathParts));
    return createQuery(createServerQueryFetch(event, path));
  }
  return createQuery(createServerQueryFetch(event), path || {});
}

function jsonParse(value) {
  return JSON.parse(value, regExpReviver);
}
function regExpReviver(_key, value) {
  const withOperator = typeof value === "string" && value.match(/^--([A-Z]+) (.+)$/) || [];
  if (withOperator[1] === "REGEX") {
    const regex = withOperator[2].match(/\/(.*)\/([dgimsuy]*)$/);
    return regex ? new RegExp(regex[1], regex[2] || "") : value;
  }
  return value;
}

const parseQueryParams = (body) => {
  try {
    return jsonParse(body);
  } catch (e) {
    throw createError({ statusCode: 400, message: "Invalid _params query" });
  }
};
const memory = {};
const getContentQuery = (event) => {
  const { qid } = event.context.params;
  const query = useQuery(event) || {};
  if (qid && query._params) {
    memory[qid] = parseQueryParams(query._params);
    return memory[qid];
  }
  if (memory[qid]) {
    return memory[qid];
  }
  if (query._params) {
    return parseQueryParams(query._params);
  }
  if (typeof query.only === "string" && query.only.includes(",")) {
    query.only = query.only.split(",").map((s) => s.trim());
  }
  if (typeof query.without === "string" && query.without.includes(",")) {
    query.without = query.without.split(",").map((s) => s.trim());
  }
  const where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      where[key] = query[key] === "true";
      delete query[key];
    }
  }
  if (Object.keys(where).length > 0) {
    query.where = [where];
  } else {
    delete query.where;
  }
  if (query.sort) {
    query.sort = query.sort.split(",").map((s) => {
      const [key, order] = s.split(":");
      return [key, +order];
    });
  }
  const reservedKeys = ["partial", "draft", "only", "without", "where", "sort", "limit", "skip"];
  for (const key of Object.keys(query)) {
    if (reservedKeys.includes(key)) {
      continue;
    }
    query.where[key] = query[key];
  }
  return query;
};

const _A46gpF = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  const contents = await serverQueryContent(event, query).find();
  if (query.first && Array.isArray(contents) && contents.length === 0) {
    throw createError({
      statusMessage: "Document not found!",
      statusCode: 404,
      data: {
        description: "Could not find document for the given query.",
        query
      }
    });
  }
  return contents;
});

const _EPEybF = defineEventHandler(async (event) => {
  const now = Date.now();
  await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch("/api/_content/navigation");
  await cacheStorage.setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now
  };
});

function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().content;
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content?.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof dirConfig?.navigation !== "undefined" && !dirConfig?.navigation) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof conf?.navigation !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if (item.children.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const _yscDg2 = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage.getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    _partial: false,
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await serverQueryContent(event).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = dirConfigs.reduce((configs2, conf) => {
    if (conf.title.toLowerCase() === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents, configs);
});

const _lazy_UxLDB3 = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_UxLDB3, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _HN2OgK, lazy: false, middleware: false, method: undefined },
  { route: '/api/_content/query/:qid', handler: _A46gpF, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _A46gpF, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache', handler: _EPEybF, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _yscDg2, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _yscDg2, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_UxLDB3, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
