import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import { withLeadingSlash, joinURL, withoutTrailingSlash, hasProtocol, withBase, isEqual, encodeParam, withQuery, parseURL, encodePath } from 'ufo';
import htmlTags from 'html-tags';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'h3';
import 'unenv/runtime/mock/proxy';
import 'stream';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
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

var vueRouter_prod = {};

/*!
  * vue-router v4.1.3
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */

(function (exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	var vue = vue_cjs_prod;

	function isESModule(obj) {
	    return obj.__esModule || obj[Symbol.toStringTag] === 'Module';
	}
	const assign = Object.assign;
	function applyToParams(fn, params) {
	    const newParams = {};
	    for (const key in params) {
	        const value = params[key];
	        newParams[key] = isArray(value)
	            ? value.map(fn)
	            : fn(value);
	    }
	    return newParams;
	}
	const noop = () => { };
	/**
	 * Typesafe alternative to Array.isArray
	 * https://github.com/microsoft/TypeScript/pull/48228
	 */
	const isArray = Array.isArray;

	const TRAILING_SLASH_RE = /\/$/;
	const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');
	/**
	 * Transforms an URI into a normalized history location
	 *
	 * @param parseQuery
	 * @param location - URI to normalize
	 * @param currentLocation - current absolute location. Allows resolving relative
	 * paths. Must start with `/`. Defaults to `/`
	 * @returns a normalized history location
	 */
	function parseURL(parseQuery, location, currentLocation = '/') {
	    let path, query = {}, searchString = '', hash = '';
	    // Could use URL and URLSearchParams but IE 11 doesn't support it
	    // TODO: move to new URL()
	    const hashPos = location.indexOf('#');
	    let searchPos = location.indexOf('?');
	    // the hash appears before the search, so it's not part of the search string
	    if (hashPos < searchPos && hashPos >= 0) {
	        searchPos = -1;
	    }
	    if (searchPos > -1) {
	        path = location.slice(0, searchPos);
	        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
	        query = parseQuery(searchString);
	    }
	    if (hashPos > -1) {
	        path = path || location.slice(0, hashPos);
	        // keep the # character
	        hash = location.slice(hashPos, location.length);
	    }
	    // no search and no query
	    path = resolveRelativePath(path != null ? path : location, currentLocation);
	    // empty path means a relative query or hash `?foo=f`, `#thing`
	    return {
	        fullPath: path + (searchString && '?') + searchString + hash,
	        path,
	        query,
	        hash,
	    };
	}
	/**
	 * Stringifies a URL object
	 *
	 * @param stringifyQuery
	 * @param location
	 */
	function stringifyURL(stringifyQuery, location) {
	    const query = location.query ? stringifyQuery(location.query) : '';
	    return location.path + (query && '?') + query + (location.hash || '');
	}
	/**
	 * Strips off the base from the beginning of a location.pathname in a non
	 * case-sensitive way.
	 *
	 * @param pathname - location.pathname
	 * @param base - base to strip off
	 */
	function stripBase(pathname, base) {
	    // no base or base is not found at the beginning
	    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
	        return pathname;
	    return pathname.slice(base.length) || '/';
	}
	/**
	 * Checks if two RouteLocation are equal. This means that both locations are
	 * pointing towards the same {@link RouteRecord} and that all `params`, `query`
	 * parameters and `hash` are the same
	 *
	 * @param a - first {@link RouteLocation}
	 * @param b - second {@link RouteLocation}
	 */
	function isSameRouteLocation(stringifyQuery, a, b) {
	    const aLastIndex = a.matched.length - 1;
	    const bLastIndex = b.matched.length - 1;
	    return (aLastIndex > -1 &&
	        aLastIndex === bLastIndex &&
	        isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) &&
	        isSameRouteLocationParams(a.params, b.params) &&
	        stringifyQuery(a.query) === stringifyQuery(b.query) &&
	        a.hash === b.hash);
	}
	/**
	 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
	 * considered equal to the `RouteRecord` they are aliasing.
	 *
	 * @param a - first {@link RouteRecord}
	 * @param b - second {@link RouteRecord}
	 */
	function isSameRouteRecord(a, b) {
	    // since the original record has an undefined value for aliasOf
	    // but all aliases point to the original record, this will always compare
	    // the original record
	    return (a.aliasOf || a) === (b.aliasOf || b);
	}
	function isSameRouteLocationParams(a, b) {
	    if (Object.keys(a).length !== Object.keys(b).length)
	        return false;
	    for (const key in a) {
	        if (!isSameRouteLocationParamsValue(a[key], b[key]))
	            return false;
	    }
	    return true;
	}
	function isSameRouteLocationParamsValue(a, b) {
	    return isArray(a)
	        ? isEquivalentArray(a, b)
	        : isArray(b)
	            ? isEquivalentArray(b, a)
	            : a === b;
	}
	/**
	 * Check if two arrays are the same or if an array with one single entry is the
	 * same as another primitive value. Used to check query and parameters
	 *
	 * @param a - array of values
	 * @param b - array of values or a single value
	 */
	function isEquivalentArray(a, b) {
	    return isArray(b)
	        ? a.length === b.length && a.every((value, i) => value === b[i])
	        : a.length === 1 && a[0] === b;
	}
	/**
	 * Resolves a relative path that starts with `.`.
	 *
	 * @param to - path location we are resolving
	 * @param from - currentLocation.path, should start with `/`
	 */
	function resolveRelativePath(to, from) {
	    if (to.startsWith('/'))
	        return to;
	    if (!to)
	        return from;
	    const fromSegments = from.split('/');
	    const toSegments = to.split('/');
	    let position = fromSegments.length - 1;
	    let toPosition;
	    let segment;
	    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
	        segment = toSegments[toPosition];
	        // we stay on the same position
	        if (segment === '.')
	            continue;
	        // go up in the from array
	        if (segment === '..') {
	            // we can't go below zero but we still need to increment toPosition
	            if (position > 1)
	                position--;
	            // continue
	        }
	        // we reached a non relative path, we stop here
	        else
	            break;
	    }
	    return (fromSegments.slice(0, position).join('/') +
	        '/' +
	        toSegments
	            // ensure we use at least the last element in the toSegments
	            .slice(toPosition - (toPosition === toSegments.length ? 1 : 0))
	            .join('/'));
	}

	var NavigationType;
	(function (NavigationType) {
	    NavigationType["pop"] = "pop";
	    NavigationType["push"] = "push";
	})(NavigationType || (NavigationType = {}));
	var NavigationDirection;
	(function (NavigationDirection) {
	    NavigationDirection["back"] = "back";
	    NavigationDirection["forward"] = "forward";
	    NavigationDirection["unknown"] = "";
	})(NavigationDirection || (NavigationDirection = {}));
	/**
	 * Starting location for Histories
	 */
	const START = '';
	// Generic utils
	/**
	 * Normalizes a base by removing any trailing slash and reading the base tag if
	 * present.
	 *
	 * @param base - base to normalize
	 */
	function normalizeBase(base) {
	    if (!base) {
	        {
	            base = '/';
	        }
	    }
	    // ensure leading slash when it was removed by the regex above avoid leading
	    // slash with hash because the file could be read from the disk like file://
	    // and the leading slash would cause problems
	    if (base[0] !== '/' && base[0] !== '#')
	        base = '/' + base;
	    // remove the trailing slash so all other method can just do `base + fullPath`
	    // to build an href
	    return removeTrailingSlash(base);
	}
	// remove any character before the hash
	const BEFORE_HASH_RE = /^[^#]+#/;
	function createHref(base, location) {
	    return base.replace(BEFORE_HASH_RE, '#') + location;
	}
	const computeScrollPosition = () => ({
	    left: window.pageXOffset,
	    top: window.pageYOffset,
	});
	// TODO: RFC about how to save scroll position
	/**
	 * ScrollBehavior instance used by the router to compute and restore the scroll
	 * position when navigating.
	 */
	// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
	//   // returns a scroll position that can be saved in history
	//   compute(): ScrollPositionEntry
	//   // can take an extended ScrollPositionEntry
	//   scroll(position: ScrollPosition): void
	// }
	// export const scrollHandler: ScrollHandler<ScrollPosition> = {
	//   compute: computeScroll,
	//   scroll: scrollToPosition,
	// }

	let createBaseLocation = () => location.protocol + '//' + location.host;
	/**
	 * Creates a normalized history location from a window.location object
	 * @param location -
	 */
	function createCurrentLocation(base, location) {
	    const { pathname, search, hash } = location;
	    // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
	    const hashPos = base.indexOf('#');
	    if (hashPos > -1) {
	        let slicePos = hash.includes(base.slice(hashPos))
	            ? base.slice(hashPos).length
	            : 1;
	        let pathFromHash = hash.slice(slicePos);
	        // prepend the starting slash to hash so the url starts with /#
	        if (pathFromHash[0] !== '/')
	            pathFromHash = '/' + pathFromHash;
	        return stripBase(pathFromHash, '');
	    }
	    const path = stripBase(pathname, base);
	    return path + search + hash;
	}
	function useHistoryListeners(base, historyState, currentLocation, replace) {
	    let listeners = [];
	    let teardowns = [];
	    // TODO: should it be a stack? a Dict. Check if the popstate listener
	    // can trigger twice
	    let pauseState = null;
	    const popStateHandler = ({ state, }) => {
	        const to = createCurrentLocation(base, location);
	        const from = currentLocation.value;
	        const fromState = historyState.value;
	        let delta = 0;
	        if (state) {
	            currentLocation.value = to;
	            historyState.value = state;
	            // ignore the popstate and reset the pauseState
	            if (pauseState && pauseState === from) {
	                pauseState = null;
	                return;
	            }
	            delta = fromState ? state.position - fromState.position : 0;
	        }
	        else {
	            replace(to);
	        }
	        // console.log({ deltaFromCurrent })
	        // Here we could also revert the navigation by calling history.go(-delta)
	        // this listener will have to be adapted to not trigger again and to wait for the url
	        // to be updated before triggering the listeners. Some kind of validation function would also
	        // need to be passed to the listeners so the navigation can be accepted
	        // call all listeners
	        listeners.forEach(listener => {
	            listener(currentLocation.value, from, {
	                delta,
	                type: NavigationType.pop,
	                direction: delta
	                    ? delta > 0
	                        ? NavigationDirection.forward
	                        : NavigationDirection.back
	                    : NavigationDirection.unknown,
	            });
	        });
	    };
	    function pauseListeners() {
	        pauseState = currentLocation.value;
	    }
	    function listen(callback) {
	        // setup the listener and prepare teardown callbacks
	        listeners.push(callback);
	        const teardown = () => {
	            const index = listeners.indexOf(callback);
	            if (index > -1)
	                listeners.splice(index, 1);
	        };
	        teardowns.push(teardown);
	        return teardown;
	    }
	    function beforeUnloadListener() {
	        const { history } = window;
	        if (!history.state)
	            return;
	        history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), '');
	    }
	    function destroy() {
	        for (const teardown of teardowns)
	            teardown();
	        teardowns = [];
	        window.removeEventListener('popstate', popStateHandler);
	        window.removeEventListener('beforeunload', beforeUnloadListener);
	    }
	    // setup the listeners and prepare teardown callbacks
	    window.addEventListener('popstate', popStateHandler);
	    window.addEventListener('beforeunload', beforeUnloadListener);
	    return {
	        pauseListeners,
	        listen,
	        destroy,
	    };
	}
	/**
	 * Creates a state object
	 */
	function buildState(back, current, forward, replaced = false, computeScroll = false) {
	    return {
	        back,
	        current,
	        forward,
	        replaced,
	        position: window.history.length,
	        scroll: computeScroll ? computeScrollPosition() : null,
	    };
	}
	function useHistoryStateNavigation(base) {
	    const { history, location } = window;
	    // private variables
	    const currentLocation = {
	        value: createCurrentLocation(base, location),
	    };
	    const historyState = { value: history.state };
	    // build current history entry as this is a fresh navigation
	    if (!historyState.value) {
	        changeLocation(currentLocation.value, {
	            back: null,
	            current: currentLocation.value,
	            forward: null,
	            // the length is off by one, we need to decrease it
	            position: history.length - 1,
	            replaced: true,
	            // don't add a scroll as the user may have an anchor and we want
	            // scrollBehavior to be triggered without a saved position
	            scroll: null,
	        }, true);
	    }
	    function changeLocation(to, state, replace) {
	        /**
	         * if a base tag is provided and we are on a normal domain, we have to
	         * respect the provided `base` attribute because pushState() will use it and
	         * potentially erase anything before the `#` like at
	         * https://github.com/vuejs/router/issues/685 where a base of
	         * `/folder/#` but a base of `/` would erase the `/folder/` section. If
	         * there is no host, the `<base>` tag makes no sense and if there isn't a
	         * base tag we can just use everything after the `#`.
	         */
	        const hashIndex = base.indexOf('#');
	        const url = hashIndex > -1
	            ? (location.host && document.querySelector('base')
	                ? base
	                : base.slice(hashIndex)) + to
	            : createBaseLocation() + base + to;
	        try {
	            // BROWSER QUIRK
	            // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
	            history[replace ? 'replaceState' : 'pushState'](state, '', url);
	            historyState.value = state;
	        }
	        catch (err) {
	            {
	                console.error(err);
	            }
	            // Force the navigation, this also resets the call count
	            location[replace ? 'replace' : 'assign'](url);
	        }
	    }
	    function replace(to, data) {
	        const state = assign({}, history.state, buildState(historyState.value.back, 
	        // keep back and forward entries but override current position
	        to, historyState.value.forward, true), data, { position: historyState.value.position });
	        changeLocation(to, state, true);
	        currentLocation.value = to;
	    }
	    function push(to, data) {
	        // Add to current entry the information of where we are going
	        // as well as saving the current position
	        const currentState = assign({}, 
	        // use current history state to gracefully handle a wrong call to
	        // history.replaceState
	        // https://github.com/vuejs/router/issues/366
	        historyState.value, history.state, {
	            forward: to,
	            scroll: computeScrollPosition(),
	        });
	        changeLocation(currentState.current, currentState, true);
	        const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
	        changeLocation(to, state, false);
	        currentLocation.value = to;
	    }
	    return {
	        location: currentLocation,
	        state: historyState,
	        push,
	        replace,
	    };
	}
	/**
	 * Creates an HTML5 history. Most common history for single page applications.
	 *
	 * @param base -
	 */
	function createWebHistory(base) {
	    base = normalizeBase(base);
	    const historyNavigation = useHistoryStateNavigation(base);
	    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
	    function go(delta, triggerListeners = true) {
	        if (!triggerListeners)
	            historyListeners.pauseListeners();
	        history.go(delta);
	    }
	    const routerHistory = assign({
	        // it's overridden right after
	        location: '',
	        base,
	        go,
	        createHref: createHref.bind(null, base),
	    }, historyNavigation, historyListeners);
	    Object.defineProperty(routerHistory, 'location', {
	        enumerable: true,
	        get: () => historyNavigation.location.value,
	    });
	    Object.defineProperty(routerHistory, 'state', {
	        enumerable: true,
	        get: () => historyNavigation.state.value,
	    });
	    return routerHistory;
	}

	/**
	 * Creates a in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
	 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
	 *
	 * @param base - Base applied to all urls, defaults to '/'
	 * @returns a history object that can be passed to the router constructor
	 */
	function createMemoryHistory(base = '') {
	    let listeners = [];
	    let queue = [START];
	    let position = 0;
	    base = normalizeBase(base);
	    function setLocation(location) {
	        position++;
	        if (position === queue.length) {
	            // we are at the end, we can simply append a new entry
	            queue.push(location);
	        }
	        else {
	            // we are in the middle, we remove everything from here in the queue
	            queue.splice(position);
	            queue.push(location);
	        }
	    }
	    function triggerListeners(to, from, { direction, delta }) {
	        const info = {
	            direction,
	            delta,
	            type: NavigationType.pop,
	        };
	        for (const callback of listeners) {
	            callback(to, from, info);
	        }
	    }
	    const routerHistory = {
	        // rewritten by Object.defineProperty
	        location: START,
	        // TODO: should be kept in queue
	        state: {},
	        base,
	        createHref: createHref.bind(null, base),
	        replace(to) {
	            // remove current entry and decrement position
	            queue.splice(position--, 1);
	            setLocation(to);
	        },
	        push(to, data) {
	            setLocation(to);
	        },
	        listen(callback) {
	            listeners.push(callback);
	            return () => {
	                const index = listeners.indexOf(callback);
	                if (index > -1)
	                    listeners.splice(index, 1);
	            };
	        },
	        destroy() {
	            listeners = [];
	            queue = [START];
	            position = 0;
	        },
	        go(delta, shouldTrigger = true) {
	            const from = this.location;
	            const direction = 
	            // we are considering delta === 0 going forward, but in abstract mode
	            // using 0 for the delta doesn't make sense like it does in html5 where
	            // it reloads the page
	            delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
	            position = Math.max(0, Math.min(position + delta, queue.length - 1));
	            if (shouldTrigger) {
	                triggerListeners(this.location, from, {
	                    direction,
	                    delta,
	                });
	            }
	        },
	    };
	    Object.defineProperty(routerHistory, 'location', {
	        enumerable: true,
	        get: () => queue[position],
	    });
	    return routerHistory;
	}

	/**
	 * Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
	 * handle any URL is not possible.
	 *
	 * @param base - optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag
	 * in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
	 * calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything
	 * after the `#`).
	 *
	 * @example
	 * ```js
	 * // at https://example.com/folder
	 * createWebHashHistory() // gives a url of `https://example.com/folder#`
	 * createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
	 * // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
	 * createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
	 * // you should avoid doing this because it changes the original url and breaks copying urls
	 * createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
	 *
	 * // at file:///usr/etc/folder/index.html
	 * // for locations with no `host`, the base is ignored
	 * createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
	 * ```
	 */
	function createWebHashHistory(base) {
	    // Make sure this implementation is fine in terms of encoding, specially for IE11
	    // for `file://`, directly use the pathname and ignore the base
	    // location.pathname contains an initial `/` even at the root: `https://example.com`
	    base = location.host ? base || location.pathname + location.search : '';
	    // allow the user to provide a `#` in the middle: `/base/#/app`
	    if (!base.includes('#'))
	        base += '#';
	    return createWebHistory(base);
	}

	function isRouteLocation(route) {
	    return typeof route === 'string' || (route && typeof route === 'object');
	}
	function isRouteName(name) {
	    return typeof name === 'string' || typeof name === 'symbol';
	}

	/**
	 * Initial route location where the router is. Can be used in navigation guards
	 * to differentiate the initial navigation.
	 *
	 * @example
	 * ```js
	 * import { START_LOCATION } from 'vue-router'
	 *
	 * router.beforeEach((to, from) => {
	 *   if (from === START_LOCATION) {
	 *     // initial navigation
	 *   }
	 * })
	 * ```
	 */
	const START_LOCATION_NORMALIZED = {
	    path: '/',
	    name: undefined,
	    params: {},
	    query: {},
	    hash: '',
	    fullPath: '/',
	    matched: [],
	    meta: {},
	    redirectedFrom: undefined,
	};

	const NavigationFailureSymbol = Symbol('');
	/**
	 * Enumeration with all possible types for navigation failures. Can be passed to
	 * {@link isNavigationFailure} to check for specific failures.
	 */
	exports.NavigationFailureType = void 0;
	(function (NavigationFailureType) {
	    /**
	     * An aborted navigation is a navigation that failed because a navigation
	     * guard returned `false` or called `next(false)`
	     */
	    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
	    /**
	     * A cancelled navigation is a navigation that failed because a more recent
	     * navigation finished started (not necessarily finished).
	     */
	    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
	    /**
	     * A duplicated navigation is a navigation that failed because it was
	     * initiated while already being at the exact same location.
	     */
	    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
	})(exports.NavigationFailureType || (exports.NavigationFailureType = {}));
	// DEV only debug messages
	const ErrorTypeMessages = {
	    [1 /* ErrorTypes.MATCHER_NOT_FOUND */]({ location, currentLocation }) {
	        return `No match for\n ${JSON.stringify(location)}${currentLocation
	            ? '\nwhile being at\n' + JSON.stringify(currentLocation)
	            : ''}`;
	    },
	    [2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */]({ from, to, }) {
	        return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
	    },
	    [4 /* ErrorTypes.NAVIGATION_ABORTED */]({ from, to }) {
	        return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
	    },
	    [8 /* ErrorTypes.NAVIGATION_CANCELLED */]({ from, to }) {
	        return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
	    },
	    [16 /* ErrorTypes.NAVIGATION_DUPLICATED */]({ from, to }) {
	        return `Avoided redundant navigation to current location: "${from.fullPath}".`;
	    },
	};
	function createRouterError(type, params) {
	    // keep full error messages in cjs versions
	    {
	        return assign(new Error(ErrorTypeMessages[type](params)), {
	            type,
	            [NavigationFailureSymbol]: true,
	        }, params);
	    }
	}
	function isNavigationFailure(error, type) {
	    return (error instanceof Error &&
	        NavigationFailureSymbol in error &&
	        (type == null || !!(error.type & type)));
	}
	const propertiesToLog = ['params', 'query', 'hash'];
	function stringifyRoute(to) {
	    if (typeof to === 'string')
	        return to;
	    if ('path' in to)
	        return to.path;
	    const location = {};
	    for (const key of propertiesToLog) {
	        if (key in to)
	            location[key] = to[key];
	    }
	    return JSON.stringify(location, null, 2);
	}

	// default pattern for a param: non greedy everything but /
	const BASE_PARAM_PATTERN = '[^/]+?';
	const BASE_PATH_PARSER_OPTIONS = {
	    sensitive: false,
	    strict: false,
	    start: true,
	    end: true,
	};
	// Special Regex characters that must be escaped in static tokens
	const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
	/**
	 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
	 *
	 * @param segments - array of segments returned by tokenizePath
	 * @param extraOptions - optional options for the regexp
	 * @returns a PathParser
	 */
	function tokensToParser(segments, extraOptions) {
	    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
	    // the amount of scores is the same as the length of segments except for the root segment "/"
	    const score = [];
	    // the regexp as a string
	    let pattern = options.start ? '^' : '';
	    // extracted keys
	    const keys = [];
	    for (const segment of segments) {
	        // the root segment needs special treatment
	        const segmentScores = segment.length ? [] : [90 /* PathScore.Root */];
	        // allow trailing slash
	        if (options.strict && !segment.length)
	            pattern += '/';
	        for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
	            const token = segment[tokenIndex];
	            // resets the score if we are inside a sub segment /:a-other-:b
	            let subSegmentScore = 40 /* PathScore.Segment */ +
	                (options.sensitive ? 0.25 /* PathScore.BonusCaseSensitive */ : 0);
	            if (token.type === 0 /* TokenType.Static */) {
	                // prepend the slash if we are starting a new segment
	                if (!tokenIndex)
	                    pattern += '/';
	                pattern += token.value.replace(REGEX_CHARS_RE, '\\$&');
	                subSegmentScore += 40 /* PathScore.Static */;
	            }
	            else if (token.type === 1 /* TokenType.Param */) {
	                const { value, repeatable, optional, regexp } = token;
	                keys.push({
	                    name: value,
	                    repeatable,
	                    optional,
	                });
	                const re = regexp ? regexp : BASE_PARAM_PATTERN;
	                // the user provided a custom regexp /:id(\\d+)
	                if (re !== BASE_PARAM_PATTERN) {
	                    subSegmentScore += 10 /* PathScore.BonusCustomRegExp */;
	                    // make sure the regexp is valid before using it
	                    try {
	                        new RegExp(`(${re})`);
	                    }
	                    catch (err) {
	                        throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` +
	                            err.message);
	                    }
	                }
	                // when we repeat we must take care of the repeating leading slash
	                let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
	                // prepend the slash if we are starting a new segment
	                if (!tokenIndex)
	                    subPattern =
	                        // avoid an optional / if there are more segments e.g. /:p?-static
	                        // or /:p?-:p2
	                        optional && segment.length < 2
	                            ? `(?:/${subPattern})`
	                            : '/' + subPattern;
	                if (optional)
	                    subPattern += '?';
	                pattern += subPattern;
	                subSegmentScore += 20 /* PathScore.Dynamic */;
	                if (optional)
	                    subSegmentScore += -8 /* PathScore.BonusOptional */;
	                if (repeatable)
	                    subSegmentScore += -20 /* PathScore.BonusRepeatable */;
	                if (re === '.*')
	                    subSegmentScore += -50 /* PathScore.BonusWildcard */;
	            }
	            segmentScores.push(subSegmentScore);
	        }
	        // an empty array like /home/ -> [[{home}], []]
	        // if (!segment.length) pattern += '/'
	        score.push(segmentScores);
	    }
	    // only apply the strict bonus to the last score
	    if (options.strict && options.end) {
	        const i = score.length - 1;
	        score[i][score[i].length - 1] += 0.7000000000000001 /* PathScore.BonusStrict */;
	    }
	    // TODO: dev only warn double trailing slash
	    if (!options.strict)
	        pattern += '/?';
	    if (options.end)
	        pattern += '$';
	    // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
	    else if (options.strict)
	        pattern += '(?:/|$)';
	    const re = new RegExp(pattern, options.sensitive ? '' : 'i');
	    function parse(path) {
	        const match = path.match(re);
	        const params = {};
	        if (!match)
	            return null;
	        for (let i = 1; i < match.length; i++) {
	            const value = match[i] || '';
	            const key = keys[i - 1];
	            params[key.name] = value && key.repeatable ? value.split('/') : value;
	        }
	        return params;
	    }
	    function stringify(params) {
	        let path = '';
	        // for optional parameters to allow to be empty
	        let avoidDuplicatedSlash = false;
	        for (const segment of segments) {
	            if (!avoidDuplicatedSlash || !path.endsWith('/'))
	                path += '/';
	            avoidDuplicatedSlash = false;
	            for (const token of segment) {
	                if (token.type === 0 /* TokenType.Static */) {
	                    path += token.value;
	                }
	                else if (token.type === 1 /* TokenType.Param */) {
	                    const { value, repeatable, optional } = token;
	                    const param = value in params ? params[value] : '';
	                    if (isArray(param) && !repeatable) {
	                        throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
	                    }
	                    const text = isArray(param)
	                        ? param.join('/')
	                        : param;
	                    if (!text) {
	                        if (optional) {
	                            // if we have more than one optional param like /:a?-static we don't need to care about the optional param
	                            if (segment.length < 2) {
	                                // remove the last slash as we could be at the end
	                                if (path.endsWith('/'))
	                                    path = path.slice(0, -1);
	                                // do not append a slash on the next iteration
	                                else
	                                    avoidDuplicatedSlash = true;
	                            }
	                        }
	                        else
	                            throw new Error(`Missing required param "${value}"`);
	                    }
	                    path += text;
	                }
	            }
	        }
	        // avoid empty path when we have multiple optional params
	        return path || '/';
	    }
	    return {
	        re,
	        score,
	        keys,
	        parse,
	        stringify,
	    };
	}
	/**
	 * Compares an array of numbers as used in PathParser.score and returns a
	 * number. This function can be used to `sort` an array
	 *
	 * @param a - first array of numbers
	 * @param b - second array of numbers
	 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
	 * should be sorted first
	 */
	function compareScoreArray(a, b) {
	    let i = 0;
	    while (i < a.length && i < b.length) {
	        const diff = b[i] - a[i];
	        // only keep going if diff === 0
	        if (diff)
	            return diff;
	        i++;
	    }
	    // if the last subsegment was Static, the shorter segments should be sorted first
	    // otherwise sort the longest segment first
	    if (a.length < b.length) {
	        return a.length === 1 && a[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
	            ? -1
	            : 1;
	    }
	    else if (a.length > b.length) {
	        return b.length === 1 && b[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
	            ? 1
	            : -1;
	    }
	    return 0;
	}
	/**
	 * Compare function that can be used with `sort` to sort an array of PathParser
	 *
	 * @param a - first PathParser
	 * @param b - second PathParser
	 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
	 */
	function comparePathParserScore(a, b) {
	    let i = 0;
	    const aScore = a.score;
	    const bScore = b.score;
	    while (i < aScore.length && i < bScore.length) {
	        const comp = compareScoreArray(aScore[i], bScore[i]);
	        // do not return if both are equal
	        if (comp)
	            return comp;
	        i++;
	    }
	    if (Math.abs(bScore.length - aScore.length) === 1) {
	        if (isLastScoreNegative(aScore))
	            return 1;
	        if (isLastScoreNegative(bScore))
	            return -1;
	    }
	    // if a and b share the same score entries but b has more, sort b first
	    return bScore.length - aScore.length;
	    // this is the ternary version
	    // return aScore.length < bScore.length
	    //   ? 1
	    //   : aScore.length > bScore.length
	    //   ? -1
	    //   : 0
	}
	/**
	 * This allows detecting splats at the end of a path: /home/:id(.*)*
	 *
	 * @param score - score to check
	 * @returns true if the last entry is negative
	 */
	function isLastScoreNegative(score) {
	    const last = score[score.length - 1];
	    return score.length > 0 && last[last.length - 1] < 0;
	}

	const ROOT_TOKEN = {
	    type: 0 /* TokenType.Static */,
	    value: '',
	};
	const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
	// After some profiling, the cache seems to be unnecessary because tokenizePath
	// (the slowest part of adding a route) is very fast
	// const tokenCache = new Map<string, Token[][]>()
	function tokenizePath(path) {
	    if (!path)
	        return [[]];
	    if (path === '/')
	        return [[ROOT_TOKEN]];
	    if (!path.startsWith('/')) {
	        throw new Error(`Invalid path "${path}"`);
	    }
	    // if (tokenCache.has(path)) return tokenCache.get(path)!
	    function crash(message) {
	        throw new Error(`ERR (${state})/"${buffer}": ${message}`);
	    }
	    let state = 0 /* TokenizerState.Static */;
	    let previousState = state;
	    const tokens = [];
	    // the segment will always be valid because we get into the initial state
	    // with the leading /
	    let segment;
	    function finalizeSegment() {
	        if (segment)
	            tokens.push(segment);
	        segment = [];
	    }
	    // index on the path
	    let i = 0;
	    // char at index
	    let char;
	    // buffer of the value read
	    let buffer = '';
	    // custom regexp for a param
	    let customRe = '';
	    function consumeBuffer() {
	        if (!buffer)
	            return;
	        if (state === 0 /* TokenizerState.Static */) {
	            segment.push({
	                type: 0 /* TokenType.Static */,
	                value: buffer,
	            });
	        }
	        else if (state === 1 /* TokenizerState.Param */ ||
	            state === 2 /* TokenizerState.ParamRegExp */ ||
	            state === 3 /* TokenizerState.ParamRegExpEnd */) {
	            if (segment.length > 1 && (char === '*' || char === '+'))
	                crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
	            segment.push({
	                type: 1 /* TokenType.Param */,
	                value: buffer,
	                regexp: customRe,
	                repeatable: char === '*' || char === '+',
	                optional: char === '*' || char === '?',
	            });
	        }
	        else {
	            crash('Invalid state to consume buffer');
	        }
	        buffer = '';
	    }
	    function addCharToBuffer() {
	        buffer += char;
	    }
	    while (i < path.length) {
	        char = path[i++];
	        if (char === '\\' && state !== 2 /* TokenizerState.ParamRegExp */) {
	            previousState = state;
	            state = 4 /* TokenizerState.EscapeNext */;
	            continue;
	        }
	        switch (state) {
	            case 0 /* TokenizerState.Static */:
	                if (char === '/') {
	                    if (buffer) {
	                        consumeBuffer();
	                    }
	                    finalizeSegment();
	                }
	                else if (char === ':') {
	                    consumeBuffer();
	                    state = 1 /* TokenizerState.Param */;
	                }
	                else {
	                    addCharToBuffer();
	                }
	                break;
	            case 4 /* TokenizerState.EscapeNext */:
	                addCharToBuffer();
	                state = previousState;
	                break;
	            case 1 /* TokenizerState.Param */:
	                if (char === '(') {
	                    state = 2 /* TokenizerState.ParamRegExp */;
	                }
	                else if (VALID_PARAM_RE.test(char)) {
	                    addCharToBuffer();
	                }
	                else {
	                    consumeBuffer();
	                    state = 0 /* TokenizerState.Static */;
	                    // go back one character if we were not modifying
	                    if (char !== '*' && char !== '?' && char !== '+')
	                        i--;
	                }
	                break;
	            case 2 /* TokenizerState.ParamRegExp */:
	                // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
	                // it already works by escaping the closing )
	                // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
	                // is this really something people need since you can also write
	                // /prefix_:p()_suffix
	                if (char === ')') {
	                    // handle the escaped )
	                    if (customRe[customRe.length - 1] == '\\')
	                        customRe = customRe.slice(0, -1) + char;
	                    else
	                        state = 3 /* TokenizerState.ParamRegExpEnd */;
	                }
	                else {
	                    customRe += char;
	                }
	                break;
	            case 3 /* TokenizerState.ParamRegExpEnd */:
	                // same as finalizing a param
	                consumeBuffer();
	                state = 0 /* TokenizerState.Static */;
	                // go back one character if we were not modifying
	                if (char !== '*' && char !== '?' && char !== '+')
	                    i--;
	                customRe = '';
	                break;
	            default:
	                crash('Unknown state');
	                break;
	        }
	    }
	    if (state === 2 /* TokenizerState.ParamRegExp */)
	        crash(`Unfinished custom RegExp for param "${buffer}"`);
	    consumeBuffer();
	    finalizeSegment();
	    // tokenCache.set(path, tokens)
	    return tokens;
	}

	function createRouteRecordMatcher(record, parent, options) {
	    const parser = tokensToParser(tokenizePath(record.path), options);
	    const matcher = assign(parser, {
	        record,
	        parent,
	        // these needs to be populated by the parent
	        children: [],
	        alias: [],
	    });
	    if (parent) {
	        // both are aliases or both are not aliases
	        // we don't want to mix them because the order is used when
	        // passing originalRecord in Matcher.addRoute
	        if (!matcher.record.aliasOf === !parent.record.aliasOf)
	            parent.children.push(matcher);
	    }
	    return matcher;
	}

	/**
	 * Creates a Router Matcher.
	 *
	 * @internal
	 * @param routes - array of initial routes
	 * @param globalOptions - global route options
	 */
	function createRouterMatcher(routes, globalOptions) {
	    // normalized ordered array of matchers
	    const matchers = [];
	    const matcherMap = new Map();
	    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
	    function getRecordMatcher(name) {
	        return matcherMap.get(name);
	    }
	    function addRoute(record, parent, originalRecord) {
	        // used later on to remove by name
	        const isRootAdd = !originalRecord;
	        const mainNormalizedRecord = normalizeRouteRecord(record);
	        // we might be the child of an alias
	        mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
	        const options = mergeOptions(globalOptions, record);
	        // generate an array of records to correctly handle aliases
	        const normalizedRecords = [
	            mainNormalizedRecord,
	        ];
	        if ('alias' in record) {
	            const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
	            for (const alias of aliases) {
	                normalizedRecords.push(assign({}, mainNormalizedRecord, {
	                    // this allows us to hold a copy of the `components` option
	                    // so that async components cache is hold on the original record
	                    components: originalRecord
	                        ? originalRecord.record.components
	                        : mainNormalizedRecord.components,
	                    path: alias,
	                    // we might be the child of an alias
	                    aliasOf: originalRecord
	                        ? originalRecord.record
	                        : mainNormalizedRecord,
	                    // the aliases are always of the same kind as the original since they
	                    // are defined on the same record
	                }));
	            }
	        }
	        let matcher;
	        let originalMatcher;
	        for (const normalizedRecord of normalizedRecords) {
	            const { path } = normalizedRecord;
	            // Build up the path for nested routes if the child isn't an absolute
	            // route. Only add the / delimiter if the child path isn't empty and if the
	            // parent path doesn't have a trailing slash
	            if (parent && path[0] !== '/') {
	                const parentPath = parent.record.path;
	                const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
	                normalizedRecord.path =
	                    parent.record.path + (path && connectingSlash + path);
	            }
	            // create the object before hand so it can be passed to children
	            matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
	            // if we are an alias we must tell the original record that we exist
	            // so we can be removed
	            if (originalRecord) {
	                originalRecord.alias.push(matcher);
	            }
	            else {
	                // otherwise, the first record is the original and others are aliases
	                originalMatcher = originalMatcher || matcher;
	                if (originalMatcher !== matcher)
	                    originalMatcher.alias.push(matcher);
	                // remove the route if named and only for the top record (avoid in nested calls)
	                // this works because the original record is the first one
	                if (isRootAdd && record.name && !isAliasRecord(matcher))
	                    removeRoute(record.name);
	            }
	            if (mainNormalizedRecord.children) {
	                const children = mainNormalizedRecord.children;
	                for (let i = 0; i < children.length; i++) {
	                    addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
	                }
	            }
	            // if there was no original record, then the first one was not an alias and all
	            // other alias (if any) need to reference this record when adding children
	            originalRecord = originalRecord || matcher;
	            // TODO: add normalized records for more flexibility
	            // if (parent && isAliasRecord(originalRecord)) {
	            //   parent.children.push(originalRecord)
	            // }
	            insertMatcher(matcher);
	        }
	        return originalMatcher
	            ? () => {
	                // since other matchers are aliases, they should be removed by the original matcher
	                removeRoute(originalMatcher);
	            }
	            : noop;
	    }
	    function removeRoute(matcherRef) {
	        if (isRouteName(matcherRef)) {
	            const matcher = matcherMap.get(matcherRef);
	            if (matcher) {
	                matcherMap.delete(matcherRef);
	                matchers.splice(matchers.indexOf(matcher), 1);
	                matcher.children.forEach(removeRoute);
	                matcher.alias.forEach(removeRoute);
	            }
	        }
	        else {
	            const index = matchers.indexOf(matcherRef);
	            if (index > -1) {
	                matchers.splice(index, 1);
	                if (matcherRef.record.name)
	                    matcherMap.delete(matcherRef.record.name);
	                matcherRef.children.forEach(removeRoute);
	                matcherRef.alias.forEach(removeRoute);
	            }
	        }
	    }
	    function getRoutes() {
	        return matchers;
	    }
	    function insertMatcher(matcher) {
	        let i = 0;
	        while (i < matchers.length &&
	            comparePathParserScore(matcher, matchers[i]) >= 0 &&
	            // Adding children with empty path should still appear before the parent
	            // https://github.com/vuejs/router/issues/1124
	            (matcher.record.path !== matchers[i].record.path ||
	                !isRecordChildOf(matcher, matchers[i])))
	            i++;
	        matchers.splice(i, 0, matcher);
	        // only add the original record to the name map
	        if (matcher.record.name && !isAliasRecord(matcher))
	            matcherMap.set(matcher.record.name, matcher);
	    }
	    function resolve(location, currentLocation) {
	        let matcher;
	        let params = {};
	        let path;
	        let name;
	        if ('name' in location && location.name) {
	            matcher = matcherMap.get(location.name);
	            if (!matcher)
	                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
	                    location,
	                });
	            name = matcher.record.name;
	            params = assign(
	            // paramsFromLocation is a new object
	            paramsFromLocation(currentLocation.params, 
	            // only keep params that exist in the resolved location
	            // TODO: only keep optional params coming from a parent record
	            matcher.keys.filter(k => !k.optional).map(k => k.name)), location.params);
	            // throws if cannot be stringified
	            path = matcher.stringify(params);
	        }
	        else if ('path' in location) {
	            // no need to resolve the path with the matcher as it was provided
	            // this also allows the user to control the encoding
	            path = location.path;
	            matcher = matchers.find(m => m.re.test(path));
	            // matcher should have a value after the loop
	            if (matcher) {
	                // TODO: dev warning of unused params if provided
	                // we know the matcher works because we tested the regexp
	                params = matcher.parse(path);
	                name = matcher.record.name;
	            }
	            // location is a relative path
	        }
	        else {
	            // match by name or path of current route
	            matcher = currentLocation.name
	                ? matcherMap.get(currentLocation.name)
	                : matchers.find(m => m.re.test(currentLocation.path));
	            if (!matcher)
	                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
	                    location,
	                    currentLocation,
	                });
	            name = matcher.record.name;
	            // since we are navigating to the same location, we don't need to pick the
	            // params like when `name` is provided
	            params = assign({}, currentLocation.params, location.params);
	            path = matcher.stringify(params);
	        }
	        const matched = [];
	        let parentMatcher = matcher;
	        while (parentMatcher) {
	            // reversed order so parents are at the beginning
	            matched.unshift(parentMatcher.record);
	            parentMatcher = parentMatcher.parent;
	        }
	        return {
	            name,
	            path,
	            params,
	            matched,
	            meta: mergeMetaFields(matched),
	        };
	    }
	    // add initial routes
	    routes.forEach(route => addRoute(route));
	    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
	}
	function paramsFromLocation(params, keys) {
	    const newParams = {};
	    for (const key of keys) {
	        if (key in params)
	            newParams[key] = params[key];
	    }
	    return newParams;
	}
	/**
	 * Normalizes a RouteRecordRaw. Creates a copy
	 *
	 * @param record
	 * @returns the normalized version
	 */
	function normalizeRouteRecord(record) {
	    return {
	        path: record.path,
	        redirect: record.redirect,
	        name: record.name,
	        meta: record.meta || {},
	        aliasOf: undefined,
	        beforeEnter: record.beforeEnter,
	        props: normalizeRecordProps(record),
	        children: record.children || [],
	        instances: {},
	        leaveGuards: new Set(),
	        updateGuards: new Set(),
	        enterCallbacks: {},
	        components: 'components' in record
	            ? record.components || null
	            : record.component && { default: record.component },
	    };
	}
	/**
	 * Normalize the optional `props` in a record to always be an object similar to
	 * components. Also accept a boolean for components.
	 * @param record
	 */
	function normalizeRecordProps(record) {
	    const propsObject = {};
	    // props does not exist on redirect records but we can set false directly
	    const props = record.props || false;
	    if ('component' in record) {
	        propsObject.default = props;
	    }
	    else {
	        // NOTE: we could also allow a function to be applied to every component.
	        // Would need user feedback for use cases
	        for (const name in record.components)
	            propsObject[name] = typeof props === 'boolean' ? props : props[name];
	    }
	    return propsObject;
	}
	/**
	 * Checks if a record or any of its parent is an alias
	 * @param record
	 */
	function isAliasRecord(record) {
	    while (record) {
	        if (record.record.aliasOf)
	            return true;
	        record = record.parent;
	    }
	    return false;
	}
	/**
	 * Merge meta fields of an array of records
	 *
	 * @param matched - array of matched records
	 */
	function mergeMetaFields(matched) {
	    return matched.reduce((meta, record) => assign(meta, record.meta), {});
	}
	function mergeOptions(defaults, partialOptions) {
	    const options = {};
	    for (const key in defaults) {
	        options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	    }
	    return options;
	}
	function isRecordChildOf(record, parent) {
	    return parent.children.some(child => child === record || isRecordChildOf(record, child));
	}

	/**
	 * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
	 * < > `
	 *
	 * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
	 * defines some extra characters to be encoded. Most browsers do not encode them
	 * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
	 * also encode `!'()*`. Leaving unencoded only ASCII alphanumeric(`a-zA-Z0-9`)
	 * plus `-._~`. This extra safety should be applied to query by patching the
	 * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
	 * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
	 * into a `/` if directly typed in. The _backtick_ (`````) should also be
	 * encoded everywhere because some browsers like FF encode it when directly
	 * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
	 */
	// const EXTRA_RESERVED_RE = /[!'()*]/g
	// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
	const HASH_RE = /#/g; // %23
	const AMPERSAND_RE = /&/g; // %26
	const SLASH_RE = /\//g; // %2F
	const EQUAL_RE = /=/g; // %3D
	const IM_RE = /\?/g; // %3F
	const PLUS_RE = /\+/g; // %2B
	/**
	 * NOTE: It's not clear to me if we should encode the + symbol in queries, it
	 * seems to be less flexible than not doing so and I can't find out the legacy
	 * systems requiring this for regular requests like text/html. In the standard,
	 * the encoding of the plus character is only mentioned for
	 * application/x-www-form-urlencoded
	 * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
	 * leave the plus character as is in queries. To be more flexible, we allow the
	 * plus character on the query but it can also be manually encoded by the user.
	 *
	 * Resources:
	 * - https://url.spec.whatwg.org/#urlencoded-parsing
	 * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
	 */
	const ENC_BRACKET_OPEN_RE = /%5B/g; // [
	const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
	const ENC_CARET_RE = /%5E/g; // ^
	const ENC_BACKTICK_RE = /%60/g; // `
	const ENC_CURLY_OPEN_RE = /%7B/g; // {
	const ENC_PIPE_RE = /%7C/g; // |
	const ENC_CURLY_CLOSE_RE = /%7D/g; // }
	const ENC_SPACE_RE = /%20/g; // }
	/**
	 * Encode characters that need to be encoded on the path, search and hash
	 * sections of the URL.
	 *
	 * @internal
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function commonEncode(text) {
	    return encodeURI('' + text)
	        .replace(ENC_PIPE_RE, '|')
	        .replace(ENC_BRACKET_OPEN_RE, '[')
	        .replace(ENC_BRACKET_CLOSE_RE, ']');
	}
	/**
	 * Encode characters that need to be encoded on the hash section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeHash(text) {
	    return commonEncode(text)
	        .replace(ENC_CURLY_OPEN_RE, '{')
	        .replace(ENC_CURLY_CLOSE_RE, '}')
	        .replace(ENC_CARET_RE, '^');
	}
	/**
	 * Encode characters that need to be encoded query values on the query
	 * section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeQueryValue(text) {
	    return (commonEncode(text)
	        // Encode the space as +, encode the + to differentiate it from the space
	        .replace(PLUS_RE, '%2B')
	        .replace(ENC_SPACE_RE, '+')
	        .replace(HASH_RE, '%23')
	        .replace(AMPERSAND_RE, '%26')
	        .replace(ENC_BACKTICK_RE, '`')
	        .replace(ENC_CURLY_OPEN_RE, '{')
	        .replace(ENC_CURLY_CLOSE_RE, '}')
	        .replace(ENC_CARET_RE, '^'));
	}
	/**
	 * Like `encodeQueryValue` but also encodes the `=` character.
	 *
	 * @param text - string to encode
	 */
	function encodeQueryKey(text) {
	    return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
	}
	/**
	 * Encode characters that need to be encoded on the path section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodePath(text) {
	    return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
	}
	/**
	 * Encode characters that need to be encoded on the path section of the URL as a
	 * param. This function encodes everything {@link encodePath} does plus the
	 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
	 * string instead.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeParam(text) {
	    return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
	}
	/**
	 * Decode text using `decodeURIComponent`. Returns the original text if it
	 * fails.
	 *
	 * @param text - string to decode
	 * @returns decoded string
	 */
	function decode(text) {
	    try {
	        return decodeURIComponent('' + text);
	    }
	    catch (err) {
	    }
	    return '' + text;
	}

	/**
	 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
	 * version with the leading `?` and without Should work as URLSearchParams

	 * @internal
	 *
	 * @param search - search string to parse
	 * @returns a query object
	 */
	function parseQuery(search) {
	    const query = {};
	    // avoid creating an object with an empty key and empty value
	    // because of split('&')
	    if (search === '' || search === '?')
	        return query;
	    const hasLeadingIM = search[0] === '?';
	    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
	    for (let i = 0; i < searchParams.length; ++i) {
	        // pre decode the + into space
	        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
	        // allow the = character
	        const eqPos = searchParam.indexOf('=');
	        const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
	        const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
	        if (key in query) {
	            // an extra variable for ts types
	            let currentValue = query[key];
	            if (!isArray(currentValue)) {
	                currentValue = query[key] = [currentValue];
	            }
	            currentValue.push(value);
	        }
	        else {
	            query[key] = value;
	        }
	    }
	    return query;
	}
	/**
	 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
	 * doesn't prepend a `?`
	 *
	 * @internal
	 *
	 * @param query - query object to stringify
	 * @returns string version of the query without the leading `?`
	 */
	function stringifyQuery(query) {
	    let search = '';
	    for (let key in query) {
	        const value = query[key];
	        key = encodeQueryKey(key);
	        if (value == null) {
	            // only null adds the value
	            if (value !== undefined) {
	                search += (search.length ? '&' : '') + key;
	            }
	            continue;
	        }
	        // keep null values
	        const values = isArray(value)
	            ? value.map(v => v && encodeQueryValue(v))
	            : [value && encodeQueryValue(value)];
	        values.forEach(value => {
	            // skip undefined values in arrays as if they were not present
	            // smaller code than using filter
	            if (value !== undefined) {
	                // only append & with non-empty search
	                search += (search.length ? '&' : '') + key;
	                if (value != null)
	                    search += '=' + value;
	            }
	        });
	    }
	    return search;
	}
	/**
	 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
	 * numbers into strings, removing keys with an undefined value and replacing
	 * undefined with null in arrays
	 *
	 * @param query - query object to normalize
	 * @returns a normalized query object
	 */
	function normalizeQuery(query) {
	    const normalizedQuery = {};
	    for (const key in query) {
	        const value = query[key];
	        if (value !== undefined) {
	            normalizedQuery[key] = isArray(value)
	                ? value.map(v => (v == null ? null : '' + v))
	                : value == null
	                    ? value
	                    : '' + value;
	        }
	    }
	    return normalizedQuery;
	}

	/**
	 * RouteRecord being rendered by the closest ancestor Router View. Used for
	 * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
	 * Location Matched
	 *
	 * @internal
	 */
	const matchedRouteKey = Symbol('');
	/**
	 * Allows overriding the router view depth to control which component in
	 * `matched` is rendered. rvd stands for Router View Depth
	 *
	 * @internal
	 */
	const viewDepthKey = Symbol('');
	/**
	 * Allows overriding the router instance returned by `useRouter` in tests. r
	 * stands for router
	 *
	 * @internal
	 */
	const routerKey = Symbol('');
	/**
	 * Allows overriding the current route returned by `useRoute` in tests. rl
	 * stands for route location
	 *
	 * @internal
	 */
	const routeLocationKey = Symbol('');
	/**
	 * Allows overriding the current route used by router-view. Internally this is
	 * used when the `route` prop is passed.
	 *
	 * @internal
	 */
	const routerViewLocationKey = Symbol('');

	/**
	 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
	 */
	function useCallbacks() {
	    let handlers = [];
	    function add(handler) {
	        handlers.push(handler);
	        return () => {
	            const i = handlers.indexOf(handler);
	            if (i > -1)
	                handlers.splice(i, 1);
	        };
	    }
	    function reset() {
	        handlers = [];
	    }
	    return {
	        add,
	        list: () => handlers,
	        reset,
	    };
	}

	function registerGuard(record, name, guard) {
	    const removeFromList = () => {
	        record[name].delete(guard);
	    };
	    vue.onUnmounted(removeFromList);
	    vue.onDeactivated(removeFromList);
	    vue.onActivated(() => {
	        record[name].add(guard);
	    });
	    record[name].add(guard);
	}
	/**
	 * Add a navigation guard that triggers whenever the component for the current
	 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
	 * used in any component. The guard is removed when the component is unmounted.
	 *
	 * @param leaveGuard - {@link NavigationGuard}
	 */
	function onBeforeRouteLeave(leaveGuard) {
	    const activeRecord = vue.inject(matchedRouteKey, 
	    // to avoid warning
	    {}).value;
	    if (!activeRecord) {
	        return;
	    }
	    registerGuard(activeRecord, 'leaveGuards', leaveGuard);
	}
	/**
	 * Add a navigation guard that triggers whenever the current location is about
	 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
	 * component. The guard is removed when the component is unmounted.
	 *
	 * @param updateGuard - {@link NavigationGuard}
	 */
	function onBeforeRouteUpdate(updateGuard) {
	    const activeRecord = vue.inject(matchedRouteKey, 
	    // to avoid warning
	    {}).value;
	    if (!activeRecord) {
	        return;
	    }
	    registerGuard(activeRecord, 'updateGuards', updateGuard);
	}
	function guardToPromiseFn(guard, to, from, record, name) {
	    // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
	    const enterCallbackArray = record &&
	        // name is defined if record is because of the function overload
	        (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
	    return () => new Promise((resolve, reject) => {
	        const next = (valid) => {
	            if (valid === false) {
	                reject(createRouterError(4 /* ErrorTypes.NAVIGATION_ABORTED */, {
	                    from,
	                    to,
	                }));
	            }
	            else if (valid instanceof Error) {
	                reject(valid);
	            }
	            else if (isRouteLocation(valid)) {
	                reject(createRouterError(2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, {
	                    from: to,
	                    to: valid,
	                }));
	            }
	            else {
	                if (enterCallbackArray &&
	                    // since enterCallbackArray is truthy, both record and name also are
	                    record.enterCallbacks[name] === enterCallbackArray &&
	                    typeof valid === 'function') {
	                    enterCallbackArray.push(valid);
	                }
	                resolve();
	            }
	        };
	        // wrapping with Promise.resolve allows it to work with both async and sync guards
	        const guardReturn = guard.call(record && record.instances[name], to, from, next);
	        let guardCall = Promise.resolve(guardReturn);
	        if (guard.length < 3)
	            guardCall = guardCall.then(next);
	        guardCall.catch(err => reject(err));
	    });
	}
	function extractComponentsGuards(matched, guardType, to, from) {
	    const guards = [];
	    for (const record of matched) {
	        for (const name in record.components) {
	            let rawComponent = record.components[name];
	            // skip update and leave guards if the route component is not mounted
	            if (guardType !== 'beforeRouteEnter' && !record.instances[name])
	                continue;
	            if (isRouteComponent(rawComponent)) {
	                // __vccOpts is added by vue-class-component and contain the regular options
	                const options = rawComponent.__vccOpts || rawComponent;
	                const guard = options[guardType];
	                guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
	            }
	            else {
	                // start requesting the chunk already
	                let componentPromise = rawComponent();
	                guards.push(() => componentPromise.then(resolved => {
	                    if (!resolved)
	                        return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
	                    const resolvedComponent = isESModule(resolved)
	                        ? resolved.default
	                        : resolved;
	                    // replace the function with the resolved component
	                    // cannot be null or undefined because we went into the for loop
	                    record.components[name] = resolvedComponent;
	                    // __vccOpts is added by vue-class-component and contain the regular options
	                    const options = resolvedComponent.__vccOpts || resolvedComponent;
	                    const guard = options[guardType];
	                    return guard && guardToPromiseFn(guard, to, from, record, name)();
	                }));
	            }
	        }
	    }
	    return guards;
	}
	/**
	 * Allows differentiating lazy components from functional components and vue-class-component
	 * @internal
	 *
	 * @param component
	 */
	function isRouteComponent(component) {
	    return (typeof component === 'object' ||
	        'displayName' in component ||
	        'props' in component ||
	        '__vccOpts' in component);
	}
	/**
	 * Ensures a route is loaded so it can be passed as o prop to `<RouterView>`.
	 *
	 * @param route - resolved route to load
	 */
	function loadRouteLocation(route) {
	    return route.matched.every(record => record.redirect)
	        ? Promise.reject(new Error('Cannot load a route that redirects.'))
	        : Promise.all(route.matched.map(record => record.components &&
	            Promise.all(Object.keys(record.components).reduce((promises, name) => {
	                const rawComponent = record.components[name];
	                if (typeof rawComponent === 'function' &&
	                    !('displayName' in rawComponent)) {
	                    promises.push(rawComponent().then(resolved => {
	                        if (!resolved)
	                            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
	                        const resolvedComponent = isESModule(resolved)
	                            ? resolved.default
	                            : resolved;
	                        // replace the function with the resolved component
	                        // cannot be null or undefined because we went into the for loop
	                        record.components[name] = resolvedComponent;
	                        return;
	                    }));
	                }
	                return promises;
	            }, [])))).then(() => route);
	}

	// TODO: we could allow currentRoute as a prop to expose `isActive` and
	// `isExactActive` behavior should go through an RFC
	function useLink(props) {
	    const router = vue.inject(routerKey);
	    const currentRoute = vue.inject(routeLocationKey);
	    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
	    const activeRecordIndex = vue.computed(() => {
	        const { matched } = route.value;
	        const { length } = matched;
	        const routeMatched = matched[length - 1];
	        const currentMatched = currentRoute.matched;
	        if (!routeMatched || !currentMatched.length)
	            return -1;
	        const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	        if (index > -1)
	            return index;
	        // possible parent record
	        const parentRecordPath = getOriginalPath(matched[length - 2]);
	        return (
	        // we are dealing with nested routes
	        length > 1 &&
	            // if the parent and matched route have the same path, this link is
	            // referring to the empty child. Or we currently are on a different
	            // child of the same parent
	            getOriginalPath(routeMatched) === parentRecordPath &&
	            // avoid comparing the child with its parent
	            currentMatched[currentMatched.length - 1].path !== parentRecordPath
	            ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]))
	            : index);
	    });
	    const isActive = vue.computed(() => activeRecordIndex.value > -1 &&
	        includesParams(currentRoute.params, route.value.params));
	    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 &&
	        activeRecordIndex.value === currentRoute.matched.length - 1 &&
	        isSameRouteLocationParams(currentRoute.params, route.value.params));
	    function navigate(e = {}) {
	        if (guardEvent(e)) {
	            return router[vue.unref(props.replace) ? 'replace' : 'push'](vue.unref(props.to)
	            // avoid uncaught errors are they are logged anyway
	            ).catch(noop);
	        }
	        return Promise.resolve();
	    }
	    return {
	        route,
	        href: vue.computed(() => route.value.href),
	        isActive,
	        isExactActive,
	        navigate,
	    };
	}
	const RouterLinkImpl = /*#__PURE__*/ vue.defineComponent({
	    name: 'RouterLink',
	    compatConfig: { MODE: 3 },
	    props: {
	        to: {
	            type: [String, Object],
	            required: true,
	        },
	        replace: Boolean,
	        activeClass: String,
	        // inactiveClass: String,
	        exactActiveClass: String,
	        custom: Boolean,
	        ariaCurrentValue: {
	            type: String,
	            default: 'page',
	        },
	    },
	    useLink,
	    setup(props, { slots }) {
	        const link = vue.reactive(useLink(props));
	        const { options } = vue.inject(routerKey);
	        const elClass = vue.computed(() => ({
	            [getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active')]: link.isActive,
	            // [getLinkClass(
	            //   props.inactiveClass,
	            //   options.linkInactiveClass,
	            //   'router-link-inactive'
	            // )]: !link.isExactActive,
	            [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active')]: link.isExactActive,
	        }));
	        return () => {
	            const children = slots.default && slots.default(link);
	            return props.custom
	                ? children
	                : vue.h('a', {
	                    'aria-current': link.isExactActive
	                        ? props.ariaCurrentValue
	                        : null,
	                    href: link.href,
	                    // this would override user added attrs but Vue will still add
	                    // the listener so we end up triggering both
	                    onClick: link.navigate,
	                    class: elClass.value,
	                }, children);
	        };
	    },
	});
	// export the public type for h/tsx inference
	// also to avoid inline import() in generated d.ts files
	/**
	 * Component to render a link that triggers a navigation on click.
	 */
	const RouterLink = RouterLinkImpl;
	function guardEvent(e) {
	    // don't redirect with control keys
	    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
	        return;
	    // don't redirect when preventDefault called
	    if (e.defaultPrevented)
	        return;
	    // don't redirect on right click
	    if (e.button !== undefined && e.button !== 0)
	        return;
	    // don't redirect if `target="_blank"`
	    // @ts-expect-error getAttribute does exist
	    if (e.currentTarget && e.currentTarget.getAttribute) {
	        // @ts-expect-error getAttribute exists
	        const target = e.currentTarget.getAttribute('target');
	        if (/\b_blank\b/i.test(target))
	            return;
	    }
	    // this may be a Weex event which doesn't have this method
	    if (e.preventDefault)
	        e.preventDefault();
	    return true;
	}
	function includesParams(outer, inner) {
	    for (const key in inner) {
	        const innerValue = inner[key];
	        const outerValue = outer[key];
	        if (typeof innerValue === 'string') {
	            if (innerValue !== outerValue)
	                return false;
	        }
	        else {
	            if (!isArray(outerValue) ||
	                outerValue.length !== innerValue.length ||
	                innerValue.some((value, i) => value !== outerValue[i]))
	                return false;
	        }
	    }
	    return true;
	}
	/**
	 * Get the original path value of a record by following its aliasOf
	 * @param record
	 */
	function getOriginalPath(record) {
	    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : '';
	}
	/**
	 * Utility class to get the active class based on defaults.
	 * @param propClass
	 * @param globalClass
	 * @param defaultClass
	 */
	const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null
	    ? propClass
	    : globalClass != null
	        ? globalClass
	        : defaultClass;

	const RouterViewImpl = /*#__PURE__*/ vue.defineComponent({
	    name: 'RouterView',
	    // #674 we manually inherit them
	    inheritAttrs: false,
	    props: {
	        name: {
	            type: String,
	            default: 'default',
	        },
	        route: Object,
	    },
	    // Better compat for @vue/compat users
	    // https://github.com/vuejs/router/issues/1315
	    compatConfig: { MODE: 3 },
	    setup(props, { attrs, slots }) {
	        const injectedRoute = vue.inject(routerViewLocationKey);
	        const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
	        const injectedDepth = vue.inject(viewDepthKey, 0);
	        // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
	        // that are used to reuse the `path` property
	        const depth = vue.computed(() => {
	            let initialDepth = vue.unref(injectedDepth);
	            const { matched } = routeToDisplay.value;
	            let matchedRoute;
	            while ((matchedRoute = matched[initialDepth]) &&
	                !matchedRoute.components) {
	                initialDepth++;
	            }
	            return initialDepth;
	        });
	        const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth.value]);
	        vue.provide(viewDepthKey, vue.computed(() => depth.value + 1));
	        vue.provide(matchedRouteKey, matchedRouteRef);
	        vue.provide(routerViewLocationKey, routeToDisplay);
	        const viewRef = vue.ref();
	        // watch at the same time the component instance, the route record we are
	        // rendering, and the name
	        vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
	            // copy reused instances
	            if (to) {
	                // this will update the instance for new instances as well as reused
	                // instances when navigating to a new route
	                to.instances[name] = instance;
	                // the component instance is reused for a different route or name so
	                // we copy any saved update or leave guards. With async setup, the
	                // mounting component will mount before the matchedRoute changes,
	                // making instance === oldInstance, so we check if guards have been
	                // added before. This works because we remove guards when
	                // unmounting/deactivating components
	                if (from && from !== to && instance && instance === oldInstance) {
	                    if (!to.leaveGuards.size) {
	                        to.leaveGuards = from.leaveGuards;
	                    }
	                    if (!to.updateGuards.size) {
	                        to.updateGuards = from.updateGuards;
	                    }
	                }
	            }
	            // trigger beforeRouteEnter next callbacks
	            if (instance &&
	                to &&
	                // if there is no instance but to and from are the same this might be
	                // the first visit
	                (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
	                (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
	            }
	        }, { flush: 'post' });
	        return () => {
	            const route = routeToDisplay.value;
	            // we need the value at the time we render because when we unmount, we
	            // navigated to a different location so the value is different
	            const currentName = props.name;
	            const matchedRoute = matchedRouteRef.value;
	            const ViewComponent = matchedRoute && matchedRoute.components[currentName];
	            if (!ViewComponent) {
	                return normalizeSlot(slots.default, { Component: ViewComponent, route });
	            }
	            // props from route configuration
	            const routePropsOption = matchedRoute.props[currentName];
	            const routeProps = routePropsOption
	                ? routePropsOption === true
	                    ? route.params
	                    : typeof routePropsOption === 'function'
	                        ? routePropsOption(route)
	                        : routePropsOption
	                : null;
	            const onVnodeUnmounted = vnode => {
	                // remove the instance reference to prevent leak
	                if (vnode.component.isUnmounted) {
	                    matchedRoute.instances[currentName] = null;
	                }
	            };
	            const component = vue.h(ViewComponent, assign({}, routeProps, attrs, {
	                onVnodeUnmounted,
	                ref: viewRef,
	            }));
	            return (
	            // pass the vnode to the slot as a prop.
	            // h and <component :is="..."> both accept vnodes
	            normalizeSlot(slots.default, { Component: component, route }) ||
	                component);
	        };
	    },
	});
	function normalizeSlot(slot, data) {
	    if (!slot)
	        return null;
	    const slotContent = slot(data);
	    return slotContent.length === 1 ? slotContent[0] : slotContent;
	}
	// export the public type for h/tsx inference
	// also to avoid inline import() in generated d.ts files
	/**
	 * Component to display the current route the user is at.
	 */
	const RouterView = RouterViewImpl;

	/**
	 * Creates a Router instance that can be used by a Vue app.
	 *
	 * @param options - {@link RouterOptions}
	 */
	function createRouter(options) {
	    const matcher = createRouterMatcher(options.routes, options);
	    const parseQuery$1 = options.parseQuery || parseQuery;
	    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
	    const routerHistory = options.history;
	    const beforeGuards = useCallbacks();
	    const beforeResolveGuards = useCallbacks();
	    const afterGuards = useCallbacks();
	    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
	    let pendingLocation = START_LOCATION_NORMALIZED;
	    const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue);
	    const encodeParams = applyToParams.bind(null, encodeParam);
	    const decodeParams = 
	    // @ts-expect-error: intentionally avoid the type check
	    applyToParams.bind(null, decode);
	    function addRoute(parentOrRoute, route) {
	        let parent;
	        let record;
	        if (isRouteName(parentOrRoute)) {
	            parent = matcher.getRecordMatcher(parentOrRoute);
	            record = route;
	        }
	        else {
	            record = parentOrRoute;
	        }
	        return matcher.addRoute(record, parent);
	    }
	    function removeRoute(name) {
	        const recordMatcher = matcher.getRecordMatcher(name);
	        if (recordMatcher) {
	            matcher.removeRoute(recordMatcher);
	        }
	    }
	    function getRoutes() {
	        return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
	    }
	    function hasRoute(name) {
	        return !!matcher.getRecordMatcher(name);
	    }
	    function resolve(rawLocation, currentLocation) {
	        // const objectLocation = routerLocationAsObject(rawLocation)
	        // we create a copy to modify it later
	        currentLocation = assign({}, currentLocation || currentRoute.value);
	        if (typeof rawLocation === 'string') {
	            const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
	            const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
	            const href = routerHistory.createHref(locationNormalized.fullPath);
	            // locationNormalized is always a new object
	            return assign(locationNormalized, matchedRoute, {
	                params: decodeParams(matchedRoute.params),
	                hash: decode(locationNormalized.hash),
	                redirectedFrom: undefined,
	                href,
	            });
	        }
	        let matcherLocation;
	        // path could be relative in object as well
	        if ('path' in rawLocation) {
	            matcherLocation = assign({}, rawLocation, {
	                path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path,
	            });
	        }
	        else {
	            // remove any nullish param
	            const targetParams = assign({}, rawLocation.params);
	            for (const key in targetParams) {
	                if (targetParams[key] == null) {
	                    delete targetParams[key];
	                }
	            }
	            // pass encoded values to the matcher so it can produce encoded path and fullPath
	            matcherLocation = assign({}, rawLocation, {
	                params: encodeParams(rawLocation.params),
	            });
	            // current location params are decoded, we need to encode them in case the
	            // matcher merges the params
	            currentLocation.params = encodeParams(currentLocation.params);
	        }
	        const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
	        const hash = rawLocation.hash || '';
	        // decoding them) the matcher might have merged current location params so
	        // we need to run the decoding again
	        matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
	        const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
	            hash: encodeHash(hash),
	            path: matchedRoute.path,
	        }));
	        const href = routerHistory.createHref(fullPath);
	        return assign({
	            fullPath,
	            // keep the hash encoded so fullPath is effectively path + encodedQuery +
	            // hash
	            hash,
	            query: 
	            // if the user is using a custom query lib like qs, we might have
	            // nested objects, so we keep the query as is, meaning it can contain
	            // numbers at `$route.query`, but at the point, the user will have to
	            // use their own type anyway.
	            // https://github.com/vuejs/router/issues/328#issuecomment-649481567
	            stringifyQuery$1 === stringifyQuery
	                ? normalizeQuery(rawLocation.query)
	                : (rawLocation.query || {}),
	        }, matchedRoute, {
	            redirectedFrom: undefined,
	            href,
	        });
	    }
	    function locationAsObject(to) {
	        return typeof to === 'string'
	            ? parseURL(parseQuery$1, to, currentRoute.value.path)
	            : assign({}, to);
	    }
	    function checkCanceledNavigation(to, from) {
	        if (pendingLocation !== to) {
	            return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
	                from,
	                to,
	            });
	        }
	    }
	    function push(to) {
	        return pushWithRedirect(to);
	    }
	    function replace(to) {
	        return push(assign(locationAsObject(to), { replace: true }));
	    }
	    function handleRedirectRecord(to) {
	        const lastMatched = to.matched[to.matched.length - 1];
	        if (lastMatched && lastMatched.redirect) {
	            const { redirect } = lastMatched;
	            let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
	            if (typeof newTargetLocation === 'string') {
	                newTargetLocation =
	                    newTargetLocation.includes('?') || newTargetLocation.includes('#')
	                        ? (newTargetLocation = locationAsObject(newTargetLocation))
	                        : // force empty params
	                            { path: newTargetLocation };
	                // @ts-expect-error: force empty params when a string is passed to let
	                // the router parse them again
	                newTargetLocation.params = {};
	            }
	            return assign({
	                query: to.query,
	                hash: to.hash,
	                // avoid transferring params if the redirect has a path
	                params: 'path' in newTargetLocation ? {} : to.params,
	            }, newTargetLocation);
	        }
	    }
	    function pushWithRedirect(to, redirectedFrom) {
	        const targetLocation = (pendingLocation = resolve(to));
	        const from = currentRoute.value;
	        const data = to.state;
	        const force = to.force;
	        // to could be a string where `replace` is a function
	        const replace = to.replace === true;
	        const shouldRedirect = handleRedirectRecord(targetLocation);
	        if (shouldRedirect)
	            return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
	                state: data,
	                force,
	                replace,
	            }), 
	            // keep original redirectedFrom if it exists
	            redirectedFrom || targetLocation);
	        // if it was a redirect we already called `pushWithRedirect` above
	        const toLocation = targetLocation;
	        toLocation.redirectedFrom = redirectedFrom;
	        let failure;
	        if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
	            failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, { to: toLocation, from });
	            // trigger scroll to allow scrolling to the same anchor
	            handleScroll();
	        }
	        return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
	            .catch((error) => isNavigationFailure(error)
	            ? // navigation redirects still mark the router as ready
	                isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)
	                    ? error
	                    : markAsReady(error) // also returns the error
	            : // reject any unknown error
	                triggerError(error, toLocation, from))
	            .then((failure) => {
	            if (failure) {
	                if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
	                    return pushWithRedirect(
	                    // keep options
	                    assign({
	                        // preserve an existing replace but allow the redirect to override it
	                        replace,
	                    }, locationAsObject(failure.to), {
	                        state: data,
	                        force,
	                    }), 
	                    // preserve the original redirectedFrom if any
	                    redirectedFrom || toLocation);
	                }
	            }
	            else {
	                // if we fail we don't finalize the navigation
	                failure = finalizeNavigation(toLocation, from, true, replace, data);
	            }
	            triggerAfterEach(toLocation, from, failure);
	            return failure;
	        });
	    }
	    /**
	     * Helper to reject and skip all navigation guards if a new navigation happened
	     * @param to
	     * @param from
	     */
	    function checkCanceledNavigationAndReject(to, from) {
	        const error = checkCanceledNavigation(to, from);
	        return error ? Promise.reject(error) : Promise.resolve();
	    }
	    // TODO: refactor the whole before guards by internally using router.beforeEach
	    function navigate(to, from) {
	        let guards;
	        const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
	        // all components here have been resolved once because we are leaving
	        guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
	        // leavingRecords is already reversed
	        for (const record of leavingRecords) {
	            record.leaveGuards.forEach(guard => {
	                guards.push(guardToPromiseFn(guard, to, from));
	            });
	        }
	        const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
	        guards.push(canceledNavigationCheck);
	        // run the queue of per route beforeRouteLeave guards
	        return (runGuardQueue(guards)
	            .then(() => {
	            // check global guards beforeEach
	            guards = [];
	            for (const guard of beforeGuards.list()) {
	                guards.push(guardToPromiseFn(guard, to, from));
	            }
	            guards.push(canceledNavigationCheck);
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check in components beforeRouteUpdate
	            guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
	            for (const record of updatingRecords) {
	                record.updateGuards.forEach(guard => {
	                    guards.push(guardToPromiseFn(guard, to, from));
	                });
	            }
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check the route beforeEnter
	            guards = [];
	            for (const record of to.matched) {
	                // do not trigger beforeEnter on reused views
	                if (record.beforeEnter && !from.matched.includes(record)) {
	                    if (isArray(record.beforeEnter)) {
	                        for (const beforeEnter of record.beforeEnter)
	                            guards.push(guardToPromiseFn(beforeEnter, to, from));
	                    }
	                    else {
	                        guards.push(guardToPromiseFn(record.beforeEnter, to, from));
	                    }
	                }
	            }
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
	            // clear existing enterCallbacks, these are added by extractComponentsGuards
	            to.matched.forEach(record => (record.enterCallbacks = {}));
	            // check in-component beforeRouteEnter
	            guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from);
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check global guards beforeResolve
	            guards = [];
	            for (const guard of beforeResolveGuards.list()) {
	                guards.push(guardToPromiseFn(guard, to, from));
	            }
	            guards.push(canceledNavigationCheck);
	            return runGuardQueue(guards);
	        })
	            // catch any navigation canceled
	            .catch(err => isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)
	            ? err
	            : Promise.reject(err)));
	    }
	    function triggerAfterEach(to, from, failure) {
	        // navigation is confirmed, call afterGuards
	        // TODO: wrap with error handlers
	        for (const guard of afterGuards.list())
	            guard(to, from, failure);
	    }
	    /**
	     * - Cleans up any navigation guards
	     * - Changes the url if necessary
	     * - Calls the scrollBehavior
	     */
	    function finalizeNavigation(toLocation, from, isPush, replace, data) {
	        // a more recent navigation took place
	        const error = checkCanceledNavigation(toLocation, from);
	        if (error)
	            return error;
	        // only consider as push if it's not the first navigation
	        const isFirstNavigation = from === START_LOCATION_NORMALIZED;
	        const state = {} ;
	        // change URL only if the user did a push/replace and if it's not the initial navigation because
	        // it's just reflecting the url
	        if (isPush) {
	            // on the initial navigation, we want to reuse the scroll position from
	            // history state if it exists
	            if (replace || isFirstNavigation)
	                routerHistory.replace(toLocation.fullPath, assign({
	                    scroll: isFirstNavigation && state && state.scroll,
	                }, data));
	            else
	                routerHistory.push(toLocation.fullPath, data);
	        }
	        // accept current navigation
	        currentRoute.value = toLocation;
	        handleScroll();
	        markAsReady();
	    }
	    let removeHistoryListener;
	    // attach listener to history to trigger navigations
	    function setupListeners() {
	        // avoid setting up listeners twice due to an invalid first navigation
	        if (removeHistoryListener)
	            return;
	        removeHistoryListener = routerHistory.listen((to, _from, info) => {
	            if (!router.listening)
	                return;
	            // cannot be a redirect route because it was in history
	            const toLocation = resolve(to);
	            // due to dynamic routing, and to hash history with manual navigation
	            // (manually changing the url or calling history.hash = '#/somewhere'),
	            // there could be a redirect record in history
	            const shouldRedirect = handleRedirectRecord(toLocation);
	            if (shouldRedirect) {
	                pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
	                return;
	            }
	            pendingLocation = toLocation;
	            const from = currentRoute.value;
	            navigate(toLocation, from)
	                .catch((error) => {
	                if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
	                    return error;
	                }
	                if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
	                    // Here we could call if (info.delta) routerHistory.go(-info.delta,
	                    // false) but this is bug prone as we have no way to wait the
	                    // navigation to be finished before calling pushWithRedirect. Using
	                    // a setTimeout of 16ms seems to work but there is not guarantee for
	                    // it to work on every browser. So Instead we do not restore the
	                    // history entry and trigger a new navigation as requested by the
	                    // navigation guard.
	                    // the error is already handled by router.push we just want to avoid
	                    // logging the error
	                    pushWithRedirect(error.to, toLocation
	                    // avoid an uncaught rejection, let push call triggerError
	                    )
	                        .then(failure => {
	                        // manual change in hash history #916 ending up in the URL not
	                        // changing but it was changed by the manual url change, so we
	                        // need to manually change it ourselves
	                        if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ |
	                            16 /* ErrorTypes.NAVIGATION_DUPLICATED */) &&
	                            !info.delta &&
	                            info.type === NavigationType.pop) {
	                            routerHistory.go(-1, false);
	                        }
	                    })
	                        .catch(noop);
	                    // avoid the then branch
	                    return Promise.reject();
	                }
	                // do not restore history on unknown direction
	                if (info.delta) {
	                    routerHistory.go(-info.delta, false);
	                }
	                // unrecognized error, transfer to the global handler
	                return triggerError(error, toLocation, from);
	            })
	                .then((failure) => {
	                failure =
	                    failure ||
	                        finalizeNavigation(
	                        // after navigation, all matched components are resolved
	                        toLocation, from, false);
	                // revert the navigation
	                if (failure) {
	                    if (info.delta &&
	                        // a new navigation has been triggered, so we do not want to revert, that will change the current history
	                        // entry while a different route is displayed
	                        !isNavigationFailure(failure, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
	                        routerHistory.go(-info.delta, false);
	                    }
	                    else if (info.type === NavigationType.pop &&
	                        isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
	                        // manual change in hash history #916
	                        // it's like a push but lacks the information of the direction
	                        routerHistory.go(-1, false);
	                    }
	                }
	                triggerAfterEach(toLocation, from, failure);
	            })
	                .catch(noop);
	        });
	    }
	    // Initialization and Errors
	    let readyHandlers = useCallbacks();
	    let errorHandlers = useCallbacks();
	    let ready;
	    /**
	     * Trigger errorHandlers added via onError and throws the error as well
	     *
	     * @param error - error to throw
	     * @param to - location we were navigating to when the error happened
	     * @param from - location we were navigating from when the error happened
	     * @returns the error as a rejected promise
	     */
	    function triggerError(error, to, from) {
	        markAsReady(error);
	        const list = errorHandlers.list();
	        if (list.length) {
	            list.forEach(handler => handler(error, to, from));
	        }
	        else {
	            console.error(error);
	        }
	        return Promise.reject(error);
	    }
	    function isReady() {
	        if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
	            return Promise.resolve();
	        return new Promise((resolve, reject) => {
	            readyHandlers.add([resolve, reject]);
	        });
	    }
	    function markAsReady(err) {
	        if (!ready) {
	            // still not ready if an error happened
	            ready = !err;
	            setupListeners();
	            readyHandlers
	                .list()
	                .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
	            readyHandlers.reset();
	        }
	        return err;
	    }
	    // Scroll behavior
	    function handleScroll(to, from, isPush, isFirstNavigation) {
	        return Promise.resolve();
	    }
	    const go = (delta) => routerHistory.go(delta);
	    const installedApps = new Set();
	    const router = {
	        currentRoute,
	        listening: true,
	        addRoute,
	        removeRoute,
	        hasRoute,
	        getRoutes,
	        resolve,
	        options,
	        push,
	        replace,
	        go,
	        back: () => go(-1),
	        forward: () => go(1),
	        beforeEach: beforeGuards.add,
	        beforeResolve: beforeResolveGuards.add,
	        afterEach: afterGuards.add,
	        onError: errorHandlers.add,
	        isReady,
	        install(app) {
	            const router = this;
	            app.component('RouterLink', RouterLink);
	            app.component('RouterView', RouterView);
	            app.config.globalProperties.$router = router;
	            Object.defineProperty(app.config.globalProperties, '$route', {
	                enumerable: true,
	                get: () => vue.unref(currentRoute),
	            });
	            const reactiveRoute = {};
	            for (const key in START_LOCATION_NORMALIZED) {
	                // @ts-expect-error: the key matches
	                reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
	            }
	            app.provide(routerKey, router);
	            app.provide(routeLocationKey, vue.reactive(reactiveRoute));
	            app.provide(routerViewLocationKey, currentRoute);
	            const unmountApp = app.unmount;
	            installedApps.add(app);
	            app.unmount = function () {
	                installedApps.delete(app);
	                // the router is not attached to an app anymore
	                if (installedApps.size < 1) {
	                    // invalidate the current navigation
	                    pendingLocation = START_LOCATION_NORMALIZED;
	                    removeHistoryListener && removeHistoryListener();
	                    removeHistoryListener = null;
	                    currentRoute.value = START_LOCATION_NORMALIZED;
	                    ready = false;
	                }
	                unmountApp();
	            };
	        },
	    };
	    return router;
	}
	function runGuardQueue(guards) {
	    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
	}
	function extractChangingRecords(to, from) {
	    const leavingRecords = [];
	    const updatingRecords = [];
	    const enteringRecords = [];
	    const len = Math.max(from.matched.length, to.matched.length);
	    for (let i = 0; i < len; i++) {
	        const recordFrom = from.matched[i];
	        if (recordFrom) {
	            if (to.matched.find(record => isSameRouteRecord(record, recordFrom)))
	                updatingRecords.push(recordFrom);
	            else
	                leavingRecords.push(recordFrom);
	        }
	        const recordTo = to.matched[i];
	        if (recordTo) {
	            // the type doesn't matter because we are comparing per reference
	            if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
	                enteringRecords.push(recordTo);
	            }
	        }
	    }
	    return [leavingRecords, updatingRecords, enteringRecords];
	}

	/**
	 * Returns the router instance. Equivalent to using `$router` inside
	 * templates.
	 */
	function useRouter() {
	    return vue.inject(routerKey);
	}
	/**
	 * Returns the current route location. Equivalent to using `$route` inside
	 * templates.
	 */
	function useRoute() {
	    return vue.inject(routeLocationKey);
	}

	exports.RouterLink = RouterLink;
	exports.RouterView = RouterView;
	exports.START_LOCATION = START_LOCATION_NORMALIZED;
	exports.createMemoryHistory = createMemoryHistory;
	exports.createRouter = createRouter;
	exports.createRouterMatcher = createRouterMatcher;
	exports.createWebHashHistory = createWebHashHistory;
	exports.createWebHistory = createWebHistory;
	exports.isNavigationFailure = isNavigationFailure;
	exports.loadRouteLocation = loadRouteLocation;
	exports.matchedRouteKey = matchedRouteKey;
	exports.onBeforeRouteLeave = onBeforeRouteLeave;
	exports.onBeforeRouteUpdate = onBeforeRouteUpdate;
	exports.parseQuery = parseQuery;
	exports.routeLocationKey = routeLocationKey;
	exports.routerKey = routerKey;
	exports.routerViewLocationKey = routerViewLocationKey;
	exports.stringifyQuery = stringifyQuery;
	exports.useLink = useLink;
	exports.useRoute = useRoute;
	exports.useRouter = useRouter;
	exports.viewDepthKey = viewDepthKey;
} (vueRouter_prod));

