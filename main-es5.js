(function () {
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


      var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @scullyio/ng-lib */
      "sbAP");
      /* harmony import */


      var _blog_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./blog-list.service */
      "9eaD");
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

      function BlogListComponent_div_1_span_5_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "s");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }
      }

      function BlogListComponent_div_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BlogListComponent_div_1_span_5_ng_container_3_Template, 2, 0, "ng-container", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 2, link_r1.readingTime, "1.0-0"), " min");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", link_r1.readingTime > 1);
        }
      }

      var _c0 = function _c0(a1) {
        return ["/categories", a1];
      };

      function BlogListComponent_div_1_a_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, link_r1.categories[0].toLowerCase()));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", link_r1.tags[0], " ");
        }
      }

      var _c1 = function _c1(a0) {
        return [a0];
      };

      function BlogListComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, BlogListComponent_div_1_span_5_Template, 4, 5, "span", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, BlogListComponent_div_1_a_6_Template, 2, 4, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var link_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](4, 6, link_r1.date, "mediumDate"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", link_r1.readingTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", link_r1.tags == null ? null : link_r1.tags.length);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](9, _c1, link_r1.route));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", link_r1.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", link_r1.description, " ");
        }
      }

      var BlogListComponent = /*#__PURE__*/function () {
        function BlogListComponent(scullyRoutesService, blogListService) {
          _classCallCheck(this, BlogListComponent);

          this.scullyRoutesService = scullyRoutesService;
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
        return new (t || BlogListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_2__["ScullyRoutesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_3__["BlogListService"]));
      };

      BlogListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: BlogListComponent,
        selectors: [["app-blog-list"]],
        decls: 4,
        vars: 3,
        consts: [[1, "flex", "flex-col", "divide-y", "divide-gray-300", "p-4", "card"], ["class", "py-4", 4, "ngFor", "ngForOf"], [1, "py-4"], [1, "flex", "justify-between", "items-center"], [1, "font-light", "text-gray-medium"], [4, "ngIf"], ["class", "px-2 py-1 text-sm text-secondary font-bold rounded hover:text-white hover:bg-secondary transition-colors duration-200 ease-in-out cursor-pointer", 3, "routerLink", 4, "ngIf"], [1, "mt-2"], [1, "text-2xl", "font-bold", "hover:text-gray-medium", "transition-colors", "duration-200", "ease-in-out", 3, "routerLink"], [1, "mt-2", "font-thin", "text-gray-dark"], [1, "px-2", "py-1", "text-sm", "text-secondary", "font-bold", "rounded", "hover:text-white", "hover:bg-secondary", "transition-colors", "duration-200", "ease-in-out", "cursor-pointer", 3, "routerLink"]],
        template: function BlogListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BlogListComponent_div_1_Template, 12, 11, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "app-blog-list-pagination");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx.blogListService.blogPageList$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_5__["BlogListPaginationComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLinkWithHref"]],
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
        }));
        this.blogPageList$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]); // this.blogCategories$.subscribe((res) => console.log('blogAllList', res));
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
              content: 'en_US'
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

      var _c1 = function _c1(a0) {
        return {
          page: a0
        };
      };

      function BlogListPaginationComponent_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " previous ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r0.correctPage - 1));
        }
      }

      function BlogListPaginationComponent_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var page_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](3, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](4, _c1, page_r3 + 1));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", page_r3 + 1, " ");
        }
      }

      function BlogListPaginationComponent_a_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Next ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r2.correctPage + 1));
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
        }

        _createClass(BlogListPaginationComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            // if (!this.correctPage) {
            //   this.router.navigate([], { queryParams: { page: 1 } });
            // }
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
                  var total = Math.ceil(links.length / _this.pageSize);
                  _this.total = Array(total).fill(total).map(function (e, i) {
                    return i;
                  });
                  _this.correctPage = page;
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
        decls: 5,
        vars: 3,
        consts: [[1, "mt-8"], [1, "flex", "justify-end"], ["class", "page", 3, "routerLink", "queryParams", 4, "ngIf"], ["class", "page", "routerLinkActive", "active", 3, "routerLink", "queryParams", 4, "ngFor", "ngForOf"], [1, "page", 3, "routerLink", "queryParams"], ["routerLinkActive", "active", 1, "page", 3, "routerLink", "queryParams"]],
        template: function BlogListPaginationComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BlogListPaginationComponent_a_2_Template, 2, 5, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BlogListPaginationComponent_a_3_Template, 2, 6, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, BlogListPaginationComponent_a_4_Template, 2, 5, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage > 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.total);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage < (ctx.total == null ? null : ctx.total.length));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkActive"]],
        styles: [".page[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n\n.page[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(107, 114, 128, var(--tw-bg-opacity));\n}\n\n.page[_ngcontent-%COMP%] {\n  border-color: var(--primary);\n  border-radius: 0.375rem;\n  border-style: solid;\n  border-width: 2px;\n  display: inline-block;\n  font-family: Dosis;\n  margin-left: 0.5rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  --tw-shadow: 2px 2px 0 var(--primary);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  color: var(--primary);\n}\n\n.page[_ngcontent-%COMP%]:hover {\n  --tw-text-opacity: 1;\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\n}\n\n.page[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n\n.page.active[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgba(107, 114, 128, var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxibG9nLWxpc3QtcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90YWlsd2luZGNzcy9saWIvbGliL3N1YnN0aXR1dGVDbGFzc0FwcGx5QXRSdWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQ0VBLDZCQUFtQjtBREFuQjs7QUNBQTtFQUFBLGtCQUFtQjtFQUFuQjtBQUFtQjs7QUFBbkI7RUFBQSw0QkFBbUI7RUFBbkIsdUJBQW1CO0VBQW5CLG1CQUFtQjtFQUFuQixpQkFBbUI7RUFBbkIscUJBQW1CO0VBQW5CLGtCQUFtQjtFQUFuQixtQkFBbUI7RUFBbkIsb0JBQW1CO0VBQW5CLHVCQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIsbUJBQW1CO0VBQW5CLHFDQUFtQjtFQUFuQix1R0FBbUI7RUFBbkI7QUFBbUI7O0FBQW5CO0VBQUEsb0JBQW1CO0VBQW5CO0FBQW1COztBQUFuQjtFQUFBLHlCQUFtQjtFQUFuQix5SUFBbUI7RUFBbkIsaUlBQW1CO0VBQW5CLDBKQUFtQjtFQUFuQix3REFBbUI7RUFBbkIsMEJBQW1CO0VBQW5CLHdEQUFtQjtFQUFuQjtBQUFtQjs7QURBakI7RUNBRixrQkFBbUI7RUFBbkIsMkRBQW1CO0VBQW5CLG9CQUFtQjtFQUFuQixrREFBbUI7QURHbkIiLCJmaWxlIjoiYmxvZy1saXN0LXBhZ2luYXRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFnZSB7XHJcbiAgQGFwcGx5IG1sLTIgcHktMSBweC00IGlubGluZS1ibG9jayBiZy10cmFuc3BhcmVudCBib3JkZXItMiBib3JkZXItc29saWQgYm9yZGVyLXByaW1hcnkgcm91bmRlZC1tZCBzaGFkb3ctYnRuIHRleHQtcHJpbWFyeSB0cmFuc2l0aW9uIGR1cmF0aW9uLTMwMCBlYXNlLWluLW91dCB1cHBlcmNhc2UgZm9udC1kb3NpcyBob3ZlcjpiZy1ncmF5LTUwMCBob3Zlcjp0ZXh0LXdoaXRlO1xyXG4gICYuYWN0aXZlIHtcclxuICAgIEBhcHBseSBiZy1ncmF5LTUwMCB0ZXh0LXdoaXRlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8vIC5wYWdlIHtcclxuLy8gICBAYXBwbHkgbXgtMSBweC0zIHB5LTIgYmctZ3JheS01MCB0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIGhvdmVyOmJnLWdyYXktNTAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1tZDtcclxuLy8gICAmLmFjdGl2ZSB7XHJcbi8vICAgICBAYXBwbHkgYmctZ3JheS01MDAgdGV4dC13aGl0ZTtcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbiIsIkB0YWlsd2luZCBiYXNlO1xuQHRhaWx3aW5kIGNvbXBvbmVudHM7XG5AdGFpbHdpbmQgdXRpbGl0aWVzOyJdfQ== */"]
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


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var SharedModule = function SharedModule() {
        _classCallCheck(this, SharedModule);
      };

      SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || SharedModule)();
      };

      SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: SharedModule
      });
      SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SharedModule, {
          declarations: [_components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__["ThemeToggleComponent"], _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__["MetaComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
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


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _shared_services_theme_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./shared/services/theme.service */
      "ETNk");

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent(router, themeService) {
          _classCallCheck(this, AppComponent);

          this.router = router;
          this.themeService = themeService;
          themeService.load();
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(function (previous, current) {
              if (current instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__["NavigationEnd"]) {
                return previous.url === current.url;
              }

              return true;
            })).subscribe(function (x) {
              console.log('router', x);
              gtag('event', 'page_view', {
                'page_path': x.url
              });
            });
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_theme_service__WEBPACK_IMPORTED_MODULE_3__["ThemeService"]));
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 19,
        vars: 1,
        consts: [[1, "fixed", "z-999", "top-0", "left-0", "flex", "justify-between", "items-center", "w-full", "bg-secondary", "p-4", "border-b-4", "border-solid", "border-primary"], [1, "text-2xl", "font-semibold"], ["routerLink", "/", 1, "text-primary"], [1, "display-inlinie", "font-light", "text-text"], [1, "social"], [1, "btn", 3, "routerLink"], ["href", "https://mtwmt.github.io/website/", 1, "btn"], ["href", "//github.com/mtwmt", "target", "_blank", 1, "btn"], [1, "container", "mx-auto", "pt-24", "pb-8"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Mandy's ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Web");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "nav", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "a", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Blog");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Portfolio");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "a", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "GitHub");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", "/");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterOutlet"]],
        styles: [".social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3RhaWx3aW5kY3NzL2xpYi9saWIvc3Vic3RpdHV0ZUNsYXNzQXBwbHlBdFJ1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdFO0VDREYscUJBQW1CO0FEQW5CIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLnNvY2lhbCB7XHJcbiAgbGkge1xyXG4gICAgQGFwcGx5IGlubGluZS1ibG9jaztcclxuICB9XHJcbn1cclxuIiwiQHRhaWx3aW5kIGJhc2U7XG5AdGFpbHdpbmQgY29tcG9uZW50cztcbkB0YWlsd2luZCB1dGlsaXRpZXM7Il19 */"]
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
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyLibModule"].forRoot({
          useTransferState: true,
          alwaysMonitor: true
        }), _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorkerModule"].register('ngsw-worker.js', {
          enabled: src_environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].production
        }), _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"], _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_6__["BlogListComponent"], _blog_list_blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_7__["BlogListPaginationComponent"], _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_9__["PortfolioComponent"], _blog_list_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_10__["BlogListTagComponent"], _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_11__["BlogListCategoriesComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyLibModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorkerModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]]
        });
      })();
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


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = function _c0(a0) {
        return [a0];
      };

      function BlogListCategoriesComponent_li_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 2);

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
            var _this2 = this;

            this.tagList$ = this.activatedRoute.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])('categories'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (categories) {
              if (!categories) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]);
              }

              return _this2.blogListService.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (links) {
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
        decls: 4,
        vars: 3,
        consts: [["class", "py-2", 4, "ngFor", "ngForOf"], [1, "py-2"], [3, "routerLink"]],
        template: function BlogListCategoriesComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BlogListCategoriesComponent_li_2_Template, 3, 5, "li", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 1, ctx.tagList$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]],
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


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var BlogListTagComponent = /*#__PURE__*/function () {
        function BlogListTagComponent() {
          _classCallCheck(this, BlogListTagComponent);
        }

        _createClass(BlogListTagComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return BlogListTagComponent;
      }();

      BlogListTagComponent.ɵfac = function BlogListTagComponent_Factory(t) {
        return new (t || BlogListTagComponent)();
      };

      BlogListTagComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: BlogListTagComponent,
        selectors: [["app-blog-list-tag"]],
        decls: 2,
        vars: 0,
        template: function BlogListTagComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "blog-list-tag works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
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


      var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./portfolio/portfolio.component */
      "zyDg");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [// {
      //   path: '',
      //   loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      // },
      {
        path: '',
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
        path: 'portfolio',
        component: _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_2__["PortfolioComponent"]
      }, {
        path: 'about',
        component: _about_about_component__WEBPACK_IMPORTED_MODULE_1__["AboutComponent"]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, {
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
        decls: 54,
        vars: 0,
        consts: [[1, "relative", "p-4"], [1, "timeline__item"], [1, "timeline__item-year"], [1, "timeline__item-content"], [1, "card"], ["src", "images", "alt", "title"], [1, "card-summary"], [1, "card-category"], [1, "card-description"], ["href", "link", "target", "_blank"]],
        template: function PortfolioComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "2020");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "figure");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "device");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "description");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "figure");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "img", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "device");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "description");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "2019");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "figure");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "img", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "device");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "description");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "figure");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "img", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "device");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "description");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwb3J0Zm9saW8uY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map