/*!
 * css-vars-ponyfill
 * v2.3.2
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2020 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
function t(){return(t=Object.assign||function(A){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(A[t]=o[t])}return A}).apply(this,arguments)}function n(A){return function(A){if(Array.isArray(A))return r(A)}(A)||function(A){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(A))return Array.from(A)}(A)||function(A,e){if(!A)return;if("string"==typeof A)return r(A,e);var o=Object.prototype.toString.call(A).slice(8,-1);"Object"===o&&A.constructor&&(o=A.constructor.name);if("Map"===o||"Set"===o)return Array.from(A);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return r(A,e)}(A)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}
/*!
 * get-css-data
 * v1.8.0
 * https://github.com/jhildenbiddle/get-css-data
 * (c) 2018-2020 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */()}function r(A,e){(null==e||e>A.length)&&(e=A.length);for(var o=0,t=new Array(e);o<e;o++)t[o]=A[o];return t}function a(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={mimeType:e.mimeType||null,onBeforeSend:e.onBeforeSend||Function.prototype,onSuccess:e.onSuccess||Function.prototype,onError:e.onError||Function.prototype,onComplete:e.onComplete||Function.prototype},t=Array.isArray(A)?A:[A],n=Array.apply(null,Array(t.length)).map((function(A){return null}));function r(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e="<"===A.trim().charAt(0);return!e}function a(A,e){o.onError(A,t[e],e)}function i(A,e){var r=o.onSuccess(A,t[e],e);A=!1===r?"":r||A,n[e]=A,-1===n.indexOf(null)&&o.onComplete(n)}var c=document.createElement("a");t.forEach((function(A,e){if(c.setAttribute("href",A),c.href=String(c.href),Boolean(document.all&&!window.atob)&&c.host.split(":")[0]!==location.host.split(":")[0]){if(c.protocol===location.protocol){var t=new XDomainRequest;t.open("GET",A),t.timeout=0,t.onprogress=Function.prototype,t.ontimeout=Function.prototype,t.onload=function(){r(t.responseText)?i(t.responseText,e):a(t,e)},t.onerror=function(A){a(t,e)},setTimeout((function(){t.send()}),0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(A,")")),a(null,e)}else{var n=new XMLHttpRequest;n.open("GET",A),o.mimeType&&n.overrideMimeType&&n.overrideMimeType(o.mimeType),o.onBeforeSend(n,A,e),n.onreadystatechange=function(){4===n.readyState&&(200===n.status&&r(n.responseText)?i(n.responseText,e):a(n,e))},n.send()}}))}
/**
 * Gets CSS data from <style> and <link> nodes (including @imports), then
 * returns data in order processed by DOM. Allows specifying nodes to
 * include/exclude and filtering CSS data using RegEx.
 *
 * @preserve
 * @param {object}   [options] The options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes.
 * @param {string}   [options.include] CSS selector matching <link> and <style>
 *                   nodes to include
 * @param {string}   [options.exclude] CSS selector matching <link> and <style>
 *                   nodes to exclude
 * @param {object}   [options.filter] Regular expression used to filter node CSS
 *                   data. Each block of CSS data is tested against the filter,
 *                   and only matching data is included.
 * @param {boolean}  [options.skipDisabled=true] Determines if disabled
 *                   stylesheets will be skipped while collecting CSS data.
 * @param {boolean}  [options.useCSSOM=false] Determines if CSS data will be
 *                   collected from a stylesheet's runtime values instead of its
 *                   text content. This is required to get accurate CSS data
 *                   when a stylesheet has been modified using the deleteRule()
 *                   or insertRule() methods because these modifications will
 *                   not be reflected in the stylesheet's text content.
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments.
 * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
 *                   1) CSS text, 2) source node reference, and 3) the source
 *                   URL as arguments.
 * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
 *                   object for inspection, 2) soure node reference, and 3) the
 *                   source URL that failed (either a <link> href or an @import)
 *                   as arguments
 * @param {function} [options.onComplete] Callback after all nodes have been
 *                   processed. Passes 1) concatenated CSS text, 2) an array of
 *                   CSS text in DOM order, and 3) an array of nodes in DOM
 *                   order as arguments.
 *
 * @example
 *
 *   getCssData({
 *     rootElement : document,
 *     include     : 'style,link[rel="stylesheet"]',
 *     exclude     : '[href="skip.css"]',
 *     filter      : /red/,
 *     skipDisabled: true,
 *     useCSSOM    : false,
 *     onBeforeSend(xhr, node, url) {
 *       // ...
 *     }
 *     onSuccess(cssText, node, url) {
 *       // ...
 *     }
 *     onError(xhr, node, url) {
 *       // ...
 *     },
 *     onComplete(cssText, cssArray, nodeArray) {
 *       // ...
 *     }
 *   });
 */function i(A){var e=/\/\*[\s\S]+?\*\//g,o=/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g,t={rootElement:A.rootElement||document,include:A.include||'style,link[rel="stylesheet"]',exclude:A.exclude||null,filter:A.filter||null,skipDisabled:!1!==A.skipDisabled,useCSSOM:A.useCSSOM||!1,onBeforeSend:A.onBeforeSend||Function.prototype,onSuccess:A.onSuccess||Function.prototype,onError:A.onError||Function.prototype,onComplete:A.onComplete||Function.prototype},n=Array.apply(null,t.rootElement.querySelectorAll(t.include)).filter((function(A){return e=A,o=t.exclude,!(e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector).call(e,o);var e,o})),r=Array.apply(null,Array(n.length)).map((function(A){return null}));function i(){if(-1===r.indexOf(null)){var A=r.join("");t.onComplete(A,r,n)}}function l(A,e,o,n){var c=t.onSuccess(A,o,n);(function A(e,o,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[],l=g(e,n,c);l.rules.length?a(l.absoluteUrls,{onBeforeSend:function(A,e,n){t.onBeforeSend(A,o,e)},onSuccess:function(A,e,n){var r=t.onSuccess(A,o,e),a=g(A=!1===r?"":r||A,e,c);return a.rules.forEach((function(e,o){A=A.replace(e,a.absoluteRules[o])})),A},onError:function(t,a,g){i.push({xhr:t,url:a}),c.push(l.rules[g]),A(e,o,n,r,i,c)},onComplete:function(t){t.forEach((function(A,o){e=e.replace(l.rules[o],A)})),A(e,o,n,r,i,c)}}):r(e,i)})(A=void 0!==c&&!1===Boolean(c)?"":c||A,o,n,(function(A,n){null===r[e]&&(n.forEach((function(A){return t.onError(A.xhr,o,A.url)})),!t.filter||t.filter.test(A)?r[e]=A:r[e]="",i())}))}function g(A,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r={};return r.rules=(A.replace(e,"").match(o)||[]).filter((function(A){return-1===n.indexOf(A)})),r.urls=r.rules.map((function(A){return A.replace(o,"$1")})),r.absoluteUrls=r.urls.map((function(A){return c(A,t)})),r.absoluteRules=r.rules.map((function(A,e){var o=r.urls[e],n=c(r.absoluteUrls[e],t);return A.replace(o,n)})),r}n.length?n.forEach((function(A,e){var o=A.getAttribute("href"),n=A.getAttribute("rel"),g="LINK"===A.nodeName&&o&&n&&-1!==n.toLowerCase().indexOf("stylesheet"),f=!1!==t.skipDisabled&&A.disabled,s="STYLE"===A.nodeName;if(g&&!f)a(o,{mimeType:"text/css",onBeforeSend:function(e,o,n){t.onBeforeSend(e,A,o)},onSuccess:function(t,n,r){var a=c(o);l(t,e,A,a)},onError:function(o,n,a){r[e]="",t.onError(o,A,n),i()}});else if(s&&!f){var d=A.textContent;t.useCSSOM&&(d=Array.apply(null,A.sheet.cssRules).map((function(A){return A.cssText})).join("")),l(d,e,A,location.href)}else r[e]="",i()})):t.onComplete("",[])}function c(A,e){var o=document.implementation.createHTMLDocument(""),t=o.createElement("base"),n=o.createElement("a");return o.head.appendChild(t),o.body.appendChild(n),t.href=e||document.baseURI||(document.querySelector("base")||{}).href||location.href,n.href=A,n.href}var l=g;function g(A,e,o){A instanceof RegExp&&(A=f(A,o)),e instanceof RegExp&&(e=f(e,o));var t=s(A,e,o);return t&&{start:t[0],end:t[1],pre:o.slice(0,t[0]),body:o.slice(t[0]+A.length,t[1]),post:o.slice(t[1]+e.length)}}function f(A,e){var o=e.match(A);return o?o[0]:null}function s(A,e,o){var t,n,r,a,i,c=o.indexOf(A),l=o.indexOf(e,c+1),g=c;if(c>=0&&l>0){for(t=[],r=o.length;g>=0&&!i;)g==c?(t.push(g),c=o.indexOf(A,g+1)):1==t.length?i=[t.pop(),l]:((n=t.pop())<r&&(r=n,a=l),l=o.indexOf(e,g+1)),g=c<l&&c>=0?c:l;t.length&&(i=[r,a])}return i}function d(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={preserveStatic:!0,removeComments:!1},n=t({},o,e),r=[];function a(A){throw new Error("CSS parse error: ".concat(A))}function i(e){var o=e.exec(A);if(o)return A=A.slice(o[0].length),o}function c(){return i(/^{\s*/)}function g(){return i(/^}/)}function f(){i(/^\s*/)}function s(){if(f(),"/"===A[0]&&"*"===A[1]){for(var e=2;A[e]&&("*"!==A[e]||"/"!==A[e+1]);)e++;if(!A[e])return a("end of comment is missing");var o=A.slice(2,e);return A=A.slice(e+2),{type:"comment",comment:o}}}function d(){for(var A,e=[];A=s();)e.push(A);return n.removeComments?[]:e}function B(){for(f();"}"===A[0];)a("extra closing bracket");var e=i(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(e)return e[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(function(A){return A.replace(/,/g,"‌")})).split(/\s*(?![^(]*\)),\s*/).map((function(A){return A.replace(/\u200C/g,",")}))}function b(){if("@"===A[0])return U();i(/^([;\s]*)+/);var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,o=i(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(o){if(o=o[0].trim(),!i(/^:\s*/))return a("property missing ':'");var t=i(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),n={type:"declaration",property:o.replace(e,""),value:t?t[0].replace(e,"").trim():""};return i(/^[;\s]*/),n}}function p(){if(!c())return a("missing '{'");for(var A,e=d();A=b();)e.push(A),e=e.concat(d());return g()?e:a("missing '}'")}function w(){f();for(var A,e=[];A=i(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)e.push(A[1]),i(/^,\s*/);if(e.length)return{type:"keyframe",values:e,declarations:p()}}function h(){var A=i(/^@([-\w]+)?keyframes\s*/);if(A){var e=A[1];if(!(A=i(/^([-\w]+)\s*/)))return a("@keyframes missing name");var o,t=A[1];if(!c())return a("@keyframes missing '{'");for(var n=d();o=w();)n.push(o),n=n.concat(d());return g()?{type:"keyframes",name:t,vendor:e,keyframes:n}:a("@keyframes missing '}'")}}function F(){if(i(/^@page */))return{type:"page",selectors:B()||[],declarations:p()}}function E(){var A=i(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(A)return{type:"page-margin-box",name:"".concat(A[1],"-").concat(A[2])+(A[3]?"-".concat(A[3]):""),declarations:p()}}function Q(){if(i(/^@font-face\s*/))return{type:"font-face",declarations:p()}}function m(){var A=i(/^@supports *([^{]+)/);if(A)return{type:"supports",supports:A[1].trim(),rules:y()}}function I(){if(i(/^@host\s*/))return{type:"host",rules:y()}}function u(){var A=i(/^@media([^{]+)*/);if(A)return{type:"media",media:(A[1]||"").trim(),rules:y()}}function M(){var A=i(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(A)return{type:"custom-media",name:A[1].trim(),media:A[2].trim()}}function Y(){var A=i(/^@([-\w]+)?document *([^{]+)/);if(A)return{type:"document",document:A[2].trim(),vendor:A[1]?A[1].trim():null,rules:y()}}function D(){var A=i(/^@(import|charset|namespace)\s*([^;]+);/);if(A)return{type:A[1],name:A[2].trim()}}function U(){if(f(),"@"===A[0]){var e=D()||Q()||u()||h()||m()||Y()||M()||I()||F()||E();if(e&&!n.preserveStatic){var o=!1;if(e.declarations)o=e.declarations.some((function(A){return/var\(/.test(A.value)}));else o=(e.keyframes||e.rules||[]).some((function(A){return(A.declarations||[]).some((function(A){return/var\(/.test(A.value)}))}));return o?e:{}}return e}}function C(){if(!n.preserveStatic){var e=l("{","}",A);if(e){var o=/:(?:root|host)(?![.:#(])/.test(e.pre)&&/--\S*\s*:/.test(e.body),t=/var\(/.test(e.body);if(!o&&!t)return A=A.slice(e.end+1),{}}}var r=B()||[],i=n.preserveStatic?p():p().filter((function(A){var e=r.some((function(A){return/:(?:root|host)(?![.:#(])/.test(A)}))&&/^--\S/.test(A.property),o=/var\(/.test(A.value);return e||o}));return r.length||a("selector missing"),{type:"rule",selectors:r,declarations:i}}function y(e){if(!e&&!c())return a("missing '{'");for(var o,t=d();A.length&&(e||"}"!==A[0])&&(o=U()||C());)o.type&&t.push(o),t=t.concat(d());return e||g()?t:a("missing '}'")}return{type:"stylesheet",stylesheet:{rules:y(!0),errors:r}}}function B(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={parseHost:!1,store:{},onWarning:function(){}},n=t({},o,e),r=new RegExp(":".concat(n.parseHost?"host":"root","$"));return"string"==typeof A&&(A=d(A,n)),A.stylesheet.rules.forEach((function(A){"rule"===A.type&&A.selectors.some((function(A){return r.test(A)}))&&A.declarations.forEach((function(A,e){var o=A.property,t=A.value;o&&0===o.indexOf("--")&&(n.store[o]=t)}))})),n.store}function b(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2?arguments[2]:void 0,t={charset:function(A){return"@charset "+A.name+";"},comment:function(A){return 0===A.comment.indexOf("__CSSVARSPONYFILL")?"/*"+A.comment+"*/":""},"custom-media":function(A){return"@custom-media "+A.name+" "+A.media+";"},declaration:function(A){return A.property+":"+A.value+";"},document:function(A){return"@"+(A.vendor||"")+"document "+A.document+"{"+n(A.rules)+"}"},"font-face":function(A){return"@font-face{"+n(A.declarations)+"}"},host:function(A){return"@host{"+n(A.rules)+"}"},import:function(A){return"@import "+A.name+";"},keyframe:function(A){return A.values.join(",")+"{"+n(A.declarations)+"}"},keyframes:function(A){return"@"+(A.vendor||"")+"keyframes "+A.name+"{"+n(A.keyframes)+"}"},media:function(A){return"@media "+A.media+"{"+n(A.rules)+"}"},namespace:function(A){return"@namespace "+A.name+";"},page:function(A){return"@page "+(A.selectors.length?A.selectors.join(", "):"")+"{"+n(A.declarations)+"}"},"page-margin-box":function(A){return"@"+A.name+"{"+n(A.declarations)+"}"},rule:function(A){var e=A.declarations;if(e.length)return A.selectors.join(",")+"{"+n(e)+"}"},supports:function(A){return"@supports "+A.supports+"{"+n(A.rules)+"}"}};function n(A){for(var n="",r=0;r<A.length;r++){var a=A[r];o&&o(a);var i=t[a.type](a);i&&(n+=i,i.length&&a.selectors&&(n+=e))}return n}return n(A.stylesheet.rules)}function p(A,e){A.rules.forEach((function(o){o.rules?p(o,e):o.keyframes?o.keyframes.forEach((function(A){"keyframe"===A.type&&e(A.declarations,o)})):o.declarations&&e(o.declarations,A)}))}g.range=s;function w(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},n=t({},o,e);return"string"==typeof A&&(A=d(A,n)),p(A.stylesheet,(function(A,e){for(var o=0;o<A.length;o++){var t=A[o],r=t.type,a=t.property,i=t.value;if("declaration"===r)if(n.preserveVars||!a||0!==a.indexOf("--")){if(-1!==i.indexOf("var(")){var c=F(i,n);c!==t.value&&(c=h(c),n.preserveVars?(A.splice(o,0,{type:r,property:a,value:c}),o++):t.value=c)}}else A.splice(o,1),o--}})),b(A)}function h(A){return(A.match(/calc\(([^)]+)\)/g)||[]).forEach((function(e){var o="calc".concat(e.split("calc").join(""));A=A.replace(e,o)})),A}function F(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2?arguments[2]:void 0;if(-1===A.indexOf("var("))return A;var t=l("(",")",A);function n(A){var t=A.split(",")[0].replace(/[\s\n\t]/g,""),n=(A.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],r=Object.prototype.hasOwnProperty.call(e.variables,t)?String(e.variables[t]):void 0,a=r||(n?String(n):void 0),i=o||A;return r||e.onWarning('variable "'.concat(t,'" is undefined')),a&&"undefined"!==a&&a.length>0?F(a,e,i):"var(".concat(i,")")}if(t){if("var"===t.pre.slice(-3)){var r=0===t.body.trim().length;return r?(e.onWarning("var() must contain a non-whitespace string"),A):t.pre.slice(0,-3)+n(t.body)+F(t.post,e)}return t.pre+"(".concat(F(t.body,e),")")+F(t.post,e)}return-1!==A.indexOf("var(")&&e.onWarning('missing closing ")" in the value "'.concat(A,'"')),A}var E="undefined"!=typeof window,Q=E&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),m={group:0,job:0},I={rootElement:E?document:null,shadowDOM:!1,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onError:function(){},onWarning:function(){},onSuccess:function(){},onComplete:function(){},onFinally:function(){}},u={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},M={dom:{},job:{},user:{}},Y=!1,D=null,U=0,C=null,y=!1;
/**
 * Fetches, parses, and transforms CSS custom properties from specified
 * <style> and <link> elements into static values, then appends a new <style>
 * element with static values to the DOM to provide CSS custom property
 * compatibility for legacy browsers. Also provides a single interface for
 * live updates of runtime values in both modern and legacy browsers.
 *
 * @preserve
 * @param {object}   [options] Options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes
 * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
 *                   and <style> nodes will be processed.
 * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
 *                   matching <link re="stylesheet"> and <style> nodes to
 *                   process
 * @param {string}   [options.exclude] CSS selector matching <link
 *                   rel="stylehseet"> and <style> nodes to exclude from those
 *                   matches by options.include
 * @param {object}   [options.variables] A map of custom property name/value
 *                   pairs. Property names can omit or include the leading
 *                   double-hyphen (—), and values specified will override
 *                   previous values
 * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
 *                   only generate legacy-compatible CSS in browsers that lack
 *                   native support (i.e., legacy browsers)
 * @param {boolean}  [options.preserveStatic=true] Determines if CSS
 *                   declarations that do not reference a custom property will
 *                   be preserved in the transformed CSS
 * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
 *                   property declarations will be preserved in the transformed
 *                   CSS
 * @param {boolean}  [options.silent=false] Determines if warning and error
 *                   messages will be displayed on the console
 * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
 *                   update the DOM after processing CSS custom properties
 * @param {boolean}  [options.updateURLs=true] Determines if relative url()
 *                   paths will be converted to absolute urls in external CSS
 * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
 *                   be created that will execute the ponyfill when a <link> or
 *                   <style> DOM mutation is observed
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments
 * @param {function} [options.onError] Callback after a CSS parsing error has
 *                   occurred or an XHR request has failed. Passes 1) an error
 *                   message, and 2) source node reference, 3) xhr, and 4 url as
 *                   arguments.
 * @param {function} [options.onWarning] Callback after each CSS parsing warning
 *                   has occurred. Passes 1) a warning message as an argument.
 * @param {function} [options.onSuccess] Callback after CSS data has been
 *                   collected from each node and before CSS custom properties
 *                   have been transformed. Allows modifying the CSS data before
 *                   it is transformed by returning any string value (or false
 *                   to skip). Passes 1) CSS text, 2) source node reference, and
 *                   3) the source URL as arguments.
 * @param {function} [options.onComplete] Callback after all CSS has been
 *                   processed, legacy-compatible CSS has been generated, and
 *                   (optionally) the DOM has been updated. Passes 1) a CSS
 *                   string with CSS variable values resolved, 2) an array of
 *                   output <style> node references that have been appended to
 *                   the DOM, 3) an object containing all custom properies names
 *                   and values, and 4) the ponyfill execution time in
 *                   milliseconds.
 * @param {function} [options.onFinally] Callback in modern and legacy browsers
 *                   after the ponyfill has finished all tasks. Passes 1) a
 *                   boolean indicating if the last ponyfill call resulted in a
 *                   style change, 2) a boolean indicating if the current
 *                   browser provides native support for CSS custom properties,
 *                   and 3) the ponyfill execution time in milliseconds.
 * @example
 *
 *   cssVars({
 *     rootElement   : document,
 *     shadowDOM     : false,
 *     include       : 'style,link[rel="stylesheet"]',
 *     exclude       : '',
 *     variables     : {},
 *     onlyLegacy    : true,
 *     preserveStatic: true,
 *     preserveVars  : false,
 *     silent        : false,
 *     updateDOM     : true,
 *     updateURLs    : true,
 *     watch         : false,
 *     onBeforeSend(xhr, node, url) {},
 *     onError(message, node, xhr, url) {},
 *     onWarning(message) {},
 *     onSuccess(cssText, node, url) {},
 *     onComplete(cssText, styleNode, cssVariables, benchmark) {},
 *     onFinally(hasChanged, hasNativeSupport, benchmark)
 *   });
 */
function x(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="cssVars(): ",o=t({},I,A);function r(A,t,n,r){!o.silent&&window.console&&console.error("".concat(e).concat(A,"\n"),t),o.onError(A,t,n,r)}function a(A){!o.silent&&window.console&&console.warn("".concat(e).concat(A)),o.onWarning(A)}function c(A){o.onFinally(Boolean(A),Q,T()-o.__benchmark)}if(E){if(o.watch)return o.watch=I.watch,k(o),void x(o);if(!1===o.watch&&D&&(D.disconnect(),D=null),!o.__benchmark){if(Y===o.rootElement)return void R(A);if(o.__benchmark=T(),o.exclude=[D?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',o.exclude].filter((function(A){return A})).join(","),o.variables=H(o.variables),!D){var l=Array.apply(null,o.rootElement.querySelectorAll('[data-cssvars="out"]'));if(l.forEach((function(A){var e=A.getAttribute("data-cssvars-group");(e?o.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(e,'"]')):null)||A.parentNode.removeChild(A)})),U){var g=o.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');g.length<U&&(U=g.length,M.dom={})}}}if("loading"!==document.readyState)if(Q&&o.onlyLegacy){var f=!1;if(o.updateDOM){var s=o.rootElement.host||(o.rootElement===document?document.documentElement:o.rootElement);Object.keys(o.variables).forEach((function(A){var e=o.variables[A];f=f||e!==getComputedStyle(s).getPropertyValue(A),s.style.setProperty(A,e)}))}c(f)}else!y&&(o.shadowDOM||o.rootElement.shadowRoot||o.rootElement.host)?i({rootElement:I.rootElement,include:I.include,exclude:o.exclude,skipDisabled:!1,onSuccess:function(A,e,o){return(A=((A=A.replace(u.cssComments,"").replace(u.cssMediaQueries,"")).match(u.cssVarDeclRules)||[]).join(""))||!1},onComplete:function(A,e,t){B(A,{store:M.dom,onWarning:a}),y=!0,x(o)}}):(Y=o.rootElement,i({rootElement:o.rootElement,include:o.include,exclude:o.exclude,skipDisabled:!1,onBeforeSend:o.onBeforeSend,onError:function(A,e,o){var t=A.responseURL||N(o,location.href),n=A.statusText?"(".concat(A.statusText,")"):"Unspecified Error"+(0===A.status?" (possibly CORS related)":"");r("CSS XHR Error: ".concat(t," ").concat(A.status," ").concat(n),e,A,t)},onSuccess:function(A,e,t){var n="LINK"===e.tagName,r="STYLE"===e.tagName&&A!==e.textContent,a=o.onSuccess(A,e,t);return A=void 0!==a&&!1===Boolean(a)?"":a||A,o.updateURLs&&(n||r)&&(A=G(A,t)),A},onComplete:function(A,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],l=t({},M.dom,M.user);if(M.job={},i.forEach((function(A,t){var n=e[t];if(u.cssVars.test(n))try{var i=d(n,{preserveStatic:o.preserveStatic,removeComments:!0});B(i,{parseHost:Boolean(o.rootElement.host),store:M.dom,onWarning:a}),A.__cssVars={tree:i}}catch(e){r(e.message,A)}})),t(M.job,M.dom),o.updateDOM?(t(M.user,o.variables),t(M.job,M.user)):(t(M.job,M.user,o.variables),t(l,o.variables)),m.job>0&&Boolean(Object.keys(M.job).length>Object.keys(l).length||Boolean(Object.keys(l).length&&Object.keys(M.job).some((function(A){return M.job[A]!==l[A]})))))V(o.rootElement),x(o);else{var g=[],f=[],s=!1;if(o.updateDOM&&m.job++,i.forEach((function(A,n){var i=!A.__cssVars;if(A.__cssVars)try{w(A.__cssVars.tree,t({},o,{variables:M.job,onWarning:a}));var c=b(A.__cssVars.tree);if(o.updateDOM){var l=e[n],d=u.cssVarFunc.test(l);if(A.getAttribute("data-cssvars")||A.setAttribute("data-cssvars","src"),c.length&&d){var B=A.getAttribute("data-cssvars-group")||++m.group,p=c.replace(/\s/g,""),h=o.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(B,'"]'))||document.createElement("style");s=s||u.cssKeyframes.test(c),o.preserveStatic&&(A.sheet.disabled=!0),h.hasAttribute("data-cssvars")||h.setAttribute("data-cssvars","out"),p===A.textContent.replace(/\s/g,"")?(i=!0,h&&h.parentNode&&(A.removeAttribute("data-cssvars-group"),h.parentNode.removeChild(h))):p!==h.textContent.replace(/\s/g,"")&&([A,h].forEach((function(A){A.setAttribute("data-cssvars-job",m.job),A.setAttribute("data-cssvars-group",B)})),h.textContent=c,g.push(c),f.push(h),h.parentNode||A.parentNode.insertBefore(h,A.nextSibling))}}else A.textContent.replace(/\s/g,"")!==c&&g.push(c)}catch(e){r(e.message,A)}i&&A.setAttribute("data-cssvars","skip"),A.hasAttribute("data-cssvars-job")||A.setAttribute("data-cssvars-job",m.job)})),U=o.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length,o.shadowDOM)for(var p,h=[o.rootElement].concat(n(o.rootElement.querySelectorAll("*"))),F=0;p=h[F];++F)if(p.shadowRoot&&p.shadowRoot.querySelector("style")){var E=t({},o,{rootElement:p.shadowRoot});x(E)}o.updateDOM&&s&&v(o.rootElement),Y=!1,o.onComplete(g.join(""),f,JSON.parse(JSON.stringify(M.job)),T()-o.__benchmark),c(f.length)}}}));else document.addEventListener("DOMContentLoaded",(function e(o){x(A),document.removeEventListener("DOMContentLoaded",e)}))}}function k(A){function e(A){var e=A.hasAttribute("disabled"),o=(A.sheet||{}).disabled;return e||o}function o(A){return"LINK"===A.tagName&&-1!==(A.getAttribute("rel")||"").indexOf("stylesheet")&&!e(A)}function t(A){return Array.apply(null,A).some((function(A){var t=1===A.nodeType&&A.hasAttribute("data-cssvars"),n=function(A){return"STYLE"===A.tagName&&!e(A)}(A)&&u.cssVars.test(A.textContent);return!t&&(o(A)||n)}))}window.MutationObserver&&(D&&(D.disconnect(),D=null),(D=new MutationObserver((function(e){e.some((function(e){var n,r=!1;return"attributes"===e.type?r=o(e.target):"childList"===e.type&&(r=t(e.addedNodes)||(n=e.removedNodes,Array.apply(null,n).some((function(e){var o=1===e.nodeType,t=o&&"out"===e.getAttribute("data-cssvars"),n=o&&"src"===e.getAttribute("data-cssvars"),r=n;if(n||t){var a=e.getAttribute("data-cssvars-group"),i=A.rootElement.querySelector('[data-cssvars-group="'.concat(a,'"]'));n&&(V(A.rootElement),M.dom={}),i&&i.parentNode.removeChild(i)}return r})))),r}))&&x(A)}))).observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0}))}function R(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;clearTimeout(C),C=setTimeout((function(){A.__benchmark=null,x(A)}),e)}function v(A){var e=["animation-name","-moz-animation-name","-webkit-animation-name"].filter((function(A){return getComputedStyle(document.body)[A]}))[0];if(e){for(var o=A.getElementsByTagName("*"),t=[],n=0,r=o.length;n<r;n++){var a=o[n];"none"!==getComputedStyle(a)[e]&&(a.style[e]+="__CSSVARSPONYFILL-KEYFRAMES__",t.push(a))}document.body.offsetHeight;for(var i=0,c=t.length;i<c;i++){var l=t[i].style;l[e]=l[e].replace("__CSSVARSPONYFILL-KEYFRAMES__","")}}}function G(A,e){return(A.replace(u.cssComments,"").match(u.cssUrls)||[]).forEach((function(o){var t=o.replace(u.cssUrls,"$1"),n=N(t,e);A=A.replace(o,o.replace(t,n))})),A}function H(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=/^-{2}/;return Object.keys(A).reduce((function(o,t){return o[e.test(t)?t:"--".concat(t.replace(/^-+/,""))]=A[t],o}),{})}function N(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,o=document.implementation.createHTMLDocument(""),t=o.createElement("base"),n=o.createElement("a");return o.head.appendChild(t),o.body.appendChild(n),t.href=e,n.href=A,n.href}function T(){return E&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function V(A){Array.apply(null,A.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]')).forEach((function(A){return A.setAttribute("data-cssvars","")}))}x.reset=function(){for(var A in m.job=0,m.group=0,Y=!1,D&&(D.disconnect(),D=null),U=0,C=null,y=!1,M)M[A]={}};var J=x;o(556),J({onlyLegacy:!1})},81:function(A,e){A.exports=function(A){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!A||"string"!=typeof A)return A;var o=e.protocol+"//"+e.host,t=o+e.pathname.replace(/\/[^\/]*$/,"/");return A.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(A,e){var n,r=e.trim().replace(/^"(.*)"$/,(function(A,e){return e})).replace(/^'(.*)'$/,(function(A,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?A:(n=0===r.indexOf("//")?r:0===r.indexOf("/")?o+r:t+r.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")}))}},83:function(A,e){A.exports=function(A){return"string"!=typeof A?A:(/^['"].*['"]$/.test(A)&&(A=A.slice(1,-1)),/["'() \t\n]/.test(A)?'"'+A.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':A)}}});
//# sourceMappingURL=styles_head.14429bfeb95d879953c3.js.map