/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject$3(obj) {
    return (obj !== null &&
        typeof obj === 'object' &&
        'constructor' in obj &&
        obj.constructor === Object);
}
function extend$1(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
        if (typeof target[key] === 'undefined')
            target[key] = src[key];
        else if (isObject$3(src[key]) &&
            isObject$3(target[key]) &&
            Object.keys(src[key]).length > 0) {
            extend$1(target[key], src[key]);
        }
    });
}

const ssrDocument = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: '',
    },
    querySelector() {
        return null;
    },
    querySelectorAll() {
        return [];
    },
    getElementById() {
        return null;
    },
    createEvent() {
        return {
            initEvent() { },
        };
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() { },
            getElementsByTagName() {
                return [];
            },
        };
    },
    createElementNS() {
        return {};
    },
    importNode() {
        return null;
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
};
function getDocument() {
    const doc = typeof document !== 'undefined' ? document : {};
    extend$1(doc, ssrDocument);
    return doc;
}

const ssrWindow = {
    document: ssrDocument,
    navigator: {
        userAgent: '',
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
    history: {
        replaceState() { },
        pushState() { },
        go() { },
        back() { },
    },
    CustomEvent: function CustomEvent() {
        return this;
    },
    addEventListener() { },
    removeEventListener() { },
    getComputedStyle() {
        return {
            getPropertyValue() {
                return '';
            },
        };
    },
    Image() { },
    Date() { },
    screen: {},
    setTimeout() { },
    clearTimeout() { },
    matchMedia() {
        return {};
    },
    requestAnimationFrame(callback) {
        if (typeof setTimeout === 'undefined') {
            callback();
            return null;
        }
        return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
        if (typeof setTimeout === 'undefined') {
            return;
        }
        clearTimeout(id);
    },
};
function getWindow() {
    const win = {};
    extend$1(win, ssrWindow);
    return win;
}

/**
 * Dom7 4.0.4
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * https://framework7.io/docs/dom7.html
 *
 * Copyright 2022, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: January 11, 2022
 */

/* eslint-disable no-proto */
function makeReactive(obj) {
  const proto = obj.__proto__;
  Object.defineProperty(obj, '__proto__', {
    get() {
      return proto;
    },

    set(value) {
      proto.__proto__ = value;
    }

  });
}

class Dom7 extends Array {
  constructor(items) {
    if (typeof items === 'number') {
      super(items);
    } else {
      super(...(items || []));
      makeReactive(this);
    }
  }

}

function arrayFlat(arr = []) {
  const res = [];
  arr.forEach(el => {
    if (Array.isArray(el)) {
      res.push(...arrayFlat(el));
    } else {
      res.push(el);
    }
  });
  return res;
}
function arrayFilter(arr, callback) {
  return Array.prototype.filter.call(arr, callback);
}
function arrayUnique(arr) {
  const uniqueArray = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }

  return uniqueArray;
}

