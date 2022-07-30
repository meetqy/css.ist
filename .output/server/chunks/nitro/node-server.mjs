globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, useQuery, useCookie, createApp, createRouter, lazyEventHandler } from 'h3';
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

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"content":{"base":"_content","tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"highlight":false,"wsUrl":"","documentDriven":{"page":true,"navigation":true,"surround":true,"globals":{},"layoutFallbacks":["theme"],"injectPage":true}}},"content":{"cacheVersion":2,"cacheIntegrity":"cN8Gkpfl2c","transformers":[],"base":"_content","watch":{"ws":{"port":4000,"showURL":false}},"sources":{"0":{"name":"template-introduce","prefix":"/introduce","driver":"fs","base":"/Users/meetqy/Desktop/wcao.cc/introduce"}},"ignores":["\\.","-"],"locales":[],"highlight":false,"markdown":{"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"remarkPlugins":{},"rehypePlugins":{}},"yaml":{},"csv":{},"navigation":{"fields":["layout"]},"documentDriven":true}};
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
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:1.md']: {
    import: () => import('../raw/1.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3e0-qWsofxNT+MimeMhes+gpWserFwc\"","mtime":"2022-07-30T13:25:15.259Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:10.md']: {
    import: () => import('../raw/10.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"37a-uSXUJTTY3Xe/OGdifxoLO1MCoAo\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:11.md']: {
    import: () => import('../raw/11.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3b3-nrFmczOZlasbhOjcvcwEDy7YC50\"","mtime":"2022-07-30T13:25:15.259Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:12.md']: {
    import: () => import('../raw/12.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"320-4MekAiNMrSXOkEGU3cRyGNx9nQg\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:13.md']: {
    import: () => import('../raw/13.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"374-tskuQji971jOHB3YpUOP+B0fb98\"","mtime":"2022-07-30T13:25:15.259Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:14.md']: {
    import: () => import('../raw/14.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"305-pwpSI/f5kfLFDD3FBQNTi0afhko\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:15.md']: {
    import: () => import('../raw/15.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"388-+NAQ+OjIa1WPphp7hqefr2qfifY\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:16.md']: {
    import: () => import('../raw/16.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"346-pC9nggzgyuEtyJcSxR5cCOjKxeM\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:17.md']: {
    import: () => import('../raw/17.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"346-Y0iyunaOZYoMDdw/lCN52FZMzzM\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:18.md']: {
    import: () => import('../raw/18.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36d-uKpBP8hclpDbDdD721QZfj0e8ww\"","mtime":"2022-07-30T13:25:15.259Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:19.md']: {
    import: () => import('../raw/19.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3b1-JFD591Jit6ATAfax+J7lzJ4kc0M\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:2.md']: {
    import: () => import('../raw/2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3ad-Z5isyc6Xgi+Am6G6dSm/in2vAq8\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:20.md']: {
    import: () => import('../raw/20.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"37b-eg+E0YSefG5sOhHOG0OkdZ0gMVQ\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:21.md']: {
    import: () => import('../raw/21.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"370-vjdU3n9SPT/ZlFb3js7GcSp+8D4\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:22.md']: {
    import: () => import('../raw/22.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36a-FpmZ+QJk3Ns8zq0qcfl+AMwMba8\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:23.md']: {
    import: () => import('../raw/23.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"373-1lhp82Rogm55qekvKyXIZ63OR2o\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:24.md']: {
    import: () => import('../raw/24.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"374-D56WAgeEHzXMnUHyJ1Ij1bze0/w\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:25.md']: {
    import: () => import('../raw/25.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"37b-F3wLGJA3Sp9cP5MFGzz2mOS6Yu8\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:26.md']: {
    import: () => import('../raw/26.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"374-GQGnDzaRko8b13ZScnJiioRFSVg\"","mtime":"2022-07-30T13:25:15.259Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:27.md']: {
    import: () => import('../raw/27.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36d-fLr8uuhlQ0QpiFRaPbAoHGqcJHw\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:28.md']: {
    import: () => import('../raw/28.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36d-7oFNKpUiIP9VrNdRDwul0Fn0fQE\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:3.md']: {
    import: () => import('../raw/3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3be-Fsg8aT7ZIaXnYujmPDMg8X+TI18\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:4.md']: {
    import: () => import('../raw/4.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36a-+LNpMRfcgwNJNh9A+U3srET6zNE\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:5.md']: {
    import: () => import('../raw/5.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36b-LF1nuQkPlZxwKtpg77+k9oZQUs4\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:6.md']: {
    import: () => import('../raw/6.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"36a-AuGpu8CyzWYpQ4QcUeDj2iLRol4\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:7.md']: {
    import: () => import('../raw/7.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"37a-/yF7xhHi+eKnMS/njSCU/xdHFr4\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:8.md']: {
    import: () => import('../raw/8.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"375-Uk6HoDfofKROSDvt0VEwjVz1fQA\"","mtime":"2022-07-30T13:25:15.260Z"}
  },
  ['nitro:bundled:cache:content:parsed:template-introduce:introduce:9.md']: {
    import: () => import('../raw/9.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"349-HsDcxflkIbctJYz2FKPP/TEUkdw\"","mtime":"2022-07-30T13:25:15.260Z"}
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
    "mtime": "2022-07-30T13:25:07.381Z",
    "path": "../public/favicon.ico"
  },
  "/loading.svg": {
    "type": "image/svg+xml",
    "etag": "\"40b-5XbibGoHN4rtmxzANOiHvK53roY\"",
    "mtime": "2022-07-30T13:25:07.381Z",
    "path": "../public/loading.svg"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"abd7-DlzpDbMjvdL9zLsvCdBvwlw0vTg\"",
    "mtime": "2022-07-30T13:25:07.380Z",
    "path": "../public/logo.png"
  },
  "/_nuxt/1-f7aad389.mjs": {
    "type": "application/javascript",
    "etag": "\"32a6-w0mC6AzzGakvuAV4BYxqOvbnBns\"",
    "mtime": "2022-07-30T13:25:07.379Z",
    "path": "../public/_nuxt/1-f7aad389.mjs"
  },
  "/_nuxt/2-14fee1e9.mjs": {
    "type": "application/javascript",
    "etag": "\"3759-obLpOI/Wgb9PY+8KcodKghLIgj0\"",
    "mtime": "2022-07-30T13:25:07.379Z",
    "path": "../public/_nuxt/2-14fee1e9.mjs"
  },
  "/_nuxt/8-fb04cbbb.mjs": {
    "type": "application/javascript",
    "etag": "\"3759-obLpOI/Wgb9PY+8KcodKghLIgj0\"",
    "mtime": "2022-07-30T13:25:07.378Z",
    "path": "../public/_nuxt/8-fb04cbbb.mjs"
  },
  "/_nuxt/ContentDoc-e935274f.mjs": {
    "type": "application/javascript",
    "etag": "\"8ad-P5EPoHZdpVIBIMFMQrSxg35fabQ\"",
    "mtime": "2022-07-30T13:25:07.378Z",
    "path": "../public/_nuxt/ContentDoc-e935274f.mjs"
  },
  "/_nuxt/ContentList-a492e93a.mjs": {
    "type": "application/javascript",
    "etag": "\"353-HAKnQKAGA8+TAq0dYHgYupyc2cQ\"",
    "mtime": "2022-07-30T13:25:07.378Z",
    "path": "../public/_nuxt/ContentList-a492e93a.mjs"
  },
  "/_nuxt/ContentNavigation-72f0220d.mjs": {
    "type": "application/javascript",
    "etag": "\"2f04-Vb8NIV/I+odlGWTZQ9ACbiBz9AQ\"",
    "mtime": "2022-07-30T13:25:07.377Z",
    "path": "../public/_nuxt/ContentNavigation-72f0220d.mjs"
  },
  "/_nuxt/ContentNavigation.fb1c1af1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15cd-b0j/QEgs6fxBXM0xoJb4rxRmgA0\"",
    "mtime": "2022-07-30T13:25:07.377Z",
    "path": "../public/_nuxt/ContentNavigation.fb1c1af1.css"
  },
  "/_nuxt/ContentQuery-4b322ca1.mjs": {
    "type": "application/javascript",
    "etag": "\"88b-cI0k7NbT9/GwNFlfHc5O83G0+No\"",
    "mtime": "2022-07-30T13:25:07.376Z",
    "path": "../public/_nuxt/ContentQuery-4b322ca1.mjs"
  },
  "/_nuxt/ContentRenderer-79e2e41d.mjs": {
    "type": "application/javascript",
    "etag": "\"4c4-RRoZDdI/LoNP1Em3rz/v/z/cMNU\"",
    "mtime": "2022-07-30T13:25:07.376Z",
    "path": "../public/_nuxt/ContentRenderer-79e2e41d.mjs"
  },
  "/_nuxt/ContentRendererMarkdown-f2fc16f2.mjs": {
    "type": "application/javascript",
    "etag": "\"5760-7J3vuWVdHCYZxCj8mhFEWyVAl9s\"",
    "mtime": "2022-07-30T13:25:07.376Z",
    "path": "../public/_nuxt/ContentRendererMarkdown-f2fc16f2.mjs"
  },
  "/_nuxt/DocumentDrivenEmpty-7d06267c.mjs": {
    "type": "application/javascript",
    "etag": "\"121-dChm0vwlp8j8I1NCNCRovsx8P8A\"",
    "mtime": "2022-07-30T13:25:07.375Z",
    "path": "../public/_nuxt/DocumentDrivenEmpty-7d06267c.mjs"
  },
  "/_nuxt/DocumentDrivenNotFound-e7f09a88.mjs": {
    "type": "application/javascript",
    "etag": "\"a0-B02PgriLXI78ef+skB/UNsAARk8\"",
    "mtime": "2022-07-30T13:25:07.375Z",
    "path": "../public/_nuxt/DocumentDrivenNotFound-e7f09a88.mjs"
  },
  "/_nuxt/Markdown-0ab27a22.mjs": {
    "type": "application/javascript",
    "etag": "\"33e-2uVUyFgnwimdsmP/F8TCHm8n9cI\"",
    "mtime": "2022-07-30T13:25:07.374Z",
    "path": "../public/_nuxt/Markdown-0ab27a22.mjs"
  },
  "/_nuxt/ProseA-9cbcf708.mjs": {
    "type": "application/javascript",
    "etag": "\"13e-i1aqIP1QHPyXULlwf+PSTOr6knQ\"",
    "mtime": "2022-07-30T13:25:07.374Z",
    "path": "../public/_nuxt/ProseA-9cbcf708.mjs"
  },
  "/_nuxt/ProseBlockquote-fc63fefd.mjs": {
    "type": "application/javascript",
    "etag": "\"f6-ceKlOY9pXbXSy3aSLjH2CATu4jQ\"",
    "mtime": "2022-07-30T13:25:07.373Z",
    "path": "../public/_nuxt/ProseBlockquote-fc63fefd.mjs"
  },
  "/_nuxt/ProseCode-28d14053.mjs": {
    "type": "application/javascript",
    "etag": "\"173-uPA0kPE6TdnTRnmf0IFtpSfrC4g\"",
    "mtime": "2022-07-30T13:25:07.373Z",
    "path": "../public/_nuxt/ProseCode-28d14053.mjs"
  },
  "/_nuxt/ProseCode.c12da1e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e-GbvrqT5j9gSWlpa8e36U/Kv6Zx0\"",
    "mtime": "2022-07-30T13:25:07.372Z",
    "path": "../public/_nuxt/ProseCode.c12da1e5.css"
  },
  "/_nuxt/ProseCodeInline-09a5afa5.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-BynaQtatmPwOL0st7xVhoBPR9is\"",
    "mtime": "2022-07-30T13:25:07.372Z",
    "path": "../public/_nuxt/ProseCodeInline-09a5afa5.mjs"
  },
  "/_nuxt/ProseEm-dafe4e0c.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-6+EWwz0jBpPSBDFzZ/J+Qoe46yw\"",
    "mtime": "2022-07-30T13:25:07.372Z",
    "path": "../public/_nuxt/ProseEm-dafe4e0c.mjs"
  },
  "/_nuxt/ProseH1-06069ddc.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-ipSc5UrMhB1iukXr8FNSEOFM8qA\"",
    "mtime": "2022-07-30T13:25:07.371Z",
    "path": "../public/_nuxt/ProseH1-06069ddc.mjs"
  },
  "/_nuxt/ProseH2-575432a3.mjs": {
    "type": "application/javascript",
    "etag": "\"135-TNKMg4wIQhyL0MspUuLxUDtR6ag\"",
    "mtime": "2022-07-30T13:25:07.371Z",
    "path": "../public/_nuxt/ProseH2-575432a3.mjs"
  },
  "/_nuxt/ProseH3-1b90df92.mjs": {
    "type": "application/javascript",
    "etag": "\"135-TMXOTJrJqy1B29MKEj/ks5Tw97c\"",
    "mtime": "2022-07-30T13:25:07.371Z",
    "path": "../public/_nuxt/ProseH3-1b90df92.mjs"
  },
  "/_nuxt/ProseH4-5b7a71f1.mjs": {
    "type": "application/javascript",
    "etag": "\"135-dYDHGru/M04QUk7hG7N5SSjpseQ\"",
    "mtime": "2022-07-30T13:25:07.370Z",
    "path": "../public/_nuxt/ProseH4-5b7a71f1.mjs"
  },
  "/_nuxt/ProseH5-5c45ada5.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-uCgSSYZP2Hp+wf9//G07IArq4UE\"",
    "mtime": "2022-07-30T13:25:07.370Z",
    "path": "../public/_nuxt/ProseH5-5c45ada5.mjs"
  },
  "/_nuxt/ProseH6-a5b4c420.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-tx+qUDGHpriHM+QkI4H7vGAycF8\"",
    "mtime": "2022-07-30T13:25:07.370Z",
    "path": "../public/_nuxt/ProseH6-a5b4c420.mjs"
  },
  "/_nuxt/ProseHr-329def7c.mjs": {
    "type": "application/javascript",
    "etag": "\"ca-BUYlbp+2pq2eqCQOcTbhBCEuFPs\"",
    "mtime": "2022-07-30T13:25:07.370Z",
    "path": "../public/_nuxt/ProseHr-329def7c.mjs"
  },
  "/_nuxt/ProseImg-641f4cac.mjs": {
    "type": "application/javascript",
    "etag": "\"18b-52kr0a5YRfqUYQ6i1s+kKR1jOiQ\"",
    "mtime": "2022-07-30T13:25:07.369Z",
    "path": "../public/_nuxt/ProseImg-641f4cac.mjs"
  },
  "/_nuxt/ProseLi-5db451bb.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-iDwOTRNsoC+O3tUQibMyqYxdJFw\"",
    "mtime": "2022-07-30T13:25:07.369Z",
    "path": "../public/_nuxt/ProseLi-5db451bb.mjs"
  },
  "/_nuxt/ProseOl-bd926679.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-2itBRNqciTnhJtMb8iQgo6xqQxE\"",
    "mtime": "2022-07-30T13:25:07.368Z",
    "path": "../public/_nuxt/ProseOl-bd926679.mjs"
  },
  "/_nuxt/ProseP-8ff1c598.mjs": {
    "type": "application/javascript",
    "etag": "\"e8-6RuVv204VQRAGD7BGEFT9ek3RO8\"",
    "mtime": "2022-07-30T13:25:07.368Z",
    "path": "../public/_nuxt/ProseP-8ff1c598.mjs"
  },
  "/_nuxt/ProseStrong-605daeee.mjs": {
    "type": "application/javascript",
    "etag": "\"ed-FQmXqpDUbDxRoX1aC30wg9eOjOQ\"",
    "mtime": "2022-07-30T13:25:07.368Z",
    "path": "../public/_nuxt/ProseStrong-605daeee.mjs"
  },
  "/_nuxt/ProseTable-d1b0e375.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-o6JImqzJQd/AhuimPvxXyGjTfpI\"",
    "mtime": "2022-07-30T13:25:07.367Z",
    "path": "../public/_nuxt/ProseTable-d1b0e375.mjs"
  },
  "/_nuxt/ProseTbody-a7069e47.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-l/3dg/bESzVeWDF2Qz30l2PmvBQ\"",
    "mtime": "2022-07-30T13:25:07.367Z",
    "path": "../public/_nuxt/ProseTbody-a7069e47.mjs"
  },
  "/_nuxt/ProseTd-c66fa59f.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-JoR3MGmD1Ini4yECl2/5u/T2ra4\"",
    "mtime": "2022-07-30T13:25:07.366Z",
    "path": "../public/_nuxt/ProseTd-c66fa59f.mjs"
  },
  "/_nuxt/ProseTh-7d82c53a.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-FtzHO20IsstdlHktiZY0ylvQ8c0\"",
    "mtime": "2022-07-30T13:25:07.366Z",
    "path": "../public/_nuxt/ProseTh-7d82c53a.mjs"
  },
  "/_nuxt/ProseThead-932115f9.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-nXEopA9a+R+4o+GoY1NSxUoVQEA\"",
    "mtime": "2022-07-30T13:25:07.366Z",
    "path": "../public/_nuxt/ProseThead-932115f9.mjs"
  },
  "/_nuxt/ProseTr-1cde5de9.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-NCAeSQcztrFesZygZqeR5WKyHKI\"",
    "mtime": "2022-07-30T13:25:07.365Z",
    "path": "../public/_nuxt/ProseTr-1cde5de9.mjs"
  },
  "/_nuxt/ProseUl-f957f08f.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-SU3wBt33GBAF1aSWPkhJWhH5DJo\"",
    "mtime": "2022-07-30T13:25:07.365Z",
    "path": "../public/_nuxt/ProseUl-f957f08f.mjs"
  },
  "/_nuxt/_...slug_-5c27d1c4.mjs": {
    "type": "application/javascript",
    "etag": "\"75a-LTA5Z+PB0b0BzurhBG76x1G5AOs\"",
    "mtime": "2022-07-30T13:25:07.365Z",
    "path": "../public/_nuxt/_...slug_-5c27d1c4.mjs"
  },
  "/_nuxt/_name_-db9552db.mjs": {
    "type": "application/javascript",
    "etag": "\"861-y6Kfv7AmMe5mZfR6LxMEPCHilHU\"",
    "mtime": "2022-07-30T13:25:07.364Z",
    "path": "../public/_nuxt/_name_-db9552db.mjs"
  },
  "/_nuxt/_pageIndex_-3e345edb.mjs": {
    "type": "application/javascript",
    "etag": "\"d4-p9GFMB09uH8ClCpqRWzO7aR/vZk\"",
    "mtime": "2022-07-30T13:25:07.364Z",
    "path": "../public/_nuxt/_pageIndex_-3e345edb.mjs"
  },
  "/_nuxt/_path_-09379308.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-TgSojvnB+cf86XpZb5YNBiTxkpY\"",
    "mtime": "2022-07-30T13:25:07.363Z",
    "path": "../public/_nuxt/_path_-09379308.mjs"
  },
  "/_nuxt/asyncData-5ae16b82.mjs": {
    "type": "application/javascript",
    "etag": "\"86a-D6tymI/O3CRsPCQ3sKzSgaZequM\"",
    "mtime": "2022-07-30T13:25:07.363Z",
    "path": "../public/_nuxt/asyncData-5ae16b82.mjs"
  },
  "/_nuxt/component.vue3-fe70ae2e.mjs": {
    "type": "application/javascript",
    "etag": "\"365-rpGvORRARRM695jOJAWFBN0kAoo\"",
    "mtime": "2022-07-30T13:25:07.363Z",
    "path": "../public/_nuxt/component.vue3-fe70ae2e.mjs"
  },
  "/_nuxt/default-a7201e82.mjs": {
    "type": "application/javascript",
    "etag": "\"b6d-SvQWrvshWNjd3oH77aKmP9zwWnA\"",
    "mtime": "2022-07-30T13:25:07.362Z",
    "path": "../public/_nuxt/default-a7201e82.mjs"
  },
  "/_nuxt/entry-59955ff2.mjs": {
    "type": "application/javascript",
    "etag": "\"34569-qwAuXyhjcJVnDK35b5MMDZjyJgc\"",
    "mtime": "2022-07-30T13:25:07.362Z",
    "path": "../public/_nuxt/entry-59955ff2.mjs"
  },
  "/_nuxt/entry.b3063633.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19daa-ie6k0NCdQYWqCPmu6pKuhy2LP3c\"",
    "mtime": "2022-07-30T13:25:07.361Z",
    "path": "../public/_nuxt/entry.b3063633.css"
  },
  "/_nuxt/error-404-18d48acd.mjs": {
    "type": "application/javascript",
    "etag": "\"857-v4k8CaIFxjUjdhotpRgdXEeLsIg\"",
    "mtime": "2022-07-30T13:25:07.360Z",
    "path": "../public/_nuxt/error-404-18d48acd.mjs"
  },
  "/_nuxt/error-404.314f7075.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11bd-kF6SKfdJYaoPOx5XSNB4IuKqq6c\"",
    "mtime": "2022-07-30T13:25:07.360Z",
    "path": "../public/_nuxt/error-404.314f7075.css"
  },
  "/_nuxt/error-500-8cca76ef.mjs": {
    "type": "application/javascript",
    "etag": "\"6ff-d7L05evxCQd51HxrfsDm7bjn/Xw\"",
    "mtime": "2022-07-30T13:25:07.359Z",
    "path": "../public/_nuxt/error-500-8cca76ef.mjs"
  },
  "/_nuxt/error-500.4e3461e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af4-ckENJljqPJ6JYcymKbQpp8F2r1I\"",
    "mtime": "2022-07-30T13:25:07.359Z",
    "path": "../public/_nuxt/error-500.4e3461e5.css"
  },
  "/_nuxt/error-component-a08e0993.mjs": {
    "type": "application/javascript",
    "etag": "\"475-IEEoRUwaFQ4UHYdd02OmFtNBij8\"",
    "mtime": "2022-07-30T13:25:07.358Z",
    "path": "../public/_nuxt/error-component-a08e0993.mjs"
  },
  "/_nuxt/footer-6a2fe501.mjs": {
    "type": "application/javascript",
    "etag": "\"95f-zr9p0sab42uy+/2H8NAaxJaEhRc\"",
    "mtime": "2022-07-30T13:25:07.358Z",
    "path": "../public/_nuxt/footer-6a2fe501.mjs"
  },
  "/_nuxt/index-54f1043b.mjs": {
    "type": "application/javascript",
    "etag": "\"1b01-71OYhVD302jjy6Z3u8zH5bZnzuM\"",
    "mtime": "2022-07-30T13:25:07.357Z",
    "path": "../public/_nuxt/index-54f1043b.mjs"
  },
  "/_nuxt/index-de4e1110.mjs": {
    "type": "application/javascript",
    "etag": "\"95-PVLrVBaUaTIPniHLazFfCpM9eBQ\"",
    "mtime": "2022-07-30T13:25:07.357Z",
    "path": "../public/_nuxt/index-de4e1110.mjs"
  },
  "/_nuxt/index-f271a5e1.mjs": {
    "type": "application/javascript",
    "etag": "\"6f3-1xJtCJz8lBWe3c25gVpXVzpQGr0\"",
    "mtime": "2022-07-30T13:25:07.356Z",
    "path": "../public/_nuxt/index-f271a5e1.mjs"
  },
  "/_nuxt/logo-b5687853.mjs": {
    "type": "application/javascript",
    "etag": "\"51-uGx2yB51VnXq/xrIwGGJDAGXiHc\"",
    "mtime": "2022-07-30T13:25:07.356Z",
    "path": "../public/_nuxt/logo-b5687853.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"6595-HOSM+lKLBc33lsucw5a6U0ypUSo\"",
    "mtime": "2022-07-30T13:25:07.355Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/plugin-vue_export-helper-84c1d017.mjs": {
    "type": "application/javascript",
    "etag": "\"59-DRITqS/KEYd0y9ZdVDCQ1f/k5J4\"",
    "mtime": "2022-07-30T13:25:07.354Z",
    "path": "../public/_nuxt/plugin-vue_export-helper-84c1d017.mjs"
  },
  "/_nuxt/swiper-65bcc1f9.mjs": {
    "type": "application/javascript",
    "etag": "\"5e97-KGWlzcxWCalERJfxNVB5r179wy4\"",
    "mtime": "2022-07-30T13:25:07.354Z",
    "path": "../public/_nuxt/swiper-65bcc1f9.mjs"
  },
  "/_nuxt/template-63d4c0c4.mjs": {
    "type": "application/javascript",
    "etag": "\"8d0-MzzDCfEvE5nFkcPHWZVESNE3yxg\"",
    "mtime": "2022-07-30T13:25:07.353Z",
    "path": "../public/_nuxt/template-63d4c0c4.mjs"
  },
  "/_nuxt/web-socket-fe6365ed.mjs": {
    "type": "application/javascript",
    "etag": "\"350-SOfo7VPDEoheqOeQ3z45sltXkdc\"",
    "mtime": "2022-07-30T13:25:07.353Z",
    "path": "../public/_nuxt/web-socket-fe6365ed.mjs"
  },
  "/_nuxt/welcome-7eaccab5.mjs": {
    "type": "application/javascript",
    "etag": "\"2fa3-jRQ1csNiOA0gSRvfSKjjrqbS2l4\"",
    "mtime": "2022-07-30T13:25:07.352Z",
    "path": "../public/_nuxt/welcome-7eaccab5.mjs"
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
    $in: (item, condition) => ensureArray(condition).some((cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)),
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
  return h(node.position, "code", {
    language,
    filename,
    highlights,
    code
  }, [h(node, "pre", {}, [h(node, "code", { __ignoreMap: "" }, [u("text", code)])])]);
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
    result.unshift(h({}, "input", {
      type: "checkbox",
      checked: node.checked,
      disabled: true
    }));
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
  const body = result[1] && h({
    start: position(result[1]).start,
    end: position(result[result.length - 1]).end
  }, "tbody", wrap(result.slice(1), true));
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
    stream.process({
      value: content,
      data: options.data
    }, (error, file) => {
      if (error) {
        return reject(error);
      }
      Object.assign(options.data, file?.data || {});
      resolve(file?.result);
    });
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

const transformers = [];

const sourceStorage = prefixStorage(useStorage(), "content:source");
prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const contentIgnores = contentConfig.ignores.map((p) => typeof p === "string" ? new RegExp(`^${p}|:${p}`) : p);
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
      await Promise.all(previewKeys.map(async (key2) => {
        const meta = await sourceStorage.getMeta(key2);
        if (meta?.__deleted) {
          keysSet.delete(key2.substring(previewPrefix.length));
        } else {
          keysSet.add(key2.substring(previewPrefix.length));
        }
      }));
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
  const options = defu(opts, {
    markdown: contentConfig.markdown,
    csv: contentConfig.csv,
    yaml: contentConfig.yaml,
    highlight: contentConfig.highlight,
    transformers: transformers,
    pathMeta: {
      defaultLocale: contentConfig.defaultLocale,
      locales: contentConfig.locales
    }
  });
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
  return createPipelineFetcher(() => getContentsList(event))(query);
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
  query.where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      query.where[key] = query[key] === "true";
      delete query[key];
    }
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
      Object.assign(navItem, pickNavigationFields(dirConfig));
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
