(function () {
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["blog-blog-module"], {
    /***/
    "2et7":
    /*!*********************************************************!*\
      !*** ./node_modules/prismjs/components/prism-docker.js ***!
      \*********************************************************/

    /*! no static exports found */

    /***/
    function et7(module, exports) {
      Prism.languages.docker = {
        'keyword': {
          pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/mi,
          lookbehind: true
        },
        'string': /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
        'comment': {
          pattern: /#.*/,
          greedy: true
        },
        'punctuation': /---|\.\.\.|[:[\]{}\-,|>?]/
      };
      Prism.languages.dockerfile = Prism.languages.docker;
      /***/
    },

    /***/
    "45FF":
    /*!***************************************************************!*\
      !*** ./node_modules/prismjs/plugins/toolbar/prism-toolbar.js ***!
      \***************************************************************/

    /*! no static exports found */

    /***/
    function FF(module, exports) {
      (function () {
        if (typeof self === 'undefined' || !self.Prism || !self.document) {
          return;
        }

        var callbacks = [];
        var map = {};

        var noop = function noop() {};

        Prism.plugins.toolbar = {};
        /**
         * @typedef ButtonOptions
         * @property {string} text The text displayed.
         * @property {string} [url] The URL of the link which will be created.
         * @property {Function} [onClick] The event listener for the `click` event of the created button.
         * @property {string} [className] The class attribute to include with element.
         */

        /**
         * Register a button callback with the toolbar.
         *
         * @param {string} key
         * @param {ButtonOptions|Function} opts
         */

        var registerButton = Prism.plugins.toolbar.registerButton = function (key, opts) {
          var callback;

          if (typeof opts === 'function') {
            callback = opts;
          } else {
            callback = function callback(env) {
              var element;

              if (typeof opts.onClick === 'function') {
                element = document.createElement('button');
                element.type = 'button';
                element.addEventListener('click', function () {
                  opts.onClick.call(this, env);
                });
              } else if (typeof opts.url === 'string') {
                element = document.createElement('a');
                element.href = opts.url;
              } else {
                element = document.createElement('span');
              }

              if (opts.className) {
                element.classList.add(opts.className);
              }

              element.textContent = opts.text;
              return element;
            };
          }

          if (key in map) {
            console.warn('There is a button with the key "' + key + '" registered already.');
            return;
          }

          callbacks.push(map[key] = callback);
        };
        /**
         * Returns the callback order of the given element.
         *
         * @param {HTMLElement} element
         * @returns {string[] | undefined}
         */


        function getOrder(element) {
          while (element) {
            var order = element.getAttribute('data-toolbar-order');

            if (order != null) {
              order = order.trim();

              if (order.length) {
                return order.split(/\s*,\s*/g);
              } else {
                return [];
              }
            }

            element = element.parentElement;
          }
        }
        /**
         * Post-highlight Prism hook callback.
         *
         * @param env
         */


        var hook = Prism.plugins.toolbar.hook = function (env) {
          // Check if inline or actual code block (credit to line-numbers plugin)
          var pre = env.element.parentNode;

          if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
          } // Autoloader rehighlights, so only do this once.


          if (pre.parentNode.classList.contains('code-toolbar')) {
            return;
          } // Create wrapper for <pre> to prevent scrolling toolbar with content


          var wrapper = document.createElement('div');
          wrapper.classList.add('code-toolbar');
          pre.parentNode.insertBefore(wrapper, pre);
          wrapper.appendChild(pre); // Setup the toolbar

          var toolbar = document.createElement('div');
          toolbar.classList.add('toolbar'); // order callbacks

          var elementCallbacks = callbacks;
          var order = getOrder(env.element);

          if (order) {
            elementCallbacks = order.map(function (key) {
              return map[key] || noop;
            });
          }

          elementCallbacks.forEach(function (callback) {
            var element = callback(env);

            if (!element) {
              return;
            }

            var item = document.createElement('div');
            item.classList.add('toolbar-item');
            item.appendChild(element);
            toolbar.appendChild(item);
          }); // Add our toolbar to the currently created wrapper of <pre> tag

          wrapper.appendChild(toolbar);
        };

        registerButton('label', function (env) {
          var pre = env.element.parentNode;

          if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
          }

          if (!pre.hasAttribute('data-label')) {
            return;
          }

          var element, template;
          var text = pre.getAttribute('data-label');

          try {
            // Any normal text will blow up this selector.
            template = document.querySelector('template#' + text);
          } catch (e) {}

          if (template) {
            element = template.content;
          } else {
            if (pre.hasAttribute('data-url')) {
              element = document.createElement('a');
              element.href = pre.getAttribute('data-url');
            } else {
              element = document.createElement('span');
            }

            element.textContent = text;
          }

          return element;
        });
        /**
         * Register the toolbar with Prism.
         */

        Prism.hooks.add('complete', hook);
      })();
      /***/

    },

    /***/
    "7aS5":
    /*!******************************************************!*\
      !*** ./src/app/shared/services/highlight.service.ts ***!
      \******************************************************/

    /*! exports provided: HighlightService */

    /***/
    function aS5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HighlightService", function () {
        return HighlightService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! clipboard */
      "sxGJ");
      /* harmony import */


      var clipboard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var prismjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! prismjs */
      "wZee");
      /* harmony import */


      var prismjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! prismjs/plugins/toolbar/prism-toolbar */
      "45FF");
      /* harmony import */


      var prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_4__);
      /* harmony import */


      var prismjs_plugins_diff_highlight_prism_diff_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! prismjs/plugins/diff-highlight/prism-diff-highlight */
      "ipBb");
      /* harmony import */


      var prismjs_plugins_diff_highlight_prism_diff_highlight__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_diff_highlight_prism_diff_highlight__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var prismjs_plugins_copy_to_clipboard_prism_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard */
      "c2Kr");
      /* harmony import */


      var prismjs_plugins_copy_to_clipboard_prism_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_copy_to_clipboard_prism_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_6__);
      /* harmony import */


      var prismjs_components_prism_bash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! prismjs/components/prism-bash */
      "gAkk");
      /* harmony import */


      var prismjs_components_prism_bash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_bash__WEBPACK_IMPORTED_MODULE_7__);
      /* harmony import */


      var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! prismjs/components/prism-css */
      "ZgVT");
      /* harmony import */


      var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_8__);
      /* harmony import */


      var prismjs_components_prism_sass__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! prismjs/components/prism-sass */
      "eWXi");
      /* harmony import */


      var prismjs_components_prism_sass__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_sass__WEBPACK_IMPORTED_MODULE_9__);
      /* harmony import */


      var prismjs_components_prism_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! prismjs/components/prism-scss */
      "hnpa");
      /* harmony import */


      var prismjs_components_prism_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_scss__WEBPACK_IMPORTED_MODULE_10__);
      /* harmony import */


      var prismjs_components_prism_diff__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! prismjs/components/prism-diff */
      "GD/k");
      /* harmony import */


      var prismjs_components_prism_diff__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_diff__WEBPACK_IMPORTED_MODULE_11__);
      /* harmony import */


      var prismjs_components_prism_docker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! prismjs/components/prism-docker */
      "2et7");
      /* harmony import */


      var prismjs_components_prism_docker__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_docker__WEBPACK_IMPORTED_MODULE_12__);
      /* harmony import */


      var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! prismjs/components/prism-javascript */
      "QWvX");
      /* harmony import */


      var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_13__);
      /* harmony import */


      var prismjs_components_prism_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! prismjs/components/prism-json */
      "85O/");
      /* harmony import */


      var prismjs_components_prism_json__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_json__WEBPACK_IMPORTED_MODULE_14__);
      /* harmony import */


      var prismjs_components_prism_markdown__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! prismjs/components/prism-markdown */
      "gmzG");
      /* harmony import */


      var prismjs_components_prism_markdown__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_markdown__WEBPACK_IMPORTED_MODULE_15__);
      /* harmony import */


      var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! prismjs/components/prism-markup */
      "bPOv");
      /* harmony import */


      var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_16__);
      /* harmony import */


      var prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! prismjs/components/prism-typescript */
      "XIHC");
      /* harmony import */


      var prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_17__);
      /* harmony import */


      var prismjs_components_prism_yaml__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! prismjs/components/prism-yaml */
      "RX2a");
      /* harmony import */


      var prismjs_components_prism_yaml__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_yaml__WEBPACK_IMPORTED_MODULE_18__);
      /* harmony import */


      var _prism_prisma__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! ./prism-prisma */
      "IvXX");
      /* harmony import */


      var _prism_prisma__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_prism_prisma__WEBPACK_IMPORTED_MODULE_19__);

      var HighlightService = /*#__PURE__*/function () {
        function HighlightService(platformId) {
          _classCallCheck2(this, HighlightService);

          this.platformId = platformId;
        }

        _createClass2(HighlightService, [{
          key: "highlightAll",
          value: function highlightAll() {
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this.platformId)) {
              Prism.highlightAll();
            }
          }
        }]);

        return HighlightService;
      }();

      HighlightService.ɵfac = function HighlightService_Factory(t) {
        return new (t || HighlightService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]));
      };

      HighlightService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: HighlightService,
        factory: HighlightService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "85O/":
    /*!*******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-json.js ***!
      \*******************************************************/

    /*! no static exports found */

    /***/
    function O(module, exports) {
      // https://www.json.org/json-en.html
      Prism.languages.json = {
        'property': {
          pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
          greedy: true
        },
        'string': {
          pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
          greedy: true
        },
        'comment': {
          pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
          greedy: true
        },
        'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        'punctuation': /[{}[\],]/,
        'operator': /:/,
        'boolean': /\b(?:true|false)\b/,
        'null': {
          pattern: /\bnull\b/,
          alias: 'keyword'
        }
      };
      Prism.languages.webmanifest = Prism.languages.json;
      /***/
    },

    /***/
    "9ilz":
    /*!*********************************************!*\
      !*** ./src/app/blog/blog-routing.module.ts ***!
      \*********************************************/

    /*! exports provided: BlogRoutingModule */

    /***/
    function ilz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogRoutingModule", function () {
        return BlogRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _blog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./blog.component */
      "LgBW");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [{
        path: '',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | home-home-module */
          "home-home-module").then(__webpack_require__.bind(null,
          /*! ./../home/home.module */
          "ct+p")).then(function (m) {
            return m.HomeModule;
          });
        }
      }, {
        path: ':slug',
        component: _blog_component__WEBPACK_IMPORTED_MODULE_1__["BlogComponent"]
      }, {
        path: '**',
        component: _blog_component__WEBPACK_IMPORTED_MODULE_1__["BlogComponent"]
      }];

      var BlogRoutingModule = function BlogRoutingModule() {
        _classCallCheck2(this, BlogRoutingModule);
      };

      BlogRoutingModule.ɵfac = function BlogRoutingModule_Factory(t) {
        return new (t || BlogRoutingModule)();
      };

      BlogRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: BlogRoutingModule
      });
      BlogRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](BlogRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    },

    /***/
    "GD/k":
    /*!*******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-diff.js ***!
      \*******************************************************/

    /*! no static exports found */

    /***/
    function GDK(module, exports) {
      (function (Prism) {
        Prism.languages.diff = {
          'coord': [// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
          /^(?:\*{3}|-{3}|\+{3}).*$/m, // Match "@@ ... @@" coord lines in unified diff.
          /^@@.*@@$/m, // Match coord lines in normal diff (starts with a number).
          /^\d.*$/m] // deleted, inserted, unchanged, diff

        };
        /**
         * A map from the name of a block to its line prefix.
         *
         * @type {Object<string, string>}
         */

        var PREFIXES = {
          'deleted-sign': '-',
          'deleted-arrow': '<',
          'inserted-sign': '+',
          'inserted-arrow': '>',
          'unchanged': ' ',
          'diff': '!'
        }; // add a token for each prefix

        Object.keys(PREFIXES).forEach(function (name) {
          var prefix = PREFIXES[name];
          var alias = [];

          if (!/^\w+$/.test(name)) {
            // "deleted-sign" -> "deleted"
            alias.push(/\w+/.exec(name)[0]);
          }

          if (name === "diff") {
            alias.push("bold");
          }

          Prism.languages.diff[name] = {
            pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
            alias: alias,
            inside: {
              'line': {
                pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
                lookbehind: true
              },
              'prefix': {
                pattern: /[\s\S]/,
                alias: /\w+/.exec(name)[0]
              }
            }
          };
        }); // make prefixes available to Diff plugin

        Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
          value: PREFIXES
        });
      })(Prism);
      /***/

    },

    /***/
    "IvXX":
    /*!*************************************************!*\
      !*** ./src/app/shared/services/prism-prisma.js ***!
      \*************************************************/

    /*! no static exports found */

    /***/
    function IvXX(module, exports) {
      (function (Prism) {
        Prism.languages.prisma = {
          keyword: /\b(?:datasource|generator|model|enum)\b/,
          builtin: /\b(?:String|Int|Boolean|DateTime)\b/
        };
      })(Prism);
      /***/

    },

    /***/
    "LgBW":
    /*!****************************************!*\
      !*** ./src/app/blog/blog.component.ts ***!
      \****************************************/

    /*! exports provided: BlogComponent */

    /***/
    function LgBW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogComponent", function () {
        return BlogComponent;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _shared_services_highlight_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../shared/services/highlight.service */
      "7aS5");
      /* harmony import */


      var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @scullyio/ng-lib */
      "sbAP");
      /* harmony import */


      var _blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../blog-list/blog-list.service */
      "9eaD");
      /* harmony import */


      var _shared_components_meta_meta_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../shared/components/meta/meta.component */
      "CPxR");
      /* harmony import */


      var _blog_nav_blog_nav_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./blog-nav/blog-nav.component */
      "v7c+");

      var _c0 = ["scully"];

      function BlogComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\n  ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-meta", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\n  ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "article", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\n    ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "\n      ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "time", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](15, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "h1", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "\n      ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "\n      ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](27, "scully-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "\n            ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](35, "app-blog-nav");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "\n        ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "\n      ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, "\n    ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "\n  ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "\n");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var route_r2 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", route_r2.title)("route", route_r2.route)("tags", route_r2.tags)("keywords", route_r2.keywords)("twitterImage", route_r2.route)("ogImage", route_r2.route)("articlePublishedAt", route_r2.date)("articleUpdatedAt", route_r2.date);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dateTime", route_r2.date);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\n            ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](15, 11, route_r2.date, "dd MMMM yyyy"), "\n          ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\n            ", route_r2.title, "\n          ");
        }
      }

      var _c1 = function _c1(a0) {
        return {
          opacity: a0
        };
      };

      function BlogComponent_a_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BlogComponent_a_5_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);

            var route_r3 = ctx.ngIf;

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r4.scrollToTop(route_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\n  ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\n");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](1, _c1, ctx_r1.st >= ctx_r1.hh ? 1 : 0));
        }
      }

      var BlogComponent = /*#__PURE__*/function () {
        function BlogComponent(document, location, highlightService, scullyRoutesService, blogListService) {
          _classCallCheck2(this, BlogComponent);

          this.document = document;
          this.location = location;
          this.highlightService = highlightService;
          this.scullyRoutesService = scullyRoutesService;
          this.blogListService = blogListService;
          this.blog$ = this.scullyRoutesService.getCurrent().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (page) {
            gtag('event', 'page_view', {
              page_title: page.title,
              page_path: page.route
            });
          }));
          this.allowHighlight = true;
          this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        }

        _createClass2(BlogComponent, [{
          key: "onScroll",
          value: function onScroll(e) {
            this.st = this.document.documentElement.scrollTop;
            this.hh = this.document.documentElement.querySelector('header').offsetHeight;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this3 = this;

            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(window, 'AngularReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function () {
              return _this3.allowHighlight = false;
            })).subscribe(function (res) {});
          }
        }, {
          key: "ngAfterViewChecked",
          value: function ngAfterViewChecked() {
            if (this.allowHighlight) {
              this.highlightService.highlightAll();
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.destroy$.next();
            this.destroy$.complete();
          }
        }, {
          key: "scrollTo",
          value: function scrollTo(url, id) {
            var elementTop = this.document.getElementById(id).offsetTop - 110;
            this.location.replaceState("".concat(url, "#").concat(id)); // this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

            window.scroll({
              top: elementTop,
              behavior: 'smooth'
            });
          }
        }, {
          key: "scrollToTop",
          value: function scrollToTop(url) {
            this.location.replaceState("".concat(url));
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }]);

        return BlogComponent;
      }();

      BlogComponent.ɵfac = function BlogComponent_Factory(t) {
        return new (t || BlogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["Location"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_shared_services_highlight_service__WEBPACK_IMPORTED_MODULE_4__["HighlightService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyRoutesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_6__["BlogListService"]));
      };

      BlogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: BlogComponent,
        selectors: [["app-blog"]],
        viewQuery: function BlogComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 1);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.scullyElement = _t.first);
          }
        },
        hostBindings: function BlogComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("scroll", function BlogComponent_scroll_HostBindingHandler($event) {
              return ctx.onScroll($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresolveWindow"]);
          }
        },
        decls: 8,
        vars: 6,
        consts: [[4, "ngIf"], ["class", "gotop", 3, "ngStyle", "click", 4, "ngIf"], [3, "title", "route", "tags", "keywords", "twitterImage", "ogImage", "articlePublishedAt", "articleUpdatedAt"], [1, "relative", "py-4", "max-w-screen-xl", "mx-auto"], [1, "max-w-container", "space-y-4"], [1, "space-y-4"], [1, "prose", "max-w-none", "md:prose-lgspace-y-1"], [3, "dateTime"], [1, "font-bold", "text-3xl", "leading-relaxed"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "md:gap-x-4", "lg:grid-cols-4", "lg:gap-x-6"], [1, "prose", "prose-toc", "max-w-none", "md:prose-lg", "md:col-span-2", "lg:col-span-3"], [1, "order-first", "md:order-none"], [1, "sticky", "top-32", "space-y-4"], [1, "gotop", 3, "ngStyle", "click"], [1, "btn", "bg-white"]],
        template: function BlogComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, BlogComponent_ng_container_0_Template, 42, 14, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\n\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "\n\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, BlogComponent_a_5_Template, 4, 3, "a", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "\n");
          }

          if (rf & 2) {
            var tmp_1_0 = null;

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 2, ctx.blog$));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](6, 4, ctx.scullyRoutesService.getCurrent())) == null ? null : tmp_1_0.route);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _shared_components_meta_meta_component__WEBPACK_IMPORTED_MODULE_7__["MetaComponent"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyContentComponent"], _blog_nav_blog_nav_component__WEBPACK_IMPORTED_MODULE_8__["BlogNavComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgStyle"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"]],
        styles: [".prose[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-family: \"PingFangSC-Regular\", Helvetica, \"Helvetica Neue\", \"Segoe UI\", \"Hiragino Sans GB\", \"Source Han Sans CN\", \"Microsoft YaHei\", \"STHeiti\", \"WenQuanYi Micro Hei\", sans-serif !important;\n}\n\n.prose[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 2.25rem;\n  line-height: 2.5rem;\n}\n\n.prose[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  margin-bottom: 1rem;\n  margin-top: 2.5rem;\n}\n\n.prose[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n  margin-bottom: 0.5rem;\n  margin-top: 1rem;\n}\n\n.prose[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n\n.prose[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n\n.prose[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.prose[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n\n.prose[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 0.5rem;\n  margin-top: 1rem;\n  max-width: 100%;\n  min-height: 100%;\n  min-height: 32rem;\n  width: 100%;\n}\n\n.prose[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%] {\n  margin-top: -0.5rem;\n  text-align: center;\n}\n\n.prose[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%]    > em[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.prose[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  --tw-border-opacity: 1;\n  border-color: rgba(156, 163, 175, var(--tw-border-opacity));\n  border-style: solid;\n  border-left-width: 4px;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  color: var(--gray-medium);\n}\n\n.prose[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  list-style-type: decimal;\n}\n\n.prose[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: disc;\n}\n\n.prose[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%], .prose[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  margin-left: 1.25rem;\n}\n\n.prose[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-of-type), .prose[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-of-type) {\n  margin-bottom: 0.5rem;\n}\n\n.prose[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:not(pre)    > code[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));\n  border-radius: 0.25rem;\n  font-weight: 100;\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n  overflow-wrap: break-word;\n  padding-top: 0.1rem;\n  padding-bottom: 0.1rem;\n  font-size: inherit;\n}\n\n[_nghost-%COMP%]   .toolbar-item[_ngcontent-%COMP%] {\n  position: relative;\n  background: #159;\n}\n\n[_nghost-%COMP%]   .toolbar-item[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  color: #fff;\n}\n\na[_ngcontent-%COMP%] {\n  display: block;\n  text-decoration: underline;\n  transition: 0.3s;\n}\n\na[_ngcontent-%COMP%]:hover {\n  text-decoration: none;\n}\n\ntable[_ngcontent-%COMP%] {\n  margin: 1rem 0 0.5rem 0;\n  width: 100%;\n  border-collapse: collapse;\n}\n\ntable[_ngcontent-%COMP%]   caption[_ngcontent-%COMP%] {\n  line-height: 48px;\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: var(--text-color);\n  background: var(--table-even-row);\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.25rem;\n  text-align: center;\n  line-height: 1.2;\n  border: 1px solid var(--table-even-row);\n}\n\n.gotop[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 4rem;\n  right: 2rem;\n  opacity: 1;\n  transition: 0.3s;\n}\n\n.gotop[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n\n.gotop[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:before, .gotop[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(-45deg);\n  margin-left: -0.25rem;\n  border-radius: 0.1875rem;\n  content: \"\";\n  width: 1rem;\n  height: 0.3125rem;\n  background: var(--primary);\n}\n\n.gotop[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:after {\n  transform: translate(-50%, -50%) rotate(45deg);\n  margin-left: 0.25rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGJsb2cuY29tcG9uZW50LnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFpbHdpbmRjc3MvbGliL2xpYi9zdWJzdGl0dXRlQ2xhc3NBcHBseUF0UnVsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUNBQSxlQUFtQjtFQUFuQixtQkFBbUI7RURFakIsZ01BQUE7QUFERjs7QUFLRTtFQ05GLDROQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIsbUJBQW1CO0FESW5COztBQU1FO0VDVkYsZ0JBQW1CO0VBQW5CLGlCQUFtQjtFQUFuQixpQkFBbUI7RUFBbkIsbUJBQW1CO0VBQW5CLGtCQUFtQjtBRE9uQjs7QUFPRTtFQ2RGLGdCQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIsb0JBQW1CO0VBQW5CLHFCQUFtQjtFQUFuQixnQkFBbUI7QURVbkI7O0FBUUU7RUNsQkYsa0JBQW1CO0VBQW5CLHFCQUFtQjtBRGFuQjs7QUFTRTtFQ3RCRixnQkFBbUI7RUFBbkIsbUJBQW1CO0FEZ0JuQjs7QUFVRTtFQzFCRixnQkFBbUI7RUFBbkIsbUJBQW1CO0VBQW5CLGlCQUFtQjtFQUFuQixrQkFBbUI7QURtQm5COztBQVdFO0VDOUJGLGdCQUFtQjtFQUFuQixtQkFBbUI7QURzQm5COztBQVlFO0VDbENGLGlCQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIscUJBQW1CO0VBQW5CLGdCQUFtQjtFQUFuQixlQUFtQjtFQUFuQixnQkFBbUI7RUFBbkIsaUJBQW1CO0VBQW5CLFdBQW1CO0FEMEJuQjs7QUFXSTtFQ3JDSixtQkFBbUI7RUFBbkIsa0JBQW1CO0FENkJuQjs7QUFVTTtFQ3ZDTixtQkFBbUI7RUFBbkIsb0JBQW1CO0FEZ0NuQjs7QUFlRTtFQy9DRixzQkFBbUI7RUFBbkIsMkRBQW1CO0VBQW5CLG1CQUFtQjtFQUFuQixzQkFBbUI7RUFBbkIsZ0JBQW1CO0VBQW5CLG1CQUFtQjtFQUFuQixvQkFBbUI7RUFBbkIsdUJBQW1CO0VBQW5CLG9CQUFtQjtFQUFuQixxQkFBbUI7RUFBbkIseUJBQW1CO0FEbUNuQjs7QUFnQkU7RUNuREYsd0JBQW1CO0FEc0NuQjs7QUFpQkU7RUN2REYscUJBQW1CO0FEeUNuQjs7QUN6Q0E7RUFBQSxnQkFBbUI7RUFBbkIsbUJBQW1CO0VBQW5CO0FBQW1COztBQUFuQjtFQUFBO0FBQW1COztBRG1FakI7RUNuRUYsa0JBQW1CO0VBQW5CLDJEQUFtQjtFQUFuQixzQkFBbUI7RUFBbkIsZ0JBQW1CO0VBQW5CLHFCQUFtQjtFQUFuQixzQkFBbUI7RUFBbkIseUJBQW1CO0VEcUVmLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQWhCSjs7QUFxQkU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBbEJKOztBQW1CSTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0FBakJOOztBQXNCQTtFQUNFLGNBQUE7RUFDQSwwQkFBQTtFQUNBLGdCQUFBO0FBbkJGOztBQW9CRTtFQUNFLHFCQUFBO0FBbEJKOztBQThDQTtFQUNFLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FBM0NGOztBQTZDQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQTFDRjs7QUE0Q0E7RUFDRSx3QkFBQTtFQUNBLGlDQUFBO0FBekNGOztBQTJDQTs7RUFFRSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1Q0FBQTtBQXhDRjs7QUEyQ0E7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUF4Q0Y7O0FBeUNFO0VBQ0UsYUFBQTtFQUNBLGNBQUE7QUF2Q0o7O0FBeUNJO0VBRUUsa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLCtDQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQXhDTjs7QUEwQ0k7RUFDRSw4Q0FBQTtFQUNBLG9CQUFBO0FBeENOIiwiZmlsZSI6ImJsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLy4uLy4uL2Fzc2V0cy9zY3NzL2NvbW1vbic7XHJcblxyXG4ucHJvc2Uge1xyXG4gIEBhcHBseSB0ZXh0LWJhc2U7XHJcbiAgZm9udC1mYW1pbHk6ICdQaW5nRmFuZ1NDLVJlZ3VsYXInLCBIZWx2ZXRpY2EsICdIZWx2ZXRpY2EgTmV1ZScsICdTZWdvZSBVSScsXHJcbiAgICAnSGlyYWdpbm8gU2FucyBHQicsICdTb3VyY2UgSGFuIFNhbnMgQ04nLCAnTWljcm9zb2Z0IFlhSGVpJywgJ1NUSGVpdGknLFxyXG4gICAgJ1dlblF1YW5ZaSBNaWNybyBIZWknLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7XHJcblxyXG4gIGgxIHtcclxuICAgIEBhcHBseSB0ZXh0LTR4bCBmb250LXNhbnM7XHJcbiAgfVxyXG5cclxuICBoMiB7XHJcbiAgICBAYXBwbHkgbXQtMTAgbWItNCB0ZXh0LTJ4bCBmb250LWJvbGQ7XHJcbiAgfVxyXG5cclxuICBoMyB7XHJcbiAgICBAYXBwbHkgbXQtNCBtYi0yIHRleHQteGwgZm9udC1ib2xkO1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBAYXBwbHkgbXktMjtcclxuICB9XHJcblxyXG4gIHByZSB7XHJcbiAgICBAYXBwbHkgbXktNDtcclxuICB9XHJcblxyXG4gIGltZyB7XHJcbiAgICBAYXBwbHkgbXktNCBteC1hdXRvO1xyXG4gIH1cclxuXHJcbiAgaHIge1xyXG4gICAgQGFwcGx5IG15LTg7XHJcbiAgfVxyXG5cclxuICBpZnJhbWUge1xyXG4gICAgQGFwcGx5IG10LTQgbWItMiBteC1hdXRvIG1heC13LWZ1bGwgbWluLWgtZnVsbDtcclxuXHJcbiAgICAmICsgcCB7XHJcbiAgICAgIEBhcHBseSB0ZXh0LWNlbnRlciBtdC0yLXJldjtcclxuICAgICAgJiA+IGVtIHtcclxuICAgICAgICBAYXBwbHkgdGV4dC1zbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgQGFwcGx5IHctZnVsbCBtaW4taC0xMjg7XHJcblxyXG4gIH1cclxuXHJcbiAgYmxvY2txdW90ZSB7XHJcbiAgICBAYXBwbHkgdGV4dC1ncmF5LW1lZGl1bSBteS00IHB5LTEgcHgtMiBib3JkZXItbC00IGJvcmRlci1ncmF5LTQwMCBib3JkZXItc29saWQ7XHJcbiAgfVxyXG5cclxuICBvbCB7XHJcbiAgICBAYXBwbHkgbGlzdC1kZWNpbWFsO1xyXG4gIH1cclxuXHJcbiAgdWwge1xyXG4gICAgQGFwcGx5IGxpc3QtZGlzYztcclxuICB9XHJcblxyXG4gIG9sLFxyXG4gIHVsIHtcclxuICAgIEBhcHBseSBtbC01IG15LTQ7XHJcbiAgICAmIGxpOm5vdCg6bGFzdC1vZi10eXBlKSB7XHJcbiAgICAgIEBhcHBseSBtYi0yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgOm5vdChwcmUpID4gY29kZSB7XHJcbiAgICBAYXBwbHkgYmctZ3JheS0xMDAgcm91bmRlZCBweC0xIGZvbnQtdGhpbiBicmVhay13b3JkcztcclxuICAgIHBhZGRpbmctdG9wOiAwLjFyZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMC4xcmVtO1xyXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xyXG4gIH1cclxufVxyXG5cclxuOmhvc3Qge1xyXG4gIC50b29sYmFyLWl0ZW0ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYmFja2dyb3VuZDogIzE1OTtcclxuICAgIC50b29sYmFyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmEge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgJjpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyB0YWJsZSB7XHJcbi8vICAgQGFwcGx5IGJsb2NrIHctZnVsbCBvdmVyZmxvdy1hdXRvO1xyXG4vLyAgIGJvcmRlci1zcGFjaW5nOiAwO1xyXG4vLyAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcblxyXG4vLyAgICYgdGgge1xyXG4vLyAgICAgQGFwcGx5IGZvbnQtc2VtaWJvbGQ7XHJcbi8vICAgfVxyXG5cclxuLy8gICAmIHRkLFxyXG4vLyAgICYgdGgge1xyXG4vLyAgICAgQGFwcGx5IHB4LTEuNSBweS0zLjUgYm9yZGVyIGJvcmRlci1zb2xpZCBib3JkZXItZ3JheS0zMDA7XHJcbi8vICAgfVxyXG5cclxuLy8gICAmIHRyIHtcclxuLy8gICAgIEBhcHBseSBib3JkZXItdCBib3JkZXItc29saWQgYm9yZGVyLWdyYXktNDAwIHRyYW5zaXRpb24tY29sb3JzO1xyXG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XHJcbi8vICAgfVxyXG5cclxuLy8gICAmIHRyOm50aC1jaGlsZCgybikge1xyXG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGFibGUtZXZlbi1yb3cpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxudGFibGUge1xyXG4gIG1hcmdpbjogcmVtKDE2cHgpIDAgcmVtKDhweCkgMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG59XHJcbnRhYmxlIGNhcHRpb24ge1xyXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xyXG4gIGZvbnQtc2l6ZTogcmVtKDIwcHgpO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbnRhYmxlIHRoIHtcclxuICBjb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tdGFibGUtZXZlbi1yb3cpO1xyXG59XHJcbnRhYmxlIHRoLFxyXG50YWJsZSB0ZCB7XHJcbiAgcGFkZGluZzogcmVtKDhweCkgcmVtKDRweCk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjI7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGFibGUtZXZlbi1yb3cpO1xyXG59XHJcblxyXG4uZ290b3Age1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBib3R0b206IHJlbSg2NHB4KTtcclxuICByaWdodDogcmVtKDMycHgpO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgdHJhbnNpdGlvbjogMC4zcztcclxuICAuYnRuIHtcclxuICAgIHdpZHRoOiByZW0oNDBweCk7XHJcbiAgICBoZWlnaHQ6IHJlbSg0MHB4KTtcclxuXHJcbiAgICAmOmJlZm9yZSxcclxuICAgICY6YWZ0ZXIge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogNTAlO1xyXG4gICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSgtNDVkZWcpO1xyXG4gICAgICBtYXJnaW4tbGVmdDogcmVtKC00cHgpO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiByZW0oM3B4KTtcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIHdpZHRoOiByZW0oMTZweCk7XHJcbiAgICAgIGhlaWdodDogcmVtKDVweCk7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXByaW1hcnkpO1xyXG4gICAgfVxyXG4gICAgJjphZnRlciB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiByZW0oNHB4KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiQHRhaWx3aW5kIGJhc2U7XG5AdGFpbHdpbmQgY29tcG9uZW50cztcbkB0YWlsd2luZCB1dGlsaXRpZXM7Il19 */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    "QWvX":
    /*!*************************************************************!*\
      !*** ./node_modules/prismjs/components/prism-javascript.js ***!
      \*************************************************************/

    /*! no static exports found */

    /***/
    function QWvX(module, exports) {
      Prism.languages.javascript = Prism.languages.extend('clike', {
        'class-name': [Prism.languages.clike['class-name'], {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
          lookbehind: true
        }],
        'keyword': [{
          pattern: /((?:^|})\s*)(?:catch|finally)\b/,
          lookbehind: true
        }, {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
      Prism.languages.insertBefore('javascript', 'keyword', {
        'regex': {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
          lookbehind: true,
          greedy: true,
          inside: {
            'regex-source': {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: 'language-regex',
              inside: Prism.languages.regex
            },
            'regex-flags': /[a-z]+$/,
            'regex-delimiter': /^\/|\/$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        'function-variable': {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: 'function'
        },
        'parameter': [{
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }, {
          pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          inside: Prism.languages.javascript
        }, {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }, {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }],
        'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
          pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
          greedy: true,
          inside: {
            'template-punctuation': {
              pattern: /^`|`$/,
              alias: 'string'
            },
            'interpolation': {
              pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
              lookbehind: true,
              inside: {
                'interpolation-punctuation': {
                  pattern: /^\${|}$/,
                  alias: 'punctuation'
                },
                rest: Prism.languages.javascript
              }
            },
            'string': /[\s\S]+/
          }
        }
      });

      if (Prism.languages.markup) {
        Prism.languages.markup.tag.addInlined('script', 'javascript');
      }

      Prism.languages.js = Prism.languages.javascript;
      /***/
    },

    /***/
    "RX2a":
    /*!*******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-yaml.js ***!
      \*******************************************************/

    /*! no static exports found */

    /***/
    function RX2a(module, exports) {
      (function (Prism) {
        // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
        // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
        var anchorOrAlias = /[*&][^\s[\]{},]+/; // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property

        var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/; // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)

        var properties = '(?:' + tag.source + '(?:[ \t]+' + anchorOrAlias.source + ')?|' + anchorOrAlias.source + '(?:[ \t]+' + tag.source + ')?)'; // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
        // This is a simplified version that doesn't support "#" and multiline keys
        // All these long scarry character classes are simplified versions of YAML's characters

        var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function () {
          return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
        });
        var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
        /**
         *
         * @param {string} value
         * @param {string} [flags]
         * @returns {RegExp}
         */

        function createValuePattern(value, flags) {
          flags = (flags || '').replace(/m/g, '') + 'm'; // add m flag

          var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function () {
            return properties;
          }).replace(/<<value>>/g, function () {
            return value;
          });
          return RegExp(pattern, flags);
        }

        Prism.languages.yaml = {
          'scalar': {
            pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function () {
              return properties;
            })),
            lookbehind: true,
            alias: 'string'
          },
          'comment': /#.*/,
          'key': {
            pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function () {
              return properties;
            }).replace(/<<key>>/g, function () {
              return '(?:' + plainKey + '|' + string + ')';
            })),
            lookbehind: true,
            greedy: true,
            alias: 'atrule'
          },
          'directive': {
            pattern: /(^[ \t]*)%.+/m,
            lookbehind: true,
            alias: 'important'
          },
          'datetime': {
            pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
            lookbehind: true,
            alias: 'number'
          },
          'boolean': {
            pattern: createValuePattern(/true|false/.source, 'i'),
            lookbehind: true,
            alias: 'important'
          },
          'null': {
            pattern: createValuePattern(/null|~/.source, 'i'),
            lookbehind: true,
            alias: 'important'
          },
          'string': {
            pattern: createValuePattern(string),
            lookbehind: true,
            greedy: true
          },
          'number': {
            pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
            lookbehind: true
          },
          'tag': tag,
          'important': anchorOrAlias,
          'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
        };
        Prism.languages.yml = Prism.languages.yaml;
      })(Prism);
      /***/

    },

    /***/
    "U4+L":
    /*!*************************************!*\
      !*** ./src/app/blog/blog.module.ts ***!
      \*************************************/

    /*! exports provided: BlogModule */

    /***/
    function U4L(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogModule", function () {
        return BlogModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @scullyio/ng-lib */
      "sbAP");
      /* harmony import */


      var _blog_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./blog-routing.module */
      "9ilz");
      /* harmony import */


      var _blog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./blog.component */
      "LgBW");
      /* harmony import */


      var _blog_nav_blog_nav_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./blog-nav/blog-nav.component */
      "v7c+");
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../shared/shared.module */
      "PCNd");
      /* harmony import */


      var _blog_donate_blog_donate_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./blog-donate/blog-donate.component */
      "YDDJ");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var BlogModule = function BlogModule() {
        _classCallCheck2(this, BlogModule);
      };

      BlogModule.ɵfac = function BlogModule_Factory(t) {
        return new (t || BlogModule)();
      };

      BlogModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
        type: BlogModule
      });
      BlogModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _blog_routing_module__WEBPACK_IMPORTED_MODULE_2__["BlogRoutingModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_1__["ScullyLibModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](BlogModule, {
          declarations: [_blog_component__WEBPACK_IMPORTED_MODULE_3__["BlogComponent"], _blog_nav_blog_nav_component__WEBPACK_IMPORTED_MODULE_4__["BlogNavComponent"], _blog_donate_blog_donate_component__WEBPACK_IMPORTED_MODULE_6__["BlogDonateComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _blog_routing_module__WEBPACK_IMPORTED_MODULE_2__["BlogRoutingModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_1__["ScullyLibModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]]
        });
      })();
      /***/

    },

    /***/
    "XIHC":
    /*!*************************************************************!*\
      !*** ./node_modules/prismjs/components/prism-typescript.js ***!
      \*************************************************************/

    /*! no static exports found */

    /***/
    function XIHC(module, exports) {
      (function (Prism) {
        Prism.languages.typescript = Prism.languages.extend('javascript', {
          'class-name': {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: true,
            greedy: true,
            inside: null // see below

          },
          // From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words
          'keyword': /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
          'builtin': /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
        }); // doesn't work with TS because TS is too complex

        delete Prism.languages.typescript['parameter']; // a version of typescript specifically for highlighting types

        var typeInside = Prism.languages.extend('typescript', {});
        delete typeInside['class-name'];
        Prism.languages.typescript['class-name'].inside = typeInside;
        Prism.languages.insertBefore('typescript', 'function', {
          'generic-function': {
            // e.g. foo<T extends "bar" | "baz">( ...
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
            greedy: true,
            inside: {
              'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
              'generic': {
                pattern: /<[\s\S]+/,
                // everything after the first <
                alias: 'class-name',
                inside: typeInside
              }
            }
          }
        });
        Prism.languages.ts = Prism.languages.typescript;
      })(Prism);
      /***/

    },

    /***/
    "YDDJ":
    /*!***********************************************************!*\
      !*** ./src/app/blog/blog-donate/blog-donate.component.ts ***!
      \***********************************************************/

    /*! exports provided: BlogDonateComponent */

    /***/
    function YDDJ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogDonateComponent", function () {
        return BlogDonateComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = function _c0(a0) {
        return {
          "background-image": a0
        };
      };

      function BlogDonateComponent_div_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogDonateComponent_div_9_Template_div_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r1.showQR = false;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, "url(" + ctx_r0.qrCodePath + ")"));
        }
      }

      var BlogDonateComponent = /*#__PURE__*/function () {
        function BlogDonateComponent() {
          _classCallCheck2(this, BlogDonateComponent);
        }

        _createClass2(BlogDonateComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "onQrcode",
          value: function onQrcode(path) {
            this.qrCodePath = path;
            this.showQR = true;
            console.log('qrCodePath', this.qrCodePath, this.showQR);
          }
        }]);

        return BlogDonateComponent;
      }();

      BlogDonateComponent.ɵfac = function BlogDonateComponent_Factory(t) {
        return new (t || BlogDonateComponent)();
      };

      BlogDonateComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: BlogDonateComponent,
        selectors: [["app-blog-donate"]],
        decls: 10,
        vars: 2,
        consts: [[1, "donate"], [1, "donate__text"], [1, "donate__box", "list", "pos-f", 3, "ngClass"], ["id", "jkopay", "qr", "/images/qrcode/jkopay.jpg", 3, "click"], ["id", "linepay", "qr", "/images/qrcode/linepay.jpg", 3, "click"], ["id", "twpay", "qr", "/images/qrcode/twpay.jpg", 3, "click"], [1, "msg", "pos-f"], ["class", "donate__qrcode pos-f left-100", 4, "ngIf"], [1, "donate__qrcode", "pos-f", "left-100"], [1, "donate__qrcode-box", 2, "background-image", "url('/images/qrcode/twpay.jpg')", 3, "ngStyle", "click"]],
        template: function BlogDonateComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Donate");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "li", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogDonateComponent_Template_li_click_4_listener() {
              return ctx.onQrcode("assets/images/qrcode/jkopay.jpg");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogDonateComponent_Template_li_click_5_listener() {
              return ctx.onQrcode("assets/images/qrcode/linepay.jpg");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogDonateComponent_Template_li_click_6_listener() {
              return ctx.onQrcode("assets/images/qrcode/twpay.jpg");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " \u5982\u679C\u9019\u6574\u7BC7\u6587\u7AE0\u6709\u5E6B\u52A9\u5230\u4F60\u7684\u8A71 \u4E5F\u6B61\u8FCE\u8ACB\u6211\u559D\u676F\u98F2\u6599 ^_^ ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, BlogDonateComponent_div_9_Template, 2, 3, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.showQR ? "showQR" : "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showQR);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]],
        styles: [".donate[_ngcontent-%COMP%] {\n  position: relative;\n  font-family: \"Helvetica Neue\", Ubuntu, \"WenQuanYi Micro Hei\", Helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Wenquanyi Micro Hei\", \"WenQuanYi Micro Hei Mono\", \"WenQuanYi Zen Hei\", \"WenQuanYi Zen Hei\", \"Apple LiGothic Medium\", \"SimHei\", \"ST Heiti\", \"WenQuanYi Zen Hei Sharp\", Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  line-height: 1.8em;\n  text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);\n  height: 15em;\n}\n\n.donate[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-width: 0px;\n}\n\n.donate[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #000;\n  text-decoration: none;\n  outline: none;\n  border: none;\n}\n\n.donate[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {\n  list-style: none;\n  list-style-type: none;\n  margin: 0px;\n  padding: 0px;\n}\n\n.donate[_ngcontent-%COMP%]   .msg[_ngcontent-%COMP%] {\n  bottom: 30px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100%;\n  text-align: center;\n}\n\n.donate[_ngcontent-%COMP%]   .pos-f[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n.donate[_ngcontent-%COMP%]   .left-100[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\n.donate[_ngcontent-%COMP%]   .blur[_ngcontent-%COMP%] {\n  filter: blur(3px);\n}\n\n.donate[_ngcontent-%COMP%]   .tr3[_ngcontent-%COMP%] {\n  transition: all 0.3s;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__text[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 12px;\n  width: 70px;\n  height: 70px;\n  line-height: 70px;\n  color: #fff;\n  background: #ffd886 url('like.svg') no-repeat center 10px;\n  background-size: 20px;\n  border-radius: 35px;\n  text-align: center;\n  left: calc(50% - 120px);\n  top: calc(50% - 60px);\n  transform: rotatez(-15deg);\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%] {\n  display: table;\n  left: calc(50% - 150px);\n  top: calc(50% - 15px);\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  width: 299px;\n  height: 28px;\n  float: left;\n  z-index: 1;\n  overflow: hidden;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  width: 74px;\n  display: table-cell;\n  text-align: center;\n  border-right: 1px solid #ddd;\n  background: no-repeat center center;\n  background-color: rgba(204, 217, 220, 0.1);\n  background-size: cover;\n  cursor: pointer;\n  overflow: hidden;\n  height: 28px;\n  filter: grayscale(1);\n  opacity: 0.5;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background-color: rgba(204, 217, 220, 0.3);\n  filter: grayscale(0);\n  opacity: 1;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]:last-child {\n  border-width: 0;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]   #jkopay[_ngcontent-%COMP%] {\n  background-image: url('jkopay.svg');\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]   #linepay[_ngcontent-%COMP%] {\n  background-image: url('linepay.svg');\n}\n\n.donate[_ngcontent-%COMP%]   .donate__box[_ngcontent-%COMP%]   #twpay[_ngcontent-%COMP%] {\n  background-image: url('twpay.svg');\n}\n\n.donate[_ngcontent-%COMP%]   .donate__qrcode[_ngcontent-%COMP%] {\n  top: 0;\n  left: 0;\n  z-index: 1;\n  background-color: rgba(255, 255, 255, 0.3);\n  perspective: 400px;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__qrcode-box[_ngcontent-%COMP%] {\n  cursor: pointer;\n  position: absolute;\n  text-align: center;\n  width: 200px;\n  height: 200px;\n  left: calc(50% - 100px);\n  top: calc(50% - 100px);\n  background: #fff no-repeat center center;\n  background-size: 190px;\n  border-radius: 6px;\n  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.3);\n  transition: all 1s ease-in-out;\n  transform-style: preserve-3d;\n  transform-origin: center center;\n  overflow: hidden;\n}\n\n.donate[_ngcontent-%COMP%]   [data-footnote][_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n}\n\n.donate[_ngcontent-%COMP%]   [data-footnote][_ngcontent-%COMP%]:hover {\n  overflow: visible;\n}\n\n.donate[_ngcontent-%COMP%]   [data-footnote][_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n  transform: translate3d(-50%, -7px, 0);\n}\n\n.donate[_ngcontent-%COMP%]   [data-footnote][_ngcontent-%COMP%]::before {\n  position: absolute;\n  transition: all 0.3s;\n  transform: translate3d(-50%, 0, 0);\n  opacity: 0;\n  left: 37px;\n  z-index: 10;\n  content: attr(data-footnote);\n  border-radius: 6px;\n  background-color: rgba(100, 100, 100, 0.8);\n  color: #fff;\n  height: 24px;\n  line-height: 24px;\n  padding: 0 6px;\n  font-size: 12px;\n  white-space: nowrap;\n  top: -24px;\n  left: 37px;\n}\n\n.donate[_ngcontent-%COMP%]   [data-footnote][_ngcontent-%COMP%]::after {\n  content: \"\";\n  border: 5px solid #333;\n  border-color: rgba(100, 100, 100, 0.8) transparent transparent transparent;\n  top: 0;\n  left: 37px;\n}\n\n.donate[_ngcontent-%COMP%]   .donate__qrcode-box.showQR[_ngcontent-%COMP%] {\n  opacity: 1;\n  -webkit-animation-name: showQR;\n          animation-name: showQR;\n  -webkit-animation-duration: 3s;\n          animation-duration: 3s;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-iteration-count: 1;\n          animation-iteration-count: 1;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation: showQR 3s ease-in-out 0s 1 normal forwards;\n}\n\n.list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  list-style-type: none;\n  margin: 0px;\n  padding: 0px;\n}\n\n.list-left[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  list-style-type: none;\n  margin: 0px;\n  padding: 0px;\n}\n\n[data-footnote][_ngcontent-%COMP%]::after {\n  position: absolute;\n  transition: all 0.3s;\n  transform: translate3d(-50%, 0, 0);\n  opacity: 0;\n  left: 37px;\n  z-index: 10;\n}\n\n[data-footnote][_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n  transform: translate3d(-50%, -7px, 0);\n}\n\n.donate__qrcode-box.hideQR[_ngcontent-%COMP%] {\n  opacity: 1;\n  -webkit-animation-name: hideQR;\n          animation-name: hideQR;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-iteration-count: 1;\n          animation-iteration-count: 1;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation: hideQR 0.5s ease-in-out 0s 1 normal forwards;\n}\n\n@-webkit-keyframes showQR {\n  from {\n    transform: rotateX(90deg);\n  }\n\n  8% {\n    opacity: 1;\n    transform: rotateX(-60deg);\n  }\n\n  18% {\n    opacity: 1;\n    transform: rotateX(40deg);\n  }\n\n  34% {\n    opacity: 1;\n    transform: rotateX(-28deg);\n  }\n\n  44% {\n    opacity: 1;\n    transform: rotateX(18deg);\n  }\n\n  58% {\n    opacity: 1;\n    transform: rotateX(-12deg);\n  }\n\n  72% {\n    opacity: 1;\n    transform: rotateX(9deg);\n  }\n\n  88% {\n    opacity: 1;\n    transform: rotateX(-5deg);\n  }\n\n  96% {\n    opacity: 1;\n    transform: rotateX(2deg);\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes showQR {\n  from {\n    transform: rotateX(90deg);\n  }\n\n  8% {\n    opacity: 1;\n    transform: rotateX(-60deg);\n  }\n\n  18% {\n    opacity: 1;\n    transform: rotateX(40deg);\n  }\n\n  34% {\n    opacity: 1;\n    transform: rotateX(-28deg);\n  }\n\n  44% {\n    opacity: 1;\n    transform: rotateX(18deg);\n  }\n\n  58% {\n    opacity: 1;\n    transform: rotateX(-12deg);\n  }\n\n  72% {\n    opacity: 1;\n    transform: rotateX(9deg);\n  }\n\n  88% {\n    opacity: 1;\n    transform: rotateX(-5deg);\n  }\n\n  96% {\n    opacity: 1;\n    transform: rotateX(2deg);\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes hideQR {\n  20%, 50% {\n    transform: scale(1.08, 1.08);\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: rotateZ(40deg) scale(0.6, 0.6);\n  }\n}\n\n@keyframes hideQR {\n  20%, 50% {\n    transform: scale(1.08, 1.08);\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: rotateZ(40deg) scale(0.6, 0.6);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxibG9nLWRvbmF0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0Esd1NBQUE7RUFLQSxtQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsNkNBQUE7RUFDQSxZQUFBO0FBSEY7O0FBSUU7RUFDRSxpQkFBQTtBQUZKOztBQUlFO0VBQ0UsV0FBQTtFQUNBLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFGSjs7QUFJRTtFQUNFLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUZKOztBQUlFO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSwyQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQUZKOztBQUlFO0VBQ0Usa0JBQUE7QUFGSjs7QUFJRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBRko7O0FBSUU7RUFFRSxpQkFBQTtBQUZKOztBQUlFO0VBQ0Usb0JBQUE7QUFGSjs7QUFJRTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EseURBQUE7RUFFQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0EsMEJBQUE7QUFISjs7QUFLRTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0FBSEo7O0FBSUk7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUNBQUE7RUFDQSwwQ0FBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUVBLG9CQUFBO0VBQ0EsWUFBQTtBQUZOOztBQUdNO0VBQ0UsMENBQUE7RUFFQSxvQkFBQTtFQUNBLFVBQUE7QUFEUjs7QUFLTTtFQUNFLGVBQUE7QUFIUjs7QUFNSTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUpOOztBQU1JO0VBQ0UsbUNBQUE7QUFKTjs7QUFNSTtFQUNFLG9DQUFBO0FBSk47O0FBTUk7RUFDRSxrQ0FBQTtBQUpOOztBQU9FO0VBQ0UsTUFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsMENBQUE7RUFFQSxrQkFBQTtBQU5KOztBQVFFO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSx3Q0FBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQ0FBQTtFQUVBLDhCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtFQUNBLGdCQUFBO0FBUEo7O0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBUko7O0FBU0k7RUFDRSxpQkFBQTtBQVBOOztBQVFNO0VBQ0UsVUFBQTtFQUNBLHFDQUFBO0FBTlI7O0FBU0k7RUFDRSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0NBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0FBUE47O0FBU0k7RUFDRSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSwwRUFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0FBUE47O0FBVUU7RUFDRSxVQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0Esb0NBQUE7VUFBQSw0QkFBQTtFQUNBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSw2REFBQTtBQVJKOztBQVlFO0VBQ0UsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBVEo7O0FBYUU7RUFDRSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFWSjs7QUFjRTtFQUNFLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQ0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQVhKOztBQWNJO0VBQ0UsVUFBQTtFQUNBLHFDQUFBO0FBWk47O0FBZ0JBO0VBQ0UsVUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLG9DQUFBO1VBQUEsNEJBQUE7RUFDQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0EsK0RBQUE7QUFiRjs7QUFnQkE7RUFDRTtJQUNFLHlCQUFBO0VBYkY7O0VBZUE7SUFDRSxVQUFBO0lBQ0EsMEJBQUE7RUFiRjs7RUFlQTtJQUNFLFVBQUE7SUFDQSx5QkFBQTtFQWJGOztFQWVBO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VBYkY7O0VBZUE7SUFDRSxVQUFBO0lBQ0EseUJBQUE7RUFiRjs7RUFlQTtJQUNFLFVBQUE7SUFDQSwwQkFBQTtFQWJGOztFQWVBO0lBQ0UsVUFBQTtJQUNBLHdCQUFBO0VBYkY7O0VBZUE7SUFDRSxVQUFBO0lBQ0EseUJBQUE7RUFiRjs7RUFlQTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQWJGOztFQWVBO0lBQ0UsVUFBQTtFQWJGO0FBQ0Y7O0FBekJBO0VBQ0U7SUFDRSx5QkFBQTtFQWJGOztFQWVBO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VBYkY7O0VBZUE7SUFDRSxVQUFBO0lBQ0EseUJBQUE7RUFiRjs7RUFlQTtJQUNFLFVBQUE7SUFDQSwwQkFBQTtFQWJGOztFQWVBO0lBQ0UsVUFBQTtJQUNBLHlCQUFBO0VBYkY7O0VBZUE7SUFDRSxVQUFBO0lBQ0EsMEJBQUE7RUFiRjs7RUFlQTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQWJGOztFQWVBO0lBQ0UsVUFBQTtJQUNBLHlCQUFBO0VBYkY7O0VBZUE7SUFDRSxVQUFBO0lBQ0Esd0JBQUE7RUFiRjs7RUFlQTtJQUNFLFVBQUE7RUFiRjtBQUNGOztBQWVBO0VBR0U7SUFFRSw0QkFBQTtJQUNBLFVBQUE7RUFoQkY7O0VBa0JBO0lBQ0UsVUFBQTtJQUNBLHlDQUFBO0VBaEJGO0FBQ0Y7O0FBS0E7RUFHRTtJQUVFLDRCQUFBO0lBQ0EsVUFBQTtFQWhCRjs7RUFrQkE7SUFDRSxVQUFBO0lBQ0EseUNBQUE7RUFoQkY7QUFDRiIsImZpbGUiOiJibG9nLWRvbmF0ZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kb25hdGUge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJywgVWJ1bnR1LCAnV2VuUXVhbllpIE1pY3JvIEhlaScsIEhlbHZldGljYSxcclxuICAgICdIaXJhZ2lubyBTYW5zIEdCJywgJ01pY3Jvc29mdCBZYUhlaScsICdXZW5xdWFueWkgTWljcm8gSGVpJyxcclxuICAgICdXZW5RdWFuWWkgTWljcm8gSGVpIE1vbm8nLCAnV2VuUXVhbllpIFplbiBIZWknLCAnV2VuUXVhbllpIFplbiBIZWknLFxyXG4gICAgJ0FwcGxlIExpR290aGljIE1lZGl1bScsICdTaW1IZWknLCAnU1QgSGVpdGknLCAnV2VuUXVhbllpIFplbiBIZWkgU2hhcnAnLFxyXG4gICAgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XHJcbiAgbGluZS1oZWlnaHQ6IDEuOGVtO1xyXG4gIHRleHQtc2hhZG93OiAwIDAgMXB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcclxuICBoZWlnaHQ6IDE1ZW07XHJcbiAgaW1nIHtcclxuICAgIGJvcmRlci13aWR0aDogMHB4O1xyXG4gIH1cclxuICBhIHtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICB9XHJcbiAgLmxpc3Qge1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gICAgcGFkZGluZzogMHB4O1xyXG4gIH1cclxuICAubXNnIHtcclxuICAgIGJvdHRvbTogMzBweDtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICAucG9zLWYge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIH1cclxuICAubGVmdC0xMDAge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG4gIC5ibHVyIHtcclxuICAgIC13ZWJraXQtZmlsdGVyOiBibHVyKDNweCk7XHJcbiAgICBmaWx0ZXI6IGJsdXIoM3B4KTtcclxuICB9XHJcbiAgLnRyMyB7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcclxuICB9XHJcbiAgLmRvbmF0ZV9fdGV4dCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIGxpbmUtaGVpZ2h0OiA3MHB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZkODg2IHVybCgnLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9xcmNvZGUvbGlrZS5zdmcnKSBuby1yZXBlYXRcclxuICAgICAgY2VudGVyIDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzNXB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGVmdDogY2FsYyg1MCUgLSAxMjBweCk7XHJcbiAgICB0b3A6IGNhbGMoNTAlIC0gNjBweCk7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZXooLTE1ZGVnKTtcclxuICB9XHJcbiAgLmRvbmF0ZV9fYm94IHtcclxuICAgIGRpc3BsYXk6IHRhYmxlO1xyXG4gICAgbGVmdDogY2FsYyg1MCUgLSAxNTBweCk7XHJcbiAgICB0b3A6IGNhbGMoNTAlIC0gMTVweCk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIHdpZHRoOiAyOTlweDtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBsaSB7XHJcbiAgICAgIHdpZHRoOiA3NHB4O1xyXG4gICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICAgIGJhY2tncm91bmQ6IG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNCwgMjE3LCAyMjAsIDAuMSk7XHJcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgICAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEpO1xyXG4gICAgICBmaWx0ZXI6IGdyYXlzY2FsZSgxKTtcclxuICAgICAgb3BhY2l0eTogMC41O1xyXG4gICAgICAmOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNCwgMjE3LCAyMjAsIDAuMyk7XHJcbiAgICAgICAgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgwKTtcclxuICAgICAgICBmaWx0ZXI6IGdyYXlzY2FsZSgwKTtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICA+IGxpIHtcclxuICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBib3JkZXItd2lkdGg6IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGEge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICAgICNqa29wYXkge1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvcXJjb2RlL2prb3BheS5zdmcnKTtcclxuICAgIH1cclxuICAgICNsaW5lcGF5IHtcclxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3FyY29kZS9saW5lcGF5LnN2ZycpO1xyXG4gICAgfVxyXG4gICAgI3R3cGF5IHtcclxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3FyY29kZS90d3BheS5zdmcnKTtcclxuICAgIH1cclxuICB9XHJcbiAgLmRvbmF0ZV9fcXJjb2RlIHtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xyXG4gICAgLy8gZGlzcGxheTogbm9uZTtcclxuICAgIHBlcnNwZWN0aXZlOiA0MDBweDtcclxuICB9XHJcbiAgLmRvbmF0ZV9fcXJjb2RlLWJveCB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG4gICAgbGVmdDogY2FsYyg1MCUgLSAxMDBweCk7XHJcbiAgICB0b3A6IGNhbGMoNTAlIC0gMTAwcHgpO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZiBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogMTkwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgICAvLyBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW4tb3V0O1xyXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxuICBcclxuICBbZGF0YS1mb290bm90ZV0ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBvdmVyZmxvdzogdmlzaWJsZTtcclxuICAgICAgJjo6YmVmb3JlIHtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTUwJSwgLTdweCwgMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTUwJSwgMCwgMCk7XHJcbiAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIGxlZnQ6IDM3cHg7XHJcbiAgICAgIHotaW5kZXg6IDEwO1xyXG4gICAgICBjb250ZW50OiBhdHRyKGRhdGEtZm9vdG5vdGUpO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAxMDAsIDEwMCwgMC44KTtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGhlaWdodDogMjRweDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbiAgICAgIHBhZGRpbmc6IDAgNnB4O1xyXG4gICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgIHRvcDogLTI0cHg7XHJcbiAgICAgIGxlZnQ6IDM3cHg7XHJcbiAgICB9XHJcbiAgICAmOjphZnRlciB7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICBib3JkZXI6IDVweCBzb2xpZCAjMzMzO1xyXG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMTAwLCAxMDAsIDEwMCwgMC44KSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAzN3B4O1xyXG4gICAgfVxyXG4gIH1cclxuICAuZG9uYXRlX19xcmNvZGUtYm94LnNob3dRUiB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IHNob3dRUjtcclxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogM3M7XHJcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcclxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XHJcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzaG93UVIgM3MgZWFzZS1pbi1vdXQgMHMgMSBub3JtYWwgZm9yd2FyZHM7XHJcbiAgfVxyXG59XHJcbi5saXN0IHtcclxuICBsaSB7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgICBwYWRkaW5nOiAwcHg7XHJcbiAgfVxyXG59XHJcbi5saXN0LWxlZnQge1xyXG4gIGxpIHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICAgIHBhZGRpbmc6IDBweDtcclxuICB9XHJcbn1cclxuW2RhdGEtZm9vdG5vdGVdIHtcclxuICAmOjphZnRlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTUwJSwgMCwgMCk7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgbGVmdDogMzdweDtcclxuICAgIHotaW5kZXg6IDEwO1xyXG4gIH1cclxuICAmOmhvdmVyIHtcclxuICAgICY6OmFmdGVyIHtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtNTAlLCAtN3B4LCAwKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLmRvbmF0ZV9fcXJjb2RlLWJveC5oaWRlUVIge1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYW5pbWF0aW9uLW5hbWU6IGhpZGVRUjtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDAuNXM7XHJcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XHJcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcclxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICAtd2Via2l0LWFuaW1hdGlvbjogaGlkZVFSIDAuNXMgZWFzZS1pbi1vdXQgMHMgMSBub3JtYWwgZm9yd2FyZHM7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc2hvd1FSIHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg5MGRlZyk7XHJcbiAgfVxyXG4gIDglIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoLTYwZGVnKTtcclxuICB9XHJcbiAgMTglIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNDBkZWcpO1xyXG4gIH1cclxuICAzNCUge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgtMjhkZWcpO1xyXG4gIH1cclxuICA0NCUge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgxOGRlZyk7XHJcbiAgfVxyXG4gIDU4JSB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKC0xMmRlZyk7XHJcbiAgfVxyXG4gIDcyJSB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDlkZWcpO1xyXG4gIH1cclxuICA4OCUge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgtNWRlZyk7XHJcbiAgfVxyXG4gIDk2JSB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDJkZWcpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxufVxyXG5Aa2V5ZnJhbWVzIGhpZGVRUiB7XHJcbiAgZnJvbSB7XHJcbiAgfVxyXG4gIDIwJSxcclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA4LCAxLjA4KTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG4gIHRvIHtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooNDBkZWcpIHNjYWxlKDAuNiwgMC42KTtcclxuICB9XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    "ZgVT":
    /*!******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-css.js ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function ZgVT(module, exports) {
      (function (Prism) {
        var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
        Prism.languages.css = {
          'comment': /\/\*[\s\S]*?\*\//,
          'atrule': {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
              'rule': /^@[\w-]+/,
              'selector-function-argument': {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: 'selector'
              },
              'keyword': {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              } // See rest below

            }
          },
          'url': {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
            greedy: true,
            inside: {
              'function': /^url/i,
              'punctuation': /^\(|\)$/,
              'string': {
                pattern: RegExp('^' + string.source + '$'),
                alias: 'url'
              }
            }
          },
          'selector': RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
          'string': {
            pattern: string,
            greedy: true
          },
          'property': /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          'important': /!important\b/i,
          'function': /[-a-z0-9]+(?=\()/i,
          'punctuation': /[(){};:,]/
        };
        Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
        var markup = Prism.languages.markup;

        if (markup) {
          markup.tag.addInlined('style', 'css');
          Prism.languages.insertBefore('inside', 'attr-value', {
            'style-attr': {
              pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
              lookbehind: true,
              inside: {
                'attr-value': {
                  pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                  inside: {
                    'style': {
                      pattern: /(["'])[\s\S]+(?=["']$)/,
                      lookbehind: true,
                      alias: 'language-css',
                      inside: Prism.languages.css
                    },
                    'punctuation': [{
                      pattern: /^=/,
                      alias: 'attr-equals'
                    }, /"|'/]
                  }
                },
                'attr-name': /^style/i
              }
            }
          }, markup.tag);
        }
      })(Prism);
      /***/

    },

    /***/
    "bPOv":
    /*!*********************************************************!*\
      !*** ./node_modules/prismjs/components/prism-markup.js ***!
      \*********************************************************/

    /*! no static exports found */

    /***/
    function bPOv(module, exports) {
      Prism.languages.markup = {
        'comment': /<!--[\s\S]*?-->/,
        'prolog': /<\?[\s\S]+?\?>/,
        'doctype': {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            'internal-subset': {
              pattern: /(\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null // see below

            },
            'string': {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            'punctuation': /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/,
            'name': /[^\s<>'"]+/
          }
        },
        'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
        'tag': {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            'tag': {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                'punctuation': /^<\/?/,
                'namespace': /^[^\s>\/:]+:/
              }
            },
            'attr-value': {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                'punctuation': [{
                  pattern: /^=/,
                  alias: 'attr-equals'
                }, /"|'/]
              }
            },
            'punctuation': /\/?>/,
            'attr-name': {
              pattern: /[^\s>\/]+/,
              inside: {
                'namespace': /^[^\s>\/:]+:/
              }
            }
          }
        },
        'entity': [{
          pattern: /&[\da-z]{1,8};/i,
          alias: 'named-entity'
        }, /&#x?[\da-f]{1,8};/i]
      };
      Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
      Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup; // Plugin to make entity title show the real entity, idea by Roman Komarov

      Prism.hooks.add('wrap', function (env) {
        if (env.type === 'entity') {
          env.attributes['title'] = env.content.replace(/&amp;/, '&');
        }
      });
      Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside['language-' + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
          };
          includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            'included-cdata': {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside['language-' + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
              return tagName;
            }), 'i'),
            lookbehind: true,
            greedy: true,
            inside: inside
          };
          Prism.languages.insertBefore('markup', 'cdata', def);
        }
      });
      Prism.languages.html = Prism.languages.markup;
      Prism.languages.mathml = Prism.languages.markup;
      Prism.languages.svg = Prism.languages.markup;
      Prism.languages.xml = Prism.languages.extend('markup', {});
      Prism.languages.ssml = Prism.languages.xml;
      Prism.languages.atom = Prism.languages.xml;
      Prism.languages.rss = Prism.languages.xml;
      /***/
    },

    /***/
    "c2Kr":
    /*!***********************************************************************************!*\
      !*** ./node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js ***!
      \***********************************************************************************/

    /*! no static exports found */

    /***/
    function c2Kr(module, exports, __webpack_require__) {
      (function () {
        if (typeof self === 'undefined' || !self.Prism || !self.document) {
          return;
        }

        if (!Prism.plugins.toolbar) {
          console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');
          return;
        }

        var ClipboardJS = window.ClipboardJS || undefined;

        if (!ClipboardJS && "function" === 'function') {
          ClipboardJS = __webpack_require__(
          /*! clipboard */
          "sxGJ");
        }

        var callbacks = [];

        if (!ClipboardJS) {
          var script = document.createElement('script');
          var head = document.querySelector('head');

          script.onload = function () {
            ClipboardJS = window.ClipboardJS;

            if (ClipboardJS) {
              while (callbacks.length) {
                callbacks.pop()();
              }
            }
          };

          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js';
          head.appendChild(script);
        }

        Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
          var linkCopy = document.createElement('button');
          linkCopy.textContent = 'Copy';
          linkCopy.setAttribute('type', 'button');
          var element = env.element;

          if (!ClipboardJS) {
            callbacks.push(registerClipboard);
          } else {
            registerClipboard();
          }

          return linkCopy;

          function registerClipboard() {
            var clip = new ClipboardJS(linkCopy, {
              'text': function text() {
                return element.textContent;
              }
            });
            clip.on('success', function () {
              linkCopy.textContent = 'Copied!';
              resetText();
            });
            clip.on('error', function () {
              linkCopy.textContent = 'Press Ctrl+C to copy';
              resetText();
            });
          }

          function resetText() {
            setTimeout(function () {
              linkCopy.textContent = 'Copy';
            }, 5000);
          }
        });
      })();
      /***/

    },

    /***/
    "eWXi":
    /*!*******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-sass.js ***!
      \*******************************************************/

    /*! no static exports found */

    /***/
    function eWXi(module, exports) {
      (function (Prism) {
        Prism.languages.sass = Prism.languages.extend('css', {
          // Sass comments don't need to be closed, only indented
          'comment': {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
            lookbehind: true
          }
        });
        Prism.languages.insertBefore('sass', 'atrule', {
          // We want to consume the whole line
          'atrule-line': {
            // Includes support for = and + shortcuts
            pattern: /^(?:[ \t]*)[@+=].+/m,
            inside: {
              'atrule': /(?:@[\w-]+|[+=])/m
            }
          }
        });
        delete Prism.languages.sass.atrule;
        var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
        var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
          pattern: /(\s+)-(?=\s)/,
          lookbehind: true
        }];
        Prism.languages.insertBefore('sass', 'property', {
          // We want to consume the whole line
          'variable-line': {
            pattern: /^[ \t]*\$.+/m,
            inside: {
              'punctuation': /:/,
              'variable': variable,
              'operator': operator
            }
          },
          // We want to consume the whole line
          'property-line': {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
            inside: {
              'property': [/[^:\s]+(?=\s*:)/, {
                pattern: /(:)[^:\s]+/,
                lookbehind: true
              }],
              'punctuation': /:/,
              'variable': variable,
              'operator': operator,
              'important': Prism.languages.sass.important
            }
          }
        });
        delete Prism.languages.sass.property;
        delete Prism.languages.sass.important; // Now that whole lines for other patterns are consumed,
        // what's left should be selectors

        Prism.languages.insertBefore('sass', 'punctuation', {
          'selector': {
            pattern: /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
            lookbehind: true
          }
        });
      })(Prism);
      /***/

    },

    /***/
    "gAkk":
    /*!*******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-bash.js ***!
      \*******************************************************/

    /*! no static exports found */

    /***/
    function gAkk(module, exports) {
      (function (Prism) {
        // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
        // + LC_ALL, RANDOM, REPLY, SECONDS.
        // + make sure PS1..4 are here as they are not always set,
        // - some useless things.
        var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';
        var commandAfterHeredoc = {
          pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
          lookbehind: true,
          alias: 'punctuation',
          // this looks reasonably well in all themes
          inside: null // see below

        };
        var insideString = {
          'bash': commandAfterHeredoc,
          'environment': {
            pattern: RegExp("\\$" + envVars),
            alias: 'constant'
          },
          'variable': [// [0]: Arithmetic Environment
          {
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: true,
            inside: {
              // If there is a $ sign at the beginning highlight $(( and )) as variable
              'variable': [{
                pattern: /(^\$\(\([\s\S]+)\)\)/,
                lookbehind: true
              }, /^\$\(\(/],
              'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
              // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
              'operator': /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
              // If there is no $ sign at the beginning highlight (( and )) as punctuation
              'punctuation': /\(\(?|\)\)?|,|;/
            }
          }, // [1]: Command Substitution
          {
            pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
            greedy: true,
            inside: {
              'variable': /^\$\(|^`|\)$|`$/
            }
          }, // [2]: Brace expansion
          {
            pattern: /\$\{[^}]+\}/,
            greedy: true,
            inside: {
              'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
              'punctuation': /[\[\]]/,
              'environment': {
                pattern: RegExp("(\\{)" + envVars),
                lookbehind: true,
                alias: 'constant'
              }
            }
          }, /\$(?:\w+|[#?*!@$])/],
          // Escape sequences from echo and printf's manuals, and escaped quotes.
          'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
        };
        Prism.languages.bash = {
          'shebang': {
            pattern: /^#!\s*\/.*/,
            alias: 'important'
          },
          'comment': {
            pattern: /(^|[^"{\\$])#.*/,
            lookbehind: true
          },
          'function-name': [// a) function foo {
          // b) foo() {
          // c) function foo() {
          // but not “foo {”
          {
            // a) and c)
            pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: true,
            alias: 'function'
          }, {
            // b)
            pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
            alias: 'function'
          }],
          // Highlight variable names as variables in for and select beginnings.
          'for-or-select': {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: 'variable',
            lookbehind: true
          },
          // Highlight variable names as variables in the left-hand part
          // of assignments (“=” and “+=”).
          'assign-left': {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
            inside: {
              'environment': {
                pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
                lookbehind: true,
                alias: 'constant'
              }
            },
            alias: 'variable',
            lookbehind: true
          },
          'string': [// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
          {
            pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: true,
            greedy: true,
            inside: insideString
          }, // Here-document with quotes around the tag
          // → No expansion (so no “inside”).
          {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: true,
            greedy: true,
            inside: {
              'bash': commandAfterHeredoc
            }
          }, // “Normal” string
          {
            pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
            lookbehind: true,
            greedy: true,
            inside: insideString
          }],
          'environment': {
            pattern: RegExp("\\$?" + envVars),
            alias: 'constant'
          },
          'variable': insideString.variable,
          'function': {
            pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: true
          },
          'keyword': {
            pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
            lookbehind: true
          },
          // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
          'builtin': {
            pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
            lookbehind: true,
            // Alias added to make those easier to distinguish from strings.
            alias: 'class-name'
          },
          'boolean': {
            pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
            lookbehind: true
          },
          'file-descriptor': {
            pattern: /\B&\d\b/,
            alias: 'important'
          },
          'operator': {
            // Lots of redirections here, but not just that.
            pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
            inside: {
              'file-descriptor': {
                pattern: /^\d/,
                alias: 'important'
              }
            }
          },
          'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
          'number': {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: true
          }
        };
        commandAfterHeredoc.inside = Prism.languages.bash;
        /* Patterns in command substitution. */

        var toBeCopied = ['comment', 'function-name', 'for-or-select', 'assign-left', 'string', 'environment', 'function', 'keyword', 'builtin', 'boolean', 'file-descriptor', 'operator', 'punctuation', 'number'];
        var inside = insideString.variable[1].inside;

        for (var i = 0; i < toBeCopied.length; i++) {
          inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
        }

        Prism.languages.shell = Prism.languages.bash;
      })(Prism);
      /***/

    },

    /***/
    "gmzG":
    /*!***********************************************************!*\
      !*** ./node_modules/prismjs/components/prism-markdown.js ***!
      \***********************************************************/

    /*! no static exports found */

    /***/
    function gmzG(module, exports) {
      (function (Prism) {
        // Allow only one line break
        var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))/.source;
        /**
         * This function is intended for the creation of the bold or italic pattern.
         *
         * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
         *
         * _Note:_ Keep in mind that this adds a capturing group.
         *
         * @param {string} pattern
         * @returns {RegExp}
         */

        function createInline(pattern) {
          pattern = pattern.replace(/<inner>/g, function () {
            return inner;
          });
          return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
        }

        var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
        var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () {
          return tableCell;
        });
        var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
        Prism.languages.markdown = Prism.languages.extend('markup', {});
        Prism.languages.insertBefore('markdown', 'prolog', {
          'front-matter-block': {
            pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
            lookbehind: true,
            greedy: true,
            inside: {
              'punctuation': /^---|---$/,
              'font-matter': {
                pattern: /\S+(?:\s+\S+)*/,
                alias: ['yaml', 'language-yaml'],
                inside: Prism.languages.yaml
              }
            }
          },
          'blockquote': {
            // > ...
            pattern: /^>(?:[\t ]*>)*/m,
            alias: 'punctuation'
          },
          'table': {
            pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
            inside: {
              'table-data-rows': {
                pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
                lookbehind: true,
                inside: {
                  'table-data': {
                    pattern: RegExp(tableCell),
                    inside: Prism.languages.markdown
                  },
                  'punctuation': /\|/
                }
              },
              'table-line': {
                pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
                lookbehind: true,
                inside: {
                  'punctuation': /\||:?-{3,}:?/
                }
              },
              'table-header-row': {
                pattern: RegExp('^' + tableRow + '$'),
                inside: {
                  'table-header': {
                    pattern: RegExp(tableCell),
                    alias: 'important',
                    inside: Prism.languages.markdown
                  },
                  'punctuation': /\|/
                }
              }
            }
          },
          'code': [{
            // Prefixed by 4 spaces or 1 tab and preceded by an empty line
            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: true,
            alias: 'keyword'
          }, {
            // `code`
            // ``code``
            pattern: /``.+?``|`[^`\r\n]+`/,
            alias: 'keyword'
          }, {
            // ```optional language
            // code block
            // ```
            pattern: /^```[\s\S]*?^```$/m,
            greedy: true,
            inside: {
              'code-block': {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: true
              },
              'code-language': {
                pattern: /^(```).+/,
                lookbehind: true
              },
              'punctuation': /```/
            }
          }],
          'title': [{
            // title 1
            // =======
            // title 2
            // -------
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: 'important',
            inside: {
              punctuation: /==+$|--+$/
            }
          }, {
            // # title 1
            // ###### title 6
            pattern: /(^\s*)#.+/m,
            lookbehind: true,
            alias: 'important',
            inside: {
              punctuation: /^#+|#+$/
            }
          }],
          'hr': {
            // ***
            // ---
            // * * *
            // -----------
            pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: true,
            alias: 'punctuation'
          },
          'list': {
            // * item
            // + item
            // - item
            // 1. item
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: true,
            alias: 'punctuation'
          },
          'url-reference': {
            // [id]: http://example.com "Optional title"
            // [id]: http://example.com 'Optional title'
            // [id]: http://example.com (Optional title)
            // [id]: <http://example.com> "Optional title"
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              'variable': {
                pattern: /^(!?\[)[^\]]+/,
                lookbehind: true
              },
              'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              'punctuation': /^[\[\]!:]|[<>]/
            },
            alias: 'url'
          },
          'bold': {
            // **strong**
            // __strong__
            // allow one nested instance of italic text using the same delimiter
            pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              'content': {
                pattern: /(^..)[\s\S]+(?=..$)/,
                lookbehind: true,
                inside: {} // see below

              },
              'punctuation': /\*\*|__/
            }
          },
          'italic': {
            // *em*
            // _em_
            // allow one nested instance of bold text using the same delimiter
            pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              'content': {
                pattern: /(^.)[\s\S]+(?=.$)/,
                lookbehind: true,
                inside: {} // see below

              },
              'punctuation': /[*_]/
            }
          },
          'strike': {
            // ~~strike through~~
            // ~strike~
            pattern: createInline(/(~~?)(?:(?!~)<inner>)+?\2/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              'content': {
                pattern: /(^~~?)[\s\S]+(?=\1$)/,
                lookbehind: true,
                inside: {} // see below

              },
              'punctuation': /~~?/
            }
          },
          'url': {
            // [example](http://example.com "Optional title")
            // [example][id]
            // [example] [id]
            pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              'operator': /^!/,
              'content': {
                pattern: /(^\[)[^\]]+(?=\])/,
                lookbehind: true,
                inside: {} // see below

              },
              'variable': {
                pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                lookbehind: true
              },
              'url': {
                pattern: /(^\]\()[^\s)]+/,
                lookbehind: true
              },
              'string': {
                pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                lookbehind: true
              }
            }
          }
        });
        ['url', 'bold', 'italic', 'strike'].forEach(function (token) {
          ['url', 'bold', 'italic', 'strike'].forEach(function (inside) {
            if (token !== inside) {
              Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
            }
          });
        });
        Prism.hooks.add('after-tokenize', function (env) {
          if (env.language !== 'markdown' && env.language !== 'md') {
            return;
          }

          function walkTokens(tokens) {
            if (!tokens || typeof tokens === 'string') {
              return;
            }

            for (var i = 0, l = tokens.length; i < l; i++) {
              var token = tokens[i];

              if (token.type !== 'code') {
                walkTokens(token.content);
                continue;
              }
              /*
               * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
               * is optional. But the grammar is defined so that there is only one case we have to handle:
               *
               * token.content = [
               *     <span class="punctuation">```</span>,
               *     <span class="code-language">xxxx</span>,
               *     '\n', // exactly one new lines (\r or \n or \r\n)
               *     <span class="code-block">...</span>,
               *     '\n', // exactly one new lines again
               *     <span class="punctuation">```</span>
               * ];
               */


              var codeLang = token.content[1];
              var codeBlock = token.content[3];

              if (codeLang && codeBlock && codeLang.type === 'code-language' && codeBlock.type === 'code-block' && typeof codeLang.content === 'string') {
                // this might be a language that Prism does not support
                // do some replacements to support C++, C#, and F#
                var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'); // only use the first word

                lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
                var alias = 'language-' + lang; // add alias

                if (!codeBlock.alias) {
                  codeBlock.alias = [alias];
                } else if (typeof codeBlock.alias === 'string') {
                  codeBlock.alias = [codeBlock.alias, alias];
                } else {
                  codeBlock.alias.push(alias);
                }
              }
            }
          }

          walkTokens(env.tokens);
        });
        Prism.hooks.add('wrap', function (env) {
          if (env.type !== 'code-block') {
            return;
          }

          var codeLang = '';

          for (var i = 0, l = env.classes.length; i < l; i++) {
            var cls = env.classes[i];
            var match = /language-(.+)/.exec(cls);

            if (match) {
              codeLang = match[1];
              break;
            }
          }

          var grammar = Prism.languages[codeLang];

          if (!grammar) {
            if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
              var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
              env.attributes['id'] = id;
              Prism.plugins.autoloader.loadLanguages(codeLang, function () {
                var ele = document.getElementById(id);

                if (ele) {
                  ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
                }
              });
            }
          } else {
            // reverse Prism.util.encode
            var code = env.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
            env.content = Prism.highlight(code, grammar, codeLang);
          }
        });
        Prism.languages.md = Prism.languages.markdown;
      })(Prism);
      /***/

    },

    /***/
    "hnpa":
    /*!*******************************************************!*\
      !*** ./node_modules/prismjs/components/prism-scss.js ***!
      \*******************************************************/

    /*! no static exports found */

    /***/
    function hnpa(module, exports) {
      Prism.languages.scss = Prism.languages.extend('css', {
        'comment': {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
          lookbehind: true
        },
        'atrule': {
          pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
          inside: {
            'rule': /@[\w-]+/ // See rest below

          }
        },
        // url, compassified
        'url': /(?:[-a-z]+-)?url(?=\()/i,
        // CSS selector regex is not appropriate for Sass
        // since there can be lot more things (var, @ directive, nesting..)
        // a selector must start at the end of a property or after a brace (end of other rules or nesting)
        // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
        // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
        // can "pass" as a selector- e.g: proper#{$erty})
        // this one was hard to do, so please be careful if you edit this one :)
        'selector': {
          // Initial look-ahead is used to prevent matching of blank selectors
          pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
          inside: {
            'parent': {
              pattern: /&/,
              alias: 'important'
            },
            'placeholder': /%[-\w]+/,
            'variable': /\$[-\w]+|#\{\$[-\w]+\}/
          }
        },
        'property': {
          pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
          inside: {
            'variable': /\$[-\w]+|#\{\$[-\w]+\}/
          }
        }
      });
      Prism.languages.insertBefore('scss', 'atrule', {
        'keyword': [/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i, {
          pattern: /( +)(?:from|through)(?= )/,
          lookbehind: true
        }]
      });
      Prism.languages.insertBefore('scss', 'important', {
        // var and interpolated vars
        'variable': /\$[-\w]+|#\{\$[-\w]+\}/
      });
      Prism.languages.insertBefore('scss', 'function', {
        'module-modifier': {
          pattern: /\b(?:as|with|show|hide)\b/i,
          alias: 'keyword'
        },
        'placeholder': {
          pattern: /%[-\w]+/,
          alias: 'selector'
        },
        'statement': {
          pattern: /\B!(?:default|optional)\b/i,
          alias: 'keyword'
        },
        'boolean': /\b(?:true|false)\b/,
        'null': {
          pattern: /\bnull\b/,
          alias: 'keyword'
        },
        'operator': {
          pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
          lookbehind: true
        }
      });
      Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;
      /***/
    },

    /***/
    "ipBb":
    /*!*****************************************************************************!*\
      !*** ./node_modules/prismjs/plugins/diff-highlight/prism-diff-highlight.js ***!
      \*****************************************************************************/

    /*! no static exports found */

    /***/
    function ipBb(module, exports) {
      (function () {
        if (typeof Prism === 'undefined') {
          return;
        }

        var LANGUAGE_REGEX = /^diff-([\w-]+)/i;
        var HTML_TAG = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi; //this will match a line plus the line break while ignoring the line breaks HTML tags may contain.

        var HTML_LINE = RegExp(/(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))/.source.replace(/__/g, function () {
          return HTML_TAG.source;
        }), 'gi');
        var warningLogged = false;
        Prism.hooks.add('before-sanity-check', function (env) {
          var lang = env.language;

          if (LANGUAGE_REGEX.test(lang) && !env.grammar) {
            env.grammar = Prism.languages[lang] = Prism.languages.diff;
          }
        });
        Prism.hooks.add('before-tokenize', function (env) {
          if (!warningLogged && !Prism.languages.diff && !Prism.plugins.autoloader) {
            warningLogged = true;
            console.warn("Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js)." + "Make sure the language definition is loaded or use Prism's Autoloader plugin.");
          }

          var lang = env.language;

          if (LANGUAGE_REGEX.test(lang) && !Prism.languages[lang]) {
            Prism.languages[lang] = Prism.languages.diff;
          }
        });
        Prism.hooks.add('wrap', function (env) {
          var diffLanguage, diffGrammar;

          if (env.language !== 'diff') {
            var langMatch = LANGUAGE_REGEX.exec(env.language);

            if (!langMatch) {
              return; // not a language specific diff
            }

            diffLanguage = langMatch[1];
            diffGrammar = Prism.languages[diffLanguage];
          }

          var PREFIXES = Prism.languages.diff && Prism.languages.diff.PREFIXES; // one of the diff tokens without any nested tokens

          if (PREFIXES && env.type in PREFIXES) {
            /** @type {string} */
            var content = env.content.replace(HTML_TAG, ''); // remove all HTML tags

            /** @type {string} */

            var decoded = content.replace(/&lt;/g, '<').replace(/&amp;/g, '&'); // remove any one-character prefix

            var code = decoded.replace(/(^|[\r\n])./g, '$1'); // highlight, if possible

            var highlighted;

            if (diffGrammar) {
              highlighted = Prism.highlight(code, diffGrammar, diffLanguage);
            } else {
              highlighted = Prism.util.encode(code);
            } // get the HTML source of the prefix token


            var prefixToken = new Prism.Token('prefix', PREFIXES[env.type], [/\w+/.exec(env.type)[0]]);
            var prefix = Prism.Token.stringify(prefixToken, env.language); // add prefix

            var lines = [],
                m;
            HTML_LINE.lastIndex = 0;

            while (m = HTML_LINE.exec(highlighted)) {
              lines.push(prefix + m[0]);
            }

            if (/(?:^|[\r\n]).$/.test(decoded)) {
              // because both "+a\n+" and "+a\n" will map to "a\n" after the line prefixes are removed
              lines.push(prefix);
            }

            env.content = lines.join('');

            if (diffGrammar) {
              env.classes.push('language-' + diffLanguage);
            }
          }
        });
      })();
      /***/

    },

    /***/
    "sxGJ":
    /*!**************************************************!*\
      !*** ./node_modules/clipboard/dist/clipboard.js ***!
      \**************************************************/

    /*! no static exports found */

    /***/
    function sxGJ(module, exports, __webpack_require__) {
      /*!
       * clipboard.js v2.0.8
       * https://clipboardjs.com/
       *
       * Licensed MIT © Zeno Rocha
       */
      (function webpackUniversalModuleDefinition(root, factory) {
        if (true) module.exports = factory();else {}
      })(this, function () {
        return (
          /******/
          function () {
            // webpackBootstrap

            /******/
            var __webpack_modules__ = {
              /***/
              134:
              /***/
              function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict"; // EXPORTS

                __webpack_require__.d(__webpack_exports__, {
                  "default": function _default() {
                    return (
                      /* binding */
                      clipboard
                    );
                  }
                }); // EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js


                var tiny_emitter = __webpack_require__(279);

                var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter); // EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js


                var listen = __webpack_require__(370);

                var listen_default = /*#__PURE__*/__webpack_require__.n(listen); // EXTERNAL MODULE: ./node_modules/select/src/select.js


                var src_select = __webpack_require__(817);

                var select_default = /*#__PURE__*/__webpack_require__.n(src_select);

                ; // CONCATENATED MODULE: ./src/clipboard-action.js

                function _typeof(obj) {
                  "@babel/helpers - typeof";

                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                      return typeof obj;
                    };
                  } else {
                    _typeof = function _typeof(obj) {
                      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                  }

                  return _typeof(obj);
                }

                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                  }
                }

                function _defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }

                function _createClass(Constructor, protoProps, staticProps) {
                  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) _defineProperties(Constructor, staticProps);
                  return Constructor;
                }
                /**
                 * Inner class which performs selection from either `text` or `target`
                 * properties and then executes copy or cut operations.
                 */


                var ClipboardAction = /*#__PURE__*/function () {
                  /**
                   * @param {Object} options
                   */
                  function ClipboardAction(options) {
                    _classCallCheck(this, ClipboardAction);

                    this.resolveOptions(options);
                    this.initSelection();
                  }
                  /**
                   * Defines base properties passed from constructor.
                   * @param {Object} options
                   */


                  _createClass(ClipboardAction, [{
                    key: "resolveOptions",
                    value: function resolveOptions() {
                      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                      this.action = options.action;
                      this.container = options.container;
                      this.emitter = options.emitter;
                      this.target = options.target;
                      this.text = options.text;
                      this.trigger = options.trigger;
                      this.selectedText = '';
                    }
                    /**
                     * Decides which selection strategy is going to be applied based
                     * on the existence of `text` and `target` properties.
                     */

                  }, {
                    key: "initSelection",
                    value: function initSelection() {
                      if (this.text) {
                        this.selectFake();
                      } else if (this.target) {
                        this.selectTarget();
                      }
                    }
                    /**
                     * Creates a fake textarea element, sets its value from `text` property,
                     */

                  }, {
                    key: "createFakeElement",
                    value: function createFakeElement() {
                      var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
                      this.fakeElem = document.createElement('textarea'); // Prevent zooming on iOS

                      this.fakeElem.style.fontSize = '12pt'; // Reset box model

                      this.fakeElem.style.border = '0';
                      this.fakeElem.style.padding = '0';
                      this.fakeElem.style.margin = '0'; // Move element out of screen horizontally

                      this.fakeElem.style.position = 'absolute';
                      this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

                      var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                      this.fakeElem.style.top = "".concat(yPosition, "px");
                      this.fakeElem.setAttribute('readonly', '');
                      this.fakeElem.value = this.text;
                      return this.fakeElem;
                    }
                    /**
                     * Get's the value of fakeElem,
                     * and makes a selection on it.
                     */

                  }, {
                    key: "selectFake",
                    value: function selectFake() {
                      var _this = this;

                      var fakeElem = this.createFakeElement();

                      this.fakeHandlerCallback = function () {
                        return _this.removeFake();
                      };

                      this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
                      this.container.appendChild(fakeElem);
                      this.selectedText = select_default()(fakeElem);
                      this.copyText();
                      this.removeFake();
                    }
                    /**
                     * Only removes the fake element after another click event, that way
                     * a user can hit `Ctrl+C` to copy because selection still exists.
                     */

                  }, {
                    key: "removeFake",
                    value: function removeFake() {
                      if (this.fakeHandler) {
                        this.container.removeEventListener('click', this.fakeHandlerCallback);
                        this.fakeHandler = null;
                        this.fakeHandlerCallback = null;
                      }

                      if (this.fakeElem) {
                        this.container.removeChild(this.fakeElem);
                        this.fakeElem = null;
                      }
                    }
                    /**
                     * Selects the content from element passed on `target` property.
                     */

                  }, {
                    key: "selectTarget",
                    value: function selectTarget() {
                      this.selectedText = select_default()(this.target);
                      this.copyText();
                    }
                    /**
                     * Executes the copy operation based on the current selection.
                     */

                  }, {
                    key: "copyText",
                    value: function copyText() {
                      var succeeded;

                      try {
                        succeeded = document.execCommand(this.action);
                      } catch (err) {
                        succeeded = false;
                      }

                      this.handleResult(succeeded);
                    }
                    /**
                     * Fires an event based on the copy operation result.
                     * @param {Boolean} succeeded
                     */

                  }, {
                    key: "handleResult",
                    value: function handleResult(succeeded) {
                      this.emitter.emit(succeeded ? 'success' : 'error', {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                      });
                    }
                    /**
                     * Moves focus away from `target` and back to the trigger, removes current selection.
                     */

                  }, {
                    key: "clearSelection",
                    value: function clearSelection() {
                      if (this.trigger) {
                        this.trigger.focus();
                      }

                      document.activeElement.blur();
                      window.getSelection().removeAllRanges();
                    }
                    /**
                     * Sets the `action` to be performed which can be either 'copy' or 'cut'.
                     * @param {String} action
                     */

                  }, {
                    key: "destroy",

                    /**
                     * Destroy lifecycle.
                     */
                    value: function destroy() {
                      this.removeFake();
                    }
                  }, {
                    key: "action",
                    set: function set() {
                      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
                      this._action = action;

                      if (this._action !== 'copy' && this._action !== 'cut') {
                        throw new Error('Invalid "action" value, use either "copy" or "cut"');
                      }
                    }
                    /**
                     * Gets the `action` property.
                     * @return {String}
                     */
                    ,
                    get: function get() {
                      return this._action;
                    }
                    /**
                     * Sets the `target` property using an element
                     * that will be have its content copied.
                     * @param {Element} target
                     */

                  }, {
                    key: "target",
                    set: function set(target) {
                      if (target !== undefined) {
                        if (target && _typeof(target) === 'object' && target.nodeType === 1) {
                          if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                          }

                          if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                          }

                          this._target = target;
                        } else {
                          throw new Error('Invalid "target" value, use a valid Element');
                        }
                      }
                    }
                    /**
                     * Gets the `target` property.
                     * @return {String|HTMLElement}
                     */
                    ,
                    get: function get() {
                      return this._target;
                    }
                  }]);

                  return ClipboardAction;
                }();
                /* harmony default export */


                var clipboard_action = ClipboardAction;
                ; // CONCATENATED MODULE: ./src/clipboard.js

                function clipboard_typeof(obj) {
                  "@babel/helpers - typeof";

                  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    clipboard_typeof = function _typeof(obj) {
                      return typeof obj;
                    };
                  } else {
                    clipboard_typeof = function _typeof(obj) {
                      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                  }

                  return clipboard_typeof(obj);
                }

                function clipboard_classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                  }
                }

                function clipboard_defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }

                function clipboard_createClass(Constructor, protoProps, staticProps) {
                  if (protoProps) clipboard_defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) clipboard_defineProperties(Constructor, staticProps);
                  return Constructor;
                }

                function _inherits(subClass, superClass) {
                  if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                  }

                  subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                      value: subClass,
                      writable: true,
                      configurable: true
                    }
                  });
                  if (superClass) _setPrototypeOf(subClass, superClass);
                }

                function _setPrototypeOf(o, p) {
                  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                  };

                  return _setPrototypeOf(o, p);
                }

                function _createSuper(Derived) {
                  var hasNativeReflectConstruct = _isNativeReflectConstruct();

                  return function _createSuperInternal() {
                    var Super = _getPrototypeOf(Derived),
                        result;

                    if (hasNativeReflectConstruct) {
                      var NewTarget = _getPrototypeOf(this).constructor;

                      result = Reflect.construct(Super, arguments, NewTarget);
                    } else {
                      result = Super.apply(this, arguments);
                    }

                    return _possibleConstructorReturn(this, result);
                  };
                }

                function _possibleConstructorReturn(self, call) {
                  if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                  }

                  return _assertThisInitialized(self);
                }

                function _assertThisInitialized(self) {
                  if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  }

                  return self;
                }

                function _isNativeReflectConstruct() {
                  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                  if (Reflect.construct.sham) return false;
                  if (typeof Proxy === "function") return true;

                  try {
                    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
                    return true;
                  } catch (e) {
                    return false;
                  }
                }

                function _getPrototypeOf(o) {
                  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                  };
                  return _getPrototypeOf(o);
                }
                /**
                 * Helper function to retrieve attribute value.
                 * @param {String} suffix
                 * @param {Element} element
                 */


                function getAttributeValue(suffix, element) {
                  var attribute = "data-clipboard-".concat(suffix);

                  if (!element.hasAttribute(attribute)) {
                    return;
                  }

                  return element.getAttribute(attribute);
                }
                /**
                 * Base class which takes one or more elements, adds event listeners to them,
                 * and instantiates a new `ClipboardAction` on each click.
                 */


                var Clipboard = /*#__PURE__*/function (_Emitter) {
                  _inherits(Clipboard, _Emitter);

                  var _super = _createSuper(Clipboard);
                  /**
                   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                   * @param {Object} options
                   */


                  function Clipboard(trigger, options) {
                    var _this;

                    clipboard_classCallCheck(this, Clipboard);
                    _this = _super.call(this);

                    _this.resolveOptions(options);

                    _this.listenClick(trigger);

                    return _this;
                  }
                  /**
                   * Defines if attributes would be resolved using internal setter functions
                   * or custom functions that were passed in the constructor.
                   * @param {Object} options
                   */


                  clipboard_createClass(Clipboard, [{
                    key: "resolveOptions",
                    value: function resolveOptions() {
                      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
                    }
                    /**
                     * Adds a click event listener to the passed trigger.
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     */

                  }, {
                    key: "listenClick",
                    value: function listenClick(trigger) {
                      var _this2 = this;

                      this.listener = listen_default()(trigger, 'click', function (e) {
                        return _this2.onClick(e);
                      });
                    }
                    /**
                     * Defines a new `ClipboardAction` on each click event.
                     * @param {Event} e
                     */

                  }, {
                    key: "onClick",
                    value: function onClick(e) {
                      var trigger = e.delegateTarget || e.currentTarget;

                      if (this.clipboardAction) {
                        this.clipboardAction = null;
                      }

                      this.clipboardAction = new clipboard_action({
                        action: this.action(trigger),
                        target: this.target(trigger),
                        text: this.text(trigger),
                        container: this.container,
                        trigger: trigger,
                        emitter: this
                      });
                    }
                    /**
                     * Default `action` lookup function.
                     * @param {Element} trigger
                     */

                  }, {
                    key: "defaultAction",
                    value: function defaultAction(trigger) {
                      return getAttributeValue('action', trigger);
                    }
                    /**
                     * Default `target` lookup function.
                     * @param {Element} trigger
                     */

                  }, {
                    key: "defaultTarget",
                    value: function defaultTarget(trigger) {
                      var selector = getAttributeValue('target', trigger);

                      if (selector) {
                        return document.querySelector(selector);
                      }
                    }
                    /**
                     * Returns the support of the given action, or all actions if no action is
                     * given.
                     * @param {String} [action]
                     */

                  }, {
                    key: "defaultText",

                    /**
                     * Default `text` lookup function.
                     * @param {Element} trigger
                     */
                    value: function defaultText(trigger) {
                      return getAttributeValue('text', trigger);
                    }
                    /**
                     * Destroy lifecycle.
                     */

                  }, {
                    key: "destroy",
                    value: function destroy() {
                      this.listener.destroy();

                      if (this.clipboardAction) {
                        this.clipboardAction.destroy();
                        this.clipboardAction = null;
                      }
                    }
                  }], [{
                    key: "isSupported",
                    value: function isSupported() {
                      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
                      var actions = typeof action === 'string' ? [action] : action;
                      var support = !!document.queryCommandSupported;
                      actions.forEach(function (action) {
                        support = support && !!document.queryCommandSupported(action);
                      });
                      return support;
                    }
                  }]);
                  return Clipboard;
                }(tiny_emitter_default());
                /* harmony default export */


                var clipboard = Clipboard;
                /***/
              },

              /***/
              828:
              /***/
              function _(module) {
                var DOCUMENT_NODE_TYPE = 9;
                /**
                 * A polyfill for Element.matches()
                 */

                if (typeof Element !== 'undefined' && !Element.prototype.matches) {
                  var proto = Element.prototype;
                  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                }
                /**
                 * Finds the closest parent that matches a selector.
                 *
                 * @param {Element} element
                 * @param {String} selector
                 * @return {Function}
                 */


                function closest(element, selector) {
                  while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                    if (typeof element.matches === 'function' && element.matches(selector)) {
                      return element;
                    }

                    element = element.parentNode;
                  }
                }

                module.exports = closest;
                /***/
              },

              /***/
              438:
              /***/
              function _(module, __unused_webpack_exports, __webpack_require__) {
                var closest = __webpack_require__(828);
                /**
                 * Delegates event to a selector.
                 *
                 * @param {Element} element
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @param {Boolean} useCapture
                 * @return {Object}
                 */


                function _delegate(element, selector, type, callback, useCapture) {
                  var listenerFn = listener.apply(this, arguments);
                  element.addEventListener(type, listenerFn, useCapture);
                  return {
                    destroy: function destroy() {
                      element.removeEventListener(type, listenerFn, useCapture);
                    }
                  };
                }
                /**
                 * Delegates event to a selector.
                 *
                 * @param {Element|String|Array} [elements]
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @param {Boolean} useCapture
                 * @return {Object}
                 */


                function delegate(elements, selector, type, callback, useCapture) {
                  // Handle the regular Element usage
                  if (typeof elements.addEventListener === 'function') {
                    return _delegate.apply(null, arguments);
                  } // Handle Element-less usage, it defaults to global delegation


                  if (typeof type === 'function') {
                    // Use `document` as the first parameter, then apply arguments
                    // This is a short way to .unshift `arguments` without running into deoptimizations
                    return _delegate.bind(null, document).apply(null, arguments);
                  } // Handle Selector-based usage


                  if (typeof elements === 'string') {
                    elements = document.querySelectorAll(elements);
                  } // Handle Array-like based usage


                  return Array.prototype.map.call(elements, function (element) {
                    return _delegate(element, selector, type, callback, useCapture);
                  });
                }
                /**
                 * Finds closest match and invokes callback.
                 *
                 * @param {Element} element
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Function}
                 */


                function listener(element, selector, type, callback) {
                  return function (e) {
                    e.delegateTarget = closest(e.target, selector);

                    if (e.delegateTarget) {
                      callback.call(element, e);
                    }
                  };
                }

                module.exports = delegate;
                /***/
              },

              /***/
              879:
              /***/
              function _(__unused_webpack_module, exports) {
                /**
                 * Check if argument is a HTML element.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */
                exports.node = function (value) {
                  return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
                };
                /**
                 * Check if argument is a list of HTML elements.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */


                exports.nodeList = function (value) {
                  var type = Object.prototype.toString.call(value);
                  return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
                };
                /**
                 * Check if argument is a string.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */


                exports.string = function (value) {
                  return typeof value === 'string' || value instanceof String;
                };
                /**
                 * Check if argument is a function.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */


                exports.fn = function (value) {
                  var type = Object.prototype.toString.call(value);
                  return type === '[object Function]';
                };
                /***/

              },

              /***/
              370:
              /***/
              function _(module, __unused_webpack_exports, __webpack_require__) {
                var is = __webpack_require__(879);

                var delegate = __webpack_require__(438);
                /**
                 * Validates all params and calls the right
                 * listener function based on its target type.
                 *
                 * @param {String|HTMLElement|HTMLCollection|NodeList} target
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */


                function listen(target, type, callback) {
                  if (!target && !type && !callback) {
                    throw new Error('Missing required arguments');
                  }

                  if (!is.string(type)) {
                    throw new TypeError('Second argument must be a String');
                  }

                  if (!is.fn(callback)) {
                    throw new TypeError('Third argument must be a Function');
                  }

                  if (is.node(target)) {
                    return listenNode(target, type, callback);
                  } else if (is.nodeList(target)) {
                    return listenNodeList(target, type, callback);
                  } else if (is.string(target)) {
                    return listenSelector(target, type, callback);
                  } else {
                    throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
                  }
                }
                /**
                 * Adds an event listener to a HTML element
                 * and returns a remove listener function.
                 *
                 * @param {HTMLElement} node
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */


                function listenNode(node, type, callback) {
                  node.addEventListener(type, callback);
                  return {
                    destroy: function destroy() {
                      node.removeEventListener(type, callback);
                    }
                  };
                }
                /**
                 * Add an event listener to a list of HTML elements
                 * and returns a remove listener function.
                 *
                 * @param {NodeList|HTMLCollection} nodeList
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */


                function listenNodeList(nodeList, type, callback) {
                  Array.prototype.forEach.call(nodeList, function (node) {
                    node.addEventListener(type, callback);
                  });
                  return {
                    destroy: function destroy() {
                      Array.prototype.forEach.call(nodeList, function (node) {
                        node.removeEventListener(type, callback);
                      });
                    }
                  };
                }
                /**
                 * Add an event listener to a selector
                 * and returns a remove listener function.
                 *
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */


                function listenSelector(selector, type, callback) {
                  return delegate(document.body, selector, type, callback);
                }

                module.exports = listen;
                /***/
              },

              /***/
              817:
              /***/
              function _(module) {
                function select(element) {
                  var selectedText;

                  if (element.nodeName === 'SELECT') {
                    element.focus();
                    selectedText = element.value;
                  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
                    var isReadOnly = element.hasAttribute('readonly');

                    if (!isReadOnly) {
                      element.setAttribute('readonly', '');
                    }

                    element.select();
                    element.setSelectionRange(0, element.value.length);

                    if (!isReadOnly) {
                      element.removeAttribute('readonly');
                    }

                    selectedText = element.value;
                  } else {
                    if (element.hasAttribute('contenteditable')) {
                      element.focus();
                    }

                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    selectedText = selection.toString();
                  }

                  return selectedText;
                }

                module.exports = select;
                /***/
              },

              /***/
              279:
              /***/
              function _(module) {
                function E() {// Keep this empty so it's easier to inherit from
                  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
                }

                E.prototype = {
                  on: function on(name, callback, ctx) {
                    var e = this.e || (this.e = {});
                    (e[name] || (e[name] = [])).push({
                      fn: callback,
                      ctx: ctx
                    });
                    return this;
                  },
                  once: function once(name, callback, ctx) {
                    var self = this;

                    function listener() {
                      self.off(name, listener);
                      callback.apply(ctx, arguments);
                    }

                    ;
                    listener._ = callback;
                    return this.on(name, listener, ctx);
                  },
                  emit: function emit(name) {
                    var data = [].slice.call(arguments, 1);
                    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                    var i = 0;
                    var len = evtArr.length;

                    for (i; i < len; i++) {
                      evtArr[i].fn.apply(evtArr[i].ctx, data);
                    }

                    return this;
                  },
                  off: function off(name, callback) {
                    var e = this.e || (this.e = {});
                    var evts = e[name];
                    var liveEvents = [];

                    if (evts && callback) {
                      for (var i = 0, len = evts.length; i < len; i++) {
                        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
                      }
                    } // Remove event from queue to prevent memory leak
                    // Suggested by https://github.com/lazd
                    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


                    liveEvents.length ? e[name] = liveEvents : delete e[name];
                    return this;
                  }
                };
                module.exports = E;
                module.exports.TinyEmitter = E;
                /***/
              }
              /******/

            };
            /************************************************************************/

            /******/
            // The module cache

            /******/

            var __webpack_module_cache__ = {};
            /******/

            /******/
            // The require function

            /******/

            function __webpack_require__(moduleId) {
              /******/
              // Check if module is in cache

              /******/
              if (__webpack_module_cache__[moduleId]) {
                /******/
                return __webpack_module_cache__[moduleId].exports;
                /******/
              }
              /******/
              // Create a new module (and put it into the cache)

              /******/


              var module = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed

                /******/
                // no module.loaded needed

                /******/
                exports: {}
                /******/

              };
              /******/

              /******/
              // Execute the module function

              /******/

              __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
              /******/

              /******/
              // Return the exports of the module

              /******/


              return module.exports;
              /******/
            }
            /******/

            /************************************************************************/

            /******/

            /* webpack/runtime/compat get default export */

            /******/


            !function () {
              /******/
              // getDefaultExport function for compatibility with non-harmony modules

              /******/
              __webpack_require__.n = function (module) {
                /******/
                var getter = module && module.__esModule ?
                /******/
                function () {
                  return module['default'];
                } :
                /******/
                function () {
                  return module;
                };
                /******/

                __webpack_require__.d(getter, {
                  a: getter
                });
                /******/


                return getter;
                /******/
              };
              /******/

            }();
            /******/

            /******/

            /* webpack/runtime/define property getters */

            /******/

            !function () {
              /******/
              // define getter functions for harmony exports

              /******/
              __webpack_require__.d = function (exports, definition) {
                /******/
                for (var key in definition) {
                  /******/
                  if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/
                    Object.defineProperty(exports, key, {
                      enumerable: true,
                      get: definition[key]
                    });
                    /******/
                  }
                  /******/

                }
                /******/

              };
              /******/

            }();
            /******/

            /******/

            /* webpack/runtime/hasOwnProperty shorthand */

            /******/

            !function () {
              /******/
              __webpack_require__.o = function (obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
              };
              /******/

            }();
            /******/

            /************************************************************************/

            /******/
            // module exports must be returned from runtime so entry inlining is disabled

            /******/
            // startup

            /******/
            // Load entry module and return exports

            /******/

            return __webpack_require__(134);
            /******/
          }()["default"]
        );
      });
      /***/

    },

    /***/
    "v7c+":
    /*!*****************************************************!*\
      !*** ./src/app/blog/blog-nav/blog-nav.component.ts ***!
      \*****************************************************/

    /*! exports provided: BlogNavComponent */

    /***/
    function v7c(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogNavComponent", function () {
        return BlogNavComponent;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @scullyio/ng-lib */
      "sbAP");
      /* harmony import */


      var src_app_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/blog-list/blog-list.service */
      "9eaD");

      function BlogNavComponent_ng_container_0_p_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u7D22\u5F15");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0(a0, a1) {
        return [a0, a1];
      };

      function BlogNavComponent_ng_container_0_li_3_a_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BlogNavComponent_ng_container_0_li_3_a_1_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);

            var route_r8 = ctx.ngIf;

            var header_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

            return ctx_r9.scrollTo(route_r8, header_r6.id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var route_r8 = ctx.ngIf;

          var header_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](2, _c0, ctx_r7.headerClasses(header_r6.localName), ctx_r7.active(route_r8, header_r6.id)));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", header_r6.innerHTML, " ");
        }
      }

      function BlogNavComponent_ng_container_0_li_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BlogNavComponent_ng_container_0_li_3_a_1_Template, 2, 5, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          var tmp_0_0 = null;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, ctx_r3.scullyRoutesService.getCurrent())) == null ? null : tmp_0_0.route);
        }
      }

      function BlogNavComponent_ng_container_0_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "p", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u4E0A\u4E00\u7BC7");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "a", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          var tmp_0_0 = null;
          var tmp_1_0 = null;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 2, ctx_r4.link$)) == null ? null : tmp_0_0.next.route);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 4, ctx_r4.link$)) == null ? null : tmp_1_0.next.title);
        }
      }

      function BlogNavComponent_ng_container_0_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "p", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u4E0B\u4E00\u7BC7");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "a", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          var tmp_0_0 = null;
          var tmp_1_0 = null;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 2, ctx_r5.link$)) == null ? null : tmp_0_0.prev.route);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 4, ctx_r5.link$)) == null ? null : tmp_1_0.prev.title, " ");
        }
      }

      function BlogNavComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BlogNavComponent_ng_container_0_p_1_Template, 2, 0, "p", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ul", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, BlogNavComponent_ng_container_0_li_3_Template, 3, 3, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, BlogNavComponent_ng_container_0_ng_container_4_Template, 8, 6, "ng-container", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, BlogNavComponent_ng_container_0_ng_container_6_Template, 8, 6, "ng-container", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var nav_r1 = ctx.ngIf;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          var tmp_2_0 = null;
          var tmp_3_0 = null;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !!nav_r1.length);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", nav_r1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !!((tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 4, ctx_r0.link$)) == null ? null : tmp_2_0.next));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !!((tmp_3_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 6, ctx_r0.link$)) == null ? null : tmp_3_0.prev));
        }
      }

      var BlogNavComponent = /*#__PURE__*/function () {
        function BlogNavComponent(document, route, location, scullyRoutesService, blogListService) {
          var _this4 = this;

          _classCallCheck2(this, BlogNavComponent);

          this.document = document;
          this.route = route;
          this.location = location;
          this.scullyRoutesService = scullyRoutesService;
          this.blogListService = blogListService;
          this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
          this.link$ = this.scullyRoutesService.getCurrent().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (page) {
            return _this4.blogListService.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (list) {
              var info = list.map(function (e, i) {
                var prev;
                var next;

                if (e.title === page.title) {
                  prev = list[i - 1];
                  next = list[i + 1];
                }

                return {
                  prev: prev,
                  next: next
                };
              }).filter(function (e) {
                return !!e.prev || !!e.next;
              });
              return info[0];
            }));
          }));
        }

        _createClass2(BlogNavComponent, [{
          key: "classes",
          get: function get() {
            return 'block';
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this5 = this;

            // let t = <HTMLAnchorElement>document.getElementById('title'); t.href = '/';
            // let t = document.getElementById('page-title'); t.title = 'Page Title';
            // let t = {} as HTMLAnchorElement; t.href = '/';
            // let t = {}; t.href = '/';
            // console.log('t',t)
            this.nav$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(window, 'AngularReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (ev) {
              return Array.from(_this5.document.querySelectorAll('.prose h2,.prose h3,.prose h4'));
            }));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(window, 'AngularReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (ev) {
              return _this5.route.fragment;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (fragment) {
              return _this5.scullyRoutesService.getCurrent().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (c) {
                return [fragment, c.route];
              }));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  fragment = _ref2[0],
                  route = _ref2[1];

              return !!fragment && !!route;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  fragment = _ref4[0],
                  route = _ref4[1];

              return _this5.scrollTo(route, fragment);
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.onDestroy$)).subscribe(); // const isVisible = (element: Element) => {
            //   const subject = new Subject<Element>();
            //   const observer = new IntersectionObserver(entries => {
            //     entries
            //       .filter(entry => entry.isIntersecting)
            //       .forEach(e => subject.next(element));
            //   });
            //   observer.observe(element);
            //   return subject.pipe(
            //     takeUntil(
            //       this.onDestroy$.pipe(
            //         tap(() => {
            //           observer.disconnect();
            //         })
            //       )
            //     )
            //   );
            // };
            // this.nav$
            //   .pipe(
            //     switchMap(headers => merge(...headers.map(h => isVisible(h)))),
            //     switchMap(el =>
            //       this.scullyRoutesService.getCurrent().pipe(map(c => [el.id, c.route]))
            //     ),
            //     tap(([el, route]) => this.location.replaceState(`${route}#${el}`)),
            //     takeUntil(this.onDestroy$)
            //   )
            //   .subscribe();
            // this.nav$
            //   .pipe(
            //     switchMap(anchors =>
            //       merge(
            //         ...anchors.map(a =>
            //           fromEvent(a, 'click').pipe(
            //             switchMap(ev =>
            //               this.scullyRoutesService
            //                 .getCurrent()
            //                 .pipe(map(c => [a.id, c.route]))
            //             )
            //           )
            //         )
            //       )
            //     ),
            //     tap(([id, route]) => this.scrollTo(route, id)),
            //     takeUntil(this.onDestroy$)
            //   )
            //   .subscribe();
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.onDestroy$.next();
            this.onDestroy$.complete();
          }
        }, {
          key: "scrollTo",
          value: function scrollTo(url, id) {
            var elementTop = this.document.getElementById(id).offsetTop;
            this.location.replaceState("".concat(url, "#").concat(id)); // this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

            window.scroll({
              top: elementTop,
              behavior: 'smooth'
            });
          }
        }, {
          key: "active",
          value: function active(url, id) {
            return this.location.path(true) === "".concat(url, "#").concat(id) ? 'active' : '';
          }
        }, {
          key: "scrollToTop",
          value: function scrollToTop(url) {
            this.location.replaceState("".concat(url));
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          } // scrollToRelated(): void {
          //   const stack = Array.from(
          //     this.document.getElementsByTagName('app-card-stack')
          //   )[0];
          //   stack?.scrollIntoView({ behavior: 'smooth' });
          // }

        }, {
          key: "headerClasses",
          value: function headerClasses(header) {
            if (header === 'h2') {
              // return 'text-lg font-semibold';
              return 'text-base leading-relaxed';
            } else if (header === 'h3') {
              return 'text-sm ml-2';
            } else if (header === 'h4') {
              return 'text-xs ml-4';
            }
          }
        }]);

        return BlogNavComponent;
      }();

      BlogNavComponent.ɵfac = function BlogNavComponent_Factory(t) {
        return new (t || BlogNavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["Location"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyRoutesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_6__["BlogListService"]));
      };

      BlogNavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: BlogNavComponent,
        selectors: [["app-blog-nav"]],
        hostVars: 2,
        hostBindings: function BlogNavComponent_HostBindings(rf, ctx) {
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.classes);
          }
        },
        decls: 3,
        vars: 3,
        consts: [[4, "ngIf"], [1, "md:hidden", "sm:block", "my-8"], ["class", "text-xl font-semibold", 4, "ngIf"], [1, ""], ["class", "cursor-pointer", 4, "ngFor", "ngForOf"], [1, "text-xl", "font-semibold"], [1, "cursor-pointer"], [3, "ngClass", "click", 4, "ngIf"], [3, "ngClass", "click"], [1, "mt-4", "text-lg", "font-semibold"], [3, "routerLink"]],
        template: function BlogNavComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, BlogNavComponent_ng_container_0_Template, 8, 8, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "hr", 1);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, ctx.nav$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLW5hdi5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    "wZee":
    /*!***************************************!*\
      !*** ./node_modules/prismjs/prism.js ***!
      \***************************************/

    /*! no static exports found */

    /***/
    function wZee(module, exports, __webpack_require__) {
      /* **********************************************
           Begin prism-core.js
      ********************************************** */
      /// <reference lib="WebWorker"/>
      var _self = typeof window !== 'undefined' ? window // if in browser
      : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
      : {} // if in node js
      ;
      /**
       * Prism: Lightweight, robust, elegant syntax highlighting
       *
       * @license MIT <https://opensource.org/licenses/MIT>
       * @author Lea Verou <https://lea.verou.me>
       * @namespace
       * @public
       */


      var Prism = function (_self) {
        // Private helper vars
        var lang = /\blang(?:uage)?-([\w-]+)\b/i;
        var uniqueId = 0;
        var _ = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self.Prism && _self.Prism.manual,
          disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
              }
            },

            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function type(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },

            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function objId(obj) {
              if (!obj['__id']) {
                Object.defineProperty(obj, '__id', {
                  value: ++uniqueId
                });
              }

              return obj['__id'];
            },

            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone, id;

              switch (_.util.type(o)) {
                case 'Object':
                  id = _.util.objId(o);

                  if (visited[id]) {
                    return visited[id];
                  }

                  clone =
                  /** @type {Record<string, any>} */
                  {};
                  visited[id] = clone;

                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }

                  return (
                    /** @type {any} */
                    clone
                  );

                case 'Array':
                  id = _.util.objId(o);

                  if (visited[id]) {
                    return visited[id];
                  }

                  clone = [];
                  visited[id] = clone;

                  /** @type {Array} */

                  /** @type {any} */
                  o.forEach(function (v, i) {
                    clone[i] = deepClone(v, visited);
                  });
                  return (
                    /** @type {any} */
                    clone
                  );

                default:
                  return o;
              }
            },

            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function getLanguage(element) {
              while (element && !lang.test(element.className)) {
                element = element.parentElement;
              }

              if (element) {
                return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
              }

              return 'none';
            },

            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function currentScript() {
              if (typeof document === 'undefined') {
                return null;
              }

              if ('currentScript' in document && 1 < 2
              /* hack to trip TS' flow analysis */
              ) {
                  return (
                    /** @type {any} */
                    document.currentScript
                  );
                } // IE11 workaround
              // we'll get the src of the current script by parsing IE11's error stack trace
              // this will not work for inline scripts


              try {
                throw new Error();
              } catch (err) {
                // Get file src url from stack. Specifically works with the format of stack traces in IE.
                // A stack will look like this:
                //
                // Error
                //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                //    at Global code (http://localhost/components/prism-core.js:606:1)
                var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];

                if (src) {
                  var scripts = document.getElementsByTagName('script');

                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }

                return null;
              }
            },

            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function isActive(element, className, defaultActivation) {
              var no = 'no-' + className;

              while (element) {
                var classList = element.classList;

                if (classList.contains(className)) {
                  return true;
                }

                if (classList.contains(no)) {
                  return false;
                }

                element = element.parentElement;
              }

              return !!defaultActivation;
            }
          },

          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function extend(id, redef) {
              var lang = _.util.clone(_.languages[id]);

              for (var key in redef) {
                lang[key] = redef[key];
              }

              return lang;
            },

            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function insertBefore(inside, before, insert, root) {
              root = root ||
              /** @type {any} */
              _.languages;
              var grammar = root[inside];
              /** @type {Grammar} */

              var ret = {};

              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  } // Do not insert token which also occur in insert. See #1525


                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }

              var old = root[inside];
              root[inside] = ret; // Update references in other language definitions

              _.languages.DFS(_.languages, function (key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });

              return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _.util.objId;

              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);

                  var property = o[i],
                      propertyType = _.util.type(property);

                  if (propertyType === 'Object' && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === 'Array' && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},

          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function highlightAll(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },

          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function highlightAllUnder(container, async, callback) {
            var env = {
              callback: callback,
              container: container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };

            _.hooks.run('before-highlightall', env);

            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

            _.hooks.run('before-all-elements-highlight', env);

            for (var i = 0, element; element = env.elements[i++];) {
              _.highlightElement(element, async === true, env.callback);
            }
          },

          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function highlightElement(element, async, callback) {
            // Find language
            var language = _.util.getLanguage(element);

            var grammar = _.languages[language]; // Set language on the element, if not present

            element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language; // Set language on the parent, for styling

            var parent = element.parentElement;

            if (parent && parent.nodeName.toLowerCase() === 'pre') {
              parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
            }

            var code = element.textContent;
            var env = {
              element: element,
              language: language,
              grammar: grammar,
              code: code
            };

            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;

              _.hooks.run('before-insert', env);

              env.element.innerHTML = env.highlightedCode;

              _.hooks.run('after-highlight', env);

              _.hooks.run('complete', env);

              callback && callback.call(env.element);
            }

            _.hooks.run('before-sanity-check', env);

            if (!env.code) {
              _.hooks.run('complete', env);

              callback && callback.call(env.element);
              return;
            }

            _.hooks.run('before-highlight', env);

            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }

            if (async && _self.Worker) {
              var worker = new Worker(_.filename);

              worker.onmessage = function (evt) {
                insertHighlightedCode(evt.data);
              };

              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
          },

          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function highlight(text, grammar, language) {
            var env = {
              code: text,
              grammar: grammar,
              language: language
            };

            _.hooks.run('before-tokenize', env);

            env.tokens = _.tokenize(env.code, env.grammar);

            _.hooks.run('after-tokenize', env);

            return Token.stringify(_.util.encode(env.tokens), env.language);
          },

          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function tokenize(text, grammar) {
            var rest = grammar.rest;

            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }

              delete grammar.rest;
            }

            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },

          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},

            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function add(name, callback) {
              var hooks = _.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },

            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function run(name, env) {
              var callbacks = _.hooks.all[name];

              if (!callbacks || !callbacks.length) {
                return;
              }

              for (var i = 0, callback; callback = callbacks[i++];) {
                callback(env);
              }
            }
          },
          Token: Token
        };
        _self.Prism = _; // Typescript note:
        // The following can be used to import the Token type in JSDoc:
        //
        //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

        /**
         * Creates a new token.
         *
         * @param {string} type See {@link Token#type type}
         * @param {string | TokenStream} content See {@link Token#content content}
         * @param {string|string[]} [alias] The alias(es) of the token.
         * @param {string} [matchedStr=""] A copy of the full string this token was created from.
         * @class
         * @global
         * @public
         */

        function Token(type, content, alias, matchedStr) {
          /**
           * The type of the token.
           *
           * This is usually the key of a pattern in a {@link Grammar}.
           *
           * @type {string}
           * @see GrammarToken
           * @public
           */
          this.type = type;
          /**
           * The strings or tokens contained by this token.
           *
           * This will be a token stream if the pattern matched also defined an `inside` grammar.
           *
           * @type {string | TokenStream}
           * @public
           */

          this.content = content;
          /**
           * The alias(es) of the token.
           *
           * @type {string|string[]}
           * @see GrammarToken
           * @public
           */

          this.alias = alias; // Copy of the full string this token was created from

          this.length = (matchedStr || '').length | 0;
        }
        /**
         * A token stream is an array of strings and {@link Token Token} objects.
         *
         * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
         * them.
         *
         * 1. No adjacent strings.
         * 2. No empty strings.
         *
         *    The only exception here is the token stream that only contains the empty string and nothing else.
         *
         * @typedef {Array<string | Token>} TokenStream
         * @global
         * @public
         */

        /**
         * Converts the given token or token stream to an HTML representation.
         *
         * The following hooks will be run:
         * 1. `wrap`: On each {@link Token}.
         *
         * @param {string | Token | TokenStream} o The token or token stream to be converted.
         * @param {string} language The name of current language.
         * @returns {string} The HTML representation of the token or token stream.
         * @memberof Token
         * @static
         */


        Token.stringify = function stringify(o, language) {
          if (typeof o == 'string') {
            return o;
          }

          if (Array.isArray(o)) {
            var s = '';
            o.forEach(function (e) {
              s += stringify(e, language);
            });
            return s;
          }

          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: 'span',
            classes: ['token', o.type],
            attributes: {},
            language: language
          };
          var aliases = o.alias;

          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }

          _.hooks.run('wrap', env);

          var attributes = '';

          for (var name in env.attributes) {
            attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
          }

          return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
        };
        /**
         * @param {RegExp} pattern
         * @param {number} pos
         * @param {string} text
         * @param {boolean} lookbehind
         * @returns {RegExpExecArray | null}
         */


        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);

          if (match && lookbehind && match[1]) {
            // change the match to remove the text matched by the Prism lookbehind group
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }

          return match;
        }
        /**
         * @param {string} text
         * @param {LinkedList<string | Token>} tokenList
         * @param {any} grammar
         * @param {LinkedListNode<string | Token>} startNode
         * @param {number} startPos
         * @param {RematchOptions} [rematch]
         * @returns {void}
         * @private
         *
         * @typedef RematchOptions
         * @property {string} cause
         * @property {number} reach
         */


        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }

            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];

            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + ',' + j) {
                return;
              }

              var patternObj = patterns[j],
                  inside = patternObj.inside,
                  lookbehind = !!patternObj.lookbehind,
                  greedy = !!patternObj.greedy,
                  alias = patternObj.alias;

              if (greedy && !patternObj.pattern.global) {
                // Without the global flag, lastIndex won't work
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
              }
              /** @type {RegExp} */


              var pattern = patternObj.pattern || patternObj;

              for ( // iterate the token list and keep track of the current token/string position
              var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }

                var str = currentNode.value;

                if (tokenList.length > text.length) {
                  // Something went terribly wrong, ABORT, ABORT!
                  return;
                }

                if (str instanceof Token) {
                  continue;
                }

                var removeCount = 1; // this is the to parameter of removeBetween

                var match;

                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);

                  if (!match) {
                    break;
                  }

                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos; // find the node that contains the match

                  p += currentNode.value.length;

                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  } // adjust pos (and p)


                  p -= currentNode.value.length;
                  pos = p; // the current node is a Token, then the match starts inside another Token, which is invalid

                  if (currentNode.value instanceof Token) {
                    continue;
                  } // find the last node which is affected by this match


                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }

                  removeCount--; // replace with the new match

                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);

                  if (!match) {
                    continue;
                  }
                }

                var from = match.index,
                    matchStr = match[0],
                    before = str.slice(0, from),
                    after = str.slice(from + matchStr.length);
                var reach = pos + str.length;

                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }

                var removeFrom = currentNode.prev;

                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }

                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);

                if (after) {
                  addAfter(tokenList, currentNode, after);
                }

                if (removeCount > 1) {
                  // at least one Token object was removed, so we have to do some rematching
                  // this can only happen if the current pattern is greedy
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, {
                    cause: token + ',' + j,
                    reach: reach
                  });
                }
              }
            }
          }
        }
        /**
         * @typedef LinkedListNode
         * @property {T} value
         * @property {LinkedListNode<T> | null} prev The previous node.
         * @property {LinkedListNode<T> | null} next The next node.
         * @template T
         * @private
         */

        /**
         * @template T
         * @private
         */


        function LinkedList() {
          /** @type {LinkedListNode<T>} */
          var head = {
            value: null,
            prev: null,
            next: null
          };
          /** @type {LinkedListNode<T>} */

          var tail = {
            value: null,
            prev: head,
            next: null
          };
          head.next = tail;
          /** @type {LinkedListNode<T>} */

          this.head = head;
          /** @type {LinkedListNode<T>} */

          this.tail = tail;
          this.length = 0;
        }
        /**
         * Adds a new node with the given value to the list.
         * @param {LinkedList<T>} list
         * @param {LinkedListNode<T>} node
         * @param {T} value
         * @returns {LinkedListNode<T>} The added node.
         * @template T
         */


        function addAfter(list, node, value) {
          // assumes that node != list.tail && values.length >= 0
          var next = node.next;
          var newNode = {
            value: value,
            prev: node,
            next: next
          };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        /**
         * Removes `count` nodes after the given node. The given node will not be removed.
         * @param {LinkedList<T>} list
         * @param {LinkedListNode<T>} node
         * @param {number} count
         * @template T
         */


        function removeRange(list, node, count) {
          var next = node.next;

          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }

          node.next = next;
          next.prev = node;
          list.length -= i;
        }
        /**
         * @param {LinkedList<T>} list
         * @returns {T[]}
         * @template T
         */


        function toArray(list) {
          var array = [];
          var node = list.head.next;

          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }

          return array;
        }

        if (!_self.document) {
          if (!_self.addEventListener) {
            // in Node.js
            return _;
          }

          if (!_.disableWorkerMessageHandler) {
            // In worker
            _self.addEventListener('message', function (evt) {
              var message = JSON.parse(evt.data),
                  lang = message.language,
                  code = message.code,
                  immediateClose = message.immediateClose;

              _self.postMessage(_.highlight(code, _.languages[lang], lang));

              if (immediateClose) {
                _self.close();
              }
            }, false);
          }

          return _;
        } // Get current script and highlight


        var script = _.util.currentScript();

        if (script) {
          _.filename = script.src;

          if (script.hasAttribute('data-manual')) {
            _.manual = true;
          }
        }

        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }

        if (!_.manual) {
          // If the document state is "loading", then we'll use DOMContentLoaded.
          // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
          // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
          // might take longer one animation frame to execute which can create a race condition where only some plugins have
          // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
          // See https://github.com/PrismJS/prism/issues/2102
          var readyState = document.readyState;

          if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
            document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }

        return _;
      }(_self);

      if (true && module.exports) {
        module.exports = Prism;
      } // hack for components to work correctly in node.js


      if (typeof global !== 'undefined') {
        global.Prism = Prism;
      } // some additional documentation/types

      /**
       * The expansion of a simple `RegExp` literal to support additional properties.
       *
       * @typedef GrammarToken
       * @property {RegExp} pattern The regular expression of the token.
       * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
       * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
       * @property {boolean} [greedy=false] Whether the token is greedy.
       * @property {string|string[]} [alias] An optional alias or list of aliases.
       * @property {Grammar} [inside] The nested grammar of this token.
       *
       * The `inside` grammar will be used to tokenize the text value of each token of this kind.
       *
       * This can be used to make nested and even recursive language definitions.
       *
       * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
       * each another.
       * @global
       * @public
      */

      /**
       * @typedef Grammar
       * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
       * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
       * @global
       * @public
       */

      /**
       * A function which will invoked after an element was successfully highlighted.
       *
       * @callback HighlightCallback
       * @param {Element} element The element successfully highlighted.
       * @returns {void}
       * @global
       * @public
      */

      /**
       * @callback HookCallback
       * @param {Object<string, any>} env The environment variables of the hook.
       * @returns {void}
       * @global
       * @public
       */

      /* **********************************************
           Begin prism-markup.js
      ********************************************** */


      Prism.languages.markup = {
        'comment': /<!--[\s\S]*?-->/,
        'prolog': /<\?[\s\S]+?\?>/,
        'doctype': {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            'internal-subset': {
              pattern: /(\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null // see below

            },
            'string': {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            'punctuation': /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/,
            'name': /[^\s<>'"]+/
          }
        },
        'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
        'tag': {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            'tag': {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                'punctuation': /^<\/?/,
                'namespace': /^[^\s>\/:]+:/
              }
            },
            'attr-value': {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                'punctuation': [{
                  pattern: /^=/,
                  alias: 'attr-equals'
                }, /"|'/]
              }
            },
            'punctuation': /\/?>/,
            'attr-name': {
              pattern: /[^\s>\/]+/,
              inside: {
                'namespace': /^[^\s>\/:]+:/
              }
            }
          }
        },
        'entity': [{
          pattern: /&[\da-z]{1,8};/i,
          alias: 'named-entity'
        }, /&#x?[\da-f]{1,8};/i]
      };
      Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
      Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup; // Plugin to make entity title show the real entity, idea by Roman Komarov

      Prism.hooks.add('wrap', function (env) {
        if (env.type === 'entity') {
          env.attributes['title'] = env.content.replace(/&amp;/, '&');
        }
      });
      Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside['language-' + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
          };
          includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            'included-cdata': {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside['language-' + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
              return tagName;
            }), 'i'),
            lookbehind: true,
            greedy: true,
            inside: inside
          };
          Prism.languages.insertBefore('markup', 'cdata', def);
        }
      });
      Prism.languages.html = Prism.languages.markup;
      Prism.languages.mathml = Prism.languages.markup;
      Prism.languages.svg = Prism.languages.markup;
      Prism.languages.xml = Prism.languages.extend('markup', {});
      Prism.languages.ssml = Prism.languages.xml;
      Prism.languages.atom = Prism.languages.xml;
      Prism.languages.rss = Prism.languages.xml;
      /* **********************************************
           Begin prism-css.js
      ********************************************** */

      (function (Prism) {
        var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
        Prism.languages.css = {
          'comment': /\/\*[\s\S]*?\*\//,
          'atrule': {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
              'rule': /^@[\w-]+/,
              'selector-function-argument': {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: 'selector'
              },
              'keyword': {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              } // See rest below

            }
          },
          'url': {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
            greedy: true,
            inside: {
              'function': /^url/i,
              'punctuation': /^\(|\)$/,
              'string': {
                pattern: RegExp('^' + string.source + '$'),
                alias: 'url'
              }
            }
          },
          'selector': RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
          'string': {
            pattern: string,
            greedy: true
          },
          'property': /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          'important': /!important\b/i,
          'function': /[-a-z0-9]+(?=\()/i,
          'punctuation': /[(){};:,]/
        };
        Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
        var markup = Prism.languages.markup;

        if (markup) {
          markup.tag.addInlined('style', 'css');
          Prism.languages.insertBefore('inside', 'attr-value', {
            'style-attr': {
              pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
              lookbehind: true,
              inside: {
                'attr-value': {
                  pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                  inside: {
                    'style': {
                      pattern: /(["'])[\s\S]+(?=["']$)/,
                      lookbehind: true,
                      alias: 'language-css',
                      inside: Prism.languages.css
                    },
                    'punctuation': [{
                      pattern: /^=/,
                      alias: 'attr-equals'
                    }, /"|'/]
                  }
                },
                'attr-name': /^style/i
              }
            }
          }, markup.tag);
        }
      })(Prism);
      /* **********************************************
           Begin prism-clike.js
      ********************************************** */


      Prism.languages.clike = {
        'comment': [{
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        }, {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }],
        'string': {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        'class-name': {
          pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            'punctuation': /[.\\]/
          }
        },
        'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        'boolean': /\b(?:true|false)\b/,
        'function': /\w+(?=\()/,
        'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        'punctuation': /[{}[\];(),.:]/
      };
      /* **********************************************
           Begin prism-javascript.js
      ********************************************** */

      Prism.languages.javascript = Prism.languages.extend('clike', {
        'class-name': [Prism.languages.clike['class-name'], {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
          lookbehind: true
        }],
        'keyword': [{
          pattern: /((?:^|})\s*)(?:catch|finally)\b/,
          lookbehind: true
        }, {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
      Prism.languages.insertBefore('javascript', 'keyword', {
        'regex': {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
          lookbehind: true,
          greedy: true,
          inside: {
            'regex-source': {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: 'language-regex',
              inside: Prism.languages.regex
            },
            'regex-flags': /[a-z]+$/,
            'regex-delimiter': /^\/|\/$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        'function-variable': {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: 'function'
        },
        'parameter': [{
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }, {
          pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          inside: Prism.languages.javascript
        }, {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }, {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }],
        'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
          pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
          greedy: true,
          inside: {
            'template-punctuation': {
              pattern: /^`|`$/,
              alias: 'string'
            },
            'interpolation': {
              pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
              lookbehind: true,
              inside: {
                'interpolation-punctuation': {
                  pattern: /^\${|}$/,
                  alias: 'punctuation'
                },
                rest: Prism.languages.javascript
              }
            },
            'string': /[\s\S]+/
          }
        }
      });

      if (Prism.languages.markup) {
        Prism.languages.markup.tag.addInlined('script', 'javascript');
      }

      Prism.languages.js = Prism.languages.javascript;
      /* **********************************************
           Begin prism-file-highlight.js
      ********************************************** */

      (function () {
        if (typeof self === 'undefined' || !self.Prism || !self.document) {
          return;
        } // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill


        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }

        var Prism = window.Prism;
        var LOADING_MESSAGE = 'Loading…';

        var FAILURE_MESSAGE = function FAILURE_MESSAGE(status, message) {
          return '✖ Error ' + status + ' while fetching file: ' + message;
        };

        var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';
        var EXTENSIONS = {
          'js': 'javascript',
          'py': 'python',
          'rb': 'ruby',
          'ps1': 'powershell',
          'psm1': 'powershell',
          'sh': 'bash',
          'bat': 'batch',
          'h': 'c',
          'tex': 'latex'
        };
        var STATUS_ATTR = 'data-src-status';
        var STATUS_LOADING = 'loading';
        var STATUS_LOADED = 'loaded';
        var STATUS_FAILED = 'failed';
        var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        var lang = /\blang(?:uage)?-([\w-]+)\b/i;
        /**
         * Sets the Prism `language-xxxx` or `lang-xxxx` class to the given language.
         *
         * @param {HTMLElement} element
         * @param {string} language
         * @returns {void}
         */

        function setLanguageClass(element, language) {
          var className = element.className;
          className = className.replace(lang, ' ') + ' language-' + language;
          element.className = className.replace(/\s+/g, ' ').trim();
        }

        Prism.hooks.add('before-highlightall', function (env) {
          env.selector += ', ' + SELECTOR;
        });
        Prism.hooks.add('before-sanity-check', function (env) {
          var pre =
          /** @type {HTMLPreElement} */
          env.element;

          if (pre.matches(SELECTOR)) {
            env.code = ''; // fast-path the whole thing and go to complete

            pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading
            // add code element with loading message

            var code = pre.appendChild(document.createElement('CODE'));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute('data-src');
            var language = env.language;

            if (language === 'none') {
              // the language might be 'none' because there is no language set;
              // in this case, we want to use the extension as the language
              var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
              language = EXTENSIONS[extension] || extension;
            } // set language classes


            setLanguageClass(code, language);
            setLanguageClass(pre, language); // preload the language

            var autoloader = Prism.plugins.autoloader;

            if (autoloader) {
              autoloader.loadLanguages(language);
            } // load file


            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);

            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                if (xhr.status < 400 && xhr.responseText) {
                  // mark as loaded
                  pre.setAttribute(STATUS_ATTR, STATUS_LOADED); // highlight code

                  code.textContent = xhr.responseText;
                  Prism.highlightElement(code);
                } else {
                  // mark as failed
                  pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

                  if (xhr.status >= 400) {
                    code.textContent = FAILURE_MESSAGE(xhr.status, xhr.statusText);
                  } else {
                    code.textContent = FAILURE_EMPTY_MESSAGE;
                  }
                }
              }
            };

            xhr.send(null);
          }
        });
        Prism.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);

            for (var i = 0, element; element = elements[i++];) {
              Prism.highlightElement(element);
            }
          }
        };
        var logged = false;
        /** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */

        Prism.fileHighlight = function () {
          if (!logged) {
            console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
            logged = true;
          }

          Prism.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
      /***/

    }
  }]);
})();
//# sourceMappingURL=blog-blog-module-es5.js.map