// eslint-disable-next-line

function qsa(selector, context) {
  if (typeof selector !== 'string') {
    return [selector];
  }

  const a = [];
  const res = context.querySelectorAll(selector);

  for (let i = 0; i < res.length; i += 1) {
    a.push(res[i]);
  }

  return a;
}

function $(selector, context) {
  const window = getWindow();
  const document = getDocument();
  let arr = [];

  if (!context && selector instanceof Dom7) {
    return selector;
  }

  if (!selector) {
    return new Dom7(arr);
  }

  if (typeof selector === 'string') {
    const html = selector.trim();

    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      let toCreate = 'div';
      if (html.indexOf('<li') === 0) toCreate = 'ul';
      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
      if (html.indexOf('<tbody') === 0) toCreate = 'table';
      if (html.indexOf('<option') === 0) toCreate = 'select';
      const tempParent = document.createElement(toCreate);
      tempParent.innerHTML = html;

      for (let i = 0; i < tempParent.childNodes.length; i += 1) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      arr = qsa(selector.trim(), context || document);
    } // arr = qsa(selector, document);

  } else if (selector.nodeType || selector === window || selector === document) {
    arr.push(selector);
  } else if (Array.isArray(selector)) {
    if (selector instanceof Dom7) return selector;
    arr = selector;
  }

  return new Dom7(arrayUnique(arr));
}

$.fn = Dom7.prototype;

// eslint-disable-next-line

function addClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    el.classList.add(...classNames);
  });
  return this;
}

function removeClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    el.classList.remove(...classNames);
  });
  return this;
}

function toggleClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    classNames.forEach(className => {
      el.classList.toggle(className);
    });
  });
}

function hasClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  return arrayFilter(this, el => {
    return classNames.filter(className => el.classList.contains(className)).length > 0;
  }).length > 0;
}

function attr(attrs, value) {
  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) return this[0].getAttribute(attrs);
    return undefined;
  } // Set attrs


  for (let i = 0; i < this.length; i += 1) {
    if (arguments.length === 2) {
      // String
      this[i].setAttribute(attrs, value);
    } else {
      // Object
      for (const attrName in attrs) {
        this[i][attrName] = attrs[attrName];
        this[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }

  return this;
}

function removeAttr(attr) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].removeAttribute(attr);
  }

  return this;
}

function transform(transform) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transform = transform;
  }

  return this;
}

function transition(duration) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
  }

  return this;
}

function on(...args) {
  let [eventType, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventType, listener, capture] = args;
    targetSelector = undefined;
  }

  if (!capture) capture = false;

  function handleLiveEvent(e) {
    const target = e.target;
    if (!target) return;
    const eventData = e.target.dom7EventData || [];

    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }

    if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
      const parents = $(target).parents(); // eslint-disable-line

      for (let k = 0; k < parents.length; k += 1) {
        if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
      }
    }
  }

  function handleEvent(e) {
    const eventData = e && e.target ? e.target.dom7EventData || [] : [];

    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }

    listener.apply(this, eventData);
  }

  const events = eventType.split(' ');
  let j;

  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (!targetSelector) {
      for (j = 0; j < events.length; j += 1) {
        const event = events[j];
        if (!el.dom7Listeners) el.dom7Listeners = {};
        if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
        el.dom7Listeners[event].push({
          listener,
          proxyListener: handleEvent
        });
        el.addEventListener(event, handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        const event = events[j];
        if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
        if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
        el.dom7LiveListeners[event].push({
          listener,
          proxyListener: handleLiveEvent
        });
        el.addEventListener(event, handleLiveEvent, capture);
      }
    }
  }

  return this;
}

function off(...args) {
  let [eventType, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventType, listener, capture] = args;
    targetSelector = undefined;
  }

  if (!capture) capture = false;
  const events = eventType.split(' ');

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];

    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];
      let handlers;

      if (!targetSelector && el.dom7Listeners) {
        handlers = el.dom7Listeners[event];
      } else if (targetSelector && el.dom7LiveListeners) {
        handlers = el.dom7LiveListeners[event];
      }

      if (handlers && handlers.length) {
        for (let k = handlers.length - 1; k >= 0; k -= 1) {
          const handler = handlers[k];

          if (listener && handler.listener === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (!listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          }
        }
      }
    }
  }

  return this;
}

function trigger(...args) {
  const window = getWindow();
  const events = args[0].split(' ');
  const eventData = args[1];

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];

    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];

      if (window.CustomEvent) {
        const evt = new window.CustomEvent(event, {
          detail: eventData,
          bubbles: true,
          cancelable: true
        });
        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
  }

  return this;
}

function transitionEnd(callback) {
  const dom = this;

  function fireCallBack(e) {
    if (e.target !== this) return;
    callback.call(this, e);
    dom.off('transitionend', fireCallBack);
  }

  if (callback) {
    dom.on('transitionend', fireCallBack);
  }

  return this;
}

function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }

    return this[0].offsetWidth;
  }

  return null;
}

function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }

    return this[0].offsetHeight;
  }

  return null;
}

function offset() {
  if (this.length > 0) {
    const window = getWindow();
    const document = getDocument();
    const el = this[0];
    const box = el.getBoundingClientRect();
    const body = document.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window ? window.scrollY : el.scrollTop;
    const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }

  return null;
}

function styles() {
  const window = getWindow();
  if (this[0]) return window.getComputedStyle(this[0], null);
  return {};
}

function css(props, value) {
  const window = getWindow();
  let i;

  if (arguments.length === 1) {
    if (typeof props === 'string') {
      // .css('width')
      if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
    } else {
      // .css({ width: '100px' })
      for (i = 0; i < this.length; i += 1) {
        for (const prop in props) {
          this[i].style[prop] = props[prop];
        }
      }

      return this;
    }
  }

  if (arguments.length === 2 && typeof props === 'string') {
    // .css('width', '100px')
    for (i = 0; i < this.length; i += 1) {
      this[i].style[props] = value;
    }

    return this;
  }

  return this;
}

function each(callback) {
  if (!callback) return this;
  this.forEach((el, index) => {
    callback.apply(el, [el, index]);
  });
  return this;
}

function filter(callback) {
  const result = arrayFilter(this, callback);
  return $(result);
}

function html$2(html) {
  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : null;
  }

  for (let i = 0; i < this.length; i += 1) {
    this[i].innerHTML = html;
  }

  return this;
}

function text(text) {
  if (typeof text === 'undefined') {
    return this[0] ? this[0].textContent.trim() : null;
  }

  for (let i = 0; i < this.length; i += 1) {
    this[i].textContent = text;
  }

  return this;
}

function is(selector) {
  const window = getWindow();
  const document = getDocument();
  const el = this[0];
  let compareWith;
  let i;
  if (!el || typeof selector === 'undefined') return false;

  if (typeof selector === 'string') {
    if (el.matches) return el.matches(selector);
    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
    if (el.msMatchesSelector) return el.msMatchesSelector(selector);
    compareWith = $(selector);

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  if (selector === document) {
    return el === document;
  }

  if (selector === window) {
    return el === window;
  }

  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  return false;
}

function index$1() {
  let child = this[0];
  let i;

  if (child) {
    i = 0; // eslint-disable-next-line

    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }

    return i;
  }

  return undefined;
}

function eq(index) {
  if (typeof index === 'undefined') return this;
  const length = this.length;

  if (index > length - 1) {
    return $([]);
  }

  if (index < 0) {
    const returnIndex = length + index;
    if (returnIndex < 0) return $([]);
    return $([this[returnIndex]]);
  }

  return $([this[index]]);
}

function append(...els) {
  let newChild;
  const document = getDocument();

  for (let k = 0; k < els.length; k += 1) {
    newChild = els[k];

    for (let i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;

        while (tempDiv.firstChild) {
          this[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (let j = 0; j < newChild.length; j += 1) {
          this[i].appendChild(newChild[j]);
        }
      } else {
        this[i].appendChild(newChild);
      }
    }
  }

  return this;
}

function prepend(newChild) {
  const document = getDocument();
  let i;
  let j;

  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newChild;

      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
      }
    } else {
      this[i].insertBefore(newChild, this[i].childNodes[0]);
    }
  }

  return this;
}

function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
        return $([this[0].nextElementSibling]);
      }

      return $([]);
    }

    if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
    return $([]);
  }

  return $([]);
}

function nextAll(selector) {
  const nextEls = [];
  let el = this[0];
  if (!el) return $([]);

  while (el.nextElementSibling) {
    const next = el.nextElementSibling; // eslint-disable-line

    if (selector) {
      if ($(next).is(selector)) nextEls.push(next);
    } else nextEls.push(next);

    el = next;
  }

  return $(nextEls);
}

function prev(selector) {
  if (this.length > 0) {
    const el = this[0];

    if (selector) {
      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
        return $([el.previousElementSibling]);
      }

      return $([]);
    }

    if (el.previousElementSibling) return $([el.previousElementSibling]);
    return $([]);
  }

  return $([]);
}

function prevAll(selector) {
  const prevEls = [];
  let el = this[0];
  if (!el) return $([]);

  while (el.previousElementSibling) {
    const prev = el.previousElementSibling; // eslint-disable-line

    if (selector) {
      if ($(prev).is(selector)) prevEls.push(prev);
    } else prevEls.push(prev);

    el = prev;
  }

  return $(prevEls);
}

function parent(selector) {
  const parents = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode !== null) {
      if (selector) {
        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
      } else {
        parents.push(this[i].parentNode);
      }
    }
  }

  return $(parents);
}

function parents(selector) {
  const parents = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    let parent = this[i].parentNode; // eslint-disable-line

    while (parent) {
      if (selector) {
        if ($(parent).is(selector)) parents.push(parent);
      } else {
        parents.push(parent);
      }

      parent = parent.parentNode;
    }
  }

  return $(parents);
}

function closest(selector) {
  let closest = this; // eslint-disable-line

  if (typeof selector === 'undefined') {
    return $([]);
  }

  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }

  return closest;
}

function find$1(selector) {
  const foundElements = [];

  for (let i = 0; i < this.length; i += 1) {
    const found = this[i].querySelectorAll(selector);

    for (let j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }

  return $(foundElements);
}

function children(selector) {
  const children = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    const childNodes = this[i].children;

    for (let j = 0; j < childNodes.length; j += 1) {
      if (!selector || $(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }

  return $(children);
}

function remove$1() {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
  }

  return this;
}

const Methods = {
  addClass,
  removeClass,
  hasClass,
  toggleClass,
  attr,
  removeAttr,
  transform,
  transition,
  on,
  off,
  trigger,
  transitionEnd,
  outerWidth,
  outerHeight,
  styles,
  offset,
  css,
  each,
  html: html$2,
  text,
  is,
  index: index$1,
  eq,
  append,
  prepend,
  next,
  nextAll,
  prev,
  prevAll,
  parent,
  parents,
  closest,
  find: find$1,
  children,
  filter,
  remove: remove$1
};
Object.keys(Methods).forEach(methodName => {
  Object.defineProperty($.fn, methodName, {
    value: Methods[methodName],
    writable: true
  });
});

function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  const document = getDocument();

  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(key => {
      if (!params[key] && params.auto === true) {
        let element = swiper.$el.children(`.${checkProps[key]}`)[0];

        if (!element) {
          element = document.createElement('div');
          element.className = checkProps[key];
          swiper.$el.append(element);
        }

        params[key] = element;
        originalParams[key] = element;
      }
    });
  }

  return params;
}

function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  };

  function getEl(el) {
    let $el;

    if (el) {
      $el = $(el);

      if (swiper.params.uniqueNavElements && typeof el === 'string' && $el.length > 1 && swiper.$el.find(el).length === 1) {
        $el = swiper.$el.find(el);
      }
    }

    return $el;
  }

  function toggleEl($el, disabled) {
    const params = swiper.params.navigation;

    if ($el && $el.length > 0) {
      $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
      if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;

      if (swiper.params.watchOverflow && swiper.enabled) {
        $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    }
  }

  function update() {
    // Update Navigation Buttons
    if (swiper.params.loop) return;
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
  }

  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }

  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }

  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    const $nextEl = getEl(params.nextEl);
    const $prevEl = getEl(params.prevEl);

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', onNextClick);
    }

    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', onPrevClick);
    }

    Object.assign(swiper.navigation, {
      $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl,
      prevEl: $prevEl && $prevEl[0]
    });

    if (!swiper.enabled) {
      if ($nextEl) $nextEl.addClass(params.lockClass);
      if ($prevEl) $prevEl.addClass(params.lockClass);
    }
  }

  function destroy() {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;

    if ($nextEl && $nextEl.length) {
      $nextEl.off('click', onNextClick);
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }

    if ($prevEl && $prevEl.length) {
      $prevEl.off('click', onPrevClick);
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  }

  on('init', () => {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;

    if ($nextEl) {
      $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }

    if ($prevEl) {
      $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }
  });
  on('click', (_s, e) => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    const targetEl = e.target;

    if (swiper.params.navigation.hideOnClick && !$(targetEl).is($prevEl) && !$(targetEl).is($nextEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;

      if ($nextEl) {
        isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
      } else if ($prevEl) {
        isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
      }

      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }

      if ($nextEl) {
        $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
      }

      if ($prevEl) {
        $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
      }
    }
  });

  const enable = () => {
    swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
    init();
    update();
  };

  const disable = () => {
    swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
    destroy();
  };

  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}

var LifecycleEnum = /* @__PURE__ */ ((LifecycleEnum2) => {
  LifecycleEnum2["LOADING"] = "loading";
  LifecycleEnum2["LOADED"] = "loaded";
  LifecycleEnum2["ERROR"] = "error";
  return LifecycleEnum2;
})(LifecycleEnum || {});
const hasIntersectionObserver = checkIntersectionObserver();
const isEnumerable = Object.prototype.propertyIsEnumerable;
const getSymbols = Object.getOwnPropertySymbols;
function isObject$2(val) {
  return typeof val === "function" || toString.call(val) === "[object Object]";
}
function isPrimitive(val) {
  return typeof val === "object" ? val === null : typeof val !== "function";
}
function isValidKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function checkIntersectionObserver() {
  return false;
}
function assignSymbols(target, ...args) {
  if (!isObject$2(target))
    throw new TypeError("expected the first argument to be an object");
  if (args.length === 0 || typeof Symbol !== "function" || typeof getSymbols !== "function")
    return target;
  for (const arg of args) {
    const names = getSymbols(arg);
    for (const key of names) {
      if (isEnumerable.call(arg, key))
        target[key] = arg[key];
    }
  }
  return target;
}
function assign(target, ...args) {
  let i = 0;
  if (isPrimitive(target))
    target = args[i++];
  if (!target)
    target = {};
  for (; i < args.length; i++) {
    if (isObject$2(args[i])) {
      for (const key of Object.keys(args[i])) {
        if (isValidKey(key)) {
          if (isObject$2(target[key]) && isObject$2(args[i][key]))
            assign(target[key], args[i][key]);
          else
            target[key] = args[i][key];
        }
      }
      assignSymbols(target, args[i]);
    }
  }
  return target;
}

const DEFAULT_LOADING = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const DEFAULT_ERROR = "";

const DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
const TIMEOUT_ID_DATA_ATTR = "data-lazy-timeout-id";
class Lazy {
  constructor(options) {
    this.options = {
      loading: DEFAULT_LOADING,
      error: DEFAULT_ERROR,
      observerOptions: DEFAULT_OBSERVER_OPTIONS,
      log: true,
      lifecycle: {}
    };
    this._images = /* @__PURE__ */ new WeakMap();
    this.config(options);
  }
  config(options = {}) {
    assign(this.options, options);
  }
  mount(el, binding) {
    if (!el)
      return;
    const { src, loading, error, lifecycle, delay } = this._valueFormatter(typeof binding === "string" ? binding : binding.value);
    this._lifecycle(LifecycleEnum.LOADING, lifecycle, el);
    el.setAttribute("src", loading || DEFAULT_LOADING);
    if (!hasIntersectionObserver) {
      this.loadImages(el, src, error, lifecycle);
      this._log(() => {
        throw new Error("Not support IntersectionObserver!");
      });
    }
    this._initIntersectionObserver(el, src, error, lifecycle, delay);
  }
  update(el, binding) {
    if (!el)
      return;
    this._realObserver(el)?.unobserve(el);
    const { src, error, lifecycle, delay } = this._valueFormatter(typeof binding === "string" ? binding : binding.value);
    this._initIntersectionObserver(el, src, error, lifecycle, delay);
  }
  unmount(el) {
    if (!el)
      return;
    this._realObserver(el)?.unobserve(el);
    this._images.delete(el);
  }
  loadImages(el, src, error, lifecycle) {
    this._setImageSrc(el, src, error, lifecycle);
  }
  _setImageSrc(el, src, error, lifecycle) {
    if (el.tagName.toLowerCase() === "img") {
      if (src) {
        const preSrc = el.getAttribute("src");
        if (preSrc !== src)
          el.setAttribute("src", src);
      }
      this._listenImageStatus(el, () => {
        this._lifecycle(LifecycleEnum.LOADED, lifecycle, el);
      }, () => {
        el.onload = null;
        this._lifecycle(LifecycleEnum.ERROR, lifecycle, el);
        this._realObserver(el)?.disconnect();
        if (error) {
          const newImageSrc = el.getAttribute("src");
          if (newImageSrc !== error)
            el.setAttribute("src", error);
        }
        this._log(() => {
          throw new Error(`Image failed to load!And failed src was: ${src} `);
        });
      });
    } else {
      el.style.backgroundImage = `url('${src}')`;
    }
  }
  _initIntersectionObserver(el, src, error, lifecycle, delay) {
    const observerOptions = this.options.observerOptions;
    this._images.set(el, new IntersectionObserver((entries) => {
      Array.prototype.forEach.call(entries, (entry) => {
        if (delay && delay > 0)
          this._delayedIntersectionCallback(el, entry, delay, src, error, lifecycle);
        else
          this._intersectionCallback(el, entry, src, error, lifecycle);
      });
    }, observerOptions));
    this._realObserver(el)?.observe(el);
  }
  _intersectionCallback(el, entry, src, error, lifecycle) {
    if (entry.isIntersecting) {
      this._realObserver(el)?.unobserve(entry.target);
      this._setImageSrc(el, src, error, lifecycle);
    }
  }
  _delayedIntersectionCallback(el, entry, delay, src, error, lifecycle) {
    if (entry.isIntersecting) {
      if (entry.target.hasAttribute(TIMEOUT_ID_DATA_ATTR))
        return;
      const timeoutId = setTimeout(() => {
        this._intersectionCallback(el, entry, src, error, lifecycle);
        entry.target.removeAttribute(TIMEOUT_ID_DATA_ATTR);
      }, delay);
      entry.target.setAttribute(TIMEOUT_ID_DATA_ATTR, String(timeoutId));
    } else {
      if (entry.target.hasAttribute(TIMEOUT_ID_DATA_ATTR)) {
        clearTimeout(Number(entry.target.getAttribute(TIMEOUT_ID_DATA_ATTR)));
        entry.target.removeAttribute(TIMEOUT_ID_DATA_ATTR);
      }
    }
  }
  _listenImageStatus(image, success, error) {
    image.onload = success;
    image.onerror = error;
  }
  _valueFormatter(value) {
    let src = value;
    let loading = this.options.loading;
    let error = this.options.error;
    let lifecycle = this.options.lifecycle;
    let delay = this.options.delay;
    if (isObject$2(value)) {
      src = value.src;
      loading = value.loading || this.options.loading;
      error = value.error || this.options.error;
      lifecycle = value.lifecycle || this.options.lifecycle;
      delay = value.delay || this.options.delay;
    }
    return {
      src,
      loading,
      error,
      lifecycle,
      delay
    };
  }
  _log(callback) {
    if (this.options.log)
      callback();
  }
  _lifecycle(life, lifecycle, el) {
    switch (life) {
      case LifecycleEnum.LOADING:
        el?.setAttribute("lazy", LifecycleEnum.LOADING);
        if (lifecycle?.loading)
          lifecycle.loading(el);
        break;
      case LifecycleEnum.LOADED:
        el?.setAttribute("lazy", LifecycleEnum.LOADED);
        if (lifecycle?.loaded)
          lifecycle.loaded(el);
        break;
      case LifecycleEnum.ERROR:
        el?.setAttribute("lazy", LifecycleEnum.ERROR);
        if (lifecycle?.error)
          lifecycle.error(el);
        break;
    }
  }
  _realObserver(el) {
    return this._images.get(el);
  }
}

const index = {
  install(Vue, options) {
    const lazy = new Lazy(options);
    Vue.config.globalProperties.$Lazyload = lazy;
    Vue.provide("Lazyload", lazy);
    Vue.directive("lazy", {
      mounted: lazy.mount.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.unmount.bind(lazy)
    });
  }
};

