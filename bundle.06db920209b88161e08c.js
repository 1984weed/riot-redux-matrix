/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var _redux = __webpack_require__(3);

	var _store = __webpack_require__(25);

	var _store2 = _interopRequireDefault(_store);

	var _reducers = __webpack_require__(26);

	var _reducers2 = _interopRequireDefault(_reducers);

	__webpack_require__(177);

	__webpack_require__(182);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)((0, _store2.default)()))(_redux.createStore);

	var reduxStore = createStoreWithMiddleware(_reducers2.default);

	document.addEventListener('DOMContentLoaded', function () {
	    riot.mount('matrix', { store: reduxStore, fontSize: 16, frameRate: 100, newTextInterval: 30000 });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {/* Riot v3.0.2, @license MIT */
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.riot = global.riot || {})));
	}(this, (function (exports) { 'use strict';

	var __TAGS_CACHE = [];
	var __TAG_IMPL = {};
	var GLOBAL_MIXIN = '__global_mixin';
	var RIOT_PREFIX = 'riot-';
	var RIOT_TAG_IS = 'data-is';
	var T_STRING = 'string';
	var T_OBJECT = 'object';
	var T_UNDEF  = 'undefined';
	var T_FUNCTION = 'function';
	var XLINK_NS = 'http://www.w3.org/1999/xlink';
	var XLINK_REGEX = /^xlink:(\w+)/;
	var WIN = typeof window === T_UNDEF ? undefined : window;
	var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
	var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
	var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
	var RE_SVG_TAGS = /^(altGlyph|animate(?:Color)?|circle|clipPath|defs|ellipse|fe(?:Blend|ColorMatrix|ComponentTransfer|Composite|ConvolveMatrix|DiffuseLighting|DisplacementMap|Flood|GaussianBlur|Image|Merge|Morphology|Offset|SpecularLighting|Tile|Turbulence)|filter|font|foreignObject|g(?:lyph)?(?:Ref)?|image|line(?:arGradient)?|ma(?:rker|sk)|missing-glyph|path|pattern|poly(?:gon|line)|radialGradient|rect|stop|svg|switch|symbol|text(?:Path)?|tref|tspan|use)$/;
	var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
	var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
	var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
	var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

	/**
	 * Check whether a DOM node must be considered a part of an svg document
	 * @param   { String } name -
	 * @returns { Boolean } -
	 */
	function isSVGTag(name) {
	  return RE_SVG_TAGS.test(name)
	}

	/**
	 * Check Check if the passed argument is undefined
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isBoolAttr(value) {
	  return RE_BOOL_ATTRS.test(value)
	}

	/**
	 * Check if passed argument is a function
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isFunction(value) {
	  return typeof value === T_FUNCTION || false // avoid IE problems
	}

	/**
	 * Check if passed argument is an object, exclude null
	 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isObject(value) {
	  return value && typeof value === T_OBJECT // typeof null is 'object'
	}

	/**
	 * Check if passed argument is undefined
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isUndefined(value) {
	  return typeof value === T_UNDEF
	}

	/**
	 * Check if passed argument is a string
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isString(value) {
	  return typeof value === T_STRING
	}

	/**
	 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
	 * @param { * } value -
	 * @returns { Boolean } -
	 */
	function isBlank(value) {
	  return isUndefined(value) || value === null || value === ''
	}

	/**
	 * Check if passed argument is a kind of array
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isArray(value) {
	  return Array.isArray(value) || value instanceof Array
	}

	/**
	 * Check whether object's property could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } -
	 */
	function isWritable(obj, key) {
	  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
	  return isUndefined(obj[key]) || descriptor && descriptor.writable
	}

	/**
	 * Check if passed argument is a reserved name
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isReservedName(value) {
	  return RE_RESERVED_NAMES.test(value)
	}

	var check = Object.freeze({
		isSVGTag: isSVGTag,
		isBoolAttr: isBoolAttr,
		isFunction: isFunction,
		isObject: isObject,
		isUndefined: isUndefined,
		isString: isString,
		isBlank: isBlank,
		isArray: isArray,
		isWritable: isWritable,
		isReservedName: isReservedName
	});

	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}

	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}

	/**
	 * Create a document fragment
	 * @returns { Object } document fragment
	 */
	function createFrag() {
	  return document.createDocumentFragment()
	}

	/**
	 * Create a document text node
	 * @returns { Object } create a text node to use as placeholder
	 */
	function createDOMPlaceholder() {
	  return document.createTextNode('')
	}

	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @param   { Boolean } isSvg - should we use a SVG as parent node?
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name, isSvg) {
	  return isSvg ?
	    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
	    document.createElement(name)
	}

	/**
	 * Get the outer html of any DOM node SVGs included
	 * @param   { Object } el - DOM node to parse
	 * @returns { String } el.outerHTML
	 */
	function getOuterHTML(el) {
	  if (el.outerHTML)
	    { return el.outerHTML }
	  // some browsers do not support outerHTML on the SVGs tags
	  else {
	    var container = mkEl('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we'll inject new html
	 * @param { String } html - html to inject
	 */
	function setInnerHTML(container, html) {
	  if (!isUndefined(container.innerHTML))
	    { container.innerHTML = html; }
	    // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml');
	    var node = container.ownerDocument.importNode(doc.documentElement, true);
	    container.appendChild(node);
	  }
	}

	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name);
	}

	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}

	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  var xlink = XLINK_REGEX.exec(name);
	  if (xlink && xlink[1])
	    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
	  else
	    { dom.setAttribute(name, val); }
	}

	/**
	 * Insert safely a tag to fix #1962 #1649
	 * @param   { HTMLElement } root - children container
	 * @param   { HTMLElement } curr - node to insert
	 * @param   { HTMLElement } next - node that should preceed the current node inserted
	 */
	function safeInsert(root, curr, next) {
	  root.insertBefore(curr, next.parentNode && next);
	}

	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttrs(html, fn) {
	  if (!html)
	    { return }
	  var m;
	  while (m = RE_HTML_ATTRS.exec(html))
	    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
	}

	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 * @param   { Object }   context - fn can optionally return an object, which is passed to children
	 */
	function walkNodes(dom, fn, context) {
	  if (dom) {
	    var res = fn(dom, context);
	    var next;
	    // stop the recursion
	    if (res === false) { return }

	    dom = dom.firstChild;

	    while (dom) {
	      next = dom.nextSibling;
	      walkNodes(dom, fn, res);
	      dom = next;
	    }
	  }
	}

	var dom = Object.freeze({
		$$: $$,
		$: $,
		createFrag: createFrag,
		createDOMPlaceholder: createDOMPlaceholder,
		mkEl: mkEl,
		getOuterHTML: getOuterHTML,
		setInnerHTML: setInnerHTML,
		remAttr: remAttr,
		getAttr: getAttr,
		setAttr: setAttr,
		safeInsert: safeInsert,
		walkAttrs: walkAttrs,
		walkNodes: walkNodes
	});

	var styleNode;
	var cssTextProp;
	var byName = {};
	var remainder = [];

	// skip the following code on the server
	if (WIN) {
	  styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style');
	    setAttr(newNode, 'type', 'text/css');

	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]');
	    if (userNode) {
	      if (userNode.id) { newNode.id = userNode.id; }
	      userNode.parentNode.replaceChild(newNode, userNode);
	    }
	    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

	    return newNode
	  })();
	  cssTextProp = styleNode.styleSheet;
	}

	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = {
	  styleNode: styleNode,
	  /**
	   * Save a tag style to be later injected into DOM
	   * @param { String } css - css string
	   * @param { String } name - if it's passed we will map the css to a tagname
	   */
	  add: function add(css, name) {
	    if (name) { byName[name] = css; }
	    else { remainder.push(css); }
	  },
	  /**
	   * Inject all previously saved tag styles into DOM
	   * innerHTML seems slow: http://jsperf.com/riot-insert-style
	   */
	  inject: function inject() {
	    if (!WIN) { return }
	    var style = Object.keys(byName)
	      .map(function(k) { return byName[k] })
	      .concat(remainder).join('\n');
	    if (cssTextProp) { cssTextProp.cssText = style; }
	    else { styleNode.innerHTML = style; }
	  }
	};

	/**
	 * The riot template engine
	 * @version v3.0.1
	 */
	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */

	/* global riot */

	var brackets = (function (UNDEF) {

	  var
	    REGLOB = 'g',

	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,

	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

	    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

	    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
	    },

	    DEFAULT = '{ }';

	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ];

	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings;

	  function _loopback (re) { return re }

	  function _rewrite (re, bp) {
	    if (!bp) { bp = _cache; }
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }

	  function _create (pair) {
	    if (pair === DEFAULT) { return _pairs }

	    var arr = pair.split(' ');

	    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	    arr[6] = _rewrite(_pairs[6], arr);
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	    arr[8] = pair;
	    return arr
	  }

	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }

	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) { _bp = _cache; }

	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6];

	    isexpr = start = re.lastIndex = 0;

	    while ((match = re.exec(str))) {

	      pos = match.index;

	      if (isexpr) {

	        if (match[2]) {
	          re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	          continue
	        }
	        if (!match[3]) {
	          continue
	        }
	      }

	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos));
	        start = re.lastIndex;
	        re = _bp[6 + (isexpr ^= 1)];
	        re.lastIndex = start;
	      }
	    }

	    if (str && start < str.length) {
	      unescapeStr(str.slice(start));
	    }

	    return parts

	    function unescapeStr (s) {
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'));
	      } else {
	        parts.push(s);
	      }
	    }

	    function skipBraces (s, ch, ix) {
	      var
	        match,
	        recch = FINDBRACES[ch];

	      recch.lastIndex = ix;
	      ix = 1;
	      while ((match = recch.exec(s))) {
	        if (match[1] &&
	          !(match[1] === ch ? ++ix : --ix)) { break }
	      }
	      return ix ? s.length : recch.lastIndex
	    }
	  };

	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  };

	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9]);

	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  };

	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  };

	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair);
	      _regex = pair === DEFAULT ? _loopback : _rewrite;
	      _cache[9] = _regex(_pairs[9]);
	    }
	    cachedBrackets = pair;
	  }

	  function _setSettings (o) {
	    var b;

	    o = o || {};
	    b = o.brackets;
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    });
	    _settings = o;
	    _reset(b);
	  }

	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  });

	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	  _brackets.set = _reset;

	  _brackets.R_STRINGS = R_STRINGS;
	  _brackets.R_MLCOMMS = R_MLCOMMS;
	  _brackets.S_QBLOCKS = S_QBLOCKS;

	  return _brackets

	})();

	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */

	var tmpl = (function () {

	  var _cache = {};

	  function _tmpl (str, data) {
	    if (!str) { return str }

	    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
	  }

	  _tmpl.hasExpr = brackets.hasExpr;

	  _tmpl.loopKeys = brackets.loopKeys;

	  // istanbul ignore next
	  _tmpl.clearCache = function () { _cache = {}; };

	  _tmpl.errorHandler = null;

	  function _logErr (err, ctx) {

	    err.riotData = {
	      tagName: ctx && ctx.root && ctx.root.tagName,
	      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	    };

	    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
	    else if (
	      typeof console !== 'undefined' &&
	      typeof console.error === 'function'
	    ) {
	      if (err.riotData.tagName) {
	        console.error('Riot template error thrown in the <%s> tag', err.riotData.tagName.toLowerCase());
	      }
	      console.error(err);
	    }
	  }

	  function _create (str) {
	    var expr = _getTmpl(str);

	    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

	    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
	  }

	  var
	    CH_IDEXPR = String.fromCharCode(0x2057),
	    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	    RE_DQUOTE = /\u2057/g,
	    RE_QBMARK = /\u2057(\d+)~/g;

	  function _getTmpl (str) {
	    var
	      qstr = [],
	      expr,
	      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = [];

	      for (i = j = 0; i < parts.length; ++i) {

	        expr = parts[i];

	        if (expr && (expr = i & 1

	            ? _parseExpr(expr, 1, qstr)

	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'

	          )) { list[j++] = expr; }

	      }

	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")';

	    } else {

	      expr = _parseExpr(parts[1], 0, qstr);
	    }

	    if (qstr[0]) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      });
	    }
	    return expr
	  }

	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };

	  function _parseExpr (expr, asText, qstr) {

	    expr = expr
	          .replace(RE_QBLOCK, function (s, div) {
	            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
	          })
	          .replace(/\s+/g, ' ').trim()
	          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match;

	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g;

	        expr = RegExp.rightContext;
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

	        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

	        jsb  = expr.slice(0, match.index);
	        expr = RegExp.rightContext;

	        list[cnt++] = _wrapExpr(jsb, 1, key);
	      }

	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	    }
	    return expr

	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch];

	      ir.lastIndex = re.lastIndex;
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) { ++lv; }
	        else if (!--lv) { break }
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex;
	    }
	  }

	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

	  function _wrapExpr (expr, asText, key) {
	    var tb;

	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length;

	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar;
	          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos));
	        }
	      }
	      return match
	    });

	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	    }

	    if (key) {

	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""';

	    } else if (asText) {

	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)';
	    }

	    return expr
	  }

	  _tmpl.version = brackets.version = 'v3.0.1';

	  return _tmpl

	})();

	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } list - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(list, fn) {
	  var len = list ? list.length : 0;

	  for (var i = 0, el; i < len; ++i) {
	    el = list[i];
	    // return false -> current item was removed by fn during the loop
	    if (fn(el, i) === false)
	      { i--; }
	  }
	  return list
	}

	/**
	 * Check whether an array contains an item
	 * @param   { Array } array - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } -
	 */
	function contains(array, item) {
	  return ~array.indexOf(item)
	}

	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } str - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(str) {
	  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
	}

	/**
	 * Faster String startsWith alternative
	 * @param   { String } str - source string
	 * @param   { String } value - test string
	 * @returns { Boolean } -
	 */
	function startsWith(str, value) {
	  return str.slice(0, value.length) === value
	}

	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	 * @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options));
	  return el
	}

	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments;
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          { src[key] = obj[key]; }
	      }
	    }
	  }
	  return src
	}

	var misc = Object.freeze({
		each: each,
		contains: contains,
		toCamel: toCamel,
		startsWith: startsWith,
		defineProperty: defineProperty,
		extend: extend
	});

	var observable = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {};

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice;

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          { (callbacks[event] = callbacks[event] || []).push(fn); }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) { callbacks = {}; }
	        else {
	          if (fn) {
	            var arr = callbacks[event];
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) { arr.splice(i--, 1); }
	            }
	          } else { delete callbacks[event]; }
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on);
	          fn.apply(el, arguments);
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {
	        var arguments$1 = arguments;


	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i;

	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments$1[i + 1]; // skip first argument
	        }

	        fns = slice.call(callbacks[event] || [], 0);

	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args);
	        }

	        if (callbacks['*'] && event != '*')
	          { el.trigger.apply(el, ['*', event].concat(args)); }

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  });

	  return el

	};

	var EVENTS_PREFIX_REGEX = /^on/;

	/**
	 * Trigger DOM events
	 * @param   { HTMLElement } dom - dom element target of the event
	 * @param   { Function } handler - user function
	 * @param   { Object } e - event object
	 */
	function handleEvent(dom, handler, e) {
	  var ptag = this._parent,
	    item = this._item;

	  if (!item)
	    { while (ptag && !item) {
	      item = ptag._item;
	      ptag = ptag._parent;
	    } }

	  // override the event properties
	  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
	  if (isWritable(e, 'target')) { e.target = e.srcElement; }
	  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

	  e.item = item;

	  handler.call(this, e);

	  if (!e.preventUpdate) {
	    var p = getImmediateCustomParentTag(this);
	    // fixes #2083
	    if (p.isMounted) { p.update(); }
	  }
	}

	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {
	  var eventName,
	    cb = handleEvent.bind(tag, dom, handler);

	  if (!dom.addEventListener) {
	    dom[name] = cb;
	    return
	  }

	  // avoid to bind twice the same event
	  dom[name] = null;

	  // normalize event name
	  eventName = name.replace(EVENTS_PREFIX_REGEX, '');

	  // cache the callback directly on the DOM node
	  if (!dom._riotEvents) { dom._riotEvents = {}; }

	  if (dom._riotEvents[name])
	    { dom.removeEventListener(eventName, dom._riotEvents[name]); }

	  dom._riotEvents[name] = cb;
	  dom.addEventListener(eventName, cb, false);
	}

	/**
	 * Update dynamically created data-is tags with changing expressions
	 * @param { Object } expr - expression tag and expression info
	 * @param { Tag } parent - parent for tag creation
	 */
	function updateDataIs(expr, parent) {
	  var tagName = tmpl(expr.value, parent),
	    conf;

	  if (expr.tag && expr.tagName === tagName) {
	    expr.tag.update();
	    return
	  }

	  // sync _parent to accommodate changing tagnames
	  if (expr.tag) {
	    var delName = expr.value,
	      tags = expr.tag._parent.tags;

	    setAttr(expr.tag.root, RIOT_TAG_IS, tagName); // update for css
	    arrayishRemove(tags, delName, expr.tag);
	  }

	  expr.impl = __TAG_IMPL[tagName];
	  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
	  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
	  expr.tagName = tagName;
	  expr.tag.mount();
	  expr.tag.update();

	  // parent is the placeholder tag, not the dynamic tag so clean up
	  parent.on('unmount', function () {
	    var delName = expr.tag.opts.dataIs,
	      tags = expr.tag.parent.tags,
	      _tags = expr.tag._parent.tags;
	    arrayishRemove(tags, delName, expr.tag);
	    arrayishRemove(_tags, delName, expr.tag);
	    expr.tag.unmount();
	  });
	}

	/**
	 * Update on single tag expression
	 * @this Tag
	 * @param { Object } expr - expression logic
	 * @returns { undefined }
	 */
	function updateExpression(expr) {
	  var dom = expr.dom,
	    attrName = expr.attr,
	    value = tmpl(expr.expr, this),
	    isValueAttr = attrName === 'riot-value',
	    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
	    parent = dom && (expr.parent || dom.parentNode),
	    old;

	  if (expr.bool)
	    { value = value ? attrName : false; }
	  else if (isUndefined(value) || value === null)
	    { value = ''; }

	  if (expr._riot_id) { // if it's a tag
	    if (expr.isMounted) {
	      expr.update();

	    // if it hasn't been mounted yet, do that now.
	    } else {
	      expr.mount();

	      if (isVirtual) {
	        var frag = document.createDocumentFragment();
	        makeVirtual.call(expr, frag);
	        expr.root.parentElement.replaceChild(frag, expr.root);
	      }
	    }
	    return
	  }

	  old = expr.value;
	  expr.value = value;

	  if (expr.update) {
	    expr.update();
	    return
	  }

	  if (expr.isRtag && value) { return updateDataIs(expr, this) }
	  if (old === value) { return }
	  // no change, so nothing more to do
	  if (isValueAttr && dom.value === value) { return }

	  // textarea and text nodes have no attribute name
	  if (!attrName) {
	    // about #815 w/o replace: the browser converts the value to a string,
	    // the comparison by "==" does too, but not in the server
	    value += '';
	    // test for parent avoids error with invalid assignment to nodeValue
	    if (parent) {
	      // cache the parent node because somehow it will become null on IE
	      // on the next iteration
	      expr.parent = parent;
	      if (parent.tagName === 'TEXTAREA') {
	        parent.value = value;                    // #1113
	        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
	      }                                         // will be available on 'updated'
	      else { dom.nodeValue = value; }
	    }
	    return
	  }

	  // remove original attribute
	  if (!expr.isAttrRemoved || !value) {
	    remAttr(dom, attrName);
	    expr.isAttrRemoved = true;
	  }

	  // event handler
	  if (isFunction(value)) {
	    setEventHandler(attrName, value, dom, this);
	  // show / hide
	  } else if (/^(show|hide)$/.test(attrName)) {
	    if (attrName === 'hide') { value = !value; }
	    dom.style.display = value ? '' : 'none';
	  // field value
	  } else if (isValueAttr) {
	    dom.value = value;
	  // <img src="{ expr }">
	  } else if (startsWith(attrName, RIOT_PREFIX) && attrName !== RIOT_TAG_IS) {
	    attrName = attrName.slice(RIOT_PREFIX.length);
	    if (CASE_SENSITIVE_ATTRIBUTES[attrName])
	      { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
	    if (value != null)
	      { setAttr(dom, attrName, value); }
	  } else {
	    // <select> <option selected={true}> </select>
	    if (attrName === 'selected' && parent && /^(SELECT|OPTGROUP)$/.test(parent.tagName) && value != null) {
	      parent.value = dom.value;
	    } if (expr.bool) {
	      dom[attrName] = value;
	      if (!value) { return }
	    } if (value === 0 || value && typeof value !== T_OBJECT) {
	      setAttr(dom, attrName, value);
	    }
	  }
	}

	/**
	 * Update all the expressions in a Tag instance
	 * @this Tag
	 * @param { Array } expressions - expression that must be re evaluated
	 */
	function update$1$1(expressions) {
	  each(expressions, updateExpression.bind(this));
	}

	var IfExpr = {
	  init: function init(dom, parentTag, expr) {
	    remAttr(dom, 'if');
	    this.parentTag = parentTag;
	    this.expr = expr;
	    this.stub = document.createTextNode('');
	    this.pristine = dom;

	    var p = dom.parentNode;
	    p.insertBefore(this.stub, dom);
	    p.removeChild(dom);

	    return this
	  },
	  update: function update$1() {
	    var newValue = tmpl(this.expr, this.parentTag);

	    if (newValue && !this.current) { // insert
	      this.current = this.pristine.cloneNode(true);
	      this.stub.parentNode.insertBefore(this.current, this.stub);

	      this.expressions = [];
	      parseExpressions.apply(this.parentTag, [this.current, this.expressions, true]);
	    } else if (!newValue && this.current) { // remove
	      unmountAll(this.expressions);
	      if (this.current._tag) {
	        this.current._tag.unmount();
	      } else if (this.current.parentNode)
	        { this.current.parentNode.removeChild(this.current); }
	      this.current = null;
	      this.expressions = [];
	    }

	    if (newValue) { update$1$1.call(this.parentTag, this.expressions); }
	  },
	  unmount: function unmount() {
	    unmountAll(this.expressions || []);
	    delete this.pristine;
	    delete this.parentNode;
	    delete this.stub;
	  }
	};

	var RefExpr = {
	  init: function init(dom, attrName, attrValue, parent) {
	    this.dom = dom;
	    this.attr = attrName;
	    this.rawValue = attrValue;
	    this.parent = parent;
	    this.hasExp = tmpl.hasExpr(attrValue);
	    this.firstRun = true;

	    return this
	  },
	  update: function update() {
	    var value = this.rawValue;
	    if (this.hasExp)
	      { value = tmpl(this.rawValue, this.parent); }

	    // if nothing changed, we're done
	    if (!this.firstRun && value === this.value) { return }

	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);

	    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
	    var tagOrDom = this.tag || this.dom;

	    // the name changed, so we need to remove it from the old key (if present)
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }

	    if (isBlank(value)) {
	      // if the value is blank, we remove it
	      remAttr(this.dom, this.attr);
	    } else {
	      // add it to the refs of parent tag (this behavior was changed >=3.0)
	      if (customParent) { arrayishAdd(customParent.refs, value, tagOrDom); }
	      // set the actual DOM attr
	      setAttr(this.dom, this.attr, value);
	    }
	    this.value = value;
	    this.firstRun = false;
	  },
	  unmount: function unmount() {
	    var tagOrDom = this.tag || this.dom;
	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
	    delete this.dom;
	    delete this.parent;
	  }
	};

	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @param   { Object } base - prototype object for the new item
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val, base) {
	  var item = base ? Object.create(base) : {};
	  item[expr.key] = key;
	  if (expr.pos) { item[expr.pos] = val; }
	  return item
	}

	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 * @param   { String } tagName - key used to identify the type of tag
	 * @param   { Object } parent - parent tag to remove the child from
	 */
	function unmountRedundant(items, tags, tagName, parent) {

	  var i = tags.length,
	    j = items.length,
	    t;

	  while (i > j) {
	    t = tags[--i];
	    tags.splice(i, 1);
	    t.unmount();
	    arrayishRemove(parent.tags, tagName, t, true);
	  }
	}

	/**
	 * Move the nested custom tags in non custom loop tags
	 * @this Tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(i) {
	  var this$1 = this;

	  each(Object.keys(this.tags), function (tagName) {
	    var tag = this$1.tags[tagName];
	    if (isArray(tag))
	      { each(tag, function (t) {
	        moveChildTag.apply(t, [tagName, i]);
	      }); }
	    else
	      { moveChildTag.apply(tag, [tagName, i]); }
	  });
	}

	/**
	 * Move a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function move(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { moveVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}

	/**
	 * Insert and mount a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function insert(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}

	/**
	 * Append a new tag into the DOM
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function append(root, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.call(this, root); }
	  else
	    { root.appendChild(this.root); }
	}

	/**
	 * Manage tags having the 'each'
	 * @param   { HTMLElement } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 * @returns { Object } expression object for this each loop
	 */
	function _each(dom, parent, expr) {

	  // remove the each property from the original tag
	  remAttr(dom, 'each');

	  var mustReorder = typeof getAttr(dom, 'no-reorder') !== T_STRING || remAttr(dom, 'no-reorder'),
	    tagName = getTagName(dom),
	    impl = __TAG_IMPL[tagName] || { tmpl: getOuterHTML(dom) },
	    useRoot = RE_SPECIAL_TAGS.test(tagName),
	    root = dom.parentNode,
	    ref = createDOMPlaceholder(),
	    child = getTag(dom),
	    ifExpr = getAttr(dom, 'if'),
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isLoop = true,
	    isAnonymous = !__TAG_IMPL[tagName],
	    isVirtual = dom.tagName === 'VIRTUAL';

	  // parse the each expression
	  expr = tmpl.loopKeys(expr);
	  expr.isLoop = true;

	  if (ifExpr) { remAttr(dom, 'if'); }

	  // insert a marked where the loop tags will be injected
	  root.insertBefore(ref, dom);
	  root.removeChild(dom);

	  expr.update = function updateEach() {

	    // get the new items collection
	    var items = tmpl(expr.val, parent),
	      parentNode,
	      frag,
	      placeholder;


	    root = ref.parentNode;

	    if (parentNode) {
	      placeholder = createDOMPlaceholder('');
	      parentNode.insertBefore(placeholder, root);
	      parentNode.removeChild(root);
	    } else {
	      frag = createFrag();
	    }

	    // object loop. any changes cause full redraw
	    if (!isArray(items)) {
	      hasKeys = items || false;
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, items[key], key)
	        }) : [];
	    } else {
	      hasKeys = false;
	    }

	    if (ifExpr) {
	      items = items.filter(function(item, i) {
	        if (expr.key) {
	          return !!tmpl(ifExpr, mkitem(expr, item, i, parent))
	        }
	        // in case it's not a keyed loop
	        // we test the validity of the if expression against
	        // the item and the parent
	        return !!tmpl(ifExpr, parent) || !!tmpl(ifExpr, item)
	      });
	    }

	    // loop all the new items
	    each(items, function(item, i) {
	      // reorder only if the items are objects
	      var
	        _mustReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        pos = ~oldPos && _mustReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos];

	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

	      // new tag
	      if (
	        !_mustReorder && !tag // with no-reorder we just update the old tags
	        ||
	        _mustReorder && !~oldPos // by default we always try to reorder the DOM elements
	      ) {

	        var mustAppend = i === tags.length;

	        tag = new Tag$$1(impl, {
	          parent: parent,
	          isLoop: isLoop,
	          isAnonymous: isAnonymous,
	          root: useRoot ? root : dom.cloneNode(),
	          item: item
	        }, dom.innerHTML);

	        // mount the tag
	        tag.mount();

	        if (mustAppend)
	          { append.apply(tag, [frag || root, isVirtual]); }
	        else
	          { insert.apply(tag, [root, tags[i], isVirtual]); }

	        if (!mustAppend) { oldItems.splice(i, 0, item); }
	        tags.splice(i, 0, tag);
	        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
	        pos = i; // handled here so no move
	      } else { tag.update(item); }

	      // reorder the tag if it's not located in its previous position
	      if (pos !== i && _mustReorder) {
	        // #closes 2040
	        if (contains(items, oldItems[i])) {
	          move.apply(tag, [root, tags[i], isVirtual]);
	        }
	        // update the position attribute if it exists
	        if (expr.pos) { tag[expr.pos] = i; }
	        // move the old tag instance
	        tags.splice(i, 0, tags.splice(pos, 1)[0]);
	        // move the old item
	        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
	      }

	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag._item = item;
	      // cache the real parent tag internally
	      defineProperty(tag, '_parent', parent);
	    });

	    // remove the redundant tags
	    unmountRedundant(items, tags, tagName, parent);

	    // clone the items array
	    oldItems = items.slice();

	    if (frag) {
	      root.insertBefore(frag, ref);
	    } else {
	      parentNode.insertBefore(root, placeholder);
	      parentNode.removeChild(placeholder);
	    }

	  };

	  expr.unmount = function() {
	    each(tags, function(t) { t.unmount(); });
	  };

	  return expr
	}

	/**
	 * Walk the tag DOM to detect the expressions to evaluate
	 * @this Tag
	 * @param   { HTMLElement } root - root tag where we will start digging the expressions
	 * @param   { Array } expressions - empty array where the expressions will be added
	 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
	 * @returns { Object } an object containing the root noode and the dom tree
	 */
	function parseExpressions(root, expressions, mustIncludeRoot) {
	  var this$1 = this;

	  var tree = {parent: {children: expressions}};

	  walkNodes(root, function (dom, ctx) {
	    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
	    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

	    // text node
	    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
	      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

	    if (type !== 1) { return ctx } // not an element

	    // loop. each does it's own thing (for now)
	    if (attr = getAttr(dom, 'each')) {
	      parent.children.push(_each(dom, this$1, attr));
	      return false
	    }

	    // if-attrs become the new parent. Any following expressions (either on the current
	    // element, or below it) become children of this expression.
	    if (attr = getAttr(dom, 'if')) {
	      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
	      return false
	    }

	    if (expr = getAttr(dom, RIOT_TAG_IS)) {
	      if (tmpl.hasExpr(expr)) {
	        parent.children.push({isRtag: true, expr: expr, dom: dom});
	        return false
	      }
	    }

	    // if this is a tag, stop traversing here.
	    // we ignore the root, since parseExpressions is called while we're mounting that root
	    tagImpl = getTag(dom);
	    if (tagImpl && (dom !== root || mustIncludeRoot)) {
	      var conf = {root: dom, parent: this$1, hasImpl: true};
	      parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
	      return false
	    }

	    // attribute expressions
	    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
	      if (!expr) { return }
	      parent.children.push(expr);
	    }]);

	    // whatever the parent is, all child elements get the same parent.
	    // If this element had an if-attr, that's the parent for all child elements
	    return {parent: parent}
	  }, tree);

	  return { tree: tree, root: root }
	}

	/**
	 * Calls `fn` for every attribute on an element. If that attr has an expression,
	 * it is also passed to fn.
	 * @this Tag
	 * @param   { HTMLElement } dom - dom node to parse
	 * @param   { Array } attrs - array of attributes
	 * @param   { Function } fn - callback to exec on any iteration
	 */
	function parseAttributes(dom, attrs, fn) {
	  var this$1 = this;

	  each(attrs, function (attr) {
	    var name = attr.name, bool = isBoolAttr(name), expr;

	    if (~['ref', 'data-ref'].indexOf(name)) {
	      expr =  Object.create(RefExpr).init(dom, name, attr.value, this$1);
	    } else if (tmpl.hasExpr(attr.value)) {
	      expr = {dom: dom, expr: attr.value, attr: attr.name, bool: bool};
	    }

	    fn(attr, expr);
	  });
	}

	/*
	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/

	var reHasYield  = /<yield\b/i;
	var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
	var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
	var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
	var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
	var GENERIC = 'div';


	/*
	  Creates the root element for table or select child elements:
	  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	*/
	function specialTags(el, tmpl, tagName) {

	  var
	    select = tagName[0] === 'o',
	    parent = select ? 'select>' : 'table>';

	  // trim() is important here, this ensures we don't have artifacts,
	  // so we can check if we have only one element inside the parent
	  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
	  parent = el.firstChild;

	  // returns the immediate parent if tr/th/td/col is the only element, if not
	  // returns the whole tree, as this can include additional elements
	  if (select) {
	    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
	  } else {
	    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	    var tname = rootEls[tagName];
	    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
	  }
	  return parent
	}

	/*
	  Replace the yield tag from any tag template with the innerHTML of the
	  original tag in the page
	*/
	function replaceYield(tmpl, html) {
	  // do nothing if no yield
	  if (!reHasYield.test(tmpl)) { return tmpl }

	  // be careful with #1343 - string on the source having `$1`
	  var src = {};

	  html = html && html.replace(reYieldSrc, function (_, ref, text) {
	    src[ref] = src[ref] || text;   // preserve first definition
	    return ''
	  }).trim();

	  return tmpl
	    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	      return src[ref] || def || ''
	    })
	    .replace(reYieldAll, function (_, def) {        // yield without any "from"
	      return html || def || ''
	    })
	}

	/**
	 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	 *
	 * @param   { String } tmpl  - The template coming from the custom tag definition
	 * @param   { String } html - HTML content that comes from the DOM element where you
	 *           will mount the tag, mostly the original tag in the page
	 * @param   { Boolean } checkSvg - flag needed to know if we need to force the svg rendering in case of loop nodes
	 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
	 */
	function mkdom(tmpl, html, checkSvg) {
	  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
	    tagName = match && match[1].toLowerCase(),
	    el = mkEl(GENERIC, checkSvg && isSVGTag(tagName));

	  // replace all the yield tags with the tag inner html
	  tmpl = replaceYield(tmpl, html);

	  /* istanbul ignore next */
	  if (tblTags.test(tagName))
	    { el = specialTags(el, tmpl, tagName); }
	  else
	    { setInnerHTML(el, tmpl); }

	  el.stub = true;

	  return el
	}

	/**
	 * Another way to create a riot tag a bit more es6 friendly
	 * @param { HTMLElement } el - tag DOM selector or DOM node/s
	 * @param { Object } opts - tag logic
	 * @returns { Tag } new riot tag instance
	 */
	function Tag$1(el, opts) {
	  // get the tag properties from the class constructor
	  var ref = this;
	  var name = ref.name;
	  var tmpl = ref.tmpl;
	  var css = ref.css;
	  var attrs = ref.attrs;
	  var onCreate = ref.onCreate;
	  // register a new tag and cache the class prototype
	  if (!__TAG_IMPL[name]) {
	    tag$$1(name, tmpl, css, attrs, onCreate);
	    // cache the class constructor
	    __TAG_IMPL[name].class = this.constructor;
	  }

	  // mount the tag using the class instance
	  mountTo(el, name, opts, this);
	  // inject the component css
	  if (css) { styleManager.inject(); }

	  return this
	}

	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag$$1(name, tmpl, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs;

	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css;
	      css = '';
	    } else
	      { attrs = ''; }
	  }

	  if (css) {
	    if (isFunction(css))
	      { fn = css; }
	    else
	      { styleManager.add(css); }
	  }

	  name = name.toLowerCase();
	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

	  return name
	}

	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag2$$1(name, tmpl, css, attrs, fn) {
	  if (css)
	    { styleManager.add(css, name); }

	  var exists = !!__TAG_IMPL[name];
	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

	  if (exists && util.hotReloader)
	    { util.hotReloader(name); }

	  return name
	}

	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { * } selector - tag DOM selector or DOM node/s
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	function mount$$1(selector, tagName, opts) {
	  var tags = [];

	  function pushTagsTo(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, RIOT_TAG_IS);

	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName;
	        setAttr(root, RIOT_TAG_IS, tagName);
	      }

	      var tag$$1 = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

	      if (tag$$1)
	        { tags.push(tag$$1); }
	    } else if (root.length)
	      { each(root, pushTagsTo); } // assume nodeList
	  }

	  // inject styles into DOM
	  styleManager.inject();

	  if (isObject(tagName)) {
	    opts = tagName;
	    tagName = 0;
	  }

	  var elem;
	  var allTags;

	  // crawl the DOM to find the tag
	  if (isString(selector)) {
	    selector = selector === '*' ?
	      // select all registered tags
	      // & tags found with the riot-tag attribute set
	      allTags = selectTags() :
	      // or just the ones named like the selector
	      selector + selectTags(selector.split(/, */));

	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    elem = selector ? $$(selector) : [];
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    { elem = selector; }

	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectTags();
	    // if the root els it's just a single tag
	    if (elem.tagName)
	      { elem = $$(tagName, elem); }
	    else {
	      // select all the children for all the different root elements
	      var nodeList = [];

	      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

	      elem = nodeList;
	    }
	    // get rid of the tagName
	    tagName = 0;
	  }

	  pushTagsTo(elem);

	  return tags
	}

	// Create a mixin that could be globally shared across all the tags
	var mixins = {};
	var globals = mixins[GLOBAL_MIXIN] = {};
	var _id = 0;

	/**
	 * Create/Return a mixin by its name
	 * @param   { String }  name - mixin name (global mixin if object)
	 * @param   { Object }  mix - mixin logic
	 * @param   { Boolean } g - is global?
	 * @returns { Object }  the mixin logic
	 */
	function mixin$$1(name, mix, g) {
	  // Unnamed global
	  if (isObject(name)) {
	    mixin$$1(("__unnamed_" + (_id++)), name, true);
	    return
	  }

	  var store = g ? globals : mixins;

	  // Getter
	  if (!mix) {
	    if (isUndefined(store[name]))
	      { throw new Error('Unregistered mixin: ' + name) }

	    return store[name]
	  }

	  // Setter
	  store[name] = isFunction(mix) ?
	    extend(mix.prototype, store[name] || {}) && mix :
	    extend(store[name] || {}, mix);
	}

	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	function update$2() {
	  return each(__TAGS_CACHE, function (tag$$1) { return tag$$1.update(); })
	}

	function unregister$$1(name) {
	  delete __TAG_IMPL[name];
	}

	// counter to give a unique id to all the Tag instances
	var __uid = 0;

	/**
	 * We need to update opts for this tag. That requires updating the expressions
	 * in any attributes on the tag, and then copying the result onto opts.
	 * @this Tag
	 * @param   {Boolean} isLoop - is it a loop tag?
	 * @param   { Tag }  parent - parent tag node
	 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
	 * @param   { Object }  opts - tag options
	 * @param   { Array }  instAttrs - tag attributes array
	 */
	function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
	  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
	  // (and only this case) we don't need to do updateOpts, because the regular parse
	  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
	  if (isLoop && isAnonymous) { return }

	  var ctx = !isAnonymous && isLoop ? this : parent || this;
	  each(instAttrs, function (attr) {
	    if (attr.expr) { update$1$1.call(ctx, [attr.expr]); }
	    opts[toCamel(attr.name)] = attr.expr ? attr.expr.value : attr.value;
	  });
	}


	/**
	 * Tag class
	 * @constructor
	 * @param { Object } impl - it contains the tag template, and logic
	 * @param { Object } conf - tag options
	 * @param { String } innerHTML - html that eventually we need to inject in the tag
	 */
	function Tag$$1(impl, conf, innerHTML) {

	  var opts = extend({}, conf.opts),
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    isAnonymous = conf.isAnonymous,
	    item = cleanUpData(conf.item),
	    instAttrs = [], // All attributes on the Tag when it's first parsed
	    implAttrs = [], // expressions on this type of Tag
	    expressions = [],
	    root = conf.root,
	    tagName = conf.tagName || getTagName(root),
	    isVirtual = tagName === 'virtual',
	    propsInSyncWithParent = [],
	    dom;

	  // make this tag observable
	  observable(this);
	  // only call unmount if we have a valid __TAG_IMPL (has name property)
	  if (impl.name && root._tag) { root._tag.unmount(true); }

	  // not yet mounted
	  this.isMounted = false;
	  root.isLoop = isLoop;

	  defineProperty(this, '_internal', {
	    isAnonymous: isAnonymous,
	    instAttrs: instAttrs,
	    innerHTML: innerHTML,
	    // these vars will be needed only for the virtual tags
	    virts: [],
	    tail: null,
	    head: null
	  });

	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id

	  extend(this, { parent: parent, root: root, opts: opts }, item);
	  // protect the "tags" and "refs" property from being overridden
	  defineProperty(this, 'tags', {});
	  defineProperty(this, 'refs', {});

	  dom = mkdom(impl.tmpl, innerHTML, isLoop);

	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'update', function tagUpdate(data) {
	    if (isFunction(this.shouldUpdate) && !this.shouldUpdate(data)) { return this }

	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data);

	    // inherit properties from the parent, but only for isAnonymous tags
	    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
	    extend(this, data);
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);
	    if (this.isMounted) { this.trigger('update', data); }
	    update$1$1.call(this, expressions);
	    if (this.isMounted) { this.trigger('updated'); }

	    return this

	  }.bind(this));

	  /**
	   * Add a mixin to this tag
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mixin', function tagMixin() {
	    var this$1 = this;

	    each(arguments, function (mix) {
	      var instance,
	        props = [],
	        obj;

	      mix = isString(mix) ? mixin$$1(mix) : mix;

	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix();
	      } else { instance = mix; }

	      var proto = Object.getPrototypeOf(instance);

	      // build multilevel prototype inheritance chain property list
	      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
	      while (obj = Object.getPrototypeOf(obj || instance))

	      // loop the keys in the function prototype or the all object keys
	      each(props, function (key) {
	        // bind methods to this
	        // allow mixins to override other properties/parent mixins
	        if (key !== 'init') {
	          // check for getters/setters
	          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
	          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

	          // apply method only if it does not already exist on the instance
	          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
	            Object.defineProperty(this$1, key, descriptor);
	          } else {
	            this$1[key] = isFunction(instance[key]) ?
	              instance[key].bind(this$1) :
	              instance[key];
	          }
	        }
	      });

	      // init method will be called automatically
	      if (instance.init)
	        { instance.init.bind(this$1)(); }
	    });
	    return this
	  }.bind(this));

	  /**
	   * Mount the current tag instance
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mount', function tagMount() {
	    var this$1 = this;

	    root._tag = this; // keep a reference to the tag just created

	    // Read all the attrs on this instance. This give us the info we need for updateOpts
	    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
	      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
	      attr.expr = expr;
	      instAttrs.push(attr);
	    }]);

	    // update the root adding custom attributes coming from the compiler
	    implAttrs = [];
	    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
	    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
	      if (expr) { expressions.push(expr); }
	      else { setAttr(root, attr.name, attr.value); }
	    }]);

	    // children in loop should inherit from true parent
	    if (this._parent && isAnonymous) { inheritFrom.apply(this, [this._parent, propsInSyncWithParent]); }

	    // initialiation
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

	    // add global mixins
	    var globalMixin = mixin$$1(GLOBAL_MIXIN);

	    if (globalMixin) {
	      for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) {
	          this$1.mixin(globalMixin[i]);
	        }
	      }
	    }

	    if (impl.fn) { impl.fn.call(this, opts); }

	    this.trigger('before-mount');

	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions.apply(this, [dom, expressions, false]);

	    this.update(item);

	    if (isLoop && isAnonymous) {
	      // update the root attribute for the looped elements
	      this.root = root = dom.firstChild;
	    } else {
	      while (dom.firstChild) { root.appendChild(dom.firstChild); }
	      if (root.stub) { root = parent.root; }
	    }

	    defineProperty(this, 'root', root);
	    this.isMounted = true;

	    // if it's not a child tag we can trigger its mount event
	    if (!this.parent || this.parent.isMounted) {
	      this.trigger('mount');
	    }
	    // otherwise we need to wait that the parent event gets triggered
	    else { this.parent.one('mount', function () {
	      this$1.trigger('mount');
	    }); }

	    return this

	  }.bind(this));

	  /**
	   * Unmount the tag instance
	   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
	    var this$1 = this;

	    var el = this.root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __TAGS_CACHE.indexOf(this);

	    this.trigger('before-unmount');

	    // clear all attributes coming from the mounted tag
	    walkAttrs(impl.attrs, function (name) {
	      if (startsWith(name, RIOT_PREFIX))
	        { name = name.slice(RIOT_PREFIX.length); }
	      remAttr(root, name);
	    });

	    // remove this tag instance from the global virtualDom variable
	    if (~tagIndex)
	      { __TAGS_CACHE.splice(tagIndex, 1); }

	    if (p) {
	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent);

	        if (isVirtual) {
	          Object.keys(this.tags).forEach(function (tagName) {
	            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
	          });
	        } else {
	          arrayishRemove(ptag.tags, tagName, this);
	        }
	      } else {
	        while (el.firstChild) { el.removeChild(el.firstChild); }
	      }

	      if (!mustKeepRoot) {
	        p.removeChild(el);
	      } else {
	        // the riot-tag and the data-is attributes aren't needed anymore, remove them
	        remAttr(p, RIOT_TAG_IS);
	      }
	    }

	    if (this._internal.virts) {
	      each(this._internal.virts, function (v) {
	        if (v.parentNode) { v.parentNode.removeChild(v); }
	      });
	    }

	    // allow expressions to unmount themselves
	    unmountAll(expressions);
	    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

	    this.trigger('unmount');
	    this.off('*');
	    this.isMounted = false;

	    delete this.root._tag;

	    return this

	  }.bind(this));
	}

	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __TAG_IMPL[getAttr(dom, RIOT_TAG_IS) ||
	    getAttr(dom, RIOT_TAG_IS) || dom.tagName.toLowerCase()]
	}

	/**
	 * Inherit properties from a target tag instance
	 * @this Tag
	 * @param   { Tag } target - tag where we will inherit properties
	 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
	 */
	function inheritFrom(target, propsInSyncWithParent) {
	  var this$1 = this;

	  each(Object.keys(target), function (k) {
	    // some properties must be always in sync with the parent tag
	    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

	    if (isUndefined(this$1[k]) || mustSync) {
	      // track the property to keep in sync
	      // so we can keep it updated
	      if (!mustSync) { propsInSyncWithParent.push(k); }
	      this$1[k] = target[k];
	    }
	  });
	}

	/**
	 * Move the position of a custom tag in its parent tag
	 * @this Tag
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tagName, newPos) {
	  var parent = this.parent,
	    tags;
	  // no parent no move
	  if (!parent) { return }

	  tags = parent.tags[tagName];

	  if (isArray(tags))
	    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
	  else { arrayishAdd(parent.tags, tagName, this); }
	}

	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag$$1(child, opts, innerHTML),
	    tagName = opts.tagName || getTagName(opts.root, true),
	    ptag = getImmediateCustomParentTag(parent);
	  // fix for the parent attribute in the looped elements
	  tag.parent = ptag;
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag._parent = parent;

	  // add this tag to the custom parent tag
	  arrayishAdd(ptag.tags, tagName, tag);

	  // and also to the real parent tag
	  if (ptag !== parent)
	    { arrayishAdd(parent.tags, tagName, tag); }

	  // empty the child node once we got its template
	  // to avoid that its children get compiled multiple times
	  opts.root.innerHTML = '';

	  return tag
	}

	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag;
	  while (ptag._internal.isAnonymous) {
	    if (!ptag.parent) { break }
	    ptag = ptag.parent;
	  }
	  return ptag
	}

	/**
	 * Trigger the unmount method on all the expressions
	 * @param   { Array } expressions - DOM expressions
	 */
	function unmountAll(expressions) {
	  each(expressions, function(expr) {
	    if (expr instanceof Tag$$1) { expr.unmount(true); }
	    else if (expr.unmount) { expr.unmount(); }
	  });
	}

	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom, skipDataIs) {
	  var child = getTag(dom),
	    namedTag = !skipDataIs && getAttr(dom, RIOT_TAG_IS);
	  return namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()
	}

	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag$$1) && !(data && typeof data.trigger === T_FUNCTION))
	    { return data }

	  var o = {};
	  for (var key in data) {
	    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
	  }
	  return o
	}

	/**
	 * Set the property of an object for a given key. If something already
	 * exists there, then it becomes an array containing both the old and new value.
	 * @param { Object } obj - object on which to set the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be set
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	 */
	function arrayishAdd(obj, key, value, ensureArray) {
	  var dest = obj[key];
	  var isArr = isArray(dest);

	  if (dest && dest === value) { return }

	  // if the key was never set, set it once
	  if (!dest && ensureArray) { obj[key] = [value]; }
	  else if (!dest) { obj[key] = value; }
	  // if it was an array and not yet set
	  else if (!isArr || isArr && !contains(dest, value)) {
	    if (isArr) { dest.push(value); }
	    else { obj[key] = [dest, value]; }
	  }
	}

	/**
	 * Removes an item from an object at a given key. If the key points to an array,
	 * then the item is just removed from the array.
	 * @param { Object } obj - object on which to remove the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be removed
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	*/
	function arrayishRemove(obj, key, value, ensureArray) {
	  if (isArray(obj[key])) {
	    each(obj[key], function(item, i) {
	      if (item === value) { obj[key].splice(i, 1); }
	    });
	    if (!obj[key].length) { delete obj[key]; }
	    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
	  } else
	    { delete obj[key]; } // otherwise just delete the key
	}

	/**
	 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	 * @param   { Object }  dom - DOM node we want to parse
	 * @returns { Boolean } -
	 */
	function isInStub(dom) {
	  while (dom) {
	    if (dom.inStub)
	      { return true }
	    dom = dom.parentNode;
	  }
	  return false
	}

	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts, ctx) {
	  var impl = __TAG_IMPL[tagName],
	    implClass = __TAG_IMPL[tagName].class,
	    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

	  // clear the inner html
	  root.innerHTML = '';

	  var conf = { root: root, opts: opts };
	  if (opts && opts.parent) { conf.parent = opts.parent; }

	  if (impl && root) { Tag$$1.apply(tag, [impl, conf, innerHTML]); }

	  if (tag && tag.mount) {
	    tag.mount(true);
	    // add this tag to the virtualDom variable
	    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
	  }

	  return tag
	}


	/**
	 * Adds the elements for a virtual tag
	 * @this Tag
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function makeVirtual(src, target) {
	  var this$1 = this;

	  var head = createDOMPlaceholder(),
	    tail = createDOMPlaceholder(),
	    frag = createFrag(),
	    sib, el;

	  this._internal.head = this.root.insertBefore(head, this.root.firstChild);
	  this._internal.tail = this.root.appendChild(tail);

	  el = this._internal.head;

	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    this$1._internal.virts.push(el); // hold for unmounting
	    el = sib;
	  }

	  if (target)
	    { src.insertBefore(frag, target._internal.head); }
	  else
	    { src.appendChild(frag); }
	}

	/**
	 * Move virtual tag and all child nodes
	 * @this Tag
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 */
	function moveVirtual(src, target) {
	  var this$1 = this;

	  var el = this._internal.head,
	    frag = createFrag(),
	    sib;

	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    el = sib;
	    if (el === this$1._internal.tail) {
	      frag.appendChild(el);
	      src.insertBefore(frag, target._internal.head);
	      break
	    }
	  }
	}

	/**
	 * Get selectors for tags
	 * @param   { Array } tags - tag names to select
	 * @returns { String } selector
	 */
	function selectTags(tags) {
	  // select all tags
	  if (!tags) {
	    var keys = Object.keys(__TAG_IMPL);
	    return keys + selectTags(keys)
	  }

	  return tags
	    .filter(function (t) { return !/[^-\w]/.test(t); })
	    .reduce(function (list, t) {
	      var name = t.trim().toLowerCase();
	      return list + ",[" + RIOT_TAG_IS + "=\"" + name + "\"]"
	    }, '')
	}


	var tags = Object.freeze({
		getTag: getTag,
		inheritFrom: inheritFrom,
		moveChildTag: moveChildTag,
		initChildTag: initChildTag,
		getImmediateCustomParentTag: getImmediateCustomParentTag,
		unmountAll: unmountAll,
		getTagName: getTagName,
		cleanUpData: cleanUpData,
		arrayishAdd: arrayishAdd,
		arrayishRemove: arrayishRemove,
		isInStub: isInStub,
		mountTo: mountTo,
		makeVirtual: makeVirtual,
		moveVirtual: moveVirtual,
		selectTags: selectTags
	});

	/**
	 * Riot public api
	 */

	var settings = Object.create(brackets.settings);
	var util = {
	  tmpl: tmpl,
	  brackets: brackets,
	  styleManager: styleManager,
	  vdom: __TAGS_CACHE,
	  styleNode: styleManager.styleNode,
	  // export the riot internal utils as well
	  dom: dom,
	  check: check,
	  misc: misc,
	  tags: tags
	};

	exports.settings = settings;
	exports.util = util;
	exports.observable = observable;
	exports.Tag = Tag$1;
	exports.tag = tag$$1;
	exports.tag2 = tag2$$1;
	exports.mount = mount$$1;
	exports.mixin = mixin$$1;
	exports.update = update$2;
	exports.unregister = unregister$$1;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(5);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(20);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(22);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(23);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(24);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(21);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;

	var _isPlainObject = __webpack_require__(6);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(16);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(7),
	    getPrototype = __webpack_require__(13),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(8),
	    getRawTag = __webpack_require__(11),
	    objectToString = __webpack_require__(12);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(9);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(10);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(8);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(14);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(19);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(18)(module)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	var _createStore = __webpack_require__(5);

	var _isPlainObject = __webpack_require__(6);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(21);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });

	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  if (process.env.NODE_ENV !== 'production') {
	    var unexpectedKeyCache = {};
	  }

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	var _compose = __webpack_require__(24);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var RANDOM = 'RANDOM';

	var randomColumns = function randomColumns() {
	    var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random.bind(undefined);
	    return function (store) {
	        return function (next) {
	            return function (action) {
	                if (action.type === RANDOM && typeof action.fn === 'function') {
	                    var r = action.fn(rng, Object.assign({}, store.getState()));
	                    action.nextAction && store.dispatch(action.nextAction(r));
	                }
	                return next(action);
	            };
	        };
	    };
	};

	var randomAction = exports.randomAction = function randomAction(fn) {
	    return function (nextAction) {
	        return {
	            type: RANDOM,
	            fn: fn,
	            nextAction: nextAction
	        };
	    };
	};

	exports.default = randomColumns;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reduxActions = __webpack_require__(27);

	var InitialText = '0123456789';
	var initialState = {
	    ctx: null,
	    fontSize: 16,
	    fontColor: '#0F0',
	    drops: [{ text: null, pos: 0 }],
	    height: 0,
	    width: 0,
	    textArray: InitialText.split('')
	};

	var reducer = (0, _reduxActions.handleActions)({
	    INITIAL_SET: function INITIAL_SET(state, action) {
	        return Object.assign({}, state, action.payload);
	    },
	    UPDATE_DROPS: function UPDATE_DROPS(state, action) {
	        return _extends({}, state, { drops: action.payload });
	    },
	    QUEUE_NEW_CHAR: function QUEUE_NEW_CHAR(state, action) {
	        var newText = action.payload;
	        var oldTextArray = state.textArray;
	        oldTextArray.push(newText);
	        return _extends({}, state, { textArray: oldTextArray.slice(1, oldTextArray.length) });
	    }
	}, initialState);

	exports.default = reducer;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.combineActions = exports.handleActions = exports.handleAction = exports.createActions = exports.createAction = undefined;

	var _createAction = __webpack_require__(28);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _handleAction = __webpack_require__(35);

	var _handleAction2 = _interopRequireDefault(_handleAction);

	var _handleActions = __webpack_require__(84);

	var _handleActions2 = _interopRequireDefault(_handleActions);

	var _combineActions = __webpack_require__(68);

	var _combineActions2 = _interopRequireDefault(_combineActions);

	var _createActions = __webpack_require__(87);

	var _createActions2 = _interopRequireDefault(_createActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createAction = _createAction2.default;
	exports.createActions = _createActions2.default;
	exports.handleAction = _handleAction2.default;
	exports.handleActions = _handleActions2.default;
	exports.combineActions = _combineActions2.default;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createAction;

	var _identity = __webpack_require__(29);

	var _identity2 = _interopRequireDefault(_identity);

	var _isFunction = __webpack_require__(30);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _isUndefined = __webpack_require__(32);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _isNull = __webpack_require__(33);

	var _isNull2 = _interopRequireDefault(_isNull);

	var _invariant = __webpack_require__(34);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createAction(type) {
	  var payloadCreator = arguments.length <= 1 || arguments[1] === undefined ? _identity2.default : arguments[1];
	  var metaCreator = arguments[2];

	  (0, _invariant2.default)((0, _isFunction2.default)(payloadCreator) || (0, _isNull2.default)(payloadCreator), 'Expected payloadCreator to be a function, undefined or null');

	  var finalPayloadCreator = (0, _isNull2.default)(payloadCreator) ? _identity2.default : payloadCreator;

	  var actionCreator = function actionCreator() {
	    var hasError = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error;

	    var action = {
	      type: type
	    };

	    var payload = hasError ? arguments.length <= 0 ? undefined : arguments[0] : finalPayloadCreator.apply(undefined, arguments);
	    if (!(0, _isUndefined2.default)(payload)) {
	      action.payload = payload;
	    }

	    if (hasError || payload instanceof Error) {
	      // Handle FSA errors where the payload is an Error object. Set error.
	      action.error = true;
	    }

	    if ((0, _isFunction2.default)(metaCreator)) {
	      action.meta = metaCreator.apply(undefined, arguments);
	    }

	    return action;
	  };

	  actionCreator.toString = function () {
	    return type.toString();
	  };

	  return actionCreator;
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(7),
	    isObject = __webpack_require__(31);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	 * @example
	 *
	 * _.isNull(null);
	 * // => true
	 *
	 * _.isNull(void 0);
	 * // => false
	 */
	function isNull(value) {
	  return value === null;
	}

	module.exports = isNull;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = handleAction;

	var _isFunction = __webpack_require__(30);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _isPlainObject = __webpack_require__(6);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _identity = __webpack_require__(29);

	var _identity2 = _interopRequireDefault(_identity);

	var _isNil = __webpack_require__(36);

	var _isNil2 = _interopRequireDefault(_isNil);

	var _isUndefined = __webpack_require__(32);

	var _isUndefined2 = _interopRequireDefault(_isUndefined);

	var _includes = __webpack_require__(37);

	var _includes2 = _interopRequireDefault(_includes);

	var _invariant = __webpack_require__(34);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _combineActions = __webpack_require__(68);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function handleAction(actionType) {
	  var reducer = arguments.length <= 1 || arguments[1] === undefined ? _identity2.default : arguments[1];
	  var defaultState = arguments[2];

	  var actionTypes = actionType.toString().split(_combineActions.ACTION_TYPE_DELIMITER);
	  (0, _invariant2.default)(!(0, _isUndefined2.default)(defaultState), 'defaultState for reducer handling ' + actionTypes.join(', ') + ' should be defined');
	  (0, _invariant2.default)((0, _isFunction2.default)(reducer) || (0, _isPlainObject2.default)(reducer), 'Expected reducer to be a function or object with next and throw reducers');

	  var _ref = (0, _isFunction2.default)(reducer) ? [reducer, reducer] : [reducer.next, reducer.throw].map(function (aReducer) {
	    return (0, _isNil2.default)(aReducer) ? _identity2.default : aReducer;
	  });

	  var _ref2 = _slicedToArray(_ref, 2);

	  var nextReducer = _ref2[0];
	  var throwReducer = _ref2[1];


	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
	    var action = arguments[1];
	    var type = action.type;

	    if (type && !(0, _includes2.default)(actionTypes, type.toString())) {
	      return state;
	    }

	    return (action.error === true ? throwReducer : nextReducer)(state, action);
	  };
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `null` or `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	 * @example
	 *
	 * _.isNil(null);
	 * // => true
	 *
	 * _.isNil(void 0);
	 * // => true
	 *
	 * _.isNil(NaN);
	 * // => false
	 */
	function isNil(value) {
	  return value == null;
	}

	module.exports = isNil;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(38),
	    isArrayLike = __webpack_require__(42),
	    isString = __webpack_require__(44),
	    toInteger = __webpack_require__(46),
	    values = __webpack_require__(50);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}

	module.exports = includes;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(39),
	    baseIsNaN = __webpack_require__(40),
	    strictIndexOf = __webpack_require__(41);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(30),
	    isLength = __webpack_require__(43);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(7),
	    isArray = __webpack_require__(45),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(47);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(48);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31),
	    isSymbol = __webpack_require__(49);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(7),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(51),
	    keys = __webpack_require__(53);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(52);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(54),
	    baseKeys = __webpack_require__(65),
	    isArrayLike = __webpack_require__(42);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(55),
	    isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(45),
	    isBuffer = __webpack_require__(58),
	    isIndex = __webpack_require__(60),
	    isTypedArray = __webpack_require__(61);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(57),
	    isObjectLike = __webpack_require__(15);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(7),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(9),
	    stubFalse = __webpack_require__(59);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(62),
	    baseUnary = __webpack_require__(63),
	    nodeUtil = __webpack_require__(64);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(7),
	    isLength = __webpack_require__(43),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(10);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(66),
	    nativeKeys = __webpack_require__(67);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(14);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ACTION_TYPE_DELIMITER = undefined;
	exports.default = combineActions;

	var _isString = __webpack_require__(44);

	var _isString2 = _interopRequireDefault(_isString);

	var _isFunction = __webpack_require__(30);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _isEmpty = __webpack_require__(69);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	var _toString = __webpack_require__(82);

	var _toString2 = _interopRequireDefault(_toString);

	var _isSymbol = __webpack_require__(49);

	var _isSymbol2 = _interopRequireDefault(_isSymbol);

	var _invariant = __webpack_require__(34);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ACTION_TYPE_DELIMITER = exports.ACTION_TYPE_DELIMITER = '||';

	function isValidActionType(actionType) {
	  return (0, _isString2.default)(actionType) || (0, _isFunction2.default)(actionType) || (0, _isSymbol2.default)(actionType);
	}

	function isValidActionTypes(actionTypes) {
	  if ((0, _isEmpty2.default)(actionTypes)) {
	    return false;
	  }
	  return actionTypes.every(isValidActionType);
	}

	function combineActions() {
	  for (var _len = arguments.length, actionsTypes = Array(_len), _key = 0; _key < _len; _key++) {
	    actionsTypes[_key] = arguments[_key];
	  }

	  (0, _invariant2.default)(isValidActionTypes(actionsTypes), 'Expected action types to be strings, symbols, or action creators');
	  var combinedActionType = actionsTypes.map(_toString2.default).join(ACTION_TYPE_DELIMITER);
	  return { toString: function toString() {
	      return combinedActionType;
	    } };
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeys = __webpack_require__(65),
	    getTag = __webpack_require__(70),
	    isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(45),
	    isArrayLike = __webpack_require__(42),
	    isBuffer = __webpack_require__(58),
	    isPrototype = __webpack_require__(66),
	    isTypedArray = __webpack_require__(61);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(71),
	    Map = __webpack_require__(78),
	    Promise = __webpack_require__(79),
	    Set = __webpack_require__(80),
	    WeakMap = __webpack_require__(81),
	    baseGetTag = __webpack_require__(7),
	    toSource = __webpack_require__(76);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(72),
	    root = __webpack_require__(9);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(73),
	    getValue = __webpack_require__(77);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(30),
	    isMasked = __webpack_require__(74),
	    isObject = __webpack_require__(31),
	    toSource = __webpack_require__(76);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(75);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(9);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(72),
	    root = __webpack_require__(9);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(72),
	    root = __webpack_require__(9);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(72),
	    root = __webpack_require__(9);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(72),
	    root = __webpack_require__(9);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(83);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(8),
	    arrayMap = __webpack_require__(52),
	    isArray = __webpack_require__(45),
	    isSymbol = __webpack_require__(49);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = handleActions;

	var _handleAction = __webpack_require__(35);

	var _handleAction2 = _interopRequireDefault(_handleAction);

	var _ownKeys = __webpack_require__(85);

	var _ownKeys2 = _interopRequireDefault(_ownKeys);

	var _reduceReducers = __webpack_require__(86);

	var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function handleActions(handlers, defaultState) {
	  var reducers = (0, _ownKeys2.default)(handlers).map(function (type) {
	    return (0, _handleAction2.default)(type, handlers[type], defaultState);
	  });
	  var reducer = _reduceReducers2.default.apply(undefined, _toConsumableArray(reducers));
	  return function (state, action) {
	    return reducer(state, action);
	  };
	}

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ownKeys;
	function ownKeys(object) {
	  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
	    return Reflect.ownKeys(object);
	  }

	  var keys = Object.getOwnPropertyNames(object);

	  if (typeof Object.getOwnPropertySymbols === 'function') {
	    keys = keys.concat(Object.getOwnPropertySymbols(object));
	  }

	  return keys;
	}

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = reduceReducers;

	function reduceReducers() {
	  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
	    reducers[_key] = arguments[_key];
	  }

	  return function (previous, current) {
	    return reducers.reduce(function (p, r) {
	      return r(p, current);
	    }, previous);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createActions;

	var _identity = __webpack_require__(29);

	var _identity2 = _interopRequireDefault(_identity);

	var _camelCase = __webpack_require__(88);

	var _camelCase2 = _interopRequireDefault(_camelCase);

	var _isPlainObject = __webpack_require__(6);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _isArray = __webpack_require__(45);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _reduce = __webpack_require__(107);

	var _reduce2 = _interopRequireDefault(_reduce);

	var _isString = __webpack_require__(44);

	var _isString2 = _interopRequireDefault(_isString);

	var _isFunction = __webpack_require__(30);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _createAction = __webpack_require__(28);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _invariant = __webpack_require__(34);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function createActions(actionsMap) {
	  for (var _len = arguments.length, identityActions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    identityActions[_key - 1] = arguments[_key];
	  }

	  (0, _invariant2.default)(identityActions.every(_isString2.default) && ((0, _isString2.default)(actionsMap) || (0, _isPlainObject2.default)(actionsMap)), 'Expected optional object followed by string action types');
	  if ((0, _isString2.default)(actionsMap)) {
	    return fromIdentityActions([actionsMap].concat(identityActions));
	  }
	  return _extends({}, fromActionsMap(actionsMap), fromIdentityActions(identityActions));
	}

	function isValidActionsMapValue(actionsMapValue) {
	  if ((0, _isFunction2.default)(actionsMapValue)) {
	    return true;
	  } else if ((0, _isArray2.default)(actionsMapValue)) {
	    var _actionsMapValue = _slicedToArray(actionsMapValue, 2);

	    var _actionsMapValue$ = _actionsMapValue[0];
	    var payload = _actionsMapValue$ === undefined ? _identity2.default : _actionsMapValue$;
	    var meta = _actionsMapValue[1];


	    return (0, _isFunction2.default)(payload) && (0, _isFunction2.default)(meta);
	  }
	  return false;
	}

	function fromActionsMap(actionsMap) {
	  return (0, _reduce2.default)(actionsMap, function (actionCreatorsMap, actionsMapValue, type) {
	    (0, _invariant2.default)(isValidActionsMapValue(actionsMapValue), 'Expected function, undefined, or array with payload and meta ' + ('functions for ' + type));
	    var actionCreator = (0, _isArray2.default)(actionsMapValue) ? _createAction2.default.apply(undefined, [type].concat(_toConsumableArray(actionsMapValue))) : (0, _createAction2.default)(type, actionsMapValue);

	    return _extends({}, actionCreatorsMap, _defineProperty({}, (0, _camelCase2.default)(type), actionCreator));
	  }, {});
	}

	function fromIdentityActions(identityActions) {
	  return fromActionsMap(identityActions.reduce(function (actionsMap, actionType) {
	    return _extends({}, actionsMap, _defineProperty({}, actionType, _identity2.default));
	  }, {}));
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var capitalize = __webpack_require__(89),
	    createCompounder = __webpack_require__(98);

	/**
	 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the camel cased string.
	 * @example
	 *
	 * _.camelCase('Foo Bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('--foo-bar--');
	 * // => 'fooBar'
	 *
	 * _.camelCase('__FOO_BAR__');
	 * // => 'fooBar'
	 */
	var camelCase = createCompounder(function(result, word, index) {
	  word = word.toLowerCase();
	  return result + (index ? capitalize(word) : word);
	});

	module.exports = camelCase;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(82),
	    upperFirst = __webpack_require__(90);

	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}

	module.exports = capitalize;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(91);

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');

	module.exports = upperFirst;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var castSlice = __webpack_require__(92),
	    hasUnicode = __webpack_require__(94),
	    stringToArray = __webpack_require__(95),
	    toString = __webpack_require__(82);

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);

	    var strSymbols = hasUnicode(string)
	      ? stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	module.exports = createCaseFirst;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(93);

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}

	module.exports = castSlice;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	module.exports = hasUnicode;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(96),
	    hasUnicode = __webpack_require__(94),
	    unicodeToArray = __webpack_require__(97);

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}

	module.exports = stringToArray;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	module.exports = asciiToArray;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	module.exports = unicodeToArray;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(99),
	    deburr = __webpack_require__(100),
	    words = __webpack_require__(103);

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]";

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}

	module.exports = createCompounder;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(101),
	    toString = __webpack_require__(82);

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(102);

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 's'
	};

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);

	module.exports = deburrLetter;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var asciiWords = __webpack_require__(104),
	    hasUnicodeWord = __webpack_require__(105),
	    toString = __webpack_require__(82),
	    unicodeWords = __webpack_require__(106);

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	module.exports = asciiWords;


/***/ },
/* 105 */
/***/ function(module, exports) {

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	module.exports = hasUnicodeWord;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
	    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
	  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
	  rsUpper + '+' + rsOptContrUpper,
	  rsOrdUpper,
	  rsOrdLower,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}

	module.exports = unicodeWords;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(99),
	    baseEach = __webpack_require__(108),
	    baseIteratee = __webpack_require__(113),
	    baseReduce = __webpack_require__(176),
	    isArray = __webpack_require__(45);

	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` thru `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given, the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @see _.reduceRight
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;

	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}

	module.exports = reduce;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(109),
	    createBaseEach = __webpack_require__(112);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(110),
	    keys = __webpack_require__(53);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(111);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(42);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(114),
	    baseMatchesProperty = __webpack_require__(161),
	    identity = __webpack_require__(29),
	    isArray = __webpack_require__(45),
	    property = __webpack_require__(173);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(115),
	    getMatchData = __webpack_require__(158),
	    matchesStrictComparable = __webpack_require__(160);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(116),
	    baseIsEqual = __webpack_require__(145);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(117),
	    stackClear = __webpack_require__(125),
	    stackDelete = __webpack_require__(126),
	    stackGet = __webpack_require__(127),
	    stackHas = __webpack_require__(128),
	    stackSet = __webpack_require__(129);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(118),
	    listCacheDelete = __webpack_require__(119),
	    listCacheGet = __webpack_require__(122),
	    listCacheHas = __webpack_require__(123),
	    listCacheSet = __webpack_require__(124);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(120);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(121);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(120);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(120);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(120);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(117);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(117),
	    Map = __webpack_require__(78),
	    MapCache = __webpack_require__(130);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(131),
	    mapCacheDelete = __webpack_require__(139),
	    mapCacheGet = __webpack_require__(142),
	    mapCacheHas = __webpack_require__(143),
	    mapCacheSet = __webpack_require__(144);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(132),
	    ListCache = __webpack_require__(117),
	    Map = __webpack_require__(78);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(133),
	    hashDelete = __webpack_require__(135),
	    hashGet = __webpack_require__(136),
	    hashHas = __webpack_require__(137),
	    hashSet = __webpack_require__(138);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(134);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(72);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(134);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(134);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(134);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(140);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(141);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 141 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(140);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(140);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(140);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(146),
	    isObject = __webpack_require__(31),
	    isObjectLike = __webpack_require__(15);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(116),
	    equalArrays = __webpack_require__(147),
	    equalByTag = __webpack_require__(153),
	    equalObjects = __webpack_require__(157),
	    getTag = __webpack_require__(70),
	    isArray = __webpack_require__(45),
	    isBuffer = __webpack_require__(58),
	    isTypedArray = __webpack_require__(61);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(148),
	    arraySome = __webpack_require__(151),
	    cacheHas = __webpack_require__(152);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(130),
	    setCacheAdd = __webpack_require__(149),
	    setCacheHas = __webpack_require__(150);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 149 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 151 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(8),
	    Uint8Array = __webpack_require__(154),
	    eq = __webpack_require__(121),
	    equalArrays = __webpack_require__(147),
	    mapToArray = __webpack_require__(155),
	    setToArray = __webpack_require__(156);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(9);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 155 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(53);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(159),
	    keys = __webpack_require__(53);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 160 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(145),
	    get = __webpack_require__(162),
	    hasIn = __webpack_require__(170),
	    isKey = __webpack_require__(165),
	    isStrictComparable = __webpack_require__(159),
	    matchesStrictComparable = __webpack_require__(160),
	    toKey = __webpack_require__(169);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(163);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(164),
	    toKey = __webpack_require__(169);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(45),
	    isKey = __webpack_require__(165),
	    stringToPath = __webpack_require__(166),
	    toString = __webpack_require__(82);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(45),
	    isSymbol = __webpack_require__(49);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(167);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(168);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(130);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(49);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(171),
	    hasPath = __webpack_require__(172);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 171 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(164),
	    isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(45),
	    isIndex = __webpack_require__(60),
	    isLength = __webpack_require__(43),
	    toKey = __webpack_require__(169);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(174),
	    basePropertyDeep = __webpack_require__(175),
	    isKey = __webpack_require__(165),
	    toKey = __webpack_require__(169);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 174 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(163);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 176 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of
	 *  `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}

	module.exports = baseReduce;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var _actions = __webpack_require__(178);

	var _utils = __webpack_require__(180);

	riot.tag2('matrix', '<matrix-header on_font_change="{handleFontChange}" default_font_size="{this.opts.fontSize}" on_click_push_text="{pushText}"> </matrix-header> <canvas id="matrix"></canvas>', '', '', function (opts) {
	    var _this = this;

	    this.on('mount', function () {
	        var c = document.getElementById("matrix");
	        var ctx = c.getContext("2d");

	        c.height = window.innerHeight - c.offsetTop;
	        c.width = window.innerWidth;

	        _this.opts.store.dispatch((0, _actions.initMatrix)({
	            ctx: ctx,
	            height: c.height,
	            width: c.width,
	            fontSize: _this.opts.fontSize
	        }));

	        setInterval(updateDraw, _this.opts.frameRate);
	        setInterval(queueStr, _this.opts.newTextInterval);
	    });
	    var draw = function draw(_ref) {
	        var ctx = _ref.ctx,
	            textArray = _ref.textArray,
	            fontSize = _ref.fontSize,
	            fontColor = _ref.fontColor,
	            height = _ref.height,
	            width = _ref.width,
	            drops = _ref.drops;

	        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	        ctx.fillRect(0, 0, width, height);

	        ctx.fillStyle = fontColor;
	        ctx.font = fontSize + "px arial";

	        for (var i = 0; i < drops.length; i++) {
	            ctx.fillText(drops[i].text, i * fontSize, drops[i].pos * fontSize);
	        }
	    };

	    var store = this.opts.store;

	    store.subscribe(function () {
	        draw(store.getState());
	    });

	    var updateDraw = function updateDraw() {
	        _this.opts.store.dispatch((0, _actions.moveDrops)());
	    };
	    var queueStr = function queueStr() {
	        _this.opts.store.dispatch((0, _actions.queueRandomText)());
	    };
	    this.handleFontChange = function (e) {
	        _this.opts.store.dispatch((0, _actions.initMatrix)({
	            fontSize: e.target.value
	        }));
	    };
	    this.pushText = function (e) {
	        _this.opts.store.dispatch((0, _actions.queueNewText)(document.getElementById("pushtext-input").value));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.queueRandomText = exports.moveDrops = exports.initMatrix = exports.queueNewText = undefined;

	var _reduxActions = __webpack_require__(27);

	var _constants = __webpack_require__(179);

	var _store = __webpack_require__(25);

	var _utils = __webpack_require__(180);

	var _emojisList = __webpack_require__(181);

	var _emojisList2 = _interopRequireDefault(_emojisList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initializeMatrixAction = (0, _reduxActions.createAction)(_constants.INITIAL_SET);

	var updateDropsAction = (0, _reduxActions.createAction)(_constants.UPDATE_DROPS);

	var queueNewText = exports.queueNewText = (0, _reduxActions.createAction)(_constants.QUEUE_NEW_CHAR);

	var initMatrix = exports.initMatrix = function initMatrix(payload) {
	    return (0, _store.randomAction)(function (rng, _ref) {
	        var textArray = _ref.textArray,
	            width = _ref.width;
	        return Object.assign(payload, {
	            drops: (0, _utils.createInitialDrops)((payload.width || width) / payload.fontSize, textArray, rng)
	        });
	    })(initializeMatrixAction);
	};

	var moveDrops = exports.moveDrops = function moveDrops() {
	    return (0, _store.randomAction)(function (rng, _ref2) {
	        var drops = _ref2.drops,
	            fontSize = _ref2.fontSize,
	            height = _ref2.height,
	            textArray = _ref2.textArray;
	        return (0, _utils.oneMoveDrops)(drops, fontSize, height, textArray, rng);
	    })(updateDropsAction);
	};

	var queueRandomText = exports.queueRandomText = function queueRandomText() {
	    return (0, _store.randomAction)(function (rng) {
	        return _emojisList2.default[(0, _utils.getRandomInt)(0, _emojisList2.default.length, rng)];
	    })(queueNewText);
	};

/***/ },
/* 179 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//ACTIONS
	var INITIAL_SET = exports.INITIAL_SET = 'INITIAL_SET';
	var UPDATE_DROPS = exports.UPDATE_DROPS = 'UPDATE_DROPS';
	var QUEUE_NEW_CHAR = exports.QUEUE_NEW_CHAR = 'QUEUE_NEW_CHAR';

/***/ },
/* 180 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var createInitialDrops = exports.createInitialDrops = function createInitialDrops(columns, textArray, rng) {
	    return new Array(Math.floor(columns)).fill({ pos: 1, text: textCreator(textArray, rng) });
	};

	var oneMoveDrops = exports.oneMoveDrops = function oneMoveDrops(drops, fontSize, height, textArray, rng) {
	    var newDrops = [];
	    for (var i = 0; i < drops.length; i++) {
	        var newDrop = Object.assign({}, drops[i]);
	        newDrops[newDrops.length] = newDrop;
	        if (newDrop.pos * fontSize > height && rng() > 0.975) newDrop.pos = 0;
	        newDrop.pos++;
	        newDrop.text = textCreator(textArray, rng);
	    }
	    return newDrops;
	};

	var getRandomInt = exports.getRandomInt = function getRandomInt(min, max, rng) {
	    return Math.floor(rng() * (max - min + 1)) + min;
	};

	var textCreator = function textCreator(textArray, rng) {
	    return textArray[Math.floor(rng() * textArray.length)];
	};

/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = [
	  "🀄",
	  "🃏",
	  "🅰",
	  "🅱",
	  "🅾",
	  "🅿",
	  "🆎",
	  "🆑",
	  "🆒",
	  "🆓",
	  "🆔",
	  "🆕",
	  "🆖",
	  "🆗",
	  "🆘",
	  "🆙",
	  "🆚",
	  "🇦🇨",
	  "🇦🇩",
	  "🇦🇪",
	  "🇦🇫",
	  "🇦🇬",
	  "🇦🇮",
	  "🇦🇱",
	  "🇦🇲",
	  "🇦🇴",
	  "🇦🇶",
	  "🇦🇷",
	  "🇦🇸",
	  "🇦🇹",
	  "🇦🇺",
	  "🇦🇼",
	  "🇦🇽",
	  "🇦🇿",
	  "🇦",
	  "🇧🇦",
	  "🇧🇧",
	  "🇧🇩",
	  "🇧🇪",
	  "🇧🇫",
	  "🇧🇬",
	  "🇧🇭",
	  "🇧🇮",
	  "🇧🇯",
	  "🇧🇱",
	  "🇧🇲",
	  "🇧🇳",
	  "🇧🇴",
	  "🇧🇶",
	  "🇧🇷",
	  "🇧🇸",
	  "🇧🇹",
	  "🇧🇻",
	  "🇧🇼",
	  "🇧🇾",
	  "🇧🇿",
	  "🇧",
	  "🇨🇦",
	  "🇨🇨",
	  "🇨🇩",
	  "🇨🇫",
	  "🇨🇬",
	  "🇨🇭",
	  "🇨🇮",
	  "🇨🇰",
	  "🇨🇱",
	  "🇨🇲",
	  "🇨🇳",
	  "🇨🇴",
	  "🇨🇵",
	  "🇨🇷",
	  "🇨🇺",
	  "🇨🇻",
	  "🇨🇼",
	  "🇨🇽",
	  "🇨🇾",
	  "🇨🇿",
	  "🇨",
	  "🇩🇪",
	  "🇩🇬",
	  "🇩🇯",
	  "🇩🇰",
	  "🇩🇲",
	  "🇩🇴",
	  "🇩🇿",
	  "🇩",
	  "🇪🇦",
	  "🇪🇨",
	  "🇪🇪",
	  "🇪🇬",
	  "🇪🇭",
	  "🇪🇷",
	  "🇪🇸",
	  "🇪🇹",
	  "🇪🇺",
	  "🇪",
	  "🇫🇮",
	  "🇫🇯",
	  "🇫🇰",
	  "🇫🇲",
	  "🇫🇴",
	  "🇫🇷",
	  "🇫",
	  "🇬🇦",
	  "🇬🇧",
	  "🇬🇩",
	  "🇬🇪",
	  "🇬🇫",
	  "🇬🇬",
	  "🇬🇭",
	  "🇬🇮",
	  "🇬🇱",
	  "🇬🇲",
	  "🇬🇳",
	  "🇬🇵",
	  "🇬🇶",
	  "🇬🇷",
	  "🇬🇸",
	  "🇬🇹",
	  "🇬🇺",
	  "🇬🇼",
	  "🇬🇾",
	  "🇬",
	  "🇭🇰",
	  "🇭🇲",
	  "🇭🇳",
	  "🇭🇷",
	  "🇭🇹",
	  "🇭🇺",
	  "🇭",
	  "🇮🇨",
	  "🇮🇩",
	  "🇮🇪",
	  "🇮🇱",
	  "🇮🇲",
	  "🇮🇳",
	  "🇮🇴",
	  "🇮🇶",
	  "🇮🇷",
	  "🇮🇸",
	  "🇮🇹",
	  "🇮",
	  "🇯🇪",
	  "🇯🇲",
	  "🇯🇴",
	  "🇯🇵",
	  "🇯",
	  "🇰🇪",
	  "🇰🇬",
	  "🇰🇭",
	  "🇰🇮",
	  "🇰🇲",
	  "🇰🇳",
	  "🇰🇵",
	  "🇰🇷",
	  "🇰🇼",
	  "🇰🇾",
	  "🇰🇿",
	  "🇰",
	  "🇱🇦",
	  "🇱🇧",
	  "🇱🇨",
	  "🇱🇮",
	  "🇱🇰",
	  "🇱🇷",
	  "🇱🇸",
	  "🇱🇹",
	  "🇱🇺",
	  "🇱🇻",
	  "🇱🇾",
	  "🇱",
	  "🇲🇦",
	  "🇲🇨",
	  "🇲🇩",
	  "🇲🇪",
	  "🇲🇫",
	  "🇲🇬",
	  "🇲🇭",
	  "🇲🇰",
	  "🇲🇱",
	  "🇲🇲",
	  "🇲🇳",
	  "🇲🇴",
	  "🇲🇵",
	  "🇲🇶",
	  "🇲🇷",
	  "🇲🇸",
	  "🇲🇹",
	  "🇲🇺",
	  "🇲🇻",
	  "🇲🇼",
	  "🇲🇽",
	  "🇲🇾",
	  "🇲🇿",
	  "🇲",
	  "🇳🇦",
	  "🇳🇨",
	  "🇳🇪",
	  "🇳🇫",
	  "🇳🇬",
	  "🇳🇮",
	  "🇳🇱",
	  "🇳🇴",
	  "🇳🇵",
	  "🇳🇷",
	  "🇳🇺",
	  "🇳🇿",
	  "🇳",
	  "🇴🇲",
	  "🇴",
	  "🇵🇦",
	  "🇵🇪",
	  "🇵🇫",
	  "🇵🇬",
	  "🇵🇭",
	  "🇵🇰",
	  "🇵🇱",
	  "🇵🇲",
	  "🇵🇳",
	  "🇵🇷",
	  "🇵🇸",
	  "🇵🇹",
	  "🇵🇼",
	  "🇵🇾",
	  "🇵",
	  "🇶🇦",
	  "🇶",
	  "🇷🇪",
	  "🇷🇴",
	  "🇷🇸",
	  "🇷🇺",
	  "🇷🇼",
	  "🇷",
	  "🇸🇦",
	  "🇸🇧",
	  "🇸🇨",
	  "🇸🇩",
	  "🇸🇪",
	  "🇸🇬",
	  "🇸🇭",
	  "🇸🇮",
	  "🇸🇯",
	  "🇸🇰",
	  "🇸🇱",
	  "🇸🇲",
	  "🇸🇳",
	  "🇸🇴",
	  "🇸🇷",
	  "🇸🇸",
	  "🇸🇹",
	  "🇸🇻",
	  "🇸🇽",
	  "🇸🇾",
	  "🇸🇿",
	  "🇸",
	  "🇹🇦",
	  "🇹🇨",
	  "🇹🇩",
	  "🇹🇫",
	  "🇹🇬",
	  "🇹🇭",
	  "🇹🇯",
	  "🇹🇰",
	  "🇹🇱",
	  "🇹🇲",
	  "🇹🇳",
	  "🇹🇴",
	  "🇹🇷",
	  "🇹🇹",
	  "🇹🇻",
	  "🇹🇼",
	  "🇹🇿",
	  "🇹",
	  "🇺🇦",
	  "🇺🇬",
	  "🇺🇲",
	  "🇺🇳",
	  "🇺🇸",
	  "🇺🇾",
	  "🇺🇿",
	  "🇺",
	  "🇻🇦",
	  "🇻🇨",
	  "🇻🇪",
	  "🇻🇬",
	  "🇻🇮",
	  "🇻🇳",
	  "🇻🇺",
	  "🇻",
	  "🇼🇫",
	  "🇼🇸",
	  "🇼",
	  "🇽🇰",
	  "🇽",
	  "🇾🇪",
	  "🇾🇹",
	  "🇾",
	  "🇿🇦",
	  "🇿🇲",
	  "🇿🇼",
	  "🇿",
	  "🈁",
	  "🈂",
	  "🈚",
	  "🈯",
	  "🈲",
	  "🈳",
	  "🈴",
	  "🈵",
	  "🈶",
	  "🈷",
	  "🈸",
	  "🈹",
	  "🈺",
	  "🉐",
	  "🉑",
	  "🌀",
	  "🌁",
	  "🌂",
	  "🌃",
	  "🌄",
	  "🌅",
	  "🌆",
	  "🌇",
	  "🌈",
	  "🌉",
	  "🌊",
	  "🌋",
	  "🌌",
	  "🌍",
	  "🌎",
	  "🌏",
	  "🌐",
	  "🌑",
	  "🌒",
	  "🌓",
	  "🌔",
	  "🌕",
	  "🌖",
	  "🌗",
	  "🌘",
	  "🌙",
	  "🌚",
	  "🌛",
	  "🌜",
	  "🌝",
	  "🌞",
	  "🌟",
	  "🌠",
	  "🌡",
	  "🌤",
	  "🌥",
	  "🌦",
	  "🌧",
	  "🌨",
	  "🌩",
	  "🌪",
	  "🌫",
	  "🌬",
	  "🌭",
	  "🌮",
	  "🌯",
	  "🌰",
	  "🌱",
	  "🌲",
	  "🌳",
	  "🌴",
	  "🌵",
	  "🌶",
	  "🌷",
	  "🌸",
	  "🌹",
	  "🌺",
	  "🌻",
	  "🌼",
	  "🌽",
	  "🌾",
	  "🌿",
	  "🍀",
	  "🍁",
	  "🍂",
	  "🍃",
	  "🍄",
	  "🍅",
	  "🍆",
	  "🍇",
	  "🍈",
	  "🍉",
	  "🍊",
	  "🍋",
	  "🍌",
	  "🍍",
	  "🍎",
	  "🍏",
	  "🍐",
	  "🍑",
	  "🍒",
	  "🍓",
	  "🍔",
	  "🍕",
	  "🍖",
	  "🍗",
	  "🍘",
	  "🍙",
	  "🍚",
	  "🍛",
	  "🍜",
	  "🍝",
	  "🍞",
	  "🍟",
	  "🍠",
	  "🍡",
	  "🍢",
	  "🍣",
	  "🍤",
	  "🍥",
	  "🍦",
	  "🍧",
	  "🍨",
	  "🍩",
	  "🍪",
	  "🍫",
	  "🍬",
	  "🍭",
	  "🍮",
	  "🍯",
	  "🍰",
	  "🍱",
	  "🍲",
	  "🍳",
	  "🍴",
	  "🍵",
	  "🍶",
	  "🍷",
	  "🍸",
	  "🍹",
	  "🍺",
	  "🍻",
	  "🍼",
	  "🍽",
	  "🍾",
	  "🍿",
	  "🎀",
	  "🎁",
	  "🎂",
	  "🎃",
	  "🎄",
	  "🎅🏻",
	  "🎅🏼",
	  "🎅🏽",
	  "🎅🏾",
	  "🎅🏿",
	  "🎅",
	  "🎆",
	  "🎇",
	  "🎈",
	  "🎉",
	  "🎊",
	  "🎋",
	  "🎌",
	  "🎍",
	  "🎎",
	  "🎏",
	  "🎐",
	  "🎑",
	  "🎒",
	  "🎓",
	  "🎖",
	  "🎗",
	  "🎙",
	  "🎚",
	  "🎛",
	  "🎞",
	  "🎟",
	  "🎠",
	  "🎡",
	  "🎢",
	  "🎣",
	  "🎤",
	  "🎥",
	  "🎦",
	  "🎧",
	  "🎨",
	  "🎩",
	  "🎪",
	  "🎫",
	  "🎬",
	  "🎭",
	  "🎮",
	  "🎯",
	  "🎰",
	  "🎱",
	  "🎲",
	  "🎳",
	  "🎴",
	  "🎵",
	  "🎶",
	  "🎷",
	  "🎸",
	  "🎹",
	  "🎺",
	  "🎻",
	  "🎼",
	  "🎽",
	  "🎾",
	  "🎿",
	  "🏀",
	  "🏁",
	  "🏂🏻",
	  "🏂🏼",
	  "🏂🏽",
	  "🏂🏾",
	  "🏂🏿",
	  "🏂",
	  "🏃🏻‍♀️",
	  "🏃🏻‍♂️",
	  "🏃🏻",
	  "🏃🏼‍♀️",
	  "🏃🏼‍♂️",
	  "🏃🏼",
	  "🏃🏽‍♀️",
	  "🏃🏽‍♂️",
	  "🏃🏽",
	  "🏃🏾‍♀️",
	  "🏃🏾‍♂️",
	  "🏃🏾",
	  "🏃🏿‍♀️",
	  "🏃🏿‍♂️",
	  "🏃🏿",
	  "🏃‍♀️",
	  "🏃‍♂️",
	  "🏃",
	  "🏄🏻‍♀️",
	  "🏄🏻‍♂️",
	  "🏄🏻",
	  "🏄🏼‍♀️",
	  "🏄🏼‍♂️",
	  "🏄🏼",
	  "🏄🏽‍♀️",
	  "🏄🏽‍♂️",
	  "🏄🏽",
	  "🏄🏾‍♀️",
	  "🏄🏾‍♂️",
	  "🏄🏾",
	  "🏄🏿‍♀️",
	  "🏄🏿‍♂️",
	  "🏄🏿",
	  "🏄‍♀️",
	  "🏄‍♂️",
	  "🏄",
	  "🏅",
	  "🏆",
	  "🏇🏻",
	  "🏇🏼",
	  "🏇🏽",
	  "🏇🏾",
	  "🏇🏿",
	  "🏇",
	  "🏈",
	  "🏉",
	  "🏊🏻‍♀️",
	  "🏊🏻‍♂️",
	  "🏊🏻",
	  "🏊🏼‍♀️",
	  "🏊🏼‍♂️",
	  "🏊🏼",
	  "🏊🏽‍♀️",
	  "🏊🏽‍♂️",
	  "🏊🏽",
	  "🏊🏾‍♀️",
	  "🏊🏾‍♂️",
	  "🏊🏾",
	  "🏊🏿‍♀️",
	  "🏊🏿‍♂️",
	  "🏊🏿",
	  "🏊‍♀️",
	  "🏊‍♂️",
	  "🏊",
	  "🏋🏻‍♀️",
	  "🏋🏻‍♂️",
	  "🏋🏻",
	  "🏋🏼‍♀️",
	  "🏋🏼‍♂️",
	  "🏋🏼",
	  "🏋🏽‍♀️",
	  "🏋🏽‍♂️",
	  "🏋🏽",
	  "🏋🏾‍♀️",
	  "🏋🏾‍♂️",
	  "🏋🏾",
	  "🏋🏿‍♀️",
	  "🏋🏿‍♂️",
	  "🏋🏿",
	  "🏋️‍♀️",
	  "🏋️‍♂️",
	  "🏋",
	  "🏌🏻‍♀️",
	  "🏌🏻‍♂️",
	  "🏌🏻",
	  "🏌🏼‍♀️",
	  "🏌🏼‍♂️",
	  "🏌🏼",
	  "🏌🏽‍♀️",
	  "🏌🏽‍♂️",
	  "🏌🏽",
	  "🏌🏾‍♀️",
	  "🏌🏾‍♂️",
	  "🏌🏾",
	  "🏌🏿‍♀️",
	  "🏌🏿‍♂️",
	  "🏌🏿",
	  "🏌️‍♀️",
	  "🏌️‍♂️",
	  "🏌",
	  "🏍",
	  "🏎",
	  "🏏",
	  "🏐",
	  "🏑",
	  "🏒",
	  "🏓",
	  "🏔",
	  "🏕",
	  "🏖",
	  "🏗",
	  "🏘",
	  "🏙",
	  "🏚",
	  "🏛",
	  "🏜",
	  "🏝",
	  "🏞",
	  "🏟",
	  "🏠",
	  "🏡",
	  "🏢",
	  "🏣",
	  "🏤",
	  "🏥",
	  "🏦",
	  "🏧",
	  "🏨",
	  "🏩",
	  "🏪",
	  "🏫",
	  "🏬",
	  "🏭",
	  "🏮",
	  "🏯",
	  "🏰",
	  "🏳️‍🌈",
	  "🏳",
	  "🏴‍☠️",
	  "🏴",
	  "🏵",
	  "🏷",
	  "🏸",
	  "🏹",
	  "🏺",
	  "🏻",
	  "🏼",
	  "🏽",
	  "🏾",
	  "🏿",
	  "🐀",
	  "🐁",
	  "🐂",
	  "🐃",
	  "🐄",
	  "🐅",
	  "🐆",
	  "🐇",
	  "🐈",
	  "🐉",
	  "🐊",
	  "🐋",
	  "🐌",
	  "🐍",
	  "🐎",
	  "🐏",
	  "🐐",
	  "🐑",
	  "🐒",
	  "🐓",
	  "🐔",
	  "🐕",
	  "🐖",
	  "🐗",
	  "🐘",
	  "🐙",
	  "🐚",
	  "🐛",
	  "🐜",
	  "🐝",
	  "🐞",
	  "🐟",
	  "🐠",
	  "🐡",
	  "🐢",
	  "🐣",
	  "🐤",
	  "🐥",
	  "🐦",
	  "🐧",
	  "🐨",
	  "🐩",
	  "🐪",
	  "🐫",
	  "🐬",
	  "🐭",
	  "🐮",
	  "🐯",
	  "🐰",
	  "🐱",
	  "🐲",
	  "🐳",
	  "🐴",
	  "🐵",
	  "🐶",
	  "🐷",
	  "🐸",
	  "🐹",
	  "🐺",
	  "🐻",
	  "🐼",
	  "🐽",
	  "🐾",
	  "🐿",
	  "👀",
	  "👁‍🗨",
	  "👁",
	  "👂🏻",
	  "👂🏼",
	  "👂🏽",
	  "👂🏾",
	  "👂🏿",
	  "👂",
	  "👃🏻",
	  "👃🏼",
	  "👃🏽",
	  "👃🏾",
	  "👃🏿",
	  "👃",
	  "👄",
	  "👅",
	  "👆🏻",
	  "👆🏼",
	  "👆🏽",
	  "👆🏾",
	  "👆🏿",
	  "👆",
	  "👇🏻",
	  "👇🏼",
	  "👇🏽",
	  "👇🏾",
	  "👇🏿",
	  "👇",
	  "👈🏻",
	  "👈🏼",
	  "👈🏽",
	  "👈🏾",
	  "👈🏿",
	  "👈",
	  "👉🏻",
	  "👉🏼",
	  "👉🏽",
	  "👉🏾",
	  "👉🏿",
	  "👉",
	  "👊🏻",
	  "👊🏼",
	  "👊🏽",
	  "👊🏾",
	  "👊🏿",
	  "👊",
	  "👋🏻",
	  "👋🏼",
	  "👋🏽",
	  "👋🏾",
	  "👋🏿",
	  "👋",
	  "👌🏻",
	  "👌🏼",
	  "👌🏽",
	  "👌🏾",
	  "👌🏿",
	  "👌",
	  "👍🏻",
	  "👍🏼",
	  "👍🏽",
	  "👍🏾",
	  "👍🏿",
	  "👍",
	  "👎🏻",
	  "👎🏼",
	  "👎🏽",
	  "👎🏾",
	  "👎🏿",
	  "👎",
	  "👏🏻",
	  "👏🏼",
	  "👏🏽",
	  "👏🏾",
	  "👏🏿",
	  "👏",
	  "👐🏻",
	  "👐🏼",
	  "👐🏽",
	  "👐🏾",
	  "👐🏿",
	  "👐",
	  "👑",
	  "👒",
	  "👓",
	  "👔",
	  "👕",
	  "👖",
	  "👗",
	  "👘",
	  "👙",
	  "👚",
	  "👛",
	  "👜",
	  "👝",
	  "👞",
	  "👟",
	  "👠",
	  "👡",
	  "👢",
	  "👣",
	  "👤",
	  "👥",
	  "👦🏻",
	  "👦🏼",
	  "👦🏽",
	  "👦🏾",
	  "👦🏿",
	  "👦",
	  "👧🏻",
	  "👧🏼",
	  "👧🏽",
	  "👧🏾",
	  "👧🏿",
	  "👧",
	  "👨🏻‍🌾",
	  "👨🏻‍🍳",
	  "👨🏻‍🎓",
	  "👨🏻‍🎤",
	  "👨🏻‍🎨",
	  "👨🏻‍🏫",
	  "👨🏻‍🏭",
	  "👨🏻‍💻",
	  "👨🏻‍💼",
	  "👨🏻‍🔧",
	  "👨🏻‍🔬",
	  "👨🏻‍🚀",
	  "👨🏻‍🚒",
	  "👨🏻‍⚕️",
	  "👨🏻‍⚖️",
	  "👨🏻‍✈️",
	  "👨🏻",
	  "👨🏼‍🌾",
	  "👨🏼‍🍳",
	  "👨🏼‍🎓",
	  "👨🏼‍🎤",
	  "👨🏼‍🎨",
	  "👨🏼‍🏫",
	  "👨🏼‍🏭",
	  "👨🏼‍💻",
	  "👨🏼‍💼",
	  "👨🏼‍🔧",
	  "👨🏼‍🔬",
	  "👨🏼‍🚀",
	  "👨🏼‍🚒",
	  "👨🏼‍⚕️",
	  "👨🏼‍⚖️",
	  "👨🏼‍✈️",
	  "👨🏼",
	  "👨🏽‍🌾",
	  "👨🏽‍🍳",
	  "👨🏽‍🎓",
	  "👨🏽‍🎤",
	  "👨🏽‍🎨",
	  "👨🏽‍🏫",
	  "👨🏽‍🏭",
	  "👨🏽‍💻",
	  "👨🏽‍💼",
	  "👨🏽‍🔧",
	  "👨🏽‍🔬",
	  "👨🏽‍🚀",
	  "👨🏽‍🚒",
	  "👨🏽‍⚕️",
	  "👨🏽‍⚖️",
	  "👨🏽‍✈️",
	  "👨🏽",
	  "👨🏾‍🌾",
	  "👨🏾‍🍳",
	  "👨🏾‍🎓",
	  "👨🏾‍🎤",
	  "👨🏾‍🎨",
	  "👨🏾‍🏫",
	  "👨🏾‍🏭",
	  "👨🏾‍💻",
	  "👨🏾‍💼",
	  "👨🏾‍🔧",
	  "👨🏾‍🔬",
	  "👨🏾‍🚀",
	  "👨🏾‍🚒",
	  "👨🏾‍⚕️",
	  "👨🏾‍⚖️",
	  "👨🏾‍✈️",
	  "👨🏾",
	  "👨🏿‍🌾",
	  "👨🏿‍🍳",
	  "👨🏿‍🎓",
	  "👨🏿‍🎤",
	  "👨🏿‍🎨",
	  "👨🏿‍🏫",
	  "👨🏿‍🏭",
	  "👨🏿‍💻",
	  "👨🏿‍💼",
	  "👨🏿‍🔧",
	  "👨🏿‍🔬",
	  "👨🏿‍🚀",
	  "👨🏿‍🚒",
	  "👨🏿‍⚕️",
	  "👨🏿‍⚖️",
	  "👨🏿‍✈️",
	  "👨🏿",
	  "👨‍🌾",
	  "👨‍🍳",
	  "👨‍🎓",
	  "👨‍🎤",
	  "👨‍🎨",
	  "👨‍🏫",
	  "👨‍🏭",
	  "👨‍👦‍👦",
	  "👨‍👦",
	  "👨‍👧‍👦",
	  "👨‍👧‍👧",
	  "👨‍👧",
	  "👨‍👨‍👦‍👦",
	  "👨‍👨‍👦",
	  "👨‍👨‍👧‍👦",
	  "👨‍👨‍👧‍👧",
	  "👨‍👨‍👧",
	  "👨‍👩‍👦‍👦",
	  "👨‍👩‍👦",
	  "👨‍👩‍👧‍👦",
	  "👨‍👩‍👧‍👧",
	  "👨‍👩‍👧",
	  "👨‍💻",
	  "👨‍💼",
	  "👨‍🔧",
	  "👨‍🔬",
	  "👨‍🚀",
	  "👨‍🚒",
	  "👨‍⚕️",
	  "👨‍⚖️",
	  "👨‍✈️",
	  "👨‍❤️‍👨",
	  "👨‍❤️‍💋‍👨",
	  "👨",
	  "👩🏻‍🌾",
	  "👩🏻‍🍳",
	  "👩🏻‍🎓",
	  "👩🏻‍🎤",
	  "👩🏻‍🎨",
	  "👩🏻‍🏫",
	  "👩🏻‍🏭",
	  "👩🏻‍💻",
	  "👩🏻‍💼",
	  "👩🏻‍🔧",
	  "👩🏻‍🔬",
	  "👩🏻‍🚀",
	  "👩🏻‍🚒",
	  "👩🏻‍⚕️",
	  "👩🏻‍⚖️",
	  "👩🏻‍✈️",
	  "👩🏻",
	  "👩🏼‍🌾",
	  "👩🏼‍🍳",
	  "👩🏼‍🎓",
	  "👩🏼‍🎤",
	  "👩🏼‍🎨",
	  "👩🏼‍🏫",
	  "👩🏼‍🏭",
	  "👩🏼‍💻",
	  "👩🏼‍💼",
	  "👩🏼‍🔧",
	  "👩🏼‍🔬",
	  "👩🏼‍🚀",
	  "👩🏼‍🚒",
	  "👩🏼‍⚕️",
	  "👩🏼‍⚖️",
	  "👩🏼‍✈️",
	  "👩🏼",
	  "👩🏽‍🌾",
	  "👩🏽‍🍳",
	  "👩🏽‍🎓",
	  "👩🏽‍🎤",
	  "👩🏽‍🎨",
	  "👩🏽‍🏫",
	  "👩🏽‍🏭",
	  "👩🏽‍💻",
	  "👩🏽‍💼",
	  "👩🏽‍🔧",
	  "👩🏽‍🔬",
	  "👩🏽‍🚀",
	  "👩🏽‍🚒",
	  "👩🏽‍⚕️",
	  "👩🏽‍⚖️",
	  "👩🏽‍✈️",
	  "👩🏽",
	  "👩🏾‍🌾",
	  "👩🏾‍🍳",
	  "👩🏾‍🎓",
	  "👩🏾‍🎤",
	  "👩🏾‍🎨",
	  "👩🏾‍🏫",
	  "👩🏾‍🏭",
	  "👩🏾‍💻",
	  "👩🏾‍💼",
	  "👩🏾‍🔧",
	  "👩🏾‍🔬",
	  "👩🏾‍🚀",
	  "👩🏾‍🚒",
	  "👩🏾‍⚕️",
	  "👩🏾‍⚖️",
	  "👩🏾‍✈️",
	  "👩🏾",
	  "👩🏿‍🌾",
	  "👩🏿‍🍳",
	  "👩🏿‍🎓",
	  "👩🏿‍🎤",
	  "👩🏿‍🎨",
	  "👩🏿‍🏫",
	  "👩🏿‍🏭",
	  "👩🏿‍💻",
	  "👩🏿‍💼",
	  "👩🏿‍🔧",
	  "👩🏿‍🔬",
	  "👩🏿‍🚀",
	  "👩🏿‍🚒",
	  "👩🏿‍⚕️",
	  "👩🏿‍⚖️",
	  "👩🏿‍✈️",
	  "👩🏿",
	  "👩‍🌾",
	  "👩‍🍳",
	  "👩‍🎓",
	  "👩‍🎤",
	  "👩‍🎨",
	  "👩‍🏫",
	  "👩‍🏭",
	  "👩‍👦‍👦",
	  "👩‍👦",
	  "👩‍👧‍👦",
	  "👩‍👧‍👧",
	  "👩‍👧",
	  "👩‍👩‍👦‍👦",
	  "👩‍👩‍👦",
	  "👩‍👩‍👧‍👦",
	  "👩‍👩‍👧‍👧",
	  "👩‍👩‍👧",
	  "👩‍💻",
	  "👩‍💼",
	  "👩‍🔧",
	  "👩‍🔬",
	  "👩‍🚀",
	  "👩‍🚒",
	  "👩‍⚕️",
	  "👩‍⚖️",
	  "👩‍✈️",
	  "👩‍❤️‍👨",
	  "👩‍❤️‍👩",
	  "👩‍❤️‍💋‍👨",
	  "👩‍❤️‍💋‍👩",
	  "👩",
	  "👪🏻",
	  "👪🏼",
	  "👪🏽",
	  "👪🏾",
	  "👪🏿",
	  "👪",
	  "👫🏻",
	  "👫🏼",
	  "👫🏽",
	  "👫🏾",
	  "👫🏿",
	  "👫",
	  "👬🏻",
	  "👬🏼",
	  "👬🏽",
	  "👬🏾",
	  "👬🏿",
	  "👬",
	  "👭🏻",
	  "👭🏼",
	  "👭🏽",
	  "👭🏾",
	  "👭🏿",
	  "👭",
	  "👮🏻‍♀️",
	  "👮🏻‍♂️",
	  "👮🏻",
	  "👮🏼‍♀️",
	  "👮🏼‍♂️",
	  "👮🏼",
	  "👮🏽‍♀️",
	  "👮🏽‍♂️",
	  "👮🏽",
	  "👮🏾‍♀️",
	  "👮🏾‍♂️",
	  "👮🏾",
	  "👮🏿‍♀️",
	  "👮🏿‍♂️",
	  "👮🏿",
	  "👮‍♀️",
	  "👮‍♂️",
	  "👮",
	  "👯🏻‍♀️",
	  "👯🏻‍♂️",
	  "👯🏻",
	  "👯🏼‍♀️",
	  "👯🏼‍♂️",
	  "👯🏼",
	  "👯🏽‍♀️",
	  "👯🏽‍♂️",
	  "👯🏽",
	  "👯🏾‍♀️",
	  "👯🏾‍♂️",
	  "👯🏾",
	  "👯🏿‍♀️",
	  "👯🏿‍♂️",
	  "👯🏿",
	  "👯‍♀️",
	  "👯‍♂️",
	  "👯",
	  "👰🏻",
	  "👰🏼",
	  "👰🏽",
	  "👰🏾",
	  "👰🏿",
	  "👰",
	  "👱🏻‍♀️",
	  "👱🏻‍♂️",
	  "👱🏻",
	  "👱🏼‍♀️",
	  "👱🏼‍♂️",
	  "👱🏼",
	  "👱🏽‍♀️",
	  "👱🏽‍♂️",
	  "👱🏽",
	  "👱🏾‍♀️",
	  "👱🏾‍♂️",
	  "👱🏾",
	  "👱🏿‍♀️",
	  "👱🏿‍♂️",
	  "👱🏿",
	  "👱‍♀️",
	  "👱‍♂️",
	  "👱",
	  "👲🏻",
	  "👲🏼",
	  "👲🏽",
	  "👲🏾",
	  "👲🏿",
	  "👲",
	  "👳🏻‍♀️",
	  "👳🏻‍♂️",
	  "👳🏻",
	  "👳🏼‍♀️",
	  "👳🏼‍♂️",
	  "👳🏼",
	  "👳🏽‍♀️",
	  "👳🏽‍♂️",
	  "👳🏽",
	  "👳🏾‍♀️",
	  "👳🏾‍♂️",
	  "👳🏾",
	  "👳🏿‍♀️",
	  "👳🏿‍♂️",
	  "👳🏿",
	  "👳‍♀️",
	  "👳‍♂️",
	  "👳",
	  "👴🏻",
	  "👴🏼",
	  "👴🏽",
	  "👴🏾",
	  "👴🏿",
	  "👴",
	  "👵🏻",
	  "👵🏼",
	  "👵🏽",
	  "👵🏾",
	  "👵🏿",
	  "👵",
	  "👶🏻",
	  "👶🏼",
	  "👶🏽",
	  "👶🏾",
	  "👶🏿",
	  "👶",
	  "👷🏻‍♀️",
	  "👷🏻‍♂️",
	  "👷🏻",
	  "👷🏼‍♀️",
	  "👷🏼‍♂️",
	  "👷🏼",
	  "👷🏽‍♀️",
	  "👷🏽‍♂️",
	  "👷🏽",
	  "👷🏾‍♀️",
	  "👷🏾‍♂️",
	  "👷🏾",
	  "👷🏿‍♀️",
	  "👷🏿‍♂️",
	  "👷🏿",
	  "👷‍♀️",
	  "👷‍♂️",
	  "👷",
	  "👸🏻",
	  "👸🏼",
	  "👸🏽",
	  "👸🏾",
	  "👸🏿",
	  "👸",
	  "👹",
	  "👺",
	  "👻",
	  "👼🏻",
	  "👼🏼",
	  "👼🏽",
	  "👼🏾",
	  "👼🏿",
	  "👼",
	  "👽",
	  "👾",
	  "👿",
	  "💀",
	  "💁🏻‍♀️",
	  "💁🏻‍♂️",
	  "💁🏻",
	  "💁🏼‍♀️",
	  "💁🏼‍♂️",
	  "💁🏼",
	  "💁🏽‍♀️",
	  "💁🏽‍♂️",
	  "💁🏽",
	  "💁🏾‍♀️",
	  "💁🏾‍♂️",
	  "💁🏾",
	  "💁🏿‍♀️",
	  "💁🏿‍♂️",
	  "💁🏿",
	  "💁‍♀️",
	  "💁‍♂️",
	  "💁",
	  "💂🏻‍♀️",
	  "💂🏻‍♂️",
	  "💂🏻",
	  "💂🏼‍♀️",
	  "💂🏼‍♂️",
	  "💂🏼",
	  "💂🏽‍♀️",
	  "💂🏽‍♂️",
	  "💂🏽",
	  "💂🏾‍♀️",
	  "💂🏾‍♂️",
	  "💂🏾",
	  "💂🏿‍♀️",
	  "💂🏿‍♂️",
	  "💂🏿",
	  "💂‍♀️",
	  "💂‍♂️",
	  "💂",
	  "💃🏻",
	  "💃🏼",
	  "💃🏽",
	  "💃🏾",
	  "💃🏿",
	  "💃",
	  "💄",
	  "💅🏻",
	  "💅🏼",
	  "💅🏽",
	  "💅🏾",
	  "💅🏿",
	  "💅",
	  "💆🏻‍♀️",
	  "💆🏻‍♂️",
	  "💆🏻",
	  "💆🏼‍♀️",
	  "💆🏼‍♂️",
	  "💆🏼",
	  "💆🏽‍♀️",
	  "💆🏽‍♂️",
	  "💆🏽",
	  "💆🏾‍♀️",
	  "💆🏾‍♂️",
	  "💆🏾",
	  "💆🏿‍♀️",
	  "💆🏿‍♂️",
	  "💆🏿",
	  "💆‍♀️",
	  "💆‍♂️",
	  "💆",
	  "💇🏻‍♀️",
	  "💇🏻‍♂️",
	  "💇🏻",
	  "💇🏼‍♀️",
	  "💇🏼‍♂️",
	  "💇🏼",
	  "💇🏽‍♀️",
	  "💇🏽‍♂️",
	  "💇🏽",
	  "💇🏾‍♀️",
	  "💇🏾‍♂️",
	  "💇🏾",
	  "💇🏿‍♀️",
	  "💇🏿‍♂️",
	  "💇🏿",
	  "💇‍♀️",
	  "💇‍♂️",
	  "💇",
	  "💈",
	  "💉",
	  "💊",
	  "💋",
	  "💌",
	  "💍",
	  "💎",
	  "💏",
	  "💐",
	  "💑",
	  "💒",
	  "💓",
	  "💔",
	  "💕",
	  "💖",
	  "💗",
	  "💘",
	  "💙",
	  "💚",
	  "💛",
	  "💜",
	  "💝",
	  "💞",
	  "💟",
	  "💠",
	  "💡",
	  "💢",
	  "💣",
	  "💤",
	  "💥",
	  "💦",
	  "💧",
	  "💨",
	  "💩",
	  "💪🏻",
	  "💪🏼",
	  "💪🏽",
	  "💪🏾",
	  "💪🏿",
	  "💪",
	  "💫",
	  "💬",
	  "💭",
	  "💮",
	  "💯",
	  "💰",
	  "💱",
	  "💲",
	  "💳",
	  "💴",
	  "💵",
	  "💶",
	  "💷",
	  "💸",
	  "💹",
	  "💺",
	  "💻",
	  "💼",
	  "💽",
	  "💾",
	  "💿",
	  "📀",
	  "📁",
	  "📂",
	  "📃",
	  "📄",
	  "📅",
	  "📆",
	  "📇",
	  "📈",
	  "📉",
	  "📊",
	  "📋",
	  "📌",
	  "📍",
	  "📎",
	  "📏",
	  "📐",
	  "📑",
	  "📒",
	  "📓",
	  "📔",
	  "📕",
	  "📖",
	  "📗",
	  "📘",
	  "📙",
	  "📚",
	  "📛",
	  "📜",
	  "📝",
	  "📞",
	  "📟",
	  "📠",
	  "📡",
	  "📢",
	  "📣",
	  "📤",
	  "📥",
	  "📦",
	  "📧",
	  "📨",
	  "📩",
	  "📪",
	  "📫",
	  "📬",
	  "📭",
	  "📮",
	  "📯",
	  "📰",
	  "📱",
	  "📲",
	  "📳",
	  "📴",
	  "📵",
	  "📶",
	  "📷",
	  "📸",
	  "📹",
	  "📺",
	  "📻",
	  "📼",
	  "📽",
	  "📿",
	  "🔀",
	  "🔁",
	  "🔂",
	  "🔃",
	  "🔄",
	  "🔅",
	  "🔆",
	  "🔇",
	  "🔈",
	  "🔉",
	  "🔊",
	  "🔋",
	  "🔌",
	  "🔍",
	  "🔎",
	  "🔏",
	  "🔐",
	  "🔑",
	  "🔒",
	  "🔓",
	  "🔔",
	  "🔕",
	  "🔖",
	  "🔗",
	  "🔘",
	  "🔙",
	  "🔚",
	  "🔛",
	  "🔜",
	  "🔝",
	  "🔞",
	  "🔟",
	  "🔠",
	  "🔡",
	  "🔢",
	  "🔣",
	  "🔤",
	  "🔥",
	  "🔦",
	  "🔧",
	  "🔨",
	  "🔩",
	  "🔪",
	  "🔫",
	  "🔬",
	  "🔭",
	  "🔮",
	  "🔯",
	  "🔰",
	  "🔱",
	  "🔲",
	  "🔳",
	  "🔴",
	  "🔵",
	  "🔶",
	  "🔷",
	  "🔸",
	  "🔹",
	  "🔺",
	  "🔻",
	  "🔼",
	  "🔽",
	  "🕉",
	  "🕊",
	  "🕋",
	  "🕌",
	  "🕍",
	  "🕎",
	  "🕐",
	  "🕑",
	  "🕒",
	  "🕓",
	  "🕔",
	  "🕕",
	  "🕖",
	  "🕗",
	  "🕘",
	  "🕙",
	  "🕚",
	  "🕛",
	  "🕜",
	  "🕝",
	  "🕞",
	  "🕟",
	  "🕠",
	  "🕡",
	  "🕢",
	  "🕣",
	  "🕤",
	  "🕥",
	  "🕦",
	  "🕧",
	  "🕯",
	  "🕰",
	  "🕳",
	  "🕴🏻",
	  "🕴🏼",
	  "🕴🏽",
	  "🕴🏾",
	  "🕴🏿",
	  "🕴",
	  "🕵🏻‍♀️",
	  "🕵🏻‍♂️",
	  "🕵🏻",
	  "🕵🏼‍♀️",
	  "🕵🏼‍♂️",
	  "🕵🏼",
	  "🕵🏽‍♀️",
	  "🕵🏽‍♂️",
	  "🕵🏽",
	  "🕵🏾‍♀️",
	  "🕵🏾‍♂️",
	  "🕵🏾",
	  "🕵🏿‍♀️",
	  "🕵🏿‍♂️",
	  "🕵🏿",
	  "🕵️‍♀️",
	  "🕵️‍♂️",
	  "🕵",
	  "🕶",
	  "🕷",
	  "🕸",
	  "🕹",
	  "🕺🏻",
	  "🕺🏼",
	  "🕺🏽",
	  "🕺🏾",
	  "🕺🏿",
	  "🕺",
	  "🖇",
	  "🖊",
	  "🖋",
	  "🖌",
	  "🖍",
	  "🖐🏻",
	  "🖐🏼",
	  "🖐🏽",
	  "🖐🏾",
	  "🖐🏿",
	  "🖐",
	  "🖕🏻",
	  "🖕🏼",
	  "🖕🏽",
	  "🖕🏾",
	  "🖕🏿",
	  "🖕",
	  "🖖🏻",
	  "🖖🏼",
	  "🖖🏽",
	  "🖖🏾",
	  "🖖🏿",
	  "🖖",
	  "🖤",
	  "🖥",
	  "🖨",
	  "🖱",
	  "🖲",
	  "🖼",
	  "🗂",
	  "🗃",
	  "🗄",
	  "🗑",
	  "🗒",
	  "🗓",
	  "🗜",
	  "🗝",
	  "🗞",
	  "🗡",
	  "🗣",
	  "🗨",
	  "🗯",
	  "🗳",
	  "🗺",
	  "🗻",
	  "🗼",
	  "🗽",
	  "🗾",
	  "🗿",
	  "😀",
	  "😁",
	  "😂",
	  "😃",
	  "😄",
	  "😅",
	  "😆",
	  "😇",
	  "😈",
	  "😉",
	  "😊",
	  "😋",
	  "😌",
	  "😍",
	  "😎",
	  "😏",
	  "😐",
	  "😑",
	  "😒",
	  "😓",
	  "😔",
	  "😕",
	  "😖",
	  "😗",
	  "😘",
	  "😙",
	  "😚",
	  "😛",
	  "😜",
	  "😝",
	  "😞",
	  "😟",
	  "😠",
	  "😡",
	  "😢",
	  "😣",
	  "😤",
	  "😥",
	  "😦",
	  "😧",
	  "😨",
	  "😩",
	  "😪",
	  "😫",
	  "😬",
	  "😭",
	  "😮",
	  "😯",
	  "😰",
	  "😱",
	  "😲",
	  "😳",
	  "😴",
	  "😵",
	  "😶",
	  "😷",
	  "😸",
	  "😹",
	  "😺",
	  "😻",
	  "😼",
	  "😽",
	  "😾",
	  "😿",
	  "🙀",
	  "🙁",
	  "🙂",
	  "🙃",
	  "🙄",
	  "🙅🏻‍♀️",
	  "🙅🏻‍♂️",
	  "🙅🏻",
	  "🙅🏼‍♀️",
	  "🙅🏼‍♂️",
	  "🙅🏼",
	  "🙅🏽‍♀️",
	  "🙅🏽‍♂️",
	  "🙅🏽",
	  "🙅🏾‍♀️",
	  "🙅🏾‍♂️",
	  "🙅🏾",
	  "🙅🏿‍♀️",
	  "🙅🏿‍♂️",
	  "🙅🏿",
	  "🙅‍♀️",
	  "🙅‍♂️",
	  "🙅",
	  "🙆🏻‍♀️",
	  "🙆🏻‍♂️",
	  "🙆🏻",
	  "🙆🏼‍♀️",
	  "🙆🏼‍♂️",
	  "🙆🏼",
	  "🙆🏽‍♀️",
	  "🙆🏽‍♂️",
	  "🙆🏽",
	  "🙆🏾‍♀️",
	  "🙆🏾‍♂️",
	  "🙆🏾",
	  "🙆🏿‍♀️",
	  "🙆🏿‍♂️",
	  "🙆🏿",
	  "🙆‍♀️",
	  "🙆‍♂️",
	  "🙆",
	  "🙇🏻‍♀️",
	  "🙇🏻‍♂️",
	  "🙇🏻",
	  "🙇🏼‍♀️",
	  "🙇🏼‍♂️",
	  "🙇🏼",
	  "🙇🏽‍♀️",
	  "🙇🏽‍♂️",
	  "🙇🏽",
	  "🙇🏾‍♀️",
	  "🙇🏾‍♂️",
	  "🙇🏾",
	  "🙇🏿‍♀️",
	  "🙇🏿‍♂️",
	  "🙇🏿",
	  "🙇‍♀️",
	  "🙇‍♂️",
	  "🙇",
	  "🙈",
	  "🙉",
	  "🙊",
	  "🙋🏻‍♀️",
	  "🙋🏻‍♂️",
	  "🙋🏻",
	  "🙋🏼‍♀️",
	  "🙋🏼‍♂️",
	  "🙋🏼",
	  "🙋🏽‍♀️",
	  "🙋🏽‍♂️",
	  "🙋🏽",
	  "🙋🏾‍♀️",
	  "🙋🏾‍♂️",
	  "🙋🏾",
	  "🙋🏿‍♀️",
	  "🙋🏿‍♂️",
	  "🙋🏿",
	  "🙋‍♀️",
	  "🙋‍♂️",
	  "🙋",
	  "🙌🏻",
	  "🙌🏼",
	  "🙌🏽",
	  "🙌🏾",
	  "🙌🏿",
	  "🙌",
	  "🙍🏻‍♀️",
	  "🙍🏻‍♂️",
	  "🙍🏻",
	  "🙍🏼‍♀️",
	  "🙍🏼‍♂️",
	  "🙍🏼",
	  "🙍🏽‍♀️",
	  "🙍🏽‍♂️",
	  "🙍🏽",
	  "🙍🏾‍♀️",
	  "🙍🏾‍♂️",
	  "🙍🏾",
	  "🙍🏿‍♀️",
	  "🙍🏿‍♂️",
	  "🙍🏿",
	  "🙍‍♀️",
	  "🙍‍♂️",
	  "🙍",
	  "🙎🏻‍♀️",
	  "🙎🏻‍♂️",
	  "🙎🏻",
	  "🙎🏼‍♀️",
	  "🙎🏼‍♂️",
	  "🙎🏼",
	  "🙎🏽‍♀️",
	  "🙎🏽‍♂️",
	  "🙎🏽",
	  "🙎🏾‍♀️",
	  "🙎🏾‍♂️",
	  "🙎🏾",
	  "🙎🏿‍♀️",
	  "🙎🏿‍♂️",
	  "🙎🏿",
	  "🙎‍♀️",
	  "🙎‍♂️",
	  "🙎",
	  "🙏🏻",
	  "🙏🏼",
	  "🙏🏽",
	  "🙏🏾",
	  "🙏🏿",
	  "🙏",
	  "🚀",
	  "🚁",
	  "🚂",
	  "🚃",
	  "🚄",
	  "🚅",
	  "🚆",
	  "🚇",
	  "🚈",
	  "🚉",
	  "🚊",
	  "🚋",
	  "🚌",
	  "🚍",
	  "🚎",
	  "🚏",
	  "🚐",
	  "🚑",
	  "🚒",
	  "🚓",
	  "🚔",
	  "🚕",
	  "🚖",
	  "🚗",
	  "🚘",
	  "🚙",
	  "🚚",
	  "🚛",
	  "🚜",
	  "🚝",
	  "🚞",
	  "🚟",
	  "🚠",
	  "🚡",
	  "🚢",
	  "🚣🏻‍♀️",
	  "🚣🏻‍♂️",
	  "🚣🏻",
	  "🚣🏼‍♀️",
	  "🚣🏼‍♂️",
	  "🚣🏼",
	  "🚣🏽‍♀️",
	  "🚣🏽‍♂️",
	  "🚣🏽",
	  "🚣🏾‍♀️",
	  "🚣🏾‍♂️",
	  "🚣🏾",
	  "🚣🏿‍♀️",
	  "🚣🏿‍♂️",
	  "🚣🏿",
	  "🚣‍♀️",
	  "🚣‍♂️",
	  "🚣",
	  "🚤",
	  "🚥",
	  "🚦",
	  "🚧",
	  "🚨",
	  "🚩",
	  "🚪",
	  "🚫",
	  "🚬",
	  "🚭",
	  "🚮",
	  "🚯",
	  "🚰",
	  "🚱",
	  "🚲",
	  "🚳",
	  "🚴🏻‍♀️",
	  "🚴🏻‍♂️",
	  "🚴🏻",
	  "🚴🏼‍♀️",
	  "🚴🏼‍♂️",
	  "🚴🏼",
	  "🚴🏽‍♀️",
	  "🚴🏽‍♂️",
	  "🚴🏽",
	  "🚴🏾‍♀️",
	  "🚴🏾‍♂️",
	  "🚴🏾",
	  "🚴🏿‍♀️",
	  "🚴🏿‍♂️",
	  "🚴🏿",
	  "🚴‍♀️",
	  "🚴‍♂️",
	  "🚴",
	  "🚵🏻‍♀️",
	  "🚵🏻‍♂️",
	  "🚵🏻",
	  "🚵🏼‍♀️",
	  "🚵🏼‍♂️",
	  "🚵🏼",
	  "🚵🏽‍♀️",
	  "🚵🏽‍♂️",
	  "🚵🏽",
	  "🚵🏾‍♀️",
	  "🚵🏾‍♂️",
	  "🚵🏾",
	  "🚵🏿‍♀️",
	  "🚵🏿‍♂️",
	  "🚵🏿",
	  "🚵‍♀️",
	  "🚵‍♂️",
	  "🚵",
	  "🚶🏻‍♀️",
	  "🚶🏻‍♂️",
	  "🚶🏻",
	  "🚶🏼‍♀️",
	  "🚶🏼‍♂️",
	  "🚶🏼",
	  "🚶🏽‍♀️",
	  "🚶🏽‍♂️",
	  "🚶🏽",
	  "🚶🏾‍♀️",
	  "🚶🏾‍♂️",
	  "🚶🏾",
	  "🚶🏿‍♀️",
	  "🚶🏿‍♂️",
	  "🚶🏿",
	  "🚶‍♀️",
	  "🚶‍♂️",
	  "🚶",
	  "🚷",
	  "🚸",
	  "🚹",
	  "🚺",
	  "🚻",
	  "🚼",
	  "🚽",
	  "🚾",
	  "🚿",
	  "🛀🏻",
	  "🛀🏼",
	  "🛀🏽",
	  "🛀🏾",
	  "🛀🏿",
	  "🛀",
	  "🛁",
	  "🛂",
	  "🛃",
	  "🛄",
	  "🛅",
	  "🛋",
	  "🛌🏻",
	  "🛌🏼",
	  "🛌🏽",
	  "🛌🏾",
	  "🛌🏿",
	  "🛌",
	  "🛍",
	  "🛎",
	  "🛏",
	  "🛐",
	  "🛑",
	  "🛒",
	  "🛠",
	  "🛡",
	  "🛢",
	  "🛣",
	  "🛤",
	  "🛥",
	  "🛩",
	  "🛫",
	  "🛬",
	  "🛰",
	  "🛳",
	  "🛴",
	  "🛵",
	  "🛶",
	  "🤐",
	  "🤑",
	  "🤒",
	  "🤓",
	  "🤔",
	  "🤕",
	  "🤖",
	  "🤗",
	  "🤘🏻",
	  "🤘🏼",
	  "🤘🏽",
	  "🤘🏾",
	  "🤘🏿",
	  "🤘",
	  "🤙🏻",
	  "🤙🏼",
	  "🤙🏽",
	  "🤙🏾",
	  "🤙🏿",
	  "🤙",
	  "🤚🏻",
	  "🤚🏼",
	  "🤚🏽",
	  "🤚🏾",
	  "🤚🏿",
	  "🤚",
	  "🤛🏻",
	  "🤛🏼",
	  "🤛🏽",
	  "🤛🏾",
	  "🤛🏿",
	  "🤛",
	  "🤜🏻",
	  "🤜🏼",
	  "🤜🏽",
	  "🤜🏾",
	  "🤜🏿",
	  "🤜",
	  "🤝🏻",
	  "🤝🏼",
	  "🤝🏽",
	  "🤝🏾",
	  "🤝🏿",
	  "🤝",
	  "🤞🏻",
	  "🤞🏼",
	  "🤞🏽",
	  "🤞🏾",
	  "🤞🏿",
	  "🤞",
	  "🤠",
	  "🤡",
	  "🤢",
	  "🤣",
	  "🤤",
	  "🤥",
	  "🤦🏻‍♀️",
	  "🤦🏻‍♂️",
	  "🤦🏻",
	  "🤦🏼‍♀️",
	  "🤦🏼‍♂️",
	  "🤦🏼",
	  "🤦🏽‍♀️",
	  "🤦🏽‍♂️",
	  "🤦🏽",
	  "🤦🏾‍♀️",
	  "🤦🏾‍♂️",
	  "🤦🏾",
	  "🤦🏿‍♀️",
	  "🤦🏿‍♂️",
	  "🤦🏿",
	  "🤦‍♀️",
	  "🤦‍♂️",
	  "🤦",
	  "🤧",
	  "🤰🏻",
	  "🤰🏼",
	  "🤰🏽",
	  "🤰🏾",
	  "🤰🏿",
	  "🤰",
	  "🤳🏻",
	  "🤳🏼",
	  "🤳🏽",
	  "🤳🏾",
	  "🤳🏿",
	  "🤳",
	  "🤴🏻",
	  "🤴🏼",
	  "🤴🏽",
	  "🤴🏾",
	  "🤴🏿",
	  "🤴",
	  "🤵🏻",
	  "🤵🏼",
	  "🤵🏽",
	  "🤵🏾",
	  "🤵🏿",
	  "🤵",
	  "🤶🏻",
	  "🤶🏼",
	  "🤶🏽",
	  "🤶🏾",
	  "🤶🏿",
	  "🤶",
	  "🤷🏻‍♀️",
	  "🤷🏻‍♂️",
	  "🤷🏻",
	  "🤷🏼‍♀️",
	  "🤷🏼‍♂️",
	  "🤷🏼",
	  "🤷🏽‍♀️",
	  "🤷🏽‍♂️",
	  "🤷🏽",
	  "🤷🏾‍♀️",
	  "🤷🏾‍♂️",
	  "🤷🏾",
	  "🤷🏿‍♀️",
	  "🤷🏿‍♂️",
	  "🤷🏿",
	  "🤷‍♀️",
	  "🤷‍♂️",
	  "🤷",
	  "🤸🏻‍♀️",
	  "🤸🏻‍♂️",
	  "🤸🏻",
	  "🤸🏼‍♀️",
	  "🤸🏼‍♂️",
	  "🤸🏼",
	  "🤸🏽‍♀️",
	  "🤸🏽‍♂️",
	  "🤸🏽",
	  "🤸🏾‍♀️",
	  "🤸🏾‍♂️",
	  "🤸🏾",
	  "🤸🏿‍♀️",
	  "🤸🏿‍♂️",
	  "🤸🏿",
	  "🤸‍♀️",
	  "🤸‍♂️",
	  "🤸",
	  "🤹🏻‍♀️",
	  "🤹🏻‍♂️",
	  "🤹🏻",
	  "🤹🏼‍♀️",
	  "🤹🏼‍♂️",
	  "🤹🏼",
	  "🤹🏽‍♀️",
	  "🤹🏽‍♂️",
	  "🤹🏽",
	  "🤹🏾‍♀️",
	  "🤹🏾‍♂️",
	  "🤹🏾",
	  "🤹🏿‍♀️",
	  "🤹🏿‍♂️",
	  "🤹🏿",
	  "🤹‍♀️",
	  "🤹‍♂️",
	  "🤹",
	  "🤺",
	  "🤼🏻‍♀️",
	  "🤼🏻‍♂️",
	  "🤼🏻",
	  "🤼🏼‍♀️",
	  "🤼🏼‍♂️",
	  "🤼🏼",
	  "🤼🏽‍♀️",
	  "🤼🏽‍♂️",
	  "🤼🏽",
	  "🤼🏾‍♀️",
	  "🤼🏾‍♂️",
	  "🤼🏾",
	  "🤼🏿‍♀️",
	  "🤼🏿‍♂️",
	  "🤼🏿",
	  "🤼‍♀️",
	  "🤼‍♂️",
	  "🤼",
	  "🤽🏻‍♀️",
	  "🤽🏻‍♂️",
	  "🤽🏻",
	  "🤽🏼‍♀️",
	  "🤽🏼‍♂️",
	  "🤽🏼",
	  "🤽🏽‍♀️",
	  "🤽🏽‍♂️",
	  "🤽🏽",
	  "🤽🏾‍♀️",
	  "🤽🏾‍♂️",
	  "🤽🏾",
	  "🤽🏿‍♀️",
	  "🤽🏿‍♂️",
	  "🤽🏿",
	  "🤽‍♀️",
	  "🤽‍♂️",
	  "🤽",
	  "🤾🏻‍♀️",
	  "🤾🏻‍♂️",
	  "🤾🏻",
	  "🤾🏼‍♀️",
	  "🤾🏼‍♂️",
	  "🤾🏼",
	  "🤾🏽‍♀️",
	  "🤾🏽‍♂️",
	  "🤾🏽",
	  "🤾🏾‍♀️",
	  "🤾🏾‍♂️",
	  "🤾🏾",
	  "🤾🏿‍♀️",
	  "🤾🏿‍♂️",
	  "🤾🏿",
	  "🤾‍♀️",
	  "🤾‍♂️",
	  "🤾",
	  "🥀",
	  "🥁",
	  "🥂",
	  "🥃",
	  "🥄",
	  "🥅",
	  "🥇",
	  "🥈",
	  "🥉",
	  "🥊",
	  "🥋",
	  "🥐",
	  "🥑",
	  "🥒",
	  "🥓",
	  "🥔",
	  "🥕",
	  "🥖",
	  "🥗",
	  "🥘",
	  "🥙",
	  "🥚",
	  "🥛",
	  "🥜",
	  "🥝",
	  "🥞",
	  "🦀",
	  "🦁",
	  "🦂",
	  "🦃",
	  "🦄",
	  "🦅",
	  "🦆",
	  "🦇",
	  "🦈",
	  "🦉",
	  "🦊",
	  "🦋",
	  "🦌",
	  "🦍",
	  "🦎",
	  "🦏",
	  "🦐",
	  "🦑",
	  "🧀",
	  "‼",
	  "⁉",
	  "™",
	  "ℹ",
	  "↔",
	  "↕",
	  "↖",
	  "↗",
	  "↘",
	  "↙",
	  "↩",
	  "↪",
	  "#⃣",
	  "⌚",
	  "⌛",
	  "⌨",
	  "⏏",
	  "⏩",
	  "⏪",
	  "⏫",
	  "⏬",
	  "⏭",
	  "⏮",
	  "⏯",
	  "⏰",
	  "⏱",
	  "⏲",
	  "⏳",
	  "⏸",
	  "⏹",
	  "⏺",
	  "Ⓜ",
	  "▪",
	  "▫",
	  "▶",
	  "◀",
	  "◻",
	  "◼",
	  "◽",
	  "◾",
	  "☀",
	  "☁",
	  "☂",
	  "☃",
	  "☄",
	  "☎",
	  "☑",
	  "☔",
	  "☕",
	  "☘",
	  "☝🏻",
	  "☝🏼",
	  "☝🏽",
	  "☝🏾",
	  "☝🏿",
	  "☝",
	  "☠",
	  "☢",
	  "☣",
	  "☦",
	  "☪",
	  "☮",
	  "☯",
	  "☸",
	  "☹",
	  "☺",
	  "♀",
	  "♂",
	  "♈",
	  "♉",
	  "♊",
	  "♋",
	  "♌",
	  "♍",
	  "♎",
	  "♏",
	  "♐",
	  "♑",
	  "♒",
	  "♓",
	  "♠",
	  "♣",
	  "♥",
	  "♦",
	  "♨",
	  "♻",
	  "♿",
	  "⚒",
	  "⚓",
	  "⚔",
	  "⚕",
	  "⚖",
	  "⚗",
	  "⚙",
	  "⚛",
	  "⚜",
	  "⚠",
	  "⚡",
	  "⚪",
	  "⚫",
	  "⚰",
	  "⚱",
	  "⚽",
	  "⚾",
	  "⛄",
	  "⛅",
	  "⛈",
	  "⛎",
	  "⛏",
	  "⛑",
	  "⛓",
	  "⛔",
	  "⛩",
	  "⛪",
	  "⛰",
	  "⛱",
	  "⛲",
	  "⛳",
	  "⛴",
	  "⛵",
	  "⛷🏻",
	  "⛷🏼",
	  "⛷🏽",
	  "⛷🏾",
	  "⛷🏿",
	  "⛷",
	  "⛸",
	  "⛹🏻‍♀️",
	  "⛹🏻‍♂️",
	  "⛹🏻",
	  "⛹🏼‍♀️",
	  "⛹🏼‍♂️",
	  "⛹🏼",
	  "⛹🏽‍♀️",
	  "⛹🏽‍♂️",
	  "⛹🏽",
	  "⛹🏾‍♀️",
	  "⛹🏾‍♂️",
	  "⛹🏾",
	  "⛹🏿‍♀️",
	  "⛹🏿‍♂️",
	  "⛹🏿",
	  "⛹️‍♀️",
	  "⛹️‍♂️",
	  "⛹",
	  "⛺",
	  "⛽",
	  "✂",
	  "✅",
	  "✈",
	  "✉",
	  "✊🏻",
	  "✊🏼",
	  "✊🏽",
	  "✊🏾",
	  "✊🏿",
	  "✊",
	  "✋🏻",
	  "✋🏼",
	  "✋🏽",
	  "✋🏾",
	  "✋🏿",
	  "✋",
	  "✌🏻",
	  "✌🏼",
	  "✌🏽",
	  "✌🏾",
	  "✌🏿",
	  "✌",
	  "✍🏻",
	  "✍🏼",
	  "✍🏽",
	  "✍🏾",
	  "✍🏿",
	  "✍",
	  "✏",
	  "✒",
	  "✔",
	  "✖",
	  "✝",
	  "✡",
	  "✨",
	  "✳",
	  "✴",
	  "❄",
	  "❇",
	  "❌",
	  "❎",
	  "❓",
	  "❔",
	  "❕",
	  "❗",
	  "❣",
	  "❤",
	  "➕",
	  "➖",
	  "➗",
	  "➡",
	  "➰",
	  "➿",
	  "⤴",
	  "⤵",
	  "*⃣",
	  "⬅",
	  "⬆",
	  "⬇",
	  "⬛",
	  "⬜",
	  "⭐",
	  "⭕",
	  "0⃣",
	  "〰",
	  "〽",
	  "1⃣",
	  "2⃣",
	  "㊗",
	  "㊙",
	  "3⃣",
	  "4⃣",
	  "5⃣",
	  "6⃣",
	  "7⃣",
	  "8⃣",
	  "9⃣",
	  "©",
	  "®",
	  ""
	]

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('matrix-header', '<h1>Matrix on Redux</h1> <label for="fontSize">FontSize</label> <select id="fontSize" onchange="{opts.on_font_change}"> <option each="{i in fontSizes}" value="{i}">{i}</option> </select> <lable for="pushtext-input">Push text</lable><input id="pushtext-input" type="text" maxlength="2" value=""> <button onclick="{opts.on_click_push_text}">push</button>', '', '', function (opts) {
	        this.fontSizes = [1, 2, 3, 5, 10, 16, 20, 24, 36];

	        this.on('mount', function () {
	                document.getElementById('fontSize').value = opts.default_font_size;
	        });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
/******/ ]);