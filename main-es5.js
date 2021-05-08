(function () {
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! D:\SynologyDrive\website\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "1SZ1":
    /*!**************************************************!*\
      !*** ./src/app/blog-list/blog-list.component.ts ***!
      \**************************************************/

    /*! exports provided: BlogListComponent */

    /***/
    function SZ1(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogListComponent", function () {
        return BlogListComponent;
      });
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _blog_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./blog-list.service */
      "9eaD");
      /* harmony import */


      var _blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./blog-list-tag/blog-list-tag.component */
      "t4R7");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./blog-list-pagination/blog-list-pagination.component */
      "K2wa");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      function BlogListComponent_ng_container_4_div_1_span_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 2, link_r3.readingTime, "1.0-0"), " ", link_r3.readingTime > 1 ? "mins" : "min", " ");
        }
      }

      var _c0 = function _c0(a1) {
        return ["/categories", a1];
      };

      function BlogListComponent_ng_container_4_div_1_a_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, link_r3.categories[0].toLowerCase()));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", link_r3.categories[0], " ");
        }
      }

      var _c1 = function _c1(a0) {
        return [a0];
      };

      function BlogListComponent_ng_container_4_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, BlogListComponent_ng_container_4_div_1_span_6_Template, 3, 5, "span", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, BlogListComponent_ng_container_4_div_1_a_7_Template, 2, 4, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](5, 5, link_r3.date, "mediumDate"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", link_r3.readingTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", link_r3.categories == null ? null : link_r3.categories.length);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c1, link_r3.route));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", link_r3.title, " ");
        }
      }

      function BlogListComponent_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BlogListComponent_ng_container_4_div_1_Template, 11, 10, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "app-blog-list-pagination");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var list_r1 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", list_r1);
        }
      }

      var BlogListComponent = /*#__PURE__*/function () {
        function BlogListComponent(blogListService) {
          _classCallCheck(this, BlogListComponent);

          this.blogListService = blogListService;
          this.assetsUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].assetsUrl;
        }

        _createClass(BlogListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return BlogListComponent;
      }();

      BlogListComponent.ɵfac = function BlogListComponent_Factory(t) {
        return new (t || BlogListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_2__["BlogListService"]));
      };

      BlogListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: BlogListComponent,
        selectors: [["app-blog-list"]],
        decls: 6,
        vars: 3,
        consts: [[1, "block", "lg:flex", "lg:flex-row-reverse", "lg:space-x-2", "py-4", "mb-10"], [1, "w-full", "lg:w-1/4", "px-4", "lg:pl-0"], [1, "w-full", "lg:w-3/4", "px-4", "lg:pl-0"], [4, "ngIf"], ["class", "shadow p-4 mb-4 bg-white", 4, "ngFor", "ngForOf"], [1, "shadow", "p-4", "mb-4", "bg-white"], [1, "text-left"], [1, "flex", "justify-between", "items-center"], [1, "text-gray-700", "text-sm"], ["class", "px-2 py-1 text-sm text-secondary font-bold rounded \n                hover:text-white hover:bg-primary transition-colors duration-200 ease-in-out cursor-pointer", 3, "routerLink", 4, "ngIf"], [1, "mt-2"], [1, "text-gray-600", "font-bold", "text-xl", 3, "routerLink"], [1, "px-2", "py-1", "text-sm", "text-secondary", "font-bold", "rounded", "hover:text-white", "hover:bg-primary", "transition-colors", "duration-200", "ease-in-out", "cursor-pointer", 3, "routerLink"]],
        template: function BlogListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "app-blog-list-tag");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BlogListComponent_ng_container_4_Template, 3, 1, "ng-container", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 1, ctx.blogListService.blogPageList$));
          }
        },
        directives: [_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_3__["BlogListTagComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_5__["BlogListPaginationComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLinkWithHref"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DecimalPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    "84zG":
    /*!******************************************!*\
      !*** ./src/app/about/about.component.ts ***!
      \******************************************/

    /*! exports provided: AboutComponent */

    /***/
    function zG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AboutComponent", function () {
        return AboutComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AboutComponent = /*#__PURE__*/function () {
        function AboutComponent() {
          _classCallCheck(this, AboutComponent);
        }

        _createClass(AboutComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return AboutComponent;
      }();

      AboutComponent.ɵfac = function AboutComponent_Factory(t) {
        return new (t || AboutComponent)();
      };

      AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AboutComponent,
        selectors: [["app-about"]],
        decls: 0,
        vars: 0,
        template: function AboutComponent_Template(rf, ctx) {},
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    "9eaD":
    /*!************************************************!*\
      !*** ./src/app/blog-list/blog-list.service.ts ***!
      \************************************************/

    /*! exports provided: BlogListService */

    /***/
    function eaD(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogListService", function () {
        return BlogListService;
      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _shared_operators_latest_by_date_operator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../shared/operators/latest-by-date.operator */
      "up8g");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @scullyio/ng-lib */
      "sbAP");

      var BlogListService = function BlogListService(httpClient, scullyRoutesService) {
        _classCallCheck(this, BlogListService);

        this.httpClient = httpClient;
        this.scullyRoutesService = scullyRoutesService;
        this.blogAllList$ = this.scullyRoutesService.available$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (router) {
          return router.filter(function (e) {
            return !!e.title;
          });
        }), Object(_shared_operators_latest_by_date_operator__WEBPACK_IMPORTED_MODULE_1__["latestByDate"])());
        this.blogCategories$ = this.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (list) {
          var _ref;

          var temp = list.map(function (e) {
            return e.categories;
          });

          var newTemp = (_ref = []).concat.apply(_ref, _toConsumableArray(temp));

          var categories = Array.from(new Set(newTemp));
          return categories.filter(function (e) {
            return !!e;
          });
        })); // list 分頁

        this.blogPageList$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
      };

      BlogListService.ɵfac = function BlogListService_Factory(t) {
        return new (t || BlogListService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyRoutesService"]));
      };

      BlogListService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: BlogListService,
        factory: BlogListService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        url: 'https://mtwmt.github.io',
        baseUrl: 'http://localhost:4200',
        assetsUrl: 'assets',
        title: 'Mandy\'s Website',
        featureImage: 'assets/images/photo.jpg',
        description: '學習記錄',
        keywords: ['blog', 'Angular', 'Web Site', 'Scully']
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "BUtL":
    /*!**************************************************************************!*\
      !*** ./src/app/shared/components/theme-toggle/theme-toggle.component.ts ***!
      \**************************************************************************/

    /*! exports provided: ThemeToggleComponent */

    /***/
    function BUtL(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ThemeToggleComponent", function () {
        return ThemeToggleComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_theme_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../services/theme.service */
      "ETNk");

      var ThemeToggleComponent = /*#__PURE__*/function () {
        function ThemeToggleComponent(themeService) {
          _classCallCheck(this, ThemeToggleComponent);

          this.themeService = themeService;
          this.ariaLabel = 'Dark and Light mode toggle button';
          this.current = this.themeService.scheme;
        }

        _createClass(ThemeToggleComponent, [{
          key: "themeToggleClasses",
          get: function get() {
            return 'w-10 h-10 lg:flex lg:items-center lg:justify-center cursor-pointer' + ' ' + this.positionClass;
          }
        }, {
          key: "onClick",
          value: function onClick() {
            this.themeService.update();
            this.current = this.themeService.scheme;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return ThemeToggleComponent;
      }();

      ThemeToggleComponent.ɵfac = function ThemeToggleComponent_Factory(t) {
        return new (t || ThemeToggleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_theme_service__WEBPACK_IMPORTED_MODULE_1__["ThemeService"]));
      };

      ThemeToggleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ThemeToggleComponent,
        selectors: [["app-theme-toggle"]],
        hostVars: 3,
        hostBindings: function ThemeToggleComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ThemeToggleComponent_click_HostBindingHandler() {
              return ctx.onClick();
            });
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.ariaLabel);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.themeToggleClasses);
          }
        },
        inputs: {
          positionClass: "positionClass"
        },
        decls: 0,
        vars: 0,
        template: function ThemeToggleComponent_Template(rf, ctx) {},
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aGVtZS10b2dnbGUuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    "CPxR":
    /*!**********************************************************!*\
      !*** ./src/app/shared/components/meta/meta.component.ts ***!
      \**********************************************************/

    /*! exports provided: MetaComponent */

    /***/
    function CPxR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MetaComponent", function () {
        return MetaComponent;
      });
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _services_meta_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../services/meta.service */
      "IX8d");

      var MetaComponent = /*#__PURE__*/function () {
        function MetaComponent(router, metaService) {
          _classCallCheck(this, MetaComponent);

          this.router = router;
          this.metaService = metaService;
          this.title = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].title;
          this.description = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].description;
          this.tags = [];
          this.keywords = [];
          this.route = this.router.url;
          this.image = this.absoluteImageUrl(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].featureImage);
          this.robots = 'index, follow';
        }

        _createClass(MetaComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            this.updateMetaTags();
          }
        }, {
          key: "updateMetaTags",
          value: function updateMetaTags() {
            this.metaService.generateMetaTags({
              title: this.title,
              description: this.title,
              //TODO: md 尚未有 description, 所以先以標題替代
              // description: this.description,
              route: this.route,
              keywords: this.keywords ? [].concat(_toConsumableArray(this.tags), _toConsumableArray(this.keywords)) : this.tags,
              image: this.image,
              // twitter_image: this.twitterImage
              //   ? this.getTwitterImage(this.twitterImage)
              //   : null,
              // og_image: this.ogImage ? this.getOgImage(this.ogImage) : null,
              robots: this.robots,
              article: this.getArticle(),
              author: this.getAuthor()
            });
          }
        }, {
          key: "getArticle",
          value: function getArticle() {
            if (this.articlePublishedAt && this.articleUpdatedAt && this.articleAuthors) {
              return {
                published_time: this.articlePublishedAt,
                modified_time: this.articleUpdatedAt,
                tag: this.tags,
                author: this.articleAuthors
              };
            }

            return null;
          }
        }, {
          key: "getAuthor",
          value: function getAuthor() {
            if (this.authorFirstName && this.authorLastName && this.authorUserName) {
              return {
                first_name: this.authorFirstName,
                last_name: this.authorLastName,
                username: this.authorUserName
              };
            }

            return null;
          }
        }, {
          key: "getOgImage",
          value: function getOgImage(ogRoute) {
            return "https://mtwmt.github.io/assets/banners".concat(ogRoute, "/og.png");
          }
        }, {
          key: "absoluteImageUrl",
          value: function absoluteImageUrl(image) {
            return "".concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url, "/").concat(image);
          }
        }]);

        return MetaComponent;
      }();

      MetaComponent.ɵfac = function MetaComponent_Factory(t) {
        return new (t || MetaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_meta_service__WEBPACK_IMPORTED_MODULE_3__["MetaService"]));
      };

      MetaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: MetaComponent,
        selectors: [["app-meta"]],
        inputs: {
          title: "title",
          description: "description",
          tags: "tags",
          keywords: "keywords",
          route: "route",
          image: "image",
          twitterImage: "twitterImage",
          ogImage: "ogImage",
          robots: "robots",
          authorFirstName: "authorFirstName",
          authorLastName: "authorLastName",
          authorUserName: "authorUserName",
          articlePublishedAt: "articlePublishedAt",
          articleUpdatedAt: "articleUpdatedAt",
          articleAuthors: "articleAuthors"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
        decls: 0,
        vars: 0,
        template: function MetaComponent_Template(rf, ctx) {},
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZXRhLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    "ETNk":
    /*!**************************************************!*\
      !*** ./src/app/shared/services/theme.service.ts ***!
      \**************************************************/

    /*! exports provided: ThemeService */

    /***/
    function ETNk(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ThemeService", function () {
        return ThemeService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var ThemeService = /*#__PURE__*/function () {
        function ThemeService(rendererFactory2) {
          _classCallCheck(this, ThemeService);

          this.rendererFactory2 = rendererFactory2;
          this.renderer = rendererFactory2.createRenderer(null, null);
        }

        _createClass(ThemeService, [{
          key: "scheme",
          get: function get() {
            return this.currentScheme;
          }
        }, {
          key: "load",
          value: function load() {
            this.getCurrentScheme();
            this.add(this.scheme);
            this.remove(this.scheme === 'dark' ? 'light' : 'dark');
          }
        }, {
          key: "update",
          value: function update() {
            var updateScheme = this.scheme === 'dark' ? 'light' : 'dark';
            this.remove(this.scheme);
            this.add(updateScheme);
            localStorage.setItem('prefers-scheme', updateScheme);
            this.currentScheme = updateScheme;
          }
        }, {
          key: "remove",
          value: function remove(scheme) {
            this.renderer.removeClass(document.body, "theme-".concat(scheme));
          }
        }, {
          key: "add",
          value: function add(scheme) {
            this.renderer.addClass(document.body, "theme-".concat(scheme));
          }
        }, {
          key: "getCurrentScheme",
          value: function getCurrentScheme() {
            var scheme = localStorage.getItem('prefers-scheme');

            if (scheme != null) {
              return this.currentScheme = scheme;
            }

            if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
              return this.currentScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } // default to light theme if browser does not support prefers-color-scheme


            return this.currentScheme = 'light';
          }
        }]);

        return ThemeService;
      }();

      ThemeService.ɵfac = function ThemeService_Factory(t) {
        return new (t || ThemeService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"]));
      };

      ThemeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: ThemeService,
        factory: ThemeService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "IX8d":
    /*!*************************************************!*\
      !*** ./src/app/shared/services/meta.service.ts ***!
      \*************************************************/

    /*! exports provided: MetaService */

    /***/
    function IX8d(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MetaService", function () {
        return MetaService;
      });
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../environments/environment */
      "AytR");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      var MetaService = /*#__PURE__*/function () {
        function MetaService(meta, title) {
          _classCallCheck(this, MetaService);

          this.meta = meta;
          this.title = title;
          this.defaultConfig = {
            title: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].title,
            description: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].description,
            robots: 'index, follow',
            image: this.absoluteImageUrl(_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].featureImage),
            route: ''
          };
        }

        _createClass(MetaService, [{
          key: "setTitle",
          value: function setTitle(title) {
            this.title.setTitle(title);
          }
        }, {
          key: "setDescription",
          value: function setDescription(description) {
            this.meta.updateTag({
              name: 'description',
              content: description
            });
          }
        }, {
          key: "updateRobots",
          value: function updateRobots(robots) {
            this.meta.updateTag({
              name: 'robots',
              content: robots
            });
          }
        }, {
          key: "updateKeywords",
          value: function updateKeywords(keywords) {
            this.meta.updateTag({
              name: 'keywords',
              content: keywords.join(', ')
            });
          }
        }, {
          key: "generateMetaTags",
          value: function generateMetaTags() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            config = Object.assign(Object.assign(Object.assign({}, this.defaultConfig), config), {
              keywords: config.keywords ? [].concat(_toConsumableArray(_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].keywords), _toConsumableArray(config.keywords)) : _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].keywords
            });
            this.setTitle(config.title);
            this.setDescription(config.description);
            this.updateRobots(config.robots);
            this.updateKeywords(config.keywords);
            this.openGraph(config); // this.twitterCard(config);
          }
        }, {
          key: "openGraph",
          value: function openGraph(config) {
            this.meta.updateTag({
              property: 'og:title',
              content: config.title
            });
            this.meta.updateTag({
              property: 'og:description',
              content: config.description
            });
            this.meta.updateTag({
              property: 'og:type',
              content: 'article'
            });
            this.meta.updateTag({
              property: 'og:url',
              content: "".concat(_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url).concat(config.route)
            });
            this.meta.updateTag({
              property: 'og:image',
              content: config.og_image || config.image
            });
            this.meta.updateTag({
              property: 'og:image:alt',
              content: config.description
            });
            this.meta.updateTag({
              property: 'og:site_name',
              content: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].title
            });
            this.meta.updateTag({
              property: 'og:locale',
              content: 'zh_tw'
            });

            if (config.article) {
              this.meta.updateTag({
                property: 'og:type',
                content: 'article'
              });
              this.meta.updateTag({
                property: "og:article:published_time",
                content: config.article.published_time
              });
              this.meta.updateTag({
                property: "og:article:modified_time",
                content: config.article.modified_time
              });
              this.meta.updateTag({
                property: "og:article:tag",
                content: config.article.tag.join(', ')
              });
              this.meta.updateTag({
                property: "og:article:author",
                content: config.article.author.join(', ')
              });
              return;
            } else {
              this.meta.removeTag('property="og:article:published_time"');
              this.meta.removeTag('property="og:article:modified_time"');
              this.meta.removeTag('property="og:article:tag"');
              this.meta.removeTag('property="og:article:author"');
            }

            if (config.author) {
              this.meta.updateTag({
                property: 'og:type',
                content: 'profile'
              });
              this.meta.updateTag({
                property: "og:profile:first_name",
                content: config.author.first_name
              });
              this.meta.updateTag({
                property: "og:profile:lastname",
                content: config.author.last_name
              });
              this.meta.updateTag({
                property: "og:profile:username",
                content: config.author.username
              });
              return;
            } else {
              this.meta.removeTag('property="og:profile:first_name"');
              this.meta.removeTag('property="og:profile:lastname"');
              this.meta.removeTag('property="og:profile:username"');
            }

            this.meta.updateTag({
              property: 'og:type',
              content: 'website'
            });
          }
        }, {
          key: "twitterCard",
          value: function twitterCard(config) {
            this.meta.updateTag({
              name: 'twitter:card',
              content: 'summary_large_image'
            });
            this.meta.updateTag({
              name: 'twitter:site',
              content: '@notiz_dev'
            });
            this.meta.updateTag({
              name: 'twitter:creator',
              content: '@notiz_dev'
            });
            this.meta.updateTag({
              name: 'twitter:title',
              content: config.title
            });
            this.meta.updateTag({
              name: 'twitter:description',
              content: config.description
            });
            this.meta.updateTag({
              name: 'twitter:image',
              content: config.twitter_image || config.image
            });
          }
        }, {
          key: "absoluteImageUrl",
          value: function absoluteImageUrl(image) {
            return "".concat(_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url, "/").concat(image);
          }
        }]);

        return MetaService;
      }();

      MetaService.ɵfac = function MetaService_Factory(t) {
        return new (t || MetaService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"]));
      };

      MetaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: MetaService,
        factory: MetaService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "K2wa":
    /*!**********************************************************************************!*\
      !*** ./src/app/blog-list/blog-list-pagination/blog-list-pagination.component.ts ***!
      \**********************************************************************************/

    /*! exports provided: BlogListPaginationComponent */

    /***/
    function K2wa(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogListPaginationComponent", function () {
        return BlogListPaginationComponent;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _blog_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../blog-list.service */
      "9eaD");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = function _c0() {
        return ["./"];
      };

      var _c1 = function _c1() {
        return {
          page: 1
        };
      };

      function BlogListPaginationComponent_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " |<< ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](3, _c1));
        }
      }

      var _c2 = function _c2(a0) {
        return {
          page: a0
        };
      };

      function BlogListPaginationComponent_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " << ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, ctx_r1.correctPage - 1));
        }
      }

      function BlogListPaginationComponent_a_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var page_r5 = ctx.$implicit;

          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("btn-active", page_r5 === ctx_r2.correctPage);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](5, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c2, page_r5));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", page_r5, " ");
        }
      }

      function BlogListPaginationComponent_a_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " >> ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, ctx_r3.correctPage + 1));
        }
      }

      function BlogListPaginationComponent_a_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " >>| ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, ctx_r4.totalPage));
        }
      }

      var BlogListPaginationComponent = /*#__PURE__*/function () {
        function BlogListPaginationComponent(router, activatedRoute, blogListService) {
          _classCallCheck(this, BlogListPaginationComponent);

          this.router = router;
          this.activatedRoute = activatedRoute;
          this.blogListService = blogListService;
          this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
          this.pageSize = 10;
          this.link = [''];
          this.pageLimit = 5;
        }

        _createClass(BlogListPaginationComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.activatedRoute.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(this.params || ''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (params) {
              return _this.activatedRoute.queryParamMap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (paramMap) {
                return +paramMap.get('page') || 1;
              }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (page) {
                return _this.blogListService.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (routes) {
                  if (params) {
                    return routes.filter(function (route) {
                      var _a;

                      return ((_a = route[_this.name]) === null || _a === void 0 ? void 0 : _a[0]) != null && route[_this.name][0].toLowerCase() === params.toLowerCase();
                    });
                  } else {
                    return routes;
                  }
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (links) {
                  _this.correctPage = page;
                  var totalPage = Math.floor(links.length / _this.pageSize);
                  totalPage % _this.pageSize == 0 ? totalPage = totalPage : totalPage = totalPage + 1;
                  _this.totalPage = totalPage;
                  var start = page - (page - 1) % _this.pageLimit;
                  var limit = Math.min(page - (page - 1) % _this.pageLimit + (_this.pageLimit - 1), totalPage);
                  _this.total = Array(limit).fill(limit).filter(function (e, i) {
                    return i < _this.pageLimit;
                  }).map(function (e, i) {
                    return i + start;
                  }).filter(function (e, i) {
                    return e <= totalPage;
                  });
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (links) {
                  return links.slice((page - 1) * _this.pageSize, page * _this.pageSize);
                }));
              }));
            })).subscribe(function (res) {
              _this.blogListService.blogPageList$.next(res);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.destroy$.next();
            this.destroy$.complete();
          }
        }]);

        return BlogListPaginationComponent;
      }();

      BlogListPaginationComponent.ɵfac = function BlogListPaginationComponent_Factory(t) {
        return new (t || BlogListPaginationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_4__["BlogListService"]));
      };

      BlogListPaginationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: BlogListPaginationComponent,
        selectors: [["app-blog-list-pagination"]],
        inputs: {
          params: "params",
          name: "name"
        },
        decls: 7,
        vars: 5,
        consts: [[1, "mt-8"], [1, "text-right"], ["class", "btn bg-white mb-4", 3, "routerLink", "queryParams", 4, "ngIf"], ["class", "btn bg-white mb-4", "routerLinkActive", "active", 3, "btn-active", "routerLink", "queryParams", 4, "ngFor", "ngForOf"], [1, "btn", "bg-white", "mb-4", 3, "routerLink", "queryParams"], ["routerLinkActive", "active", 1, "btn", "bg-white", "mb-4", 3, "routerLink", "queryParams"]],
        template: function BlogListPaginationComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BlogListPaginationComponent_a_2_Template, 2, 4, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BlogListPaginationComponent_a_3_Template, 2, 5, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, BlogListPaginationComponent_a_4_Template, 2, 8, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, BlogListPaginationComponent_a_5_Template, 2, 5, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, BlogListPaginationComponent_a_6_Template, 2, 5, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage !== 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage > 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.total);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage < ctx.totalPage);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage !== ctx.totalPage);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkActive"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QtcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    "PCNd":
    /*!*****************************************!*\
      !*** ./src/app/shared/shared.module.ts ***!
      \*****************************************/

    /*! exports provided: SharedModule */

    /***/
    function PCNd(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SharedModule", function () {
        return SharedModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/meta/meta.component */
      "CPxR");
      /* harmony import */


      var _components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/theme-toggle/theme-toggle.component */
      "BUtL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var SharedModule = function SharedModule() {
        _classCallCheck(this, SharedModule);
      };

      SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || SharedModule)();
      };

      SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: SharedModule
      });
      SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SharedModule, {
          declarations: [_components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__["ThemeToggleComponent"], _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__["MetaComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]],
          exports: [_components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__["ThemeToggleComponent"], _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__["MetaComponent"]]
        });
      })();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _shared_services_theme_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./shared/services/theme.service */
      "ETNk");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent(renderer, themeService) {
          _classCallCheck(this, AppComponent);

          this.renderer = renderer;
          this.themeService = themeService;
          this.isOpen = false;
          themeService.load();
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "setOpen",
          value: function setOpen(isBoolean) {
            if (isBoolean) {
              this.renderer.addClass(document.body, 'overflow-hidden');
            } else {
              this.renderer.removeClass(document.body, 'overflow-hidden');
            }
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_theme_service__WEBPACK_IMPORTED_MODULE_1__["ThemeService"]));
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 23,
        vars: 5,
        consts: [[1, "relative", "mx-auto", "md:max-w-5xl", "text-gray-700"], [1, "sticky", "z-999", "top-0", "left-0", "bg-oreilly-500", "flex", "justify-between", "px-4", "py-2", "mb-5", "lg:mx-5"], [1, "text-white", "font-medium", "text-2xl"], [3, "routerLink"], ["href", "javascript:void(0);", "title", "MENU", 1, "hamburger", "sm:hidden", 3, "ngClass", "click"], [1, "social", 3, "ngClass"], [1, "btn", "sm:text-white", "text-primary", 3, "routerLink", "click"], ["href", "//github.com/mtwmt", "target", "_blank", 1, "btn", "sm:text-white", "text-primary", 3, "click"], [1, "content", "leading-relaxed", "lg:mx-5"], [1, "my-2", "text-right", "text-xs"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Mandy's Web");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_5_listener() {
              return ctx.setOpen(ctx.isOpen = !ctx.isOpen);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "MENU");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "nav", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_11_listener() {
              return ctx.setOpen(ctx.isOpen = false);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Blog");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_14_listener() {
              return ctx.setOpen(ctx.isOpen = false);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Portfolio");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_17_listener() {
              return ctx.setOpen(ctx.isOpen = false);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "GitHub");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Copyright \xA9 2021 Mandy. All rights reserved.");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isOpen ? "active" : "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isOpen ? "active" : "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "blog");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "portfolio");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]],
        styles: [".hamburger[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 1.25rem;\n  margin: auto;\n  width: 1.875rem;\n  height: 1.5625rem;\n  z-index: 999;\n}\n\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  top: 10px;\n  display: inline-block;\n  text-indent: -9999px;\n  transition: 0.5s;\n  position: absolute;\n  display: block;\n  cursor: pointer;\n  width: 30px;\n  height: 5px;\n  background: #fff;\n}\n\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  transition: 0.5s;\n  content: \"\";\n  position: absolute;\n  top: -10px;\n  left: 0;\n  display: block;\n  width: 30px;\n  height: 5px;\n  background: #fff;\n}\n\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after {\n  transition: 0.5s;\n  content: \"\";\n  position: absolute;\n  top: 10px;\n  left: 0;\n  display: block;\n  width: 30px;\n  height: 5px;\n  background: #fff;\n}\n\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  background-color: transparent;\n}\n\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  top: -10px;\n  transform: translateY(10.5px) rotate(45deg);\n}\n\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after {\n  top: -10px;\n  transform: translateY(10.5px) rotate(-45deg);\n}\n\n.social[_ngcontent-%COMP%] {\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n\n@media (min-width: 640px) {\n  .social[_ngcontent-%COMP%] {\n    position: static;\n    top: 0px;\n    left: 0px;\n  }\n}\n\n.social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n@media (max-width: 640px) {\n  .social[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 48px;\n    left: 0;\n    display: block;\n    padding-top: 5rem;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    transition: 0.5s;\n    transform: translateX(-100%);\n    z-index: 99;\n    background: white;\n    box-shadow: 0px 1px 0.5rem 0px rgba(214, 214, 214, 0.7);\n  }\n\n  .social.active[_ngcontent-%COMP%] {\n    transform: translateX(0%);\n    overflow: hidden;\n  }\n\n  .social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    display: block;\n    text-align: center;\n    line-height: 2;\n  }\n\n  .social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    width: 70%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3RhaWx3aW5kY3NzL2xpYi9saWIvc3Vic3RpdHV0ZUNsYXNzQXBwbHlBdFJ1bGVzLmpzIiwiPG5vIHNvdXJjZT4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUFqQ0Y7O0FBa0NFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQTVDRixrQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsV0EwQzJCO0VBekMzQixXQUFBO0VBQ0EsZ0JBd0NxQjtBQTNCdkI7O0FBWEU7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsY0FBQTtFQUNBLFdBK0J5QjtFQTlCekIsV0FBQTtFQUNBLGdCQTZCbUI7QUFoQnZCOztBQVhFO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGNBQUE7RUFDQSxXQW9CeUI7RUFuQnpCLFdBQUE7RUFDQSxnQkFrQm1CO0FBTHZCOztBQVFJO0VBRUUseUJBQUE7RUFDQSw2QkFBQTtBQVBOOztBQVFNO0VBQ0UsVUFBQTtFQUNBLDJDQUFBO0FBTlI7O0FBUU07RUFDRSxVQUFBO0VBQ0EsNENBQUE7QUFOUjs7QUFZQTtFQ2pFQSx5SUFBbUI7RUFBbkIsaUlBQW1CO0VBQW5CLDBKQUFtQjtFQUFuQix3REFBbUI7RUFBbkIsMEJBQW1CO0VBQW5CLHdEQUFtQjtFQUFuQiwwQkFBbUI7QUR5RG5COztBRTNEQTtFREVBO0lBQUEsZ0JBQW1CO0lBQW5CLFFBQW1CO0lBQW5CO0VBQW1CO0NDRm5COztBRm9FRTtFQ2xFRixxQkFBbUI7QUQ0RG5COztBQVlBO0VBQ0U7SUFDRSxlQUFBO0lBQ0EsU0FBQTtJQUNBLE9BQUE7SUFDQSxjQUFBO0lBQ0EsaUJBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtJQUNBLFNBQUE7SUFDQSxnQkFBQTtJQUNBLDRCQUFBO0lBQ0EsV0FBQTtJQUNBLGlCQUFBO0lBQ0EsdURBQUE7RUFURjs7RUFVRTtJQUNFLHlCQUFBO0lBQ0EsZ0JBQUE7RUFSSjs7RUFXRTtJQzVGSixtQkFBbUI7SUQ4RmIsY0FBQTtJQUNBLGtCQUFBO0lBQ0EsY0FBQTtFQVRKOztFQVdJO0lBQ0UsVUFBQTtFQVROO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vYXNzZXRzL3Njc3MvY29tbW9uJztcclxuXHJcbkBtaXhpbiBoYW1idXJnZXIoJGNvbG9yLCAkaWNvblcpIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHdpZHRoOiAkaWNvblc7XHJcbiAgaGVpZ2h0OiAkaWNvblcvNjtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3I7XHJcbiAgLy8gbWFyZ2luOiAkaWNvblcvMyAwO1xyXG4gICY6YmVmb3JlIHtcclxuICAgIHRyYW5zaXRpb246IDAuNXM7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogLSRpY29uVy8zO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6ICRpY29uVztcclxuICAgIGhlaWdodDogJGljb25XLzY7XHJcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3I7XHJcbiAgfVxyXG4gICY6YWZ0ZXIge1xyXG4gICAgdHJhbnNpdGlvbjogMC41cztcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAkaWNvblcvMztcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAkaWNvblc7XHJcbiAgICBoZWlnaHQ6ICRpY29uVy82O1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuLmhhbWJ1cmdlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICByaWdodDogcmVtKDIwcHgpO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICB3aWR0aDogcmVtKDMwcHgpO1xyXG4gIGhlaWdodDogcmVtKDI1cHgpO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBzcGFuIHtcclxuICAgIHRvcDogMTBweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHRleHQtaW5kZW50OiAtOTk5OXB4O1xyXG4gICAgdHJhbnNpdGlvbjogMC41cztcclxuICAgIEBpbmNsdWRlIGhhbWJ1cmdlcigjZmZmLCAzMHB4KTtcclxuICB9XHJcbiAgJi5hY3RpdmUge1xyXG4gICAgc3BhbiB7XHJcbiAgICAgIC8vIHJpZ2h0OiByZW0oMTVweCk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgdG9wOiAtMTBweDtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAuNXB4KSByb3RhdGUoNDVkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgIHRvcDogLTEwcHg7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwLjVweCkgcm90YXRlKC00NWRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5zb2NpYWwge1xyXG4gIGxpIHtcclxuICAgIEBhcHBseSBpbmxpbmUtYmxvY2s7XHJcbiAgfVxyXG4gIEBhcHBseSBzbTpzdGF0aWMgc206dG9wLTAgc206bGVmdC0wIHRyYW5zaXRpb24gZHVyYXRpb24tMzAwIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNjQwcHgpIHtcclxuICAuc29jaWFsIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogNDhweDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBhZGRpbmctdG9wOiByZW0oODBweCk7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIHRyYW5zaXRpb246IDAuNXM7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xyXG4gICAgei1pbmRleDogOTk7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGVuKCNlZmVmZWYsIDEwJSk7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IHJlbSg4cHgpIDBweCByZ2JhKGRhcmtlbigjZWZlZmVmLCAxMCUpLCAwLjcpO1xyXG4gICAgJi5hY3RpdmUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgfVxyXG5cclxuICAgIGxpIHtcclxuICAgICAgQGFwcGx5IG1iLTQ7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAyO1xyXG5cclxuICAgICAgYSB7XHJcbiAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJAdGFpbHdpbmQgYmFzZTtcbkB0YWlsd2luZCBjb21wb25lbnRzO1xuQHRhaWx3aW5kIHV0aWxpdGllczsiLG51bGxdfQ== */"]
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: EnvironmentToken, AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EnvironmentToken", function () {
        return EnvironmentToken;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./about/about.component */
      "84zG");
      /* harmony import */


      var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @scullyio/ng-lib */
      "sbAP");
      /* harmony import */


      var _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./blog-list/blog-list.component */
      "1SZ1");
      /* harmony import */


      var _blog_list_blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./blog-list/blog-list-pagination/blog-list-pagination.component */
      "K2wa");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./portfolio/portfolio.component */
      "zyDg");
      /* harmony import */


      var _blog_list_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./blog-list/blog-list-tag/blog-list-tag.component */
      "t4R7");
      /* harmony import */


      var _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./blog-list/blog-list-categories/blog-list-categories.component */
      "sPeH");
      /* harmony import */


      var _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/service-worker */
      "Jho9");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./shared/shared.module */
      "PCNd");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./not-found/not-found.component */
      "nod/");

      var EnvironmentToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('ENVIRONMENT');

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || AppModule)();
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyLibModule"].forRoot({
          useTransferState: true,
          alwaysMonitor: true
        }), _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorkerModule"].register('ngsw-worker.js', {
          enabled: src_environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].production
        }), _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"], _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_9__["PortfolioComponent"], _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_6__["BlogListComponent"], _blog_list_blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_7__["BlogListPaginationComponent"], _blog_list_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_10__["BlogListTagComponent"], _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_11__["BlogListCategoriesComponent"], _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_16__["NotFoundComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyLibModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorkerModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]]
        });
      })();
      /***/

    },

    /***/
    "nod/":
    /*!**************************************************!*\
      !*** ./src/app/not-found/not-found.component.ts ***!
      \**************************************************/

    /*! exports provided: NotFoundComponent */

    /***/
    function nod(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function () {
        return NotFoundComponent;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../blog-list/blog-list.service */
      "9eaD");

      var NotFoundComponent = /*#__PURE__*/function () {
        function NotFoundComponent(activatedRoute, router, blogListService) {
          _classCallCheck(this, NotFoundComponent);

          this.activatedRoute = activatedRoute;
          this.router = router;
          this.blogListService = blogListService;
        }

        _createClass(NotFoundComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])([this.activatedRoute.url, this.blogListService.blogCategories$]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  url = _ref3[0],
                  categories = _ref3[1];

              var segment = url[0].path;
              var convertCate = categories.map(function (e) {
                return e.toLowerCase();
              });

              if (convertCate.includes(segment)) {
                return url;
              }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (v) {
              return !!v;
            })).subscribe(function (url) {
              var path = url.map(function (urlSegment) {
                return urlSegment.path;
              });

              _this2.router.navigate(['/blog'].concat(_toConsumableArray(path)));
            });
          }
        }]);

        return NotFoundComponent;
      }();

      NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) {
        return new (t || NotFoundComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_4__["BlogListService"]));
      };

      NotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: NotFoundComponent,
        selectors: [["app-not-found"]],
        decls: 2,
        vars: 0,
        template: function NotFoundComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "not-found works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3QtZm91bmQuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    "sPeH":
    /*!**********************************************************************************!*\
      !*** ./src/app/blog-list/blog-list-categories/blog-list-categories.component.ts ***!
      \**********************************************************************************/

    /*! exports provided: BlogListCategoriesComponent */

    /***/
    function sPeH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogListCategoriesComponent", function () {
        return BlogListCategoriesComponent;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _blog_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../blog-list.service */
      "9eaD");
      /* harmony import */


      var _blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../blog-list-tag/blog-list-tag.component */
      "t4R7");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = function _c0(a0) {
        return [a0];
      };

      function BlogListCategoriesComponent_li_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, link_r1.route));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", link_r1.date, "\u3000", link_r1.title, "");
        }
      }

      var BlogListCategoriesComponent = /*#__PURE__*/function () {
        function BlogListCategoriesComponent(activatedRoute, blogListService) {
          _classCallCheck(this, BlogListCategoriesComponent);

          this.activatedRoute = activatedRoute;
          this.blogListService = blogListService;
        }

        _createClass(BlogListCategoriesComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this3 = this;

            this.tagList$ = this.activatedRoute.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])('categories'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (categories) {
              if (!categories) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]);
              }

              return _this3.blogListService.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (links) {
                var newLink = links.map(function (link) {
                  var _a;

                  if (((_a = link.categories) === null || _a === void 0 ? void 0 : _a[0]) != null) {
                    link.categories = link.categories.map(function (e) {
                      return e.toLowerCase();
                    });
                  }

                  return link;
                }).filter(function (link) {
                  var _a;

                  return ((_a = link.categories) === null || _a === void 0 ? void 0 : _a[0]) != null && link.categories.includes(categories.toLowerCase());
                });
                return newLink;
              }));
            }));
          }
        }]);

        return BlogListCategoriesComponent;
      }();

      BlogListCategoriesComponent.ɵfac = function BlogListCategoriesComponent_Factory(t) {
        return new (t || BlogListCategoriesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_4__["BlogListService"]));
      };

      BlogListCategoriesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: BlogListCategoriesComponent,
        selectors: [["app-blog-list-categories"]],
        decls: 7,
        vars: 3,
        consts: [[1, "block", "lg:flex", "lg:flex-row-reverse", "lg:space-x-2", "py-4", "mb-10"], [1, "w-full", "lg:w-1/4", "px-6"], [1, "w-full", "lg:w-3/4"], ["class", "py-2", 4, "ngFor", "ngForOf"], [1, "py-2"], [3, "routerLink"]],
        template: function BlogListCategoriesComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "app-blog-list-tag");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, BlogListCategoriesComponent_li_5_Template, 3, 5, "li", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 1, ctx.tagList$));
          }
        },
        directives: [_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_5__["BlogListTagComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QtY2F0ZWdvcmllcy5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    "t4R7":
    /*!********************************************************************!*\
      !*** ./src/app/blog-list/blog-list-tag/blog-list-tag.component.ts ***!
      \********************************************************************/

    /*! exports provided: BlogListTagComponent */

    /***/
    function t4R7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlogListTagComponent", function () {
        return BlogListTagComponent;
      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _blog_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../blog-list.service */
      "9eaD");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = function _c0(a0, a2) {
        return [a0, "categories", a2];
      };

      function BlogListTagComponent_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r1 = ctx.$implicit;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](4, _c0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 2, ctx_r0.path$), item_r1));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r1);
        }
      }

      var BlogListTagComponent = /*#__PURE__*/function () {
        function BlogListTagComponent(activatedRoute, blogListService) {
          _classCallCheck(this, BlogListTagComponent);

          this.activatedRoute = activatedRoute;
          this.blogListService = blogListService;
        }

        _createClass(BlogListTagComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.path$ = this.activatedRoute.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (path) {
              if (!Object.keys(path).length) {
                return '..';
              } else {
                return '';
              }
            }));
          }
        }]);

        return BlogListTagComponent;
      }();

      BlogListTagComponent.ɵfac = function BlogListTagComponent_Factory(t) {
        return new (t || BlogListTagComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_3__["BlogListService"]));
      };

      BlogListTagComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: BlogListTagComponent,
        selectors: [["app-blog-list-tag"]],
        decls: 5,
        vars: 3,
        consts: [[1, "shadow", "p-4", "mb-4", "bg-white"], [1, "border-b", "mb-2", "font-bold", "text-gray-700"], ["class", "inline-block rounded mr-2 mt-2 px-3 py-1 bg-gray-100 text-sm transition-colors duration-200 ease-in-out hover:bg-primary hover:text-white", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "inline-block", "rounded", "mr-2", "mt-2", "px-3", "py-1", "bg-gray-100", "text-sm", "transition-colors", "duration-200", "ease-in-out", "hover:bg-primary", "hover:text-white", 3, "routerLink"]],
        template: function BlogListTagComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u985E\u5225");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BlogListTagComponent_a_3_Template, 3, 7, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, ctx.blogListService.blogCategories$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QtdGFnLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    "up8g":
    /*!*************************************************************!*\
      !*** ./src/app/shared/operators/latest-by-date.operator.ts ***!
      \*************************************************************/

    /*! exports provided: latestByDate */

    /***/
    function up8g(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "latestByDate", function () {
        return latestByDate;
      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      function latestByDate() {
        return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(function (items) {
          return items.sort(function (a, b) {
            var d1 = new Date(a.date);
            var d2 = new Date(b.date);
            return d2.getTime() - d1.getTime();
          });
        });
      }
      /***/

    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _about_about_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./about/about.component */
      "84zG");
      /* harmony import */


      var _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./blog-list/blog-list-categories/blog-list-categories.component */
      "sPeH");
      /* harmony import */


      var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./not-found/not-found.component */
      "nod/");
      /* harmony import */


      var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./portfolio/portfolio.component */
      "zyDg");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [{
        path: '',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | home-home-module */
          "home-home-module").then(__webpack_require__.bind(null,
          /*! ./home/home.module */
          "ct+p")).then(function (m) {
            return m.HomeModule;
          });
        }
      }, {
        path: 'portfolio',
        component: _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_4__["PortfolioComponent"]
      }, {
        path: 'about',
        component: _about_about_component__WEBPACK_IMPORTED_MODULE_1__["AboutComponent"]
      }, {
        path: 'categories',
        children: [{
          path: ':categories',
          component: _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_2__["BlogListCategoriesComponent"]
        }]
      }, {
        path: 'blog',
        // component: BlogListComponent
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | blog-blog-module */
          "blog-blog-module").then(__webpack_require__.bind(null,
          /*! ./blog/blog.module */
          "U4+L")).then(function (m) {
            return m.BlogModule;
          });
        }
      }, {
        path: '404',
        component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__["NotFoundComponent"]
      }, {
        path: '**',
        component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__["NotFoundComponent"]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    },

    /***/
    "zyDg":
    /*!**************************************************!*\
      !*** ./src/app/portfolio/portfolio.component.ts ***!
      \**************************************************/

    /*! exports provided: PortfolioComponent */

    /***/
    function zyDg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function () {
        return PortfolioComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var PortfolioComponent = /*#__PURE__*/function () {
        function PortfolioComponent() {
          _classCallCheck(this, PortfolioComponent);
        }

        _createClass(PortfolioComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return PortfolioComponent;
      }();

      PortfolioComponent.ɵfac = function PortfolioComponent_Factory(t) {
        return new (t || PortfolioComponent)();
      };

      PortfolioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: PortfolioComponent,
        selectors: [["app-portfolio"]],
        decls: 1,
        vars: 0,
        template: function PortfolioComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, "coming soon...\n");
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwb3J0Zm9saW8uY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map