const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^["{[]|^-?[0-9][0-9.]{0,14}$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor") {
    return;
  }
  return value;
}
function destr(val) {
  if (typeof val !== "string") {
    return val;
  }
  const _lval = val.toLowerCase();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return NaN;
  }
  if (_lval === "infinity") {
    return Infinity;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(val)) {
    return val;
  }
  try {
    if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
      return JSON.parse(val, jsonParseTransform);
    }
    return JSON.parse(val);
  } catch (_e) {
    return val;
  }
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message = "";
  if (request && response) {
    message = `${response.status} ${response.statusText} (${request.toString()})`;
  }
  if (error) {
    message = `${error.message} (${message})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", { get() {
    return request;
  } });
  Object.defineProperty(fetchError, "response", { get() {
    return response;
  } });
  Object.defineProperty(fetchError, "data", { get() {
    return response && response._data;
  } });
  return fetchError;
}
const payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(val) {
  if (val === void 0) {
    return false;
  }
  const t = typeof val;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(val)) {
    return true;
  }
  return val.constructor && val.constructor.name === "Object" || typeof val.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift();
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  409,
  425,
  429,
  500,
  502,
  503,
  504
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(ctx) {
    if (ctx.options.retry !== false) {
      const retries = typeof ctx.options.retry === "number" ? ctx.options.retry : isPayloadMethod(ctx.options.method) ? 0 : 1;
      const responseCode = ctx.response && ctx.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(ctx.request, {
          ...ctx.options,
          retry: retries - 1
        });
      }
    }
    const err = createFetchError(ctx.request, ctx.error, ctx.response);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(err, $fetchRaw);
    }
    throw err;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _opts = {}) {
    const ctx = {
      request: _request,
      options: { ...globalOptions.defaults, ..._opts },
      response: void 0,
      error: void 0
    };
    if (ctx.options.onRequest) {
      await ctx.options.onRequest(ctx);
    }
    if (typeof ctx.request === "string") {
      if (ctx.options.baseURL) {
        ctx.request = withBase(ctx.request, ctx.options.baseURL);
      }
      if (ctx.options.params) {
        ctx.request = withQuery(ctx.request, ctx.options.params);
      }
      if (ctx.options.body && isPayloadMethod(ctx.options.method)) {
        if (isJSONSerializable(ctx.options.body)) {
          ctx.options.body = typeof ctx.options.body === "string" ? ctx.options.body : JSON.stringify(ctx.options.body);
          ctx.options.headers = new Headers2(ctx.options.headers);
          if (!ctx.options.headers.has("content-type")) {
            ctx.options.headers.set("content-type", "application/json");
          }
          if (!ctx.options.headers.has("accept")) {
            ctx.options.headers.set("accept", "application/json");
          }
        }
      }
    }
    ctx.response = await fetch2(ctx.request, ctx.options).catch(async (error) => {
      ctx.error = error;
      if (ctx.options.onRequestError) {
        await ctx.options.onRequestError(ctx);
      }
      return onError(ctx);
    });
    const responseType = (ctx.options.parseResponse ? "json" : ctx.options.responseType) || detectResponseType(ctx.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await ctx.response.text();
      const parseFn = ctx.options.parseResponse || destr;
      ctx.response._data = parseFn(data);
    } else {
      ctx.response._data = await ctx.response[responseType]();
    }
    if (ctx.options.onResponse) {
      await ctx.options.onResponse(ctx);
    }
    if (!ctx.response.ok) {
      if (ctx.options.onResponseError) {
        await ctx.options.onResponseError(ctx);
      }
    }
    return ctx.response.ok ? ctx.response : onError(ctx);
  };
  const $fetch2 = function $fetch22(request, opts) {
    return $fetchRaw(request, opts).then((r) => r._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
const _globalThis$2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch$1 = _globalThis$2.fetch || (() => Promise.reject(new Error("[ohmyfetch] global.fetch is not supported!")));
const Headers = _globalThis$2.Headers;
const $fetch$1 = createFetch({ fetch: fetch$1, Headers });
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, args) {
  return hooks.reduce((promise, hookFn) => promise.then(() => hookFn.apply(void 0, args)), Promise.resolve(null));
}
function parallelCaller(hooks, args) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, args)));
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, fn) {
    if (!name || typeof fn !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let deprecatedHookObj;
    while (this._deprecatedHooks[name]) {
      const deprecatedHook = this._deprecatedHooks[name];
      if (typeof deprecatedHook === "string") {
        deprecatedHookObj = { to: deprecatedHook };
      } else {
        deprecatedHookObj = deprecatedHook;
      }
      name = deprecatedHookObj.to;
    }
    if (deprecatedHookObj) {
      if (!deprecatedHookObj.message) {
        console.warn(`${originalName} hook has been deprecated` + (deprecatedHookObj.to ? `, please use ${deprecatedHookObj.to}` : ""));
      } else {
        console.warn(deprecatedHookObj.message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(fn);
    return () => {
      if (fn) {
        this.removeHook(name, fn);
        fn = null;
      }
    };
  }
  hookOnce(name, fn) {
    let _unreg;
    let _fn = (...args) => {
      _unreg();
      _unreg = null;
      _fn = null;
      return fn(...args);
    };
    _unreg = this.hook(name, _fn);
    return _unreg;
  }
  removeHook(name, fn) {
    if (this._hooks[name]) {
      const idx = this._hooks[name].indexOf(fn);
      if (idx !== -1) {
        this._hooks[name].splice(idx, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = deprecated;
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      removeFns.splice(0, removeFns.length).forEach((unreg) => unreg());
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...args) {
    return serialCaller(this._hooks[name] || [], args);
  }
  callHookParallel(name, ...args) {
    return parallelCaller(this._hooks[name] || [], args);
  }
  callHookWith(caller, name, ...args) {
    return caller(this._hooks[name] || [], args);
  }
}
function createHooks() {
  return new Hookable();
}
function createContext() {
  let currentInstance = null;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  return {
    use: () => currentInstance,
    tryUse: () => currentInstance,
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = null;
      isSingleton = false;
    },
    call: (instance, cb) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return cb();
      } finally {
        if (!isSingleton) {
          currentInstance = null;
        }
      }
    },
    async callAsync(instance, cb) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = cb();
        if (!isSingleton) {
          currentInstance = null;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace() {
  const contexts = {};
  return {
    get(key) {
      if (!contexts[key]) {
        contexts[key] = createContext();
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey] || (_globalThis$1[globalKey] = createNamespace());
const getContext = (key) => defaultNamespace.get(key);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  if (nuxtApp.ssrContext) {
    nuxtApp.ssrContext.nuxt = nuxtApp;
  }
  {
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.payload = nuxtApp.payload;
  }
  {
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.use();
  if (!nuxtAppInstance) {
    const vm = vue_cjs_prod.getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const wrapInRef = (value) => vue_cjs_prod.isRef(value) ? value : vue_cjs_prod.ref(value);
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = vue_cjs_prod.toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (vue_cjs_prod.isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => {
  const nuxtApp = useNuxtApp();
  return useState("error", () => nuxtApp.ssrContext.error, "$bWWAMK0bSA");
};
const throwError = (_err) => {
  const nuxtApp = useNuxtApp();
  useError();
  const err = typeof _err === "string" ? new Error(_err) : _err;
  nuxtApp.callHook("app:error", err);
  {
    nuxtApp.ssrContext.error = nuxtApp.ssrContext.error || err;
  }
  return err;
};
const decode = decodeURIComponent;
const encode = encodeURIComponent;
const pairSplitRegExp = /; */;
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  let obj = {};
  let opt = options || {};
  let pairs = str.split(pairSplitRegExp);
  let dec = opt.decode || decode;
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i];
    let eq_idx = pair.indexOf("=");
    if (eq_idx < 0) {
      continue;
    }
    let key = pair.substr(0, eq_idx).trim();
    let val = pair.substr(++eq_idx, pair.length).trim();
    if (val[0] == '"') {
      val = val.slice(1, -1);
    }
    if (obj[key] == void 0) {
      obj[key] = tryDecode(val, dec);
    }
  }
  return obj;
}
function serialize(name, value, options) {
  let opt = options || {};
  let enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  let encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (opt.maxAge != null) {
    let maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== "function") {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.sameSite) {
    let sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
const MIMES = {
  html: "text/html",
  json: "application/json"
};
const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.res.statusCode = code;
  event.res.setHeader("Location", location);
  const html2 = `<!DOCTYPE html>
<html>
  <head><meta http-equiv="refresh" content="0; url=${encodeURI(location)}"></head>
  <body>Redirecting to <a href=${JSON.stringify(location)}>${encodeURI(location)}</a></body>
</html>`;
  return send(event, html2, MIMES.html);
}
function appendHeader(event, name, value) {
  let current = event.res.getHeader(name);
  if (!current) {
    event.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.res.setHeader(name, current.concat(value));
}
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = "Internal Server Error";
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  var _a;
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error((_a = input.message) != null ? _a : input.statusMessage, input.cause ? { cause: input.cause } : void 0);
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  var _a;
  return ((_a = input == null ? void 0 : input.constructor) == null ? void 0 : _a.__h3_error__) === true;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a, _b;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts);
  const cookie = wrapInRef((_b = cookies[name]) != null ? _b : (_a = opts.default) == null ? void 0 : _a.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (cookie.value !== cookies[name]) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", writeFinalCookieValue);
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  return useNuxtApp()._route;
};
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  if (options.global || typeof name === "function") {
    nuxtApp._middleware.global.push(typeof name === "function" ? name : middleware);
  } else {
    nuxtApp._middleware.named[name] = middleware;
  }
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 302));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(vue_cjs_prod.resolveComponent("RouterLink"), {
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          }, slots.default);
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
const nuxtLink = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineNuxtLink,
  "default": __nuxt_component_0$2
}, Symbol.toStringTag, { value: "Module" }));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html2 = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html2 += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html2 += escaped;
  }
  return lastIndex !== index ? html2 + str.slice(lastIndex, index) : html2;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject$1;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
function useHead(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? vue_cjs_prod.computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {
  ContentDoc: vue_cjs_prod.defineAsyncComponent(() => import('./ContentDoc.8a07f69f.mjs').then((c) => c.default || c)),
  ContentList: vue_cjs_prod.defineAsyncComponent(() => import('./ContentList.3366e9e6.mjs').then((c) => c.default || c)),
  ContentNavigation: vue_cjs_prod.defineAsyncComponent(() => import('./ContentNavigation.c247b788.mjs').then((c) => c.default || c)),
  ContentQuery: vue_cjs_prod.defineAsyncComponent(() => import('./ContentQuery.b80363b6.mjs').then((c) => c.default || c)),
  ContentRenderer: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return ContentRenderer;
  }).then((c) => c.default || c)),
  ContentRendererMarkdown: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return ContentRendererMarkdown;
  }).then((c) => c.default || c)),
  DocumentDrivenEmpty: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return DocumentDrivenEmpty;
  }).then((c) => c.default || c)),
  DocumentDrivenNotFound: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return DocumentDrivenNotFound;
  }).then((c) => c.default || c)),
  Markdown: vue_cjs_prod.defineAsyncComponent(() => import('./Markdown.10bce135.mjs').then((c) => c.default || c)),
  ProseA: vue_cjs_prod.defineAsyncComponent(() => import('./ProseA.2b1a9d60.mjs').then((c) => c.default || c)),
  ProseBlockquote: vue_cjs_prod.defineAsyncComponent(() => import('./ProseBlockquote.0785af18.mjs').then((c) => c.default || c)),
  ProseCode: vue_cjs_prod.defineAsyncComponent(() => import('./ProseCode.8d21d4e3.mjs').then((c) => c.default || c)),
  ProseCodeInline: vue_cjs_prod.defineAsyncComponent(() => import('./ProseCodeInline.0fa4ba32.mjs').then((c) => c.default || c)),
  ProseEm: vue_cjs_prod.defineAsyncComponent(() => import('./ProseEm.0b60e63d.mjs').then((c) => c.default || c)),
  ProseH1: vue_cjs_prod.defineAsyncComponent(() => import('./ProseH1.07052dea.mjs').then((c) => c.default || c)),
  ProseH2: vue_cjs_prod.defineAsyncComponent(() => import('./ProseH2.94d9744c.mjs').then((c) => c.default || c)),
  ProseH3: vue_cjs_prod.defineAsyncComponent(() => import('./ProseH3.db5319e1.mjs').then((c) => c.default || c)),
  ProseH4: vue_cjs_prod.defineAsyncComponent(() => import('./ProseH4.dc6a1e7e.mjs').then((c) => c.default || c)),
  ProseH5: vue_cjs_prod.defineAsyncComponent(() => import('./ProseH5.4e961335.mjs').then((c) => c.default || c)),
  ProseH6: vue_cjs_prod.defineAsyncComponent(() => import('./ProseH6.f46febf3.mjs').then((c) => c.default || c)),
  ProseHr: vue_cjs_prod.defineAsyncComponent(() => import('./ProseHr.0f718cac.mjs').then((c) => c.default || c)),
  ProseImg: vue_cjs_prod.defineAsyncComponent(() => import('./ProseImg.d7260f54.mjs').then((c) => c.default || c)),
  ProseLi: vue_cjs_prod.defineAsyncComponent(() => import('./ProseLi.8cff1add.mjs').then((c) => c.default || c)),
  ProseOl: vue_cjs_prod.defineAsyncComponent(() => import('./ProseOl.4f6cbd70.mjs').then((c) => c.default || c)),
  ProseP: vue_cjs_prod.defineAsyncComponent(() => import('./ProseP.b16d1431.mjs').then((c) => c.default || c)),
  ProseStrong: vue_cjs_prod.defineAsyncComponent(() => import('./ProseStrong.33aa009a.mjs').then((c) => c.default || c)),
  ProseTable: vue_cjs_prod.defineAsyncComponent(() => import('./ProseTable.78ca9c1a.mjs').then((c) => c.default || c)),
  ProseTbody: vue_cjs_prod.defineAsyncComponent(() => import('./ProseTbody.1c1c0781.mjs').then((c) => c.default || c)),
  ProseTd: vue_cjs_prod.defineAsyncComponent(() => import('./ProseTd.6cafef77.mjs').then((c) => c.default || c)),
  ProseTh: vue_cjs_prod.defineAsyncComponent(() => import('./ProseTh.4c3d2141.mjs').then((c) => c.default || c)),
  ProseThead: vue_cjs_prod.defineAsyncComponent(() => import('./ProseThead.44b729b0.mjs').then((c) => c.default || c)),
  ProseTr: vue_cjs_prod.defineAsyncComponent(() => import('./ProseTr.3ab0036c.mjs').then((c) => c.default || c)),
  ProseUl: vue_cjs_prod.defineAsyncComponent(() => import('./ProseUl.eb2b40e4.mjs').then((c) => c.default || c))
};
const _47Users_47meetqy_47Desktop_47wcao_46cc_47_46nuxt_47components_46plugin_46mjs = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document) => {
  const el = document.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(vue_cjs_prod.unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: __spreadValues({ key: "default" }, obj[key]) });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: item });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document = window.document, type, tags) => {
  var _a, _b;
  const head = document.head;
  const body = document.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute("content", "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length));
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(vue_cjs_prod.shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const titleTemplate = allHeadObjs.map((i) => vue_cjs_prod.unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(vue_cjs_prod.unref(objs));
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index = i;
                  break;
                }
              }
              if (index !== -1) {
                deduped.splice(index, 1);
              }
            }
          }
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(titleTemplate, tag.props.children);
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document.title = title;
      }
      setAttrs(document.documentElement, htmlAttrs);
      setAttrs(document.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults2, namespace = ".", merger) {
  if (!isObject(defaults2)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults2);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();
const _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47nuxt_47dist_47head_47runtime_47lib_47vueuse_45head_46plugin = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  const titleTemplate = vue_cjs_prod.ref();
  nuxtApp._useHead = (_meta) => {
    const meta2 = vue_cjs_prod.ref(_meta);
    if ("titleTemplate" in meta2.value) {
      titleTemplate.value = meta2.value.titleTemplate;
    }
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (titleTemplate.value && "title" in meta2.value) {
        overrides.title = typeof titleTemplate.value === "function" ? titleTemplate.value(meta2.value.title) : titleTemplate.value.replace(/%s/g, meta2.value.title);
      }
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => renderHeadToString(head);
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "charset": "utf-8", "viewport": "width=device-width, initial-scale=1", "meta": [{ "name": "keywords", "content": "web,tailwindcss,daisyui,template,blog,responsive sites" }, { "name": "description", "content": "wcao.cc \u5206\u4EAB\u54CD\u5E94\u5F0F\u3001\u591A\u4E3B\u9898\u6A21\u677F\u548C\u7EC4\u4EF6,\u57FA\u4E8Etailwind\u3001daisyui" }, { "name": "viewport", "content": "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" }], "link": [], "style": [], "script": [], "title": "wcao.cc \u5206\u4EAB\u54CD\u5E94\u5F0F\u3001\u591A\u4E3B\u9898\u6A21\u677F\u548C\u7EC4\u4EF6,\u57FA\u4E8Etailwind\u3001daisyui" } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47nuxt_47dist_47head_47runtime_47plugin = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw({ title: "", ...metaConfig.globalMeta }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = {
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_prod.RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a;
          return routeProps.Component && _wrapIf(vue_cjs_prod.Transition, (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition, wrapInKeepAlive(routeProps.route.meta.keepalive, isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
            onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
            onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
          }, { default: () => vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) }))).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const layouts = {
  default: vue_cjs_prod.defineAsyncComponent(() => import('./default.578f8ff8.mjs')),
  template: vue_cjs_prod.defineAsyncComponent(() => import('./template.f7a137f6.mjs'))
};
const defaultLayoutTransition = { name: "layout", mode: "out-in" };
const __nuxt_component_0$1 = vue_cjs_prod.defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout2 = (_b = (_a = vue_cjs_prod.isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout2 && layout2 in layouts;
      return _wrapIf(vue_cjs_prod.Transition, hasLayout && ((_c = route.meta.layoutTransition) != null ? _c : defaultLayoutTransition), _wrapIf(layouts[layout2], hasLayout, context.slots)).default();
    };
  }
});
const layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __nuxt_component_0$1
}, Symbol.toStringTag, { value: "Module" }));
const NUNBER_CHAR_RE = /[0-9]/;
function isUppercase(char = "") {
  if (NUNBER_CHAR_RE.test(char)) {
    return null;
  }
  return char.toUpperCase() === char;
}
const STR_SPLITTERS = ["-", "_", "/", "."];
function splitByCase(str, splitters = STR_SPLITTERS) {
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previusUpper = null;
  let previousSplitter = null;
  for (const char of str.split("")) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previusUpper = null;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previusUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previusUpper = isUpper;
        continue;
      }
      if (previusUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff[buff.length - 1];
        parts.push(buff.substr(0, buff.length - 1));
        buff = lastChar + char;
        previusUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previusUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.substring(1);
}
function pascalCase(str = "") {
  return (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(p)).join("");
}
class Schema {
  constructor(property, normal, space) {
    this.property = property;
    this.normal = normal;
    if (space) {
      this.space = space;
    }
  }
}
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;
function merge(definitions, space) {
  const property = {};
  const normal = {};
  let index = -1;
  while (++index < definitions.length) {
    Object.assign(property, definitions[index].property);
    Object.assign(normal, definitions[index].normal);
  }
  return new Schema(property, normal, space);
}
function normalize(value) {
  return value.toLowerCase();
}
class Info {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
}
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;
let powers = 0;
const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
const types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean,
  booleanish,
  overloadedBoolean,
  number,
  spaceSeparated,
  commaSeparated,
  commaOrSpaceSeparated
}, Symbol.toStringTag, { value: "Module" }));
const checks = Object.keys(types);
class DefinedInfo extends Info {
  constructor(property, attribute, mask, space) {
    let index = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types[check]) === types[check]);
      }
    }
  }
}
DefinedInfo.prototype.defined = true;
function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}
const own = {}.hasOwnProperty;
function create(definition) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition.properties) {
    if (own.call(definition.properties, prop)) {
      const value = definition.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition.transform(definition.attributes || {}, prop),
        value,
        definition.space
      );
      if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition.space);
}
const xlink = create({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});
const xml = create({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
const xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});
const aria = create({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});
const html$1 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});
const svg = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});
const valid = /^data[-\w.:]+$/i;
const dash = /-[a-z]/g;
const cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
const html = merge([xml, xlink, xmlns, aria, html$1], "html");
merge([xml, xlink, xmlns, aria, svg], "svg");
const DEFAULT_SLOT = "default";
const rxOn = /^@|^v-on:/;
const rxBind = /^:|^v-bind:/;
const rxModel = /^v-model/;
const nativeInputs = ["select", "textarea", "input"];
const _sfc_main$d = vue_cjs_prod.defineComponent({
  name: "ContentRendererMarkdown",
  props: {
    value: {
      type: Object,
      required: true
    },
    excerpt: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  async setup(props) {
    var _a;
    const { content: { tags = {} } } = useRuntimeConfig().public;
    await resolveContentComponents(props.value.body, {
      tags: {
        ...tags,
        ...((_a = props.value) == null ? void 0 : _a.tags) || {}
      }
    });
    return { tags };
  },
  render(ctx) {
    var _a;
    const { tags, tag, value } = ctx;
    if (!value) {
      return null;
    }
    let body = value.body || value;
    if (ctx.excerpt && value.excerpt) {
      body = value.excerpt;
    }
    const meta2 = {
      ...value,
      tags: {
        ...tags,
        ...(value == null ? void 0 : value.tags) || {}
      }
    };
    let component = meta2.component || tag;
    if (typeof meta2.component === "object") {
      component = meta2.component.name;
    }
    component = resolveVueComponent(component);
    const children = (body.children || []).map((child) => renderNode(child, vue_cjs_prod.h, meta2));
    return vue_cjs_prod.h(
      component,
      {
        ...(_a = meta2.component) == null ? void 0 : _a.props,
        ...this.$attrs
      },
      {
        default: createSlotFunction(children)
      }
    );
  }
});
function renderNode(node, h2, documentMeta, parentScope = {}) {
  var _a;
  if (node.type === "text") {
    return h2(vue_cjs_prod.Text, node.value);
  }
  const originalTag = node.tag;
  const renderTag = typeof ((_a = node.props) == null ? void 0 : _a.__ignoreMap) === "undefined" && documentMeta.tags[originalTag] || originalTag;
  if (node.tag === "binding") {
    return renderBinding(node, h2, documentMeta, parentScope);
  }
  const component = resolveVueComponent(renderTag);
  if (typeof component === "object") {
    component.tag = originalTag;
  }
  const props = propsToData(node, documentMeta);
  return h2(
    component,
    props,
    renderSlots(node, h2, documentMeta, { ...parentScope, ...props })
  );
}
function renderBinding(node, h2, documentMeta, parentScope = {}) {
  var _a;
  const data = {
    ...parentScope,
    $route: () => useRoute(),
    $document: documentMeta,
    $doc: documentMeta
  };
  const splitter = /\.|\[(\d+)\]/;
  const keys = (_a = node.props) == null ? void 0 : _a.value.trim().split(splitter).filter(Boolean);
  const value = keys.reduce((data2, key) => {
    if (key in data2) {
      if (typeof data2[key] === "function") {
        return data2[key]();
      } else {
        return data2[key];
      }
    }
    return {};
  }, data);
  return h2(vue_cjs_prod.Text, value);
}
function renderSlots(node, h2, documentMeta, parentProps) {
  const children = node.children || [];
  const slots = children.reduce((data, node2) => {
    if (!isTemplate(node2)) {
      data[DEFAULT_SLOT].push(renderNode(node2, h2, documentMeta, parentProps));
      return data;
    }
    if (isDefaultTemplate(node2)) {
      data[DEFAULT_SLOT].push(...(node2.children || []).map((child) => renderNode(child, h2, documentMeta, parentProps)));
      return data;
    }
    const slotName = getSlotName(node2);
    data[slotName] = (node2.children || []).map((child) => renderNode(child, h2, documentMeta, parentProps));
    return data;
  }, {
    [DEFAULT_SLOT]: []
  });
  const slotEntries = Object.entries(slots).map(([name, vDom]) => [name, createSlotFunction(vDom)]);
  return Object.fromEntries(slotEntries);
}
function propsToData(node, documentMeta) {
  const { tag = "", props = {} } = node;
  return Object.keys(props).reduce(function(data, key) {
    if (key === "__ignoreMap") {
      return data;
    }
    const value = props[key];
    if (rxModel.test(key) && !nativeInputs.includes(tag)) {
      return propsToDataRxModel(key, value, data, documentMeta);
    }
    if (key === "v-bind") {
      return propsToDataVBind(key, value, data, documentMeta);
    }
    if (rxOn.test(key)) {
      return propsToDataRxOn(key, value, data, documentMeta);
    }
    if (rxBind.test(key)) {
      return propsToDataRxBind(key, value, data, documentMeta);
    }
    const { attribute } = find(html, key);
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      data[attribute] = value.join(" ");
      return data;
    }
    data[attribute] = value;
    return data;
  }, {});
}
function propsToDataRxModel(key, value, data, documentMeta) {
  const number2 = (d) => +d;
  const trim = (d) => d.trim();
  const noop = (d) => d;
  const mods = key.replace(rxModel, "").split(".").filter((d) => d).reduce((d, k) => {
    d[k] = true;
    return d;
  }, {});
  const field = "value";
  const event = mods.lazy ? "change" : "input";
  const processor = mods.number ? number2 : mods.trim ? trim : noop;
  data[field] = evalInContext(value, documentMeta);
  data.on = data.on || {};
  data.on[event] = (e) => documentMeta[value] = processor(e);
  return data;
}
function propsToDataVBind(_key, value, data, documentMeta) {
  const val = evalInContext(value, documentMeta);
  data = Object.assign(data, val);
  return data;
}
function propsToDataRxOn(key, value, data, documentMeta) {
  key = key.replace(rxOn, "");
  data.on = data.on || {};
  data.on[key] = () => evalInContext(value, documentMeta);
  return data;
}
function propsToDataRxBind(key, value, data, documentMeta) {
  key = key.replace(rxBind, "");
  data[key] = evalInContext(value, documentMeta);
  return data;
}
const resolveVueComponent = (component) => {
  if (!htmlTags.includes(component)) {
    const componentFn = vue_cjs_prod.resolveComponent(pascalCase(component), false);
    if (typeof componentFn === "object") {
      return componentFn;
    }
  }
  return component;
};
function evalInContext(code, context) {
  const result = code.split(".").reduce((o, k) => typeof o === "object" ? o[k] : void 0, context);
  return typeof result === "undefined" ? destr(code) : result;
}
function getSlotName(node) {
  let name = "";
  for (const propName of Object.keys(node.props || {})) {
    if (!propName.startsWith("#") && !propName.startsWith("v-slot:")) {
      continue;
    }
    name = propName.split(/[:#]/, 2)[1];
    break;
  }
  return name || DEFAULT_SLOT;
}
function createSlotFunction(nodes) {
  return nodes.length ? () => mergeTextNodes(nodes) : void 0;
}
function isDefaultTemplate(node) {
  return isTemplate(node) && getSlotName(node) === DEFAULT_SLOT;
}
function isTemplate(node) {
  return node.tag === "template";
}
function mergeTextNodes(nodes) {
  const mergedNodes = [];
  for (const node of nodes) {
    const previousNode = mergedNodes[mergedNodes.length - 1];
    if (node.type === vue_cjs_prod.Text && (previousNode == null ? void 0 : previousNode.type) === vue_cjs_prod.Text) {
      previousNode.children = previousNode.children + node.children;
    } else {
      mergedNodes.push(node);
    }
  }
  return mergedNodes;
}
async function resolveContentComponents(body, meta2) {
  const components2 = Array.from(new Set(loadComponents(body, meta2)));
  await Promise.all(components2.map(async (c) => {
    const resolvedComponent = vue_cjs_prod.resolveComponent(c);
    if ((resolvedComponent == null ? void 0 : resolvedComponent.__asyncLoader) && !resolvedComponent.__asyncResolved) {
      await resolvedComponent.__asyncLoader();
    }
  }));
  function loadComponents(node, documentMeta) {
    var _a;
    if (node.type === "text" || node.tag === "binding") {
      return [];
    }
    const renderTag = typeof ((_a = node.props) == null ? void 0 : _a.__ignoreMap) === "undefined" && documentMeta.tags[node.tag] || node.tag;
    const components22 = [];
    if (node.type !== "root" && !htmlTags.includes(renderTag)) {
      components22.push(renderTag);
    }
    for (const child of node.children || []) {
      components22.push(...loadComponents(child, documentMeta));
    }
    return components22;
  }
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const ContentRendererMarkdown = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = vue_cjs_prod.defineComponent({
  name: "ContentRenderer",
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({})
    },
    excerpt: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(props) {
    vue_cjs_prod.watch(
      () => props.excerpt,
      (newExcerpt) => {
        var _a, _b, _c;
        if (newExcerpt && !((_a = props.value) == null ? void 0 : _a.excerpt)) {
          console.warn(`No excerpt found for document content/${(_b = props == null ? void 0 : props.value) == null ? void 0 : _b._path}.${(_c = props == null ? void 0 : props.value) == null ? void 0 : _c._extension}!`);
          console.warn("Make sure to use <!--more--> in your content if you want to use excerpt feature.");
        }
      },
      {
        immediate: true
      }
    );
  },
  render(ctx) {
    var _a, _b;
    const slots = vue_cjs_prod.useSlots();
    const { value, excerpt, tag } = ctx;
    if (value && (value == null ? void 0 : value._type) === "markdown" && ((_b = (_a = value == null ? void 0 : value.body) == null ? void 0 : _a.children) == null ? void 0 : _b.length)) {
      return vue_cjs_prod.h(
        _sfc_main$d,
        {
          value,
          excerpt,
          tag,
          ...this.$attrs
        }
      );
    }
    if (value && (slots == null ? void 0 : slots.default)) {
      return slots.default({ value, excerpt, tag, ...this.$attrs });
    } else if (slots == null ? void 0 : slots.empty) {
      return slots.empty({ value, excerpt, tag, ...this.$attrs });
    } else if (slots == null ? void 0 : slots.default) {
      return slots.default({ value, excerpt, tag, ...this.$attrs });
    }
    return vue_cjs_prod.h(
      "pre",
      null,
      JSON.stringify({ message: "You should use slots with <ContentRenderer>", value, excerpt, tag }, null, 2)
    );
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ContentRenderer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = vue_cjs_prod.defineComponent({
  name: "DocumentDrivenEmpty",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  render({ value }) {
    return vue_cjs_prod.h("div", void 0, [
      vue_cjs_prod.h("p", "Document is empty"),
      vue_cjs_prod.h("p", `Add content to it by opening ${value._source}/${value._file} file.`)
    ]);
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const DocumentDrivenEmpty = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = vue_cjs_prod.defineComponent({
  name: "DocumentDrivenNotFound",
  render() {
    return vue_cjs_prod.h("div", "Document not found");
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const DocumentDrivenNotFound = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const vLazy = (src) => {
  return {
    src,
    loading: "/loading.svg"
  };
};
const useUnsplash = (src, opts) => {
  const url = "https://source.unsplash.com" + src + opts;
  return url + "?" + Math.random();
};
const usePicsum = (opts) => {
  const url = `https://picsum.photos${opts}`;
  return `${url}?t=${Math.random()}`;
};
const defaults = {
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false
};
function objectHash(object, options = {}) {
  options = { ...defaults, ...options };
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
function createHasher(options) {
  const buff = [];
  let context = [];
  const write = (str) => {
    buff.push(str);
  };
  return {
    toString() {
      return buff.join("");
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this["_" + type](value);
    },
    _object(object) {
      const pattern = /\[object (.*)\]/i;
      const objString = Object.prototype.toString.call(object);
      const _objType = pattern.exec(objString);
      const objType = _objType ? _objType[1].toLowerCase() : "unknown:[" + objString.toLowerCase() + "]";
      let objectNumber = null;
      if ((objectNumber = context.indexOf(object)) >= 0) {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      } else {
        context.push(object);
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this["_" + objType]) {
          this["_" + objType](object);
        } else if (options.ignoreUnknown) {
          return write("[" + objType + "]");
        } else {
          throw new Error('Unknown object type "' + objType + '"');
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        if (options.respectType !== false && !isNativeFunction(object)) {
          keys.splice(0, 0, "prototype", "__proto__", "letructor");
        }
        if (options.excludeKeys) {
          keys = keys.filter(function(key) {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + keys.length + ":");
        return keys.forEach((key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        });
      }
    },
    _array(arr, unordered) {
      unordered = typeof unordered !== "undefined" ? unordered : options.unorderedArrays !== false;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        return arr.forEach((entry2) => {
          return this.dispatch(entry2);
        });
      }
      const contextAdditions = [];
      const entries = arr.map((entry2) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry2);
        contextAdditions.push(hasher.getContext());
        return hasher.toString();
      });
      context = context.concat(contextAdditions);
      entries.sort();
      return this._array(entries, false);
    },
    _date(date) {
      return write("date:" + date.toJSON());
    },
    _symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    _error(err) {
      return write("error:" + err.toString());
    },
    _boolean(bool) {
      return write("bool:" + bool.toString());
    },
    _string(string) {
      write("string:" + string.length + ":");
      write(string.toString());
    },
    _function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this._object(fn);
      }
    },
    _number(number2) {
      return write("number:" + number2.toString());
    },
    _xml(xml2) {
      return write("xml:" + xml2.toString());
    },
    _null() {
      return write("Null");
    },
    _undefined() {
      return write("Undefined");
    },
    _regexp(regex) {
      return write("regex:" + regex.toString());
    },
    _uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    _url(url) {
      return write("url:" + url.toString());
    },
    _map(map) {
      write("map:");
      const arr = Array.from(map);
      return this._array(arr, options.unorderedSets !== false);
    },
    _set(set) {
      write("set:");
      const arr = Array.from(set);
      return this._array(arr, options.unorderedSets !== false);
    },
    _file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    _blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error('Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n');
    },
    _domwindow() {
      return write("domwindow");
    },
    _bigint(number2) {
      return write("bigint:" + number2.toString());
    },
    _process() {
      return write("process");
    },
    _timer() {
      return write("timer");
    },
    _pipe() {
      return write("pipe");
    },
    _tcp() {
      return write("tcp");
    },
    _udp() {
      return write("udp");
    },
    _tty() {
      return write("tty");
    },
    _statwatcher() {
      return write("statwatcher");
    },
    _securecontext() {
      return write("securecontext");
    },
    _connection() {
      return write("connection");
    },
    _zlib() {
      return write("zlib");
    },
    _context() {
      return write("context");
    },
    _nodescript() {
      return write("nodescript");
    },
    _httpparser() {
      return write("httpparser");
    },
    _dataview() {
      return write("dataview");
    },
    _signal() {
      return write("signal");
    },
    _fsevent() {
      return write("fsevent");
    },
    _tlswrap() {
      return write("tlswrap");
    }
  };
}
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  const exp = /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;
  return exp.exec(Function.prototype.toString.call(f)) != null;
}
class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    if (sigBytes !== void 0) {
      this.sigBytes = sigBytes;
    } else {
      this.sigBytes = words.length * 4;
    }
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray(this.words.slice(0));
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16));
      hexChars.push((bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
    this.reset();
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}
const H = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
const K = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super();
    this.reset();
  }
  reset() {
    super.reset();
    this._hash = new WordArray(H.slice(0));
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h2 = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h2 + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h2 = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h2 | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}
function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).substr(0, 10);
}
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
function jsonStringify(value) {
  return JSON.stringify(value, regExpReplacer);
}
function regExpReplacer(_key, value) {
  if (value instanceof RegExp) {
    return `--REGEX ${value.toString()}`;
  }
  return value;
}
const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
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
function unwrap(vnode, tags = ["p"]) {
  if (Array.isArray(vnode)) {
    return vnode.flatMap((node) => unwrap(node, tags));
  }
  let result = vnode;
  if (tags.some((tag) => tag === "*" || isTag(vnode, tag))) {
    result = nodeChildren(vnode) || vnode;
    if (!Array.isArray(result) && TEXT_TAGS.some((tag) => isTag(vnode, tag))) {
      result = [result];
    }
  }
  return result;
}
function flatUnwrap(vnodes, tags = ["p"]) {
  vnodes = Array.isArray(vnodes) ? vnodes : [vnodes];
  if (!tags.length) {
    return vnodes;
  }
  return vnodes.flatMap((vnode) => flatUnwrap(unwrap(vnode, [tags[0]]), tags.slice(1))).filter((vnode) => !(isText(vnode) && nodeTextContent(vnode).trim() === ""));
}
const withContentBase = (url) => withBase(url, "/api/" + useRuntimeConfig().public.content.base);
const useUnwrap = () => ({
  unwrap,
  flatUnwrap
});
const createQueryFetch = (path) => (query) => {
  var _a;
  if (path) {
    if (query.params().first) {
      query.where({ _path: withoutTrailingSlash(path) });
    } else {
      query.where({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
    }
  }
  if (!((_a = query.params().sort) == null ? void 0 : _a.length)) {
    query.sort({ _file: 1, $numeric: true });
  }
  const params = query.params();
  const apiPath = withContentBase(`/query/${hash(params)}`);
  {
    useHead({
      link: [
        { rel: "prefetch", href: apiPath }
      ]
    });
  }
  return $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: {
      _params: jsonStringify(params),
      previewToken: useCookie("previewToken").value
    }
  });
};
function queryContent(query, ...pathParts) {
  if (typeof query === "string") {
    return createQuery(createQueryFetch(withLeadingSlash(joinURL(query, ...pathParts))));
  }
  return createQuery(createQueryFetch(), query);
}
const websiteConfig = {
  name: "wcao.cc",
  asset: "https://strapi.wcao.cc"
};
const useAsset = (url = "", path = "", modifiers) => {
  if (url.includes("http")) {
    return url;
  }
  return useNuxtApp().$img(`wcao${path}/${url}`.replace("//", "/"), modifiers, {
    provider: "ipx",
    baseURL: "https://p.wcao.cc/_ipx"
  });
};
const iconFill = 'font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;';
const getContentByTag = (tagName, page, type) => {
  const pageIndex = (page == null ? void 0 : page.pageIndex) || 1;
  const pageSize = (page == null ? void 0 : page.pageSize) || 12;
  const tags = {};
  tags[type || "$contains"] = tagName;
  return queryContent("introduce").where({
    tags
  }).only(["_id", "_path", "title", "tags", "previews", "light", "dark"]).skip((pageIndex - 1) * pageSize).limit(pageSize).find();
};
const drawerContentPullUpEnd = vue_cjs_prod.ref(0);
const drawerContentScroll = vue_cjs_prod.ref();
vue_cjs_prod.ref(null);
const templateContacts = {
  facebook: `<svg
    class="inline-block w-4 h-4 fill-current"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
    ></path>
  </svg>`,
  twitter: `<svg
  class="inline-block w-4 h-4 fill-current"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
  ></path>
</svg>`,
  instagram: `<svg
class="inline-block w-4 h-4 fill-current"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
>
<path
  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
></path>
<rect x="2" y="9" width="4" height="12"></rect>
<circle cx="4" cy="4" r="2"></circle>
</svg>`,
  github: `<svg
class="inline-block w-4 h-4 fill-current"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
>
<path
  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
></path>
</svg>`
};
const templateMenu = {
  en: [
    {
      icon: "home",
      text: "home"
    },
    {
      icon: "person",
      text: "About"
    },
    {
      icon: "content_copy",
      text: "Categories"
    },
    {
      icon: "search",
      text: "Search"
    },
    {
      icon: "collections_bookmark",
      text: "Archive"
    }
  ],
  zh: [
    {
      icon: "home",
      text: "\u4E3B\u9875"
    },
    {
      icon: "person",
      text: "\u5173\u4E8E\u6211"
    },
    {
      icon: "content_copy",
      text: "\u5206\u7C7B"
    },
    {
      icon: "search",
      text: "\u641C\u7D22"
    },
    {
      icon: "collections_bookmark",
      text: "\u5F52\u6863"
    }
  ]
};
const allThemes = {
  light: "light",
  dark: "dark",
  cupcake: "cupcake",
  bumblebee: "bumblebee",
  emerald: "emerald",
  corporate: "corporate",
  synthwave: "synthwave",
  retro: "retro",
  cyberpunk: "cyberpunk",
  valentine: "valentine",
  halloween: "halloween",
  garden: "garden",
  forest: "forest",
  aqua: "aqua",
  lofi: "lofi",
  pastel: "pastel",
  fantasy: "fantasy",
  wireframe: "wireframe",
  black: "black",
  luxury: "luxury",
  dracula: "dracula",
  cmyk: "cmyk",
  autumn: "autumn",
  business: "business",
  acid: "acid",
  lemonade: "lemonade",
  night: "night",
  coffee: "coffee",
  winter: "winter"
};
const allBtnType = [
  "btn-primary",
  "btn-secondary",
  "btn-accent",
  "btn-info",
  "btn-success",
  "btn-warning",
  "btn-error"
];
const baseInfo = {
  en: {
    title: "wcao.cc",
    subtitle: "Share reactive, multi-theme templates and components based on TailwindCSS, DaisyUI."
  },
  zh: {
    title: "\u5367\u69FD - \u8868\u793A\u60CA\u8BB6\u3001\u8D5E\u7F8E",
    subtitle: "\u5206\u4EAB\u54CD\u5E94\u5F0F\u3001\u591A\u4E3B\u9898\u6A21\u677F\u548C\u7EC4\u4EF6\uFF0C\u57FA\u4E8E tailwind\u3001daisyui"
  }
};
const templateIcons = (num, style, className) => {
  return [
    `<span class="material-symbols-outlined">add_to_drive</span>`,
    `<span class="material-symbols-outlined">android</span>`,
    `<span class="material-symbols-outlined">atr</span>`,
    `<span class="material-symbols-outlined">clear_night</span>`,
    `<span class="material-symbols-outlined">cloudy_snowing</span>`,
    `<span class="material-symbols-outlined">g_translate</span>`,
    `<span class="material-symbols-outlined">home_app_logo</span>`,
    `<span class="material-symbols-outlined">macro_off</span>`,
    `<span class="material-symbols-outlined">matter</span>`,
    `<span class="material-symbols-outlined">mode_heat</span>`,
    `<span class="material-symbols-outlined">polymer</span>`,
    `<span class="material-symbols-outlined">quick_phrases</span>`,
    `<span class="material-symbols-outlined">translate</span>`,
    `<span class="material-symbols-outlined">view_in_ar_new</span>`,
    `<span class="material-symbols-outlined">webhook</span>`,
    `<span class="material-symbols-outlined">youtube_activity</span>`
  ][num].replace(
    `class="material-symbols-outlined"`,
    `class="material-symbols-outlined ${className}" style="${style}"`
  );
};
const navBottomLink = (link) => {
  if (!link.children) {
    return link._path;
  }
  for (const child of (link == null ? void 0 : link.children) || []) {
    const result = navBottomLink(child);
    if (result) {
      return result;
    }
  }
};
const navDirFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path && !file._id) {
      return file.children;
    }
    if (file.children) {
      const result = navDirFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navPageFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path) {
      return file;
    }
    if (file.children) {
      const result = navPageFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navKeyFromPath = (path, key, tree) => {
  let value;
  const goDeep = (path2, tree2) => {
    for (const file of tree2) {
      if (path2.startsWith(file._path) && file[key]) {
        value = file[key];
      }
      if (file._path === path2) {
        return;
      }
      if (file.children) {
        goDeep(path2, file.children);
      }
    }
  };
  goDeep(path, tree);
  return value;
};
const useContentHelpers = () => {
  return {
    navBottomLink,
    navDirFromPath,
    navPageFromPath,
    navKeyFromPath
  };
};
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
const fetchContentNavigation = (queryBuilder) => {
  let params = queryBuilder;
  if (typeof (params == null ? void 0 : params.params) === "function") {
    params = params.params();
  }
  const apiPath = withContentBase(params ? `/navigation/${hash(params)}` : "/navigation");
  {
    useHead({
      link: [
        { rel: "prefetch", href: apiPath }
      ]
    });
  }
  return $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: {
      _params: jsonStringify(params || {}),
      previewToken: useCookie("previewToken").value
    }
  });
};
const useContentState = () => {
  const pages = useState("dd-pages", () => ({}), "$gDBOlo1NXa");
  const surrounds = useState("dd-surrounds", () => ({}), "$Y2Y334ncPK");
  const navigation = useState("dd-navigation", "$4eik4lXOcd");
  const globals = useState("dd-globals", () => ({}), "$S71o1jzpOB");
  return {
    pages,
    surrounds,
    navigation,
    globals
  };
};
const useContent = () => {
  const { navigation, pages, surrounds, globals } = useContentState();
  const _path = vue_cjs_prod.computed(() => withoutTrailingSlash(useRoute().path));
  const page = vue_cjs_prod.computed(
    () => {
      return pages.value[_path.value];
    }
  );
  const surround = vue_cjs_prod.computed(
    () => {
      return surrounds.value[_path.value];
    }
  );
  const toc = vue_cjs_prod.computed(() => {
    var _a, _b;
    return (_b = (_a = page == null ? void 0 : page.value) == null ? void 0 : _a.body) == null ? void 0 : _b.toc;
  });
  const type = vue_cjs_prod.computed(() => {
    var _a, _b;
    return (_b = (_a = page.value) == null ? void 0 : _a.meta) == null ? void 0 : _b.type;
  });
  const excerpt = vue_cjs_prod.computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a.excerpt;
  });
  const layout2 = vue_cjs_prod.computed(() => {
    var _a, _b;
    return (_b = (_a = page.value) == null ? void 0 : _a.meta) == null ? void 0 : _b.layout;
  });
  const next = vue_cjs_prod.computed(() => {
    var _a;
    return (_a = surround.value) == null ? void 0 : _a[1];
  });
  const prev = vue_cjs_prod.computed(() => {
    var _a;
    return (_a = surround.value) == null ? void 0 : _a[0];
  });
  return {
    globals,
    navigation,
    surround,
    page,
    excerpt,
    toc,
    type,
    layout: layout2,
    next,
    prev
  };
};
const _sfc_main$9 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/pages/document-driven.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const meta$5 = void 0;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const meta$4 = void 0;
const _sfc_main$8 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "swiper",
  __ssrInlineRender: true,
  props: {
    data: null,
    title: null,
    breakpoints: null,
    cat: null,
    loop: { type: Boolean },
    allowTouchMove: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const modules = [Navigation];
    const onSwiper = (swiper2) => {
      setTimeout(() => {
        swiper2.navigation.init();
        swiper2.navigation.update();
      }, 100);
    };
    const onClick = (_swiper) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Swiper), vue_cjs_prod.mergeProps({
        "allow-touch-move": props.allowTouchMove,
        modules,
        navigation: {
          nextEl: ".cu-swiper-button-next",
          prevEl: ".cu-swiper-button-prev"
        },
        breakpoints: props.breakpoints,
        loop: props.loop,
        class: "!pt-16",
        onSwiper,
        onClick
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="capitalize text-xl font-semibold tracking-widest absolute left-0 top-0 w-full h-8" data-v-2c9768aa${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.title)}</h3><div class="absolute right-0 top-0 flex justify-center items-center h-8" data-v-2c9768aa${_scopeId}>`);
            if (__props.cat) {
              _push2(`<div class="btn btn-xs normal-case btn-link pt-1 pr-0" data-v-2c9768aa${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                to: __props.cat.to
              }, {
                default: vue_cjs_prod.withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(__props.cat.name)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.cat.name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="btn-group" data-v-2c9768aa${_scopeId}><div class="cu-swiper-button-prev" data-v-2c9768aa${_scopeId}><span class="material-symbols-outlined !text-base text-center" data-v-2c9768aa${_scopeId}> arrow_back_ios_new </span></div><div class="cu-swiper-button-next" data-v-2c9768aa${_scopeId}><span class="material-symbols-outlined !text-base" data-v-2c9768aa${_scopeId}> arrow_forward_ios </span></div></div></div><!--[-->`);
            serverRenderer.exports.ssrRenderList(props.data, (item) => {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(SwiperSlide), {
                key: item._id
              }, {
                default: vue_cjs_prod.withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="group overflow-hidden rounded-box" data-v-2c9768aa${_scopeId2}>`);
                    _push3(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                      to: item._path
                    }, {
                      default: vue_cjs_prod.withCtx((_32, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
                            class: ["aspect-square transition-transform cursor-zoom-in rounded-box border bg-base-200/20 md:group-hover:scale-125", [
                              "rounded-box w-full max-w-screen-md  aspect-video  object-contain border-base-300 "
                            ]]
                          }, serverRenderer.exports.ssrGetDirectiveProps(
                            _ctx,
                            _directive_lazy,
                            vue_cjs_prod.unref(vLazy)(
                              vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                                format: "webp",
                                w: 960
                              })
                            )
                          )))} data-v-2c9768aa${_scopeId3}><div class="w-full h-24 bottom-0 transition-colors duration-300 left-0 z-40 px-4 absolute bg-base-100/20 md:group-hover:bg-base-100/80" data-v-2c9768aa${_scopeId3}><p class="text-lg mt-4 mb-2 font-medium capitalize" data-v-2c9768aa${_scopeId3}>${serverRenderer.exports.ssrInterpolate(item.title)}</p><p data-v-2c9768aa${_scopeId3}><!--[-->`);
                          serverRenderer.exports.ssrRenderList(item.tags.slice(0, 3), (tag) => {
                            _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                              key: tag,
                              to: `/tag/${tag}`,
                              class: "btn btn-xs mr-2 font-normal btn-primary relative z-50"
                            }, {
                              default: vue_cjs_prod.withCtx((_42, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${serverRenderer.exports.ssrInterpolate(tag)}`);
                                } else {
                                  return [
                                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></p></div>`);
                        } else {
                          return [
                            vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", {
                              class: ["aspect-square transition-transform cursor-zoom-in rounded-box border bg-base-200/20 md:group-hover:scale-125", [
                                "rounded-box w-full max-w-screen-md  aspect-video  object-contain border-base-300 "
                              ]]
                            }, null, 512), [
                              [
                                _directive_lazy,
                                vue_cjs_prod.unref(vLazy)(
                                  vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                                    format: "webp",
                                    w: 960
                                  })
                                )
                              ]
                            ]),
                            vue_cjs_prod.createVNode("div", { class: "w-full h-24 bottom-0 transition-colors duration-300 left-0 z-40 px-4 absolute bg-base-100/20 md:group-hover:bg-base-100/80" }, [
                              vue_cjs_prod.createVNode("p", { class: "text-lg mt-4 mb-2 font-medium capitalize" }, vue_cjs_prod.toDisplayString(item.title), 1),
                              vue_cjs_prod.createVNode("p", null, [
                                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.tags.slice(0, 3), (tag) => {
                                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_NuxtLink, {
                                    key: tag,
                                    to: `/tag/${tag}`,
                                    class: "btn btn-xs mr-2 font-normal btn-primary relative z-50"
                                  }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]);
                                }), 128))
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      vue_cjs_prod.createVNode("div", { class: "group overflow-hidden rounded-box" }, [
                        vue_cjs_prod.createVNode(_component_NuxtLink, {
                          to: item._path
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", {
                              class: ["aspect-square transition-transform cursor-zoom-in rounded-box border bg-base-200/20 md:group-hover:scale-125", [
                                "rounded-box w-full max-w-screen-md  aspect-video  object-contain border-base-300 "
                              ]]
                            }, null, 512), [
                              [
                                _directive_lazy,
                                vue_cjs_prod.unref(vLazy)(
                                  vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                                    format: "webp",
                                    w: 960
                                  })
                                )
                              ]
                            ]),
                            vue_cjs_prod.createVNode("div", { class: "w-full h-24 bottom-0 transition-colors duration-300 left-0 z-40 px-4 absolute bg-base-100/20 md:group-hover:bg-base-100/80" }, [
                              vue_cjs_prod.createVNode("p", { class: "text-lg mt-4 mb-2 font-medium capitalize" }, vue_cjs_prod.toDisplayString(item.title), 1),
                              vue_cjs_prod.createVNode("p", null, [
                                (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.tags.slice(0, 3), (tag) => {
                                  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_NuxtLink, {
                                    key: tag,
                                    to: `/tag/${tag}`,
                                    class: "btn btn-xs mr-2 font-normal btn-primary relative z-50"
                                  }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]);
                                }), 128))
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              vue_cjs_prod.createVNode("h3", { class: "capitalize text-xl font-semibold tracking-widest absolute left-0 top-0 w-full h-8" }, vue_cjs_prod.toDisplayString(__props.title), 1),
              vue_cjs_prod.createVNode("div", { class: "absolute right-0 top-0 flex justify-center items-center h-8" }, [
                __props.cat ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                  key: 0,
                  class: "btn btn-xs normal-case btn-link pt-1 pr-0"
                }, [
                  vue_cjs_prod.createVNode(_component_NuxtLink, {
                    to: __props.cat.to
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.cat.name), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])) : vue_cjs_prod.createCommentVNode("", true),
                vue_cjs_prod.createVNode("div", { class: "btn-group" }, [
                  vue_cjs_prod.createVNode("div", { class: "cu-swiper-button-prev" }, [
                    vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined !text-base text-center" }, " arrow_back_ios_new ")
                  ]),
                  vue_cjs_prod.createVNode("div", { class: "cu-swiper-button-next" }, [
                    vue_cjs_prod.createVNode("span", { class: "material-symbols-outlined !text-base" }, " arrow_forward_ios ")
                  ])
                ])
              ]),
              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(props.data, (item) => {
                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), {
                  key: item._id
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode("div", { class: "group overflow-hidden rounded-box" }, [
                      vue_cjs_prod.createVNode(_component_NuxtLink, {
                        to: item._path
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("img", {
                            class: ["aspect-square transition-transform cursor-zoom-in rounded-box border bg-base-200/20 md:group-hover:scale-125", [
                              "rounded-box w-full max-w-screen-md  aspect-video  object-contain border-base-300 "
                            ]]
                          }, null, 512), [
                            [
                              _directive_lazy,
                              vue_cjs_prod.unref(vLazy)(
                                vue_cjs_prod.unref(useAsset)(item.previews[0], item._path, {
                                  format: "webp",
                                  w: 960
                                })
                              )
                            ]
                          ]),
                          vue_cjs_prod.createVNode("div", { class: "w-full h-24 bottom-0 transition-colors duration-300 left-0 z-40 px-4 absolute bg-base-100/20 md:group-hover:bg-base-100/80" }, [
                            vue_cjs_prod.createVNode("p", { class: "text-lg mt-4 mb-2 font-medium capitalize" }, vue_cjs_prod.toDisplayString(item.title), 1),
                            vue_cjs_prod.createVNode("p", null, [
                              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(item.tags.slice(0, 3), (tag) => {
                                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_NuxtLink, {
                                  key: tag,
                                  to: `/tag/${tag}`,
                                  class: "btn btn-xs mr-2 font-normal btn-primary relative z-50"
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(tag), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]);
                              }), 128))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/core/swiper.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-2c9768aa"]]);
const swiper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __nuxt_component_0
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = void 0;
const meta$2 = void 0;
const meta$1 = void 0;
const _sfc_main$7 = {
  __name: "1",
  __ssrInlineRender: true,
  setup(__props) {
    const { $Mock } = useNuxtApp();
    const route = useRoute();
    const lang = vue_cjs_prod.ref("en");
    const page = vue_cjs_prod.ref({});
    vue_cjs_prod.watch(route, (v) => {
      lang.value = v.query.lang;
      init(lang.value);
    });
    const init = () => {
      page.value = {
        en: {
          who: "who am i?",
          whoDesc: $Mock.Random.paragraph(3, 8),
          connect: "Let's connect",
          joinInput: "Give me your Email",
          joinBtn: "Join the club",
          contactTitle: "HERE'S A CONTACT FORM",
          contactSubtitle: $Mock.Random.title(),
          contactDesc: $Mock.Random.paragraph(),
          contactName: "name",
          contactEmail: "email",
          contactMessage: "message",
          send: "send",
          myphone: "my phone",
          myemail: "my email",
          myaddress: "my address",
          address: "New York D Block 1100, 2011 USA"
        },
        zh: {
          who: "\u6211\u662F\u8C01\uFF1F",
          whoDesc: $Mock.Random.cparagraph(5, 12),
          connect: "\u8054\u7CFB\u6211",
          joinInput: "\u4F60\u7684\u90AE\u7BB1",
          joinBtn: "\u52A0\u5165\u56E2\u961F",
          contactTitle: "\u610F\u89C1\u6216\u5EFA\u8BAE",
          contactSubtitle: $Mock.Random.ctitle(),
          contactDesc: $Mock.Random.cparagraph(),
          contactName: "\u4F60\u7684\u540D\u5B57",
          contactEmail: "\u4F60\u7684\u90AE\u7BB1",
          contactMessage: "\u8BF4\u70B9\u4EC0\u4E48",
          send: "\u53D1\u9001",
          myphone: "\u7535\u8BDD",
          myemail: "\u90AE\u7BB1",
          myaddress: "\u5730\u5740",
          address: "\u4E2D\u56FD \u56DB\u5DDD\u7701 \u6210\u90FD\u5E02 xx\u533A "
        }
      }[lang.value];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "relative bg-base-100 w-full font-light overflow-y-scroll h-screen" }, _attrs))}><div><div class="w-full z-50 top-0 py-3 sm:py-5 absolute"><div class="navbar relative xl:pl-12"><div class="flex-1"><a class="btn btn-ghost normal-case text-3xl text-primary-content/80">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].title)}</a></div><div class="flex-none"><div class="dropdown dropdown-end xl:dropdown-open xl:dropdown-left"><label tabindex="0" class="btn m-1 btn-ghost btn-sm text-primary-content/80 xl:btn-disabled xl:opacity-0"><span class="material-symbols-outlined"> settings_suggest </span></label><ul tabindex="0" class="dropdown-content xl:menu-horizontal xl:w-auto xl:min-w-max menu uppercase shadow xl:bg-transparent xl:shadow-none rounded-box md:w-96 w-72 xl:text-primary-content/80 md:bg-base-100"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateMenu)[lang.value], (item) => {
        _push(`<li><a>${serverRenderer.exports.ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div><div><div class="relative bg-cover bg-center bg-no-repeat py-8" style="${serverRenderer.exports.ssrRenderStyle(`background-image: url(${vue_cjs_prod.unref(useUnsplash)(
        "/1920x1080",
        "?fashion"
      )})`)}"><div class="absolute inset-0 z-20 bg-gradient-to-r from-primary/10 to-primary/90 bg-cover bg-center bg-no-repeat"></div><div class="container m-auto relative z-30 pt-20 pb-12 sm:pt-56 sm:pb-48 lg:pt-64 lg:pb-48 min-h-[60vh]"><div class="flex flex-col items-center justify-center lg:flex-row"><div class="rounded-full flex-shrink-0 border-8 border-primary/30 shadow-xl"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: "h-48 rounded-full sm:h-56",
        alt: "author"
      }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(vue_cjs_prod.unref(usePicsum)("/192/192")))))}></div><div class="pt-8 sm:pt-10 lg:ml-8 lg:pt-0 text-primary-content/90 px-4"><h1 class="text-center text-4xl sm:text-left sm:text-5xl md:text-6xl line-clamp-2">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].subtitle)}</h1><div class="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start"><div class="flex items-center justify-center pl-0 sm:justify-start md:pl-1"><p class="text-lg uppercase">${serverRenderer.exports.ssrInterpolate(page.value.connect)}</p><div class="hidden sm:flex btn btn-link btn-xs justify-center items-center"><i class="fa-solid fa-chevron-right text-info text-lg"></i></div></div><div class="flex items-center justify-center pt-5 sm:justify-start sm:pt-0"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateContacts), (item, i) => {
        _push(`<a href="#" class="btn btn-square btn-outline btn-ghost border-transparent text-primary-content">${item}</a>`);
      });
      _push(`<!--]--></div></div></div></div></div></div><div id="about" class="bg-base-200/50"><div class="container m-auto flex flex-col items-center py-16 md:py-20 lg:flex-row px-4"><div class="w-full text-center lg:w-3/5 lg:text-left"><h2 class="text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(page.value.who)}</h2><h4 class="pt-6 text-xl font-medium text-base-content sm:text-2xl lg:text-3xl">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].subtitle)}</h4><p class="pt-6 leading-relaxed text-grey-20">${serverRenderer.exports.ssrInterpolate(page.value.whoDesc)}</p><div class="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start"><div class="flex items-center justify-center sm:justify-start"><p class="text-lg font-semibold uppercase">${serverRenderer.exports.ssrInterpolate(page.value.connect)}</p><div class="hidden sm:block"><i class="bx bx-chevron-right text-2xl text-primary"></i></div></div><div class="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateContacts), (item, i) => {
        _push(`<a class="btn btn-square text-xl btn-outline border-0 btn-ghost">${item}</a>`);
      });
      _push(`<!--]--></div></div></div><div class="w-full pl-0 pt-10 lg:w-2/5 lg:pl-12 lg:pt-0"><!--[-->`);
      serverRenderer.exports.ssrRenderList([
        {
          lang: "javascript",
          progress: vue_cjs_prod.unref($Mock).Random.natural(1, 99)
        },
        {
          lang: "html & css",
          progress: vue_cjs_prod.unref($Mock).Random.natural(1, 99)
        },
        {
          lang: "vue",
          progress: vue_cjs_prod.unref($Mock).Random.natural(1, 99)
        },
        {
          lang: "react",
          progress: vue_cjs_prod.unref($Mock).Random.natural(1, 99)
        }
      ], (item) => {
        _push(`<div class="mb-6"><div class="flex items-end justify-between"><h4 class="font-semibold uppercase text-base-content">${serverRenderer.exports.ssrInterpolate(item.lang)}</h4><h3 class="text-3xl font-bold text-primary">${serverRenderer.exports.ssrInterpolate(item.progress)}% </h3></div><progress class="progress w-full h-3 progress-primary" max="100"${serverRenderer.exports.ssrRenderAttr("value", item.progress)}></progress></div>`);
      });
      _push(`<!--]--></div></div></div><div id="services" class="container mx-auto px-4 py-16 md:py-20"><h2 class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h2><h3 class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h3><div class="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"><!--[-->`);
      serverRenderer.exports.ssrRenderList(_ctx.$MockList(6)[lang.value], (item, i) => {
        _push(`<div class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"><span class="text-8xl group-hover:text-base-100 text-base-content"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "rounded-full" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.authorAvatar))))}></span><div class="text-center"><h3 class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-primary-content lg:text-xl line-clamp-1">${serverRenderer.exports.ssrInterpolate(item.title)}</h3><p class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base">${serverRenderer.exports.ssrInterpolate(item.desc)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div id="portfolio" class="container m-auto py-16 md:py-20 px-4"><h2 class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h2><h3 class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h3><div class="mx-auto grid w-full grid-cols-1 gap-8 pt-12 md:gap-10 lg:w-full lg:grid-cols-2"><!--[-->`);
      serverRenderer.exports.ssrRenderList(_ctx.$MockList(4, ["/1000x568", "?work"])[lang.value], (item, i) => {
        _push(`<a class="mx-auto transform transition-all hover:scale-105 md:mx-0 max-h-[568px]"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
          class: "w-full shadow h-full",
          alt: "portfolio image"
        }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.image))))}></a>`);
      });
      _push(`<!--]--></div></div><div id="clients" class="bg-base-200/50"><div class="container m-auto py-16 md:py-20"><div class="mx-auto flex flex-col justify-between items-center w-full sm:w-3/4 lg:w-full"><h2 class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h2><div class="grid lg:grid-cols-6 grid-cols-2 mt-12"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref($Mock).Random.range(6), (item) => {
        _push(`<div class="mx-8 block w-24 mt-4 lg:mt-0">${vue_cjs_prod.unref(templateIcons)(
          item,
          "font-size: 96px",
          "!text-base-content/60"
        )}</div>`);
      });
      _push(`<!--]--></div></div></div></div><div id="work" class="container px-4 py-16 m-auto md:py-20"><h2 class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h2><h3 class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h3><div class="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3"><span class="left-1/3 absolute inset-y-0 ml-10 hidden w-0.5 bg-base-300 md:block"></span><!--[-->`);
      serverRenderer.exports.ssrRenderList(3, (item) => {
        _push(`<div class="mt-8 flex flex-col text-center md:flex-row md:text-left"><div class="md:w-1/3 relative -top-2.5"><div class="flex justify-center md:justify-start"><span class="shrink-0 text-base-content/60 flex justify-center items-center capitalize"><span class="text-3xl mr-2">${vue_cjs_prod.unref(templateIcons)(item, "font-size:36px;")}</span> ${serverRenderer.exports.ssrInterpolate(_ctx.$MockWord()[lang.value])}</span><div class="relative ml-3 hidden w-full md:block"><span class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-primary/50"></span></div></div></div><div class="md:w-2/3"><div class="relative flex md:pl-24"><span class="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-base-100 md:block"></span><div class="mt-1 flex"><span class="material-symbols-outlined text-primary relative -top-1"> arrow_right </span><div class="md:-mt-1 md:pl-12"><span class="block font-bold text-grey-40">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</span><span class="block pt-2 text-xl font-bold uppercase text-primary">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</span><div class="pt-2"><span class="block text-base-content line-clamp-5">${serverRenderer.exports.ssrInterpolate(_ctx.$MockContent()[lang.value])}</span></div></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div id="statistics" class="bg-cover bg-top bg-no-repeat py-16 lg:py-24" style="${serverRenderer.exports.ssrRenderStyle(`background-image: url('${vue_cjs_prod.unref(usePicsum)("/1080/400")}')`)}"><div class="container m-auto"><div class="mx-auto w-5/6 bg-base-100 py-16 shadow md:w-11/12 lg:py-20 xl:py-24 2xl:w-full"><div class="grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4 xl:gap-5"><!--[-->`);
      serverRenderer.exports.ssrRenderList(4, (item) => {
        _push(`<div class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"><span class="text-6xl xl:mr-2 mr-0">${vue_cjs_prod.unref(templateIcons)(item, "font-size:48px")}</span><div class="pt-5 md:pl-5 md:pt-0 text-center"><h1 class="text-2xl font-bold text-primary md:text-4xl">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref($Mock).Random.natural(10, 99))}</h1><h4 class="text-base font-medium leading-loose md:text-xl uppercase">${serverRenderer.exports.ssrInterpolate(_ctx.$MockWord()[lang.value])}</h4></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div id="blog" class="bg-grey-50"><div class="container px-4 py-16 m-auto md:py-20"><h2 class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h2><h4 class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl">${serverRenderer.exports.ssrInterpolate(_ctx.$MockTitle()[lang.value])}</h4><div class="mx-auto grid w-full grid-cols-1 gap-6 pt-12 lg:w-full lg:grid-cols-3 xl:gap-10"><!--[-->`);
      serverRenderer.exports.ssrRenderList(_ctx.$MockList(3)[lang.value], (item, i) => {
        _push(`<a class="shadow bg-base-300 flex flex-col"><div class="group flex-shrink-0 w-full relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72" style="${serverRenderer.exports.ssrRenderStyle(`background-image: url('${item.image}');`)}"><span class="absolute right-2 bottom-2 btn btn-primary rounded-box">${serverRenderer.exports.ssrInterpolate(_ctx.$MockWord()[lang.value])}</span></div><div class="bg-base-100 py-6 px-5 xl:py-8 flex-1"><span class="block text-lg font-semibold text-base-content">${serverRenderer.exports.ssrInterpolate(item.title)}</span><span class="block pt-2 text-base-content">${serverRenderer.exports.ssrInterpolate(item.desc)}</span></div></a>`);
      });
      _push(`<!--]--></div></div></div><div id="contact" class="container px-4 py-16 m-auto md:py-20"><h2 class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">${serverRenderer.exports.ssrInterpolate(page.value.contactTitle)}</h2><h4 class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl">${serverRenderer.exports.ssrInterpolate(page.value.contactSubtitle)}</h4><div class="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6"><p class="text-grey-10">${serverRenderer.exports.ssrInterpolate(page.value.contactDesc)}</p></div><form class="mx-auto w-full md:w-3/4 pt-6"><div class="flex flex-col md:flex-row"><input id="name" class="input w-full mr-6 input-bordered mt-4"${serverRenderer.exports.ssrRenderAttr("placeholder", page.value.contactName)} type="text"><input id="email" class="input w-full input-bordered mt-4"${serverRenderer.exports.ssrRenderAttr("placeholder", page.value.contactEmail)} type="text"></div><textarea id="message" class="mt-4 w-full textarea textarea-bordered"${serverRenderer.exports.ssrRenderAttr("placeholder", page.value.contactMessage)} cols="30" rows="10"></textarea><button class="btn btn-primary mt-6"><span>${serverRenderer.exports.ssrInterpolate(page.value.send)}</span><span class="ml-2 text-2xl flex items-center"><span class="material-symbols-outlined"> send </span></span></button></form><div class="flex flex-col pt-16 lg:flex-row"><div class="w-full border border-base-content/20 px-6 py-6 sm:py-8 lg:w-1/3"><div class="flex items-center"><span class="text-lg flex items-center"><i name="call-outline" role="img" class="md hydrated" aria-label="call outline"></i></span><p class="pl-2 font-bold uppercase text-grey-40 lg:text-lg">${serverRenderer.exports.ssrInterpolate(page.value.myphone)}</p></div><p class="pt-2 text-left font-bold text-primary lg:text-lg"> (+881) 111 222 333 </p></div><div class="w-full border border-t-0 border-base-content/20 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"><div class="flex items-center"><span class="text-lg flex items-center"><i name="mail-outline" role="img" class="md hydrated" aria-label="mail outline"></i></span><p class="pl-2 font-bold uppercase text-grey-40 lg:text-lg">${serverRenderer.exports.ssrInterpolate(page.value.myemail)}</p></div><p class="pt-2 text-left font-bold text-primary lg:text-lg"> name@mydomain.com </p></div><div class="w-full border border-t-0 border-base-content/20 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"><div class="flex items-center"><span class="text-lg flex items-center"><i name="location-outline" role="img" class="md hydrated" aria-label="location outline"></i></span><p class="pl-2 font-bold uppercase text-grey-40 lg:text-lg">${serverRenderer.exports.ssrInterpolate(page.value.myaddress)}</p></div><p class="pt-2 text-left font-bold text-primary lg:text-lg">${serverRenderer.exports.ssrInterpolate(page.value.address)}</p></div></div></div><div class="relative bg-primary bg-blend-darken bg-cover bg-center bg-no-repeat py-16 lg:py-24" style="${serverRenderer.exports.ssrRenderStyle(`
            background-image: url(${vue_cjs_prod.unref(usePicsum)("/1920/1080")})`)}"><div class="container m-auto relative z-30"><h3 class="text-center text-3xl uppercase leading-tight tracking-wide text-primary-content sm:text-4xl lg:text-5xl">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].subtitle)}</h3><form class="mt-6 flex flex-col items-center justify-center sm:flex-row px-4 lg:px-0"><input id="email" class="w-full rounded-md input bg-base-100 sm:w-2/5 sm:py-4 lg:w-1/3" type="text"${serverRenderer.exports.ssrRenderAttr("placeholder", page.value.joinInput)}><button class="btn btn-warning mt-4 lg:ml-6 md:mt-0 normal-case">${serverRenderer.exports.ssrInterpolate(page.value.joinBtn)}</button></form></div></div></div><div class="bg-primary"><div class="container m-auto flex flex-col justify-between py-6 px-4 sm:flex-row text-primary-content"><p class="text-center md:text-left"> \xA9 Copyright 2022. All right reserved, ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].title)}. </p><div class="flex items-center justify-center pt-5 sm:justify-start sm:pt-0"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateContacts), (item, i) => {
        _push(`<a class="btn btn-circle btn-ghost btn-sm mr-2 text-xl">${item}</a>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/template/1.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "2",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    vue_cjs_prod.watch(route, (v) => {
      lang.value = v.query.lang;
      init(lang.value);
    });
    const lang = vue_cjs_prod.ref(route.query.lang || "en");
    const page = vue_cjs_prod.ref({});
    const init = () => {
      page.value = {
        en: {
          title: "Sign in to our platform",
          email: "Your email",
          pwd: "Your password",
          remember: "Remember me",
          forget: "lost password?",
          btn: "login to your account",
          reg: "not registered?",
          create: "create account"
        },
        zh: {
          title: "\u767B\u5F55",
          email: "\u90AE\u7BB1",
          pwd: "\u5BC6\u7801",
          remember: "\u8BB0\u4F4F\u6211",
          forget: "\u5FD8\u8BB0\u5BC6\u7801\uFF1F",
          btn: "\u767B\u5F55\u4F60\u7684\u8D26\u53F7",
          reg: "\u6CA1\u6709\u8D26\u53F7\uFF1F",
          create: "\u521B\u5EFA"
        }
      }[lang.value];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "w-full h-screen flex justify-center items-center bg-base-200" }, _attrs))}><div class="p-4 rounded-box w-full max-w-md border border-base-200 shadow-md sm:p-6 lg:p-8 m-auto bg-base-100"><form class="space-y-6"><h5 class="text-xl font-medium text-base-content">${serverRenderer.exports.ssrInterpolate(page.value.title)}</h5><div><label for="email" class="block mb-2 text-sm font-medium text-base-content">${serverRenderer.exports.ssrInterpolate(page.value.email)}</label><input type="email" name="email" class="input input-bordered w-full" placeholder="name@company.com"></div><div><label for="password" class="block mb-2 text-sm font-medium text-base-content">${serverRenderer.exports.ssrInterpolate(page.value.pwd)}</label><input type="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="input input-bordered w-full"></div><div class="flex items-start justify-between"><div class="flex items-start"><input id="remember" type="checkbox" checked class="checkbox checkbox-sm rounded-full checkbox-primary"><label for="remember" class="ml-2 text-sm font-medium">${serverRenderer.exports.ssrInterpolate(page.value.remember)}</label></div><a href="#" class="btn btn-link btn-xs capitalize">${serverRenderer.exports.ssrInterpolate(page.value.forget)}</a></div><button class="btn btn-primary w-full capitalize">${serverRenderer.exports.ssrInterpolate(page.value.btn)}</button><div class="text-sm font-medium text-base-content text-opacity-70">${serverRenderer.exports.ssrInterpolate(page.value.reg)} <a href="#" class="btn btn-link btn-xs capitalize">${serverRenderer.exports.ssrInterpolate(page.value.create)}</a></div></form></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/template/2.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "3",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { $Mock } = useNuxtApp();
    const lang = vue_cjs_prod.ref("en");
    vue_cjs_prod.watch(route, (v) => {
      lang.value = v.query.lang;
      init(lang.value);
    });
    const page = vue_cjs_prod.ref({});
    const store = vue_cjs_prod.ref([]);
    const init = (lang2) => {
      store.value = $Mock.mock({
        "en|12": [
          {
            "id|+1": 1,
            title: "@title",
            fav: "@boolean",
            "money|1-100": 1,
            prefix: "$",
            image: () => {
              return useUnsplash("/user/feeypflanzen/", "500x500");
            }
          }
        ],
        "zh|12": [
          {
            "id|+1": 1,
            title: "@ctitle",
            fav: "@boolean",
            "money|1-100": 1,
            prefix: "\uFFE5",
            image: () => {
              return useUnsplash("/user/feeypflanzen/", "500x500");
            }
          }
        ]
      })[lang2];
      page.value = {
        en: {
          title: "wcao.cc",
          slogen: $Mock.mock("@sentence"),
          sub: $Mock.mock("@title(1,3)"),
          bottomTitle: $Mock.mock("@title(1)"),
          bottomParagraph: $Mock.mock("@paragraph(3,7)"),
          footerTitle: $Mock.mock("@title(1)"),
          footerParagraph: $Mock.mock("@paragraph(1,3)"),
          name: $Mock.mock("@name")
        },
        zh: {
          title: "\u5367\u69FD - \u8868\u793A\u60CA\u8BB6",
          slogen: $Mock.mock("@csentence"),
          sub: $Mock.mock("@ctitle(1,3)"),
          bottomTitle: $Mock.mock("@ctitle"),
          bottomParagraph: $Mock.mock("@cparagraph(20)"),
          footerTitle: $Mock.mock("@ctitle"),
          footerParagraph: $Mock.mock("@cparagraph(1,3)"),
          name: $Mock.mock("@cname")
        }
      }[lang2];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-base-100 text-base-content text-opacity-60 work-sans leading-normal text-base tracking-normal w-full h-screen overflow-y-scroll" }, _attrs))}><div class="container h-20 m-auto flex flex-wrap items-center justify-between mt-0 py-3"><div class="dropdown lg:dropdown-open lg:h-10"><label tabindex="0" class="btn btn-ghost btn-sm lg:hidden"><span class="material-symbols-outlined"> menu_open </span></label><div tabindex="0" class="dropdown-content w-max"><ul class="menu lg:menu-horizontal menu-vertical bg-base-100 w-56 lg:w-full rounded-box shadow lg:shadow-none"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateMenu)[lang.value], (item) => {
        _push(`<li><a class="hover:bg-transparent hover:underline">${serverRenderer.exports.ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="order-1 md:order-2"><a class="flex uppercase tracking-wide no-underline hover:no-underline font-bold text-base-content text-opacity-80 text-lg font-serif" href="#"><span class="material-symbols-outlined"> shopping_bag </span><span class="ml-1">${serverRenderer.exports.ssrInterpolate(page.value.title)}</span></a></div><div class="order-2 md:order-3 flex items-center"><a class="btn btn-ghost btn-square" href="#"><span class="material-symbols-outlined"> person </span></a><a class="btn btn-ghost btn-square" href="#"><span class="material-symbols-outlined"> shopping_cart </span></a></div></div><section class="w-full h-[32rem] max-w-screen-2xl mx-auto bg-nordic-base-content-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right" style="${serverRenderer.exports.ssrRenderStyle({ "background-image": "url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc')" })}"><div class="container mx-auto"><div class="flex flex-col w-full lg:w-1/2 justify-center items-start px-6 tracking-wide"><h1 class="text-base-content text-2xl">${serverRenderer.exports.ssrInterpolate(page.value.slogen)}</h1><a class="btn btn-link capitalize font-normal btn-lg px-0" href="#">${serverRenderer.exports.ssrInterpolate(page.value.sub)}</a></div></div></section><section class="bg-base-100 py-8"><div class="container mx-auto flex items-center flex-wrap"><div class="w-full container mx-auto flex flex-wrap items-center justify-between px-2 py-3"><a class="uppercase tracking-wide font-bold text-base-content text-opacity-80 text-xl" href="#"> Store </a><div class="flex items-center"><a class="btn btn-square btn-ghost" href="#"><span class="material-symbols-outlined"> filter_list </span></a><a class="btn btn-square btn-ghost" href="#"><span class="material-symbols-rounded"> search </span></a></div></div><!--[-->`);
      serverRenderer.exports.ssrRenderList(store.value, (item) => {
        _push(`<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"><a href="#"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "hover:shadow-md hover:scale-105 transition-all duration-500" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.image))))}><div class="pt-3 flex items-center justify-between"><p class="line-clamp-1">${serverRenderer.exports.ssrInterpolate(item.title)}</p><label class="swap"><input type="checkbox"${serverRenderer.exports.ssrIncludeBooleanAttr(item.fav) ? " checked" : ""}><span class="material-symbols-outlined swap-on"> favorite </span><span class="material-symbols-rounded text-error swap-off" style="${serverRenderer.exports.ssrRenderStyle(vue_cjs_prod.unref(iconFill))}"> favorite </span></label></div><p class="mt-1 text-base-content text-opacity-90">${serverRenderer.exports.ssrInterpolate(item.prefix)}${serverRenderer.exports.ssrInterpolate(item.money)}</p></a></div>`);
      });
      _push(`<!--]--></div></section><section class="bg-base-100"><div class="container py-8 px-6 mx-auto"><a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-base-content text-opacity-80 text-xl mb-8" href="#">${serverRenderer.exports.ssrInterpolate(page.value.bottomTitle)}</a><p class="my-8">${serverRenderer.exports.ssrInterpolate(page.value.bottomParagraph)}</p></div></section><footer class="container lg:flex-row flex-col mx-auto flex bg-base-100 px-3 py-8 border-t border-base-content border-opacity-40"><div class="px-3 flex-1 md:px-0"><h3 class="font-bold text-base-content text-opacity-90 capitalize">${serverRenderer.exports.ssrInterpolate(page.value.footerTitle)}</h3><p class="py-4">${serverRenderer.exports.ssrInterpolate(page.value.footerParagraph)}</p></div><div class="flex-1 text-center"><h3 class="font-bold text-base-content text-opacity-90">${serverRenderer.exports.ssrInterpolate(page.value.name)}</h3><a class="btn btn-link" href="#"> @${serverRenderer.exports.ssrInterpolate(page.value.title)}</a></div></footer></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/template/3.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "4",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { $Mock } = useNuxtApp();
    const data = vue_cjs_prod.ref();
    const menu = vue_cjs_prod.ref([]);
    const page = vue_cjs_prod.ref({});
    vue_cjs_prod.watch(route, (v) => {
      const { lang = "en" } = v.query;
      init(lang);
    });
    const init = (lang) => {
      page.value = {
        en: {
          title: $Mock.mock("@first") + " blog",
          subtitle: $Mock.mock("@sentence")
        },
        zh: {
          title: $Mock.mock("@cname"),
          subtitle: $Mock.mock("@csentence")
        }
      }[lang];
      data.value = $Mock.mock({
        "en|4-15": [
          {
            "id|+1": 1,
            title: "@title",
            paragraph: "@paragraph(1,5)",
            "tags|1-5": ["@word"],
            "image|0-1": () => $Mock.Random.boolean() ? [`${usePicsum("/400/300")}`] : []
          }
        ],
        "zh|4-15": [
          {
            "id|+1": 1,
            title: "@ctitle",
            paragraph: "@cparagraph(3, 20)",
            "tags|1-5": ["@cword(2,5)"],
            "image|0-1": () => $Mock.Random.boolean() ? [`${usePicsum("/400/300")}`] : []
          }
        ]
      })[lang];
      menu.value = templateMenu[lang];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "drawer drawer-mobile bg-base-100" }, _attrs))}><input id="my-drawer-2" type="checkbox" class="drawer-toggle"><div class="drawer-content flex justify-center lg:justify-start"><div class="lg:w-[70vw] max-w-screen-lg"><div class="navbar bg-base-100 lg:hidden sticky top-0 w-full z-50"><div class="flex-none"><label for="my-drawer-2" class="btn btn-square btn-ghost lg:hidden"><span class="material-symbols-outlined"> menu_open </span></label></div><div class="flex-1"><a class="btn btn-ghost capitalize text-xl">${serverRenderer.exports.ssrInterpolate(page.value.title)}</a></div><div class="flex-none"><!--[-->`);
      serverRenderer.exports.ssrRenderList(["dark_mode", "menu_book", "light_mode"], (item) => {
        _push(`<button data-set-theme="winter" class="btn btn-sm btn-ghost btn-square" data-act-class="btn-active"><span class="material-symbols-outlined !text-xl" style="${serverRenderer.exports.ssrRenderStyle(vue_cjs_prod.unref(iconFill))}">${item}</span></button>`);
      });
      _push(`<!--]--></div></div><div class="px-4 lg:pr-4"><div class="space-y-6 mt-4"><!--[-->`);
      serverRenderer.exports.ssrRenderList(data.value, (item) => {
        _push(`<div class="card bg-base-200 shadow flex-col md:flex-row w-full">`);
        if (item.image.length > 0) {
          _push(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
            alt: item.title,
            class: "md:max-w-sm w-full"
          }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.image[0]))))}>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card-body"><h2 class="card-title line-clamp-1">${serverRenderer.exports.ssrInterpolate(item.title)}</h2><div class="justify-start"><!--[-->`);
        serverRenderer.exports.ssrRenderList(item.tags, (tag) => {
          _push(`<button class="${serverRenderer.exports.ssrRenderClass([
            vue_cjs_prod.unref($Mock).mock({
              "array|1": vue_cjs_prod.unref(allBtnType)
            }).array,
            "btn btn-xs mr-1"
          ])}">${serverRenderer.exports.ssrInterpolate(tag)}</button>`);
        });
        _push(`<!--]--></div><p class="line-clamp-5 grow-0">${serverRenderer.exports.ssrInterpolate(item.paragraph)}</p></div></div>`);
      });
      _push(`<!--]--><div class="flex justify-center"><div class="btn-group"><button class="btn btn-active">1</button><button class="btn">2</button><button class="btn btn-disabled">...</button><button class="btn">99</button><button class="btn">100</button></div></div></div><div class="divider"></div><p class="text-sm pl-4"> \xA9 1967 - 2022 <span class="capitalize">${serverRenderer.exports.ssrInterpolate(page.value.title)}</span></p><p class="text-xs pl-4 pb-4"><span class="capitalize">${serverRenderer.exports.ssrInterpolate(page.value.title)}</span> theme desing by <a class="link capitalize">${serverRenderer.exports.ssrInterpolate(page.value.title)}</a></p></div></div></div><div class="drawer-side"><label for="my-drawer-2" class="drawer-overlay"></label><div class="overflow-y-auto flex lg:justify-center w-fit lg:w-[30vw]"><div class="w-72 p-3 lg:m-6 bg-base-100"><div class="avatar w-full"><div class="w-16 lg:w-32 rounded-full mx-auto"><img${serverRenderer.exports.ssrRenderAttrs(serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(vue_cjs_prod.unref(usePicsum)("/128/128"))))}></div></div><h1 class="text-2xl p-2 text-center capitalize">${serverRenderer.exports.ssrInterpolate(page.value.title)}</h1><p class="text-sm text-center line-clamp-2 text-base-content/80">${serverRenderer.exports.ssrInterpolate(page.value.subtitle)}</p><div class="flex gap-1 justify-center pt-4"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateContacts), (item) => {
        _push(`<a class="btn btn-sm btn-ghost btn-square">${item}</a>`);
      });
      _push(`<!--]--></div><div class="divider"></div><div class="pt-4"><ul class="menu bg-base-100 rounded-box"><!--[-->`);
      serverRenderer.exports.ssrRenderList(menu.value, (item) => {
        _push(`<li><a class="capitalize"><span class="material-symbols-outlined">${item.icon}</span> ${serverRenderer.exports.ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--><div class="divider"></div><li class="hidden lg:block"><div class="flex gap-1 justify-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(["dark_mode", "menu_book", "light_mode"], (item) => {
        _push(`<button data-set-theme="winter" class="btn btn-sm btn-ghost btn-square" data-act-class="btn-active"><span class="material-symbols-outlined !text-xl" style="${serverRenderer.exports.ssrRenderStyle(vue_cjs_prod.unref(iconFill))}">${item}</span></button>`);
      });
      _push(`<!--]--></div></li></ul></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/template/4.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "5",
  __ssrInlineRender: true,
  setup(__props) {
    const { $Mock } = useNuxtApp();
    const lang = vue_cjs_prod.ref("en");
    const route = useRoute();
    lang.value = route.query.lang || "en";
    vue_cjs_prod.watch(route, (v) => {
      lang.value = v.query.lang || "en";
      init();
    });
    const data = vue_cjs_prod.ref(null);
    const page = {
      en: {
        subscribe: "Subscribe to WCAO.CC",
        desc: "Get the latest posts delivered right to your inbox",
        btn: "subscribe",
        more: "read more"
      },
      zh: {
        subscribe: "\u8BA2\u9605WCAO.CC",
        desc: "\u6700\u65B0\u7684\u6587\u7AE0\u4F1A\u7B2C\u4E00\u65F6\u95F4\u53D1\u9001\u5230\u4F60\u7684\u90AE\u7BB1",
        btn: "\u8BA2\u9605",
        more: "\u66F4\u591A"
      }
    };
    const init = () => {
      data.value = $Mock.mock({
        "en|8": [
          {
            "id|+1": 1,
            title: "@title",
            paragraph: "@paragraph(1,8)",
            img: () => usePicsum("/800/600"),
            avatar: () => usePicsum("/300/300"),
            read: () => $Mock.Random.natural(1, 10) + ` min read`,
            go: "GETTING STARTED"
          }
        ],
        "zh|8": [
          {
            "id|+1": 1,
            title: "@ctitle",
            paragraph: "@cparagraph(1,8)",
            img: () => usePicsum("/800/600"),
            avatar: () => usePicsum("/300/300"),
            read: () => `\u9605\u8BFB ${$Mock.Random.natural(1, 10)} \u5206\u949F`,
            go: "\u5F00\u59CB\u5427"
          }
        ]
      })[lang.value];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = vue_cjs_prod.resolveDirective("lazy");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "h-screen overflow-y-scroll" }, _attrs))}><div class="bg-base-100 font-sans leading-normal tracking-normal w-full"><div class="w-full m-0 p-0 bg-cover bg-bottom h-[60vh] max-h-[460px] relative" style="${serverRenderer.exports.ssrRenderStyle(`background-image: url('${vue_cjs_prod.unref(usePicsum)("/1920/460")}')`)}"><div class="absolute bg-neutral/80 left-0 top-0 w-full h-full"><div class="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal"><p class="text-neutral-content font-extrabold text-3xl md:text-5xl"> \u{1F47B} ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].title)}</p><p class="text-xl md:text-2xl text-neutral-content/50 mt-4 w-1/2 m-auto">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].subtitle)}</p></div></div></div><div class="container md:max-w-screen-xl px-4 mx-auto -mt-32 relative z-50"><div class="mx-0 sm:mx-6"><nav class="mt-0 w-full"><div class="container mx-auto flex items-center md:flex-row flex-col-reverse"><div class="flex md:w-1/2 pl-4 text-sm"><ul class="list-reset flex justify-between flex-1 md:flex-none items-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateMenu)[lang.value], (item) => {
        _push(`<li class="mr-2"><a class="inline-block cursor-pointer capitalize p-2 text-neutral-content no-underline hover:underline">${serverRenderer.exports.ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex md:w-1/2 justify-end content-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateContacts), (v, k) => {
        _push(`<a class="inline-block text-neutral-content/50 no-underline hover:text-neutral-content hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar">${v}</a>`);
      });
      _push(`<!--]--></div></div></nav>`);
      if (data.value) {
        _push(`<div class="w-full text-xl md:text-2xl text-base-content leading-normal rounded-t"><div class="flex h-full bg-base-100 rounded overflow-hidden shadow-lg"><a class="flex flex-wrap no-underline hover:no-underline"><div class="w-full md:w-2/3 rounded-t"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "h-full w-full shadow object-cover" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(data.value[0].img))))}></div><div class="w-full md:w-1/3 flex flex-col flex-grow flex-shrink"><div class="flex-1 bg-base-100 rounded-t rounded-b-none overflow-hidden shadow-lg"><p class="w-full text-base-content/70 text-xs md:text-sm pt-6 px-6">${serverRenderer.exports.ssrInterpolate(data.value[0].go)}</p><div class="w-full font-bold text-xl text-base-content px-6 pb-1 line-clamp-2">${serverRenderer.exports.ssrInterpolate(data.value[0].title)}</div><p class="text-base-content font-serif text-base px-6 line-clamp-[12]">${serverRenderer.exports.ssrInterpolate(data.value[0].paragraph)}</p></div><div class="flex-none mt-auto bg-base-100 rounded-b rounded-t-none overflow-hidden shadow-lg p-6"><div class="flex items-center justify-between"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "w-8 h-8 rounded-full mr-4 avatar" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(data.value[0].avatar))))}><p class="text-base-content/70 text-xs md:text-sm uppercase">${serverRenderer.exports.ssrInterpolate(data.value[0].read)}</p></div></div></div></a></div><div class="flex flex-wrap justify-between pt-3 md:-mx-6"><!--[-->`);
        serverRenderer.exports.ssrRenderList(data.value.slice(1, 8), (item, i) => {
          _push(`<a href="#" class="${serverRenderer.exports.ssrRenderClass([
            [
              "md:w-1/3",
              "md:w-1/3",
              "md:w-1/3",
              "md:w-1/2",
              "md:w-1/2",
              "md:w-2/3",
              "md:w-1/3"
            ][i],
            "w-full py-3 md:p-6 flex flex-col flex-grow flex-shrink"
          ])}"><div class="flex-1 bg-base-100 rounded-t rounded-b-none overflow-hidden shadow-lg"><div class="flex flex-wrap"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "w-full rounded-t pb-6" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.img))))}><p class="w-full text-base-content/70 text-xs md:text-sm px-6">${serverRenderer.exports.ssrInterpolate(item.go)}</p><div class="w-full font-bold text-xl text-base-content px-6 line-clamp-1">${serverRenderer.exports.ssrInterpolate(item.title)}</div><p class="text-base-content font-serif text-base px-6 mb-5 line-clamp-5">${serverRenderer.exports.ssrInterpolate(item.paragraph)}</p></div></div><div class="flex-none mt-auto bg-base-100 rounded-b rounded-t-none overflow-hidden shadow-lg p-6"><div class="flex items-center justify-between"><img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "w-8 h-8 rounded-full mr-4 avatar" }, serverRenderer.exports.ssrGetDirectiveProps(_ctx, _directive_lazy, vue_cjs_prod.unref(vLazy)(item.avatar))))}><p class="text-base-content/70 text-xs md:text-sm uppercase">${serverRenderer.exports.ssrInterpolate(item.read)}</p></div></div></a>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container font-sans bg-success/10 rounded mt-8 p-4 md:p-24 text-center"><h2 class="font-bold break-normal text-2xl md:text-4xl">${serverRenderer.exports.ssrInterpolate(page[lang.value].subscribe)}</h2><h3 class="break-normal font-normal text-base-content/70 text-base md:text-xl">${serverRenderer.exports.ssrInterpolate(page[lang.value].desc)}</h3><div class="w-full text-center pt-4"><div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center md:flex-row flex-col"><input type="email" placeholder="youremail@example.com" class="flex-1 appearance-none rounded shadow p-3 text-base-content/70 md:mr-2 w-full focus:outline-none"><button class="flex-1 btn btn-success rounded mt-2 md:mt-0 btn-block">${serverRenderer.exports.ssrInterpolate(page[lang.value].btn)}</button></div></div></div><div class="flex w-full items-center font-sans py-8 px-4 md:p-24"><img class="w-10 h-10 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of Author"><div class="flex-1"><p class="text-base font-bold md:text-xl leading-none">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].title)}</p><p class="text-base-content/70 text-xs md:text-base mt-2">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].subtitle)} <a class="btn btn-link btn-success p-0 inline mt-2 normal-case"> wcao.cc </a></p></div><div class="justify-end"><button class="btn btn-outline capitalize opacity-90 btn-xs md:btn-md">${serverRenderer.exports.ssrInterpolate(page[lang.value].more)}</button></div></div></div></div><footer class="bg-neutral"><div class="container max-w-6xl mx-auto flex items-center px-2 py-8"><div class="w-full mx-auto flex flex-wrap items-center"><div class="flex w-full md:w-1/2 justify-center md:justify-start text-neutral-content font-extrabold"><a class="btn btn-link p-0 text-neutral-content hover:no-underline normal-case" href="#"> \u{1F47B} <span class="text-base ml-2">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(baseInfo)[lang.value].title)}</span></a></div><div class="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end"><ul class="list-reset flex justify-center flex-1 md:flex-none items-center"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(templateMenu)[lang.value], (item) => {
        _push(`<li><a class="btn btn-link text-neutral-content/30 capitalize btn-xs">${serverRenderer.exports.ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div></div></footer></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/template/5.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const meta = {
  layout: "template"
};
const routes = [
  {
    name: "slug",
    path: "/:slug(.*)*",
    file: "/Users/meetqy/Desktop/wcao.cc/node_modules/@nuxt/content/dist/runtime/pages/document-driven.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => import('./document-driven.b46a30d9.mjs')
  },
  {
    name: "about",
    path: "/about",
    file: "/Users/meetqy/Desktop/wcao.cc/pages/about/index.vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => import('./index.46b63c80.mjs')
  },
  {
    name: "index",
    path: "/",
    file: "/Users/meetqy/Desktop/wcao.cc/pages/index.vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => import('./index.98237f7b.mjs')
  },
  {
    name: "introduce-id",
    path: "/introduce/:id",
    file: "/Users/meetqy/Desktop/wcao.cc/pages/introduce/[id].vue",
    children: [],
    meta: meta$2,
    alias: [],
    component: () => import('./_id_.9167dbdc.mjs')
  },
  {
    name: "tag-name",
    path: "/tag/:name",
    file: "/Users/meetqy/Desktop/wcao.cc/pages/tag/[name].vue",
    children: [],
    meta: meta$1,
    alias: [],
    component: () => import('./_name_.0f29be65.mjs')
  },
  {
    name: "template-path",
    path: "/template/:path",
    file: "/Users/meetqy/Desktop/wcao.cc/pages/template/[path].vue",
    children: [],
    meta,
    alias: (meta == null ? void 0 : meta.alias) || [],
    component: () => import('./_path_.1b958c14.mjs')
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {};
const _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47nuxt_47dist_47pages_47runtime_47router = defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_prod.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_prod.createRouter({
    ...routerOptions,
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const route = {};
  for (const key in router.currentRoute.value) {
    route[key] = vue_cjs_prod.computed(() => router.currentRoute.value[key]);
  }
  const _activeRoute = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _activeRoute.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const activeRoute = {};
  for (const key in _activeRoute.value) {
    activeRoute[key] = vue_cjs_prod.computed(() => _activeRoute.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._activeRoute = vue_cjs_prod.reactive(activeRoute);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      await router.push(initialURL);
    }
    await router.isReady();
  } catch (error2) {
    callWithNuxt(nuxtApp, throwError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, throwError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, throwError, [createError({
        statusCode: 404,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, throwError, [error2]);
    }
  });
  return { provide: { router } };
});
async function imageMeta(_ctx, url) {
  const meta2 = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta2;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('./index.f93c721f.mjs').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta2 = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta2;
  }
}
function getFileExtension(url = "") {
  const extension = url.split(/[?#]/).shift().split("/").pop().split(".").pop();
  return extension;
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults: defaults2 } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults2);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const hwRatio = width && height ? height / width : 0;
  const variants = [];
  const sizes = {};
  if (typeof opts.sizes === "string") {
    for (const entry2 of opts.sizes.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        continue;
      }
      sizes[s[0].trim()] = s[1].trim();
    }
  } else {
    Object.assign(sizes, opts.sizes);
  }
  for (const key in sizes) {
    const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
    let size = String(sizes[key]);
    const isFluid = size.endsWith("vw");
    if (!isFluid && /^\d+$/.test(size)) {
      size = size + "px";
    }
    if (!isFluid && !size.endsWith("px")) {
      continue;
    }
    let _cWidth = parseInt(size);
    if (!screenMaxWidth || !_cWidth) {
      continue;
    }
    if (isFluid) {
      _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
    }
    const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
    variants.push({
      width: _cWidth,
      size,
      screenMaxWidth,
      media: `(max-width: ${screenMaxWidth}px)`,
      src: ctx.$img(input, { ...opts.modifiers, width: _cWidth, height: _cHeight }, opts)
    });
  }
  variants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  const defaultVar = variants[variants.length - 1];
  if (defaultVar) {
    defaultVar.media = "";
  }
  return {
    sizes: variants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", "),
    srcset: variants.map((v) => `${v.src} ${v.width}w`).join(", "),
    src: defaultVar == null ? void 0 : defaultVar.src
  };
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: ",",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, _ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL("/", "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$KQUCdezj4q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  validateDomains,
  supportsAlias
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {}
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$KQUCdezj4q, defaults: {} }
};
const _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47_64nuxt_47image_45edge_47dist_47runtime_47plugin = defineNuxtPlugin(() => {
  const img = createImage(imageOptions);
  return {
    provide: {
      img
    }
  };
});
const _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47_64nuxt_47content_47dist_47runtime_47plugins_47documentDriven_46mjs = defineNuxtPlugin((nuxt) => {
  var _a, _b;
  const { documentDriven: moduleOptions } = (_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.public) == null ? void 0 : _b.content;
  const findLayout = (to, page, navigation, globals) => {
    var _a2;
    if (page && (page == null ? void 0 : page.layout)) {
      return page.layout;
    }
    if (to.matched.length && ((_a2 = to.matched[0].meta) == null ? void 0 : _a2.layout)) {
      return to.matched[0].meta.layout;
    }
    if (navigation && page) {
      const { navKeyFromPath: navKeyFromPath2 } = useContentHelpers();
      const layoutFromNav = navKeyFromPath2(page._path, "layout", navigation);
      if (layoutFromNav) {
        return layoutFromNav;
      }
    }
    if (moduleOptions.layoutFallbacks && globals) {
      let layoutFallback;
      for (const fallback of moduleOptions.layoutFallbacks) {
        if (globals[fallback] && globals[fallback].layout) {
          layoutFallback = globals[fallback].layout;
          break;
        }
      }
      if (layoutFallback) {
        return layoutFallback;
      }
    }
    return "default";
  };
  const refresh = async (to, force = false) => {
    const routeConfig = to.meta.documentDriven || {};
    if (to.meta.documentDriven === false) {
      return;
    }
    !force && nuxt.callHook("content:middleware:start");
    const { navigation, pages, globals, surrounds } = useContentState();
    const _path = withoutTrailingSlash(to.path);
    const promises = [];
    if (moduleOptions.navigation && routeConfig.navigation !== false) {
      const navigationQuery = () => {
        const { navigation: navigation2 } = useContentState();
        if (navigation2.value && !force) {
          return navigation2.value;
        }
        return fetchContentNavigation().then((_navigation) => {
          navigation2.value = _navigation;
          return _navigation;
        }).catch((_) => {
        });
      };
      promises.push(navigationQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.globals) {
      const globalsQuery = () => {
        const { globals: globals2 } = useContentState();
        if (typeof moduleOptions.globals === "object" && Array.isArray(moduleOptions.globals)) {
          console.log("Globals must be a list of keys with QueryBuilderParams as a value.");
          return;
        }
        return Promise.all(
          Object.entries(moduleOptions.globals).map(
            ([key, query]) => {
              if (!force && globals2.value[key]) {
                return globals2.value[key];
              }
              let type = "findOne";
              if (query == null ? void 0 : query.type) {
                type = query.type;
              }
              return queryContent(query)[type]().catch(() => {
              });
            }
          )
        ).then(
          (values) => {
            return values.reduce(
              (acc, value, index) => {
                const key = Object.keys(moduleOptions.globals)[index];
                acc[key] = value;
                return acc;
              },
              {}
            );
          }
        );
      };
      promises.push(globalsQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.page && routeConfig.page !== false) {
      let where = { _path };
      if (typeof routeConfig.page === "string") {
        where = { _path: routeConfig.page };
      }
      if (typeof routeConfig.page === "object") {
        where = routeConfig.page;
      }
      const pageQuery = () => {
        const { pages: pages2 } = useContentState();
        if (!force && pages2.value[_path] && pages2.value[_path]._path === _path) {
          return pages2.value[_path];
        }
        return queryContent().where(where).findOne().catch(() => {
        });
      };
      promises.push(pageQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.surround && routeConfig.surround !== false) {
      let surround = _path;
      if (["string", "object"].includes(typeof routeConfig.page)) {
        surround = routeConfig.page;
      }
      if (["string", "object"].includes(typeof routeConfig.surround)) {
        surround = routeConfig.surround;
      }
      const surroundQuery = () => {
        const { surrounds: surrounds2 } = useContentState();
        if (!force && surrounds2.value[_path]) {
          return surrounds2.value[_path];
        }
        return queryContent().where({
          _partial: { $not: true },
          navigation: { $not: false }
        }).without(["body"]).findSurround(surround).catch(() => {
        });
      };
      promises.push(surroundQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    return await Promise.all(promises.map((promise) => promise())).then(async ([
      _navigation,
      _globals,
      _page,
      _surround
    ]) => {
      if (_navigation) {
        navigation.value = _navigation;
      }
      if (_globals) {
        globals.value = _globals;
      }
      if (_page == null ? void 0 : _page.redirect) {
        return _page == null ? void 0 : _page.redirect;
      }
      if (_page) {
        const layoutName = findLayout(to, _page, _navigation, _globals);
        const layout2 = layouts[layoutName];
        if (layout2 && (layout2 == null ? void 0 : layout2.__asyncLoader) && !layout2.__asyncResolved) {
          await layout2.__asyncLoader();
        }
        to.meta.layout = layoutName;
        pages.value[_path] = _page;
      }
      if (_surround) {
        surrounds.value[_path] = _surround;
      }
    });
  };
  addRouteMiddleware(async (to) => {
    if (to.path.includes("favicon.ico")) {
      return;
    }
    const redirect = await refresh(to, false);
    if (redirect) {
      return redirect;
    }
  });
  nuxt.hook("app:data:refresh", async () => false);
});
const _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47_64nuxt_47content_47dist_47runtime_47plugins_47ws_46mjs = defineNuxtPlugin(() => {
  useRuntimeConfig().public;
});
const _47Users_47meetqy_47Desktop_47wcao_46cc_47plugins_47lazy_45img_46ts = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(index);
});
const _plugins = [
  preload,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47_46nuxt_47components_46plugin_46mjs,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47nuxt_47dist_47head_47runtime_47lib_47vueuse_45head_46plugin,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47nuxt_47dist_47head_47runtime_47plugin,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47nuxt_47dist_47pages_47runtime_47router,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47_64nuxt_47image_45edge_47dist_47runtime_47plugin,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47_64nuxt_47content_47dist_47runtime_47plugins_47documentDriven_46mjs,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47node_modules_47_64nuxt_47content_47dist_47runtime_47plugins_47ws_46mjs,
  _47Users_47meetqy_47Desktop_47wcao_46cc_47plugins_47lazy_45img_46ts
];
const _sfc_main$2 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = vue_cjs_prod.defineAsyncComponent(() => import('./error-component.00a5dc88.mjs'));
    const nuxtApp = useNuxtApp();
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, throwError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorComponent), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "NuxtLoadingBar",
  __ssrInlineRender: true,
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    }
  },
  setup(__props) {
    const props = __props;
    const data = vue_cjs_prod.reactive({
      percent: 0,
      show: false,
      canSucceed: true
    });
    let _timer = null;
    let _throttle = null;
    let _cut;
    const clear = () => {
      _timer && clearInterval(_timer);
      _throttle && clearTimeout(_throttle);
      _timer = null;
    };
    const start = () => {
      clear();
      data.percent = 0;
      data.canSucceed = true;
      if (props.throttle) {
        _throttle = setTimeout(startTimer, props.throttle);
      } else {
        startTimer();
      }
    };
    const increase = (num) => {
      data.percent = Math.min(100, Math.floor(data.percent + num));
    };
    const finish = () => {
      data.percent = 100;
      hide();
    };
    const hide = () => {
      clear();
      setTimeout(() => {
        data.show = false;
        setTimeout(() => {
          data.percent = 0;
        }, 400);
      }, 500);
    };
    const startTimer = () => {
      data.show = true;
      _cut = 1e4 / Math.floor(props.duration);
      _timer = setInterval(() => {
        increase(_cut);
      }, 100);
    };
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", () => {
      start();
    });
    nuxtApp.hook("page:finish", finish);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["nuxt-progress", {
          "nuxt-progress-failed": !data.canSucceed
        }],
        style: {
          width: data.percent + "%",
          left: data.left,
          height: props.height + "px",
          opacity: data.show ? 1 : 0,
          backgroundSize: 100 / data.percent * 100 + "% auto"
        }
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NuxtLoadingBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NuxtLoadingBar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLoadingBar = _sfc_main$1;
  const _component_NuxtLayout = __nuxt_component_0$1;
  const _component_NuxtPage = vue_cjs_prod.resolveComponent("NuxtPage");
  _push(`<main${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-mono wcao" }, _attrs))}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLoadingBar, null, null, _parent));
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$2);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      ssrContext.error = ssrContext.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _sfc_main$4 as A, _sfc_main$3 as B, drawerContentPullUpEnd as C, drawerContentScroll as D, websiteConfig as E, usePicsum as F, allThemes as G, nuxtLink as H, layout as I, ContentRendererMarkdown as J, ContentRenderer as K, DocumentDrivenEmpty as L, DocumentDrivenNotFound as M, swiper as N, _1 as O, _2 as P, _3 as Q, _4 as R, _5 as S, NuxtLoadingBar as T, _sfc_main$c as _, useContentHead as a, useNuxtApp as b, _export_sfc as c, useHead as d, entry$1 as default, useState as e, useContent as f, getFileExtension as g, hash as h, fetchContentNavigation as i, __nuxt_component_0$2 as j, useUnwrap as k, useRequestEvent as l, __nuxt_component_0$1 as m, _sfc_main$b as n, _sfc_main$a as o, parseSize as p, queryContent as q, getContentByTag as r, __nuxt_component_0 as s, useAsset as t, useRoute as u, vLazy as v, wrapInRef as w, _sfc_main$7 as x, _sfc_main$6 as y, _sfc_main$5 as z };
//# sourceMappingURL=server.mjs.map
