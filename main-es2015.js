(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\SynologyDrive\website\src\main.ts */"zUnb");


/***/ }),

/***/ "1SZ1":
/*!**************************************************!*\
  !*** ./src/app/blog-list/blog-list.component.ts ***!
  \**************************************************/
/*! exports provided: BlogListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogListComponent", function() { return BlogListComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _blog_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blog-list.service */ "9eaD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blog-list-pagination/blog-list-pagination.component */ "K2wa");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");








function BlogListComponent_ng_container_0_div_2_span_5_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "s");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} }
function BlogListComponent_ng_container_0_div_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BlogListComponent_ng_container_0_div_2_span_5_ng_container_3_Template, 2, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const link_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](2, 2, link_r3.readingTime, "1.0-0"), " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", link_r3.readingTime > 1);
} }
const _c0 = function (a1) { return ["/categories", a1]; };
function BlogListComponent_ng_container_0_div_2_a_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const link_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c0, link_r3.categories[0].toLowerCase()));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", link_r3.categories[0], " ");
} }
const _c1 = function (a0) { return [a0]; };
function BlogListComponent_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, BlogListComponent_ng_container_0_div_2_span_5_Template, 4, 5, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, BlogListComponent_ng_container_0_div_2_a_6_Template, 2, 4, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const link_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](4, 6, link_r3.date, "mediumDate"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", link_r3.readingTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", link_r3.categories == null ? null : link_r3.categories.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](9, _c1, link_r3.route));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", link_r3.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", link_r3.description, " ");
} }
function BlogListComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BlogListComponent_ng_container_0_div_2_Template, 12, 11, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "app-blog-list-pagination");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", list_r1);
} }
class BlogListComponent {
    constructor(formBuilder, blogListService) {
        this.formBuilder = formBuilder;
        this.blogListService = blogListService;
        this.assetsUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].assetsUrl;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            aaa: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]()
        });
    }
    ngOnInit() {
    }
}
BlogListComponent.ɵfac = function BlogListComponent_Factory(t) { return new (t || BlogListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_3__["BlogListService"])); };
BlogListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: BlogListComponent, selectors: [["app-blog-list"]], decls: 2, vars: 3, consts: [[4, "ngIf"], [1, "flex", "flex-col", "divide-y", "divide-gray-300", "p-4", "card"], ["class", "py-4", 4, "ngFor", "ngForOf"], [1, "py-4"], [1, "flex", "justify-between", "items-center"], [1, "font-light", "text-gray-medium", "lg:text-base", "sm:text-xs"], ["class", "px-2 py-1 lg:text-sm sm:text-xs text-secondary font-bold rounded hover:text-white hover:bg-secondary transition-colors duration-200 ease-in-out cursor-pointer", 3, "routerLink", 4, "ngIf"], [1, "mt-2"], [1, "md:text-2xl", "text-xl", "font-bold", "hover:text-gray-medium", "transition-colors", "duration-200", "ease-in-out", 3, "routerLink"], [1, "mt-2", "font-thin", "text-gray-dark"], [1, "px-2", "py-1", "lg:text-sm", "sm:text-xs", "text-secondary", "font-bold", "rounded", "hover:text-white", "hover:bg-secondary", "transition-colors", "duration-200", "ease-in-out", "cursor-pointer", 3, "routerLink"]], template: function BlogListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, BlogListComponent_ng_container_0_Template, 4, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, ctx.blogListService.blogPageList$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_5__["BlogListPaginationComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DecimalPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "84zG":
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class AboutComponent {
    constructor() { }
    ngOnInit() { }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) { return new (t || AboutComponent)(); };
AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutComponent, selectors: [["app-about"]], decls: 0, vars: 0, template: function AboutComponent_Template(rf, ctx) { }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "9eaD":
/*!************************************************!*\
  !*** ./src/app/blog-list/blog-list.service.ts ***!
  \************************************************/
/*! exports provided: BlogListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogListService", function() { return BlogListService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_operators_latest_by_date_operator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/operators/latest-by-date.operator */ "up8g");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @scullyio/ng-lib */ "sbAP");






class BlogListService {
    constructor(httpClient, scullyRoutesService) {
        this.httpClient = httpClient;
        this.scullyRoutesService = scullyRoutesService;
        this.blogAllList$ = this.scullyRoutesService.available$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((router) => router.filter((e) => !!e.title)), Object(_shared_operators_latest_by_date_operator__WEBPACK_IMPORTED_MODULE_1__["latestByDate"])());
        this.blogCategories$ = this.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((list) => {
            const temp = list.map(e => e.categories);
            const newTemp = [].concat(...temp);
            const categories = Array.from(new Set(newTemp));
            return categories.filter(e => !!e);
        }));
        // list 分頁
        this.blogPageList$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
}
BlogListService.ɵfac = function BlogListService_Factory(t) { return new (t || BlogListService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyRoutesService"])); };
BlogListService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: BlogListService, factory: BlogListService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    url: 'https://mtwmt.github.io',
    baseUrl: 'http://localhost:4200',
    assetsUrl: 'assets',
    title: 'Mandy\'s Website',
    featureImage: 'assets/images/photo.jpg',
    description: '學習記錄',
    keywords: [
        'blog',
        'Angular',
        'Web Site',
        'Scully',
    ],
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BUtL":
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/theme-toggle/theme-toggle.component.ts ***!
  \**************************************************************************/
/*! exports provided: ThemeToggleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeToggleComponent", function() { return ThemeToggleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_theme_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/theme.service */ "ETNk");


class ThemeToggleComponent {
    constructor(themeService) {
        this.themeService = themeService;
        this.ariaLabel = 'Dark and Light mode toggle button';
        this.current = this.themeService.scheme;
    }
    get themeToggleClasses() {
        return ('w-10 h-10 lg:flex lg:items-center lg:justify-center cursor-pointer' +
            ' ' +
            this.positionClass);
    }
    onClick() {
        this.themeService.update();
        this.current = this.themeService.scheme;
    }
    ngOnInit() {
    }
}
ThemeToggleComponent.ɵfac = function ThemeToggleComponent_Factory(t) { return new (t || ThemeToggleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_theme_service__WEBPACK_IMPORTED_MODULE_1__["ThemeService"])); };
ThemeToggleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ThemeToggleComponent, selectors: [["app-theme-toggle"]], hostVars: 3, hostBindings: function ThemeToggleComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ThemeToggleComponent_click_HostBindingHandler() { return ctx.onClick(); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.ariaLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.themeToggleClasses);
    } }, inputs: { positionClass: "positionClass" }, decls: 0, vars: 0, template: function ThemeToggleComponent_Template(rf, ctx) { }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aGVtZS10b2dnbGUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "CPxR":
/*!**********************************************************!*\
  !*** ./src/app/shared/components/meta/meta.component.ts ***!
  \**********************************************************/
/*! exports provided: MetaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaComponent", function() { return MetaComponent; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_meta_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/meta.service */ "IX8d");




class MetaComponent {
    constructor(router, metaService) {
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
    ngOnInit() {
    }
    ngOnChanges(changes) {
        this.updateMetaTags();
    }
    updateMetaTags() {
        this.metaService.generateMetaTags({
            title: this.title,
            description: this.title,
            //TODO: md 尚未有 description, 所以先以標題替代
            // description: this.description,
            route: this.route,
            keywords: this.keywords ? [...this.tags, ...this.keywords] : this.tags,
            image: this.image,
            // twitter_image: this.twitterImage
            //   ? this.getTwitterImage(this.twitterImage)
            //   : null,
            // og_image: this.ogImage ? this.getOgImage(this.ogImage) : null,
            robots: this.robots,
            article: this.getArticle(),
            author: this.getAuthor(),
        });
    }
    getArticle() {
        if (this.articlePublishedAt &&
            this.articleUpdatedAt &&
            this.articleAuthors) {
            return {
                published_time: this.articlePublishedAt,
                modified_time: this.articleUpdatedAt,
                tag: this.tags,
                author: this.articleAuthors,
            };
        }
        return null;
    }
    getAuthor() {
        if (this.authorFirstName && this.authorLastName && this.authorUserName) {
            return {
                first_name: this.authorFirstName,
                last_name: this.authorLastName,
                username: this.authorUserName,
            };
        }
        return null;
    }
    getOgImage(ogRoute) {
        return `https://mtwmt.github.io/assets/banners${ogRoute}/og.png`;
    }
    absoluteImageUrl(image) {
        return `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url}/${image}`;
    }
}
MetaComponent.ɵfac = function MetaComponent_Factory(t) { return new (t || MetaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_meta_service__WEBPACK_IMPORTED_MODULE_3__["MetaService"])); };
MetaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MetaComponent, selectors: [["app-meta"]], inputs: { title: "title", description: "description", tags: "tags", keywords: "keywords", route: "route", image: "image", twitterImage: "twitterImage", ogImage: "ogImage", robots: "robots", authorFirstName: "authorFirstName", authorLastName: "authorLastName", authorUserName: "authorUserName", articlePublishedAt: "articlePublishedAt", articleUpdatedAt: "articleUpdatedAt", articleAuthors: "articleAuthors" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 0, vars: 0, template: function MetaComponent_Template(rf, ctx) { }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZXRhLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "ETNk":
/*!**************************************************!*\
  !*** ./src/app/shared/services/theme.service.ts ***!
  \**************************************************/
/*! exports provided: ThemeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeService", function() { return ThemeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ThemeService {
    constructor(rendererFactory2) {
        this.rendererFactory2 = rendererFactory2;
        this.renderer = rendererFactory2.createRenderer(null, null);
    }
    get scheme() {
        return this.currentScheme;
    }
    load() {
        this.getCurrentScheme();
        this.add(this.scheme);
        this.remove(this.scheme === 'dark' ? 'light' : 'dark');
    }
    update() {
        const updateScheme = this.scheme === 'dark' ? 'light' : 'dark';
        this.remove(this.scheme);
        this.add(updateScheme);
        localStorage.setItem('prefers-scheme', updateScheme);
        this.currentScheme = updateScheme;
    }
    remove(scheme) {
        this.renderer.removeClass(document.body, `theme-${scheme}`);
    }
    add(scheme) {
        this.renderer.addClass(document.body, `theme-${scheme}`);
    }
    getCurrentScheme() {
        const scheme = localStorage.getItem('prefers-scheme');
        if (scheme != null) {
            return (this.currentScheme = scheme);
        }
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
            return (this.currentScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light');
        }
        // default to light theme if browser does not support prefers-color-scheme
        return (this.currentScheme = 'light');
    }
}
ThemeService.ɵfac = function ThemeService_Factory(t) { return new (t || ThemeService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"])); };
ThemeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ThemeService, factory: ThemeService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "IX8d":
/*!*************************************************!*\
  !*** ./src/app/shared/services/meta.service.ts ***!
  \*************************************************/
/*! exports provided: MetaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaService", function() { return MetaService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");



class MetaService {
    constructor(meta, title) {
        this.meta = meta;
        this.title = title;
        this.defaultConfig = {
            title: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].title,
            description: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].description,
            robots: 'index, follow',
            image: this.absoluteImageUrl(_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].featureImage),
            route: '',
        };
    }
    setTitle(title) {
        this.title.setTitle(title);
    }
    setDescription(description) {
        this.meta.updateTag({ name: 'description', content: description });
    }
    updateRobots(robots) {
        this.meta.updateTag({ name: 'robots', content: robots });
    }
    updateKeywords(keywords) {
        this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    }
    generateMetaTags(config = {}) {
        config = Object.assign(Object.assign(Object.assign({}, this.defaultConfig), config), { keywords: config.keywords
                ? [..._environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].keywords, ...config.keywords]
                : _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].keywords });
        this.setTitle(config.title);
        this.setDescription(config.description);
        this.updateRobots(config.robots);
        this.updateKeywords(config.keywords);
        this.openGraph(config);
        // this.twitterCard(config);
    }
    openGraph(config) {
        this.meta.updateTag({ property: 'og:title', content: config.title });
        this.meta.updateTag({
            property: 'og:description',
            content: config.description,
        });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({
            property: 'og:url',
            content: `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url}${config.route}`,
        });
        this.meta.updateTag({
            property: 'og:image',
            content: config.og_image || config.image,
        });
        this.meta.updateTag({
            property: 'og:image:alt',
            content: config.description,
        });
        this.meta.updateTag({
            property: 'og:site_name',
            content: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].title,
        });
        this.meta.updateTag({
            property: 'og:locale',
            content: 'zh_tw',
        });
        if (config.article) {
            this.meta.updateTag({
                property: 'og:type',
                content: 'article',
            });
            this.meta.updateTag({
                property: `og:article:published_time`,
                content: config.article.published_time,
            });
            this.meta.updateTag({
                property: `og:article:modified_time`,
                content: config.article.modified_time,
            });
            this.meta.updateTag({
                property: `og:article:tag`,
                content: config.article.tag.join(', '),
            });
            this.meta.updateTag({
                property: `og:article:author`,
                content: config.article.author.join(', '),
            });
            return;
        }
        else {
            this.meta.removeTag('property="og:article:published_time"');
            this.meta.removeTag('property="og:article:modified_time"');
            this.meta.removeTag('property="og:article:tag"');
            this.meta.removeTag('property="og:article:author"');
        }
        if (config.author) {
            this.meta.updateTag({
                property: 'og:type',
                content: 'profile',
            });
            this.meta.updateTag({
                property: `og:profile:first_name`,
                content: config.author.first_name,
            });
            this.meta.updateTag({
                property: `og:profile:lastname`,
                content: config.author.last_name,
            });
            this.meta.updateTag({
                property: `og:profile:username`,
                content: config.author.username,
            });
            return;
        }
        else {
            this.meta.removeTag('property="og:profile:first_name"');
            this.meta.removeTag('property="og:profile:lastname"');
            this.meta.removeTag('property="og:profile:username"');
        }
        this.meta.updateTag({
            property: 'og:type',
            content: 'website',
        });
    }
    twitterCard(config) {
        this.meta.updateTag({
            name: 'twitter:card',
            content: 'summary_large_image',
        });
        this.meta.updateTag({ name: 'twitter:site', content: '@notiz_dev' });
        this.meta.updateTag({ name: 'twitter:creator', content: '@notiz_dev' });
        this.meta.updateTag({ name: 'twitter:title', content: config.title });
        this.meta.updateTag({
            name: 'twitter:description',
            content: config.description,
        });
        this.meta.updateTag({
            name: 'twitter:image',
            content: config.twitter_image || config.image,
        });
    }
    absoluteImageUrl(image) {
        return `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url}/${image}`;
    }
}
MetaService.ɵfac = function MetaService_Factory(t) { return new (t || MetaService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"])); };
MetaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MetaService, factory: MetaService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "K2wa":
/*!**********************************************************************************!*\
  !*** ./src/app/blog-list/blog-list-pagination/blog-list-pagination.component.ts ***!
  \**********************************************************************************/
/*! exports provided: BlogListPaginationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogListPaginationComponent", function() { return BlogListPaginationComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _blog_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blog-list.service */ "9eaD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






const _c0 = function () { return ["./"]; };
const _c1 = function (a0) { return { page: a0 }; };
function BlogListPaginationComponent_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " << ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r0.correctPage - 1));
} }
function BlogListPaginationComponent_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const page_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("btn-active", page_r3 === ctx_r1.correctPage);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](5, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c1, page_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", page_r3, " ");
} }
function BlogListPaginationComponent_a_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " >> ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r2.correctPage + 1));
} }
class BlogListPaginationComponent {
    constructor(router, activatedRoute, blogListService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.blogListService = blogListService;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.pageSize = 10;
        this.link = [''];
        this.pageLimit = 10;
    }
    ngOnInit() {
        this.activatedRoute.params
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(this.params || ''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((params) => {
            return this.activatedRoute.queryParamMap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((paramMap) => +paramMap.get('page') || 1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((page) => {
                return this.blogListService.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((routes) => {
                    if (params) {
                        return routes.filter((route) => {
                            var _a;
                            return (((_a = route[this.name]) === null || _a === void 0 ? void 0 : _a[0]) != null &&
                                route[this.name][0].toLowerCase() ===
                                    params.toLowerCase());
                        });
                    }
                    else {
                        return routes;
                    }
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((links) => {
                    this.correctPage = page;
                    let totalPage = Math.floor(links.length / this.pageSize);
                    (totalPage % this.pageSize == 0) ? totalPage = totalPage : totalPage = totalPage + 1;
                    this.totalPage = totalPage;
                    const start = page - ((page - 1) % this.pageLimit);
                    const limit = Math.min((page - ((page - 1) % this.pageLimit) + (this.pageLimit - 1)), totalPage);
                    this.total = Array(limit)
                        .fill(limit)
                        .filter((e, i) => {
                        return i < this.pageLimit;
                    }).map((e, i) => {
                        return i + start;
                    })
                        .filter((e, i) => {
                        return e <= totalPage;
                    });
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((links) => {
                    return links.slice((page - 1) * this.pageSize, page * this.pageSize);
                }));
            }));
        }))
            .subscribe((res) => {
            this.blogListService.blogPageList$.next(res);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
BlogListPaginationComponent.ɵfac = function BlogListPaginationComponent_Factory(t) { return new (t || BlogListPaginationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_4__["BlogListService"])); };
BlogListPaginationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: BlogListPaginationComponent, selectors: [["app-blog-list-pagination"]], inputs: { params: "params", name: "name" }, decls: 5, vars: 3, consts: [[1, "mt-8"], [1, "text-right"], ["class", "btn bg-white mb-4", 3, "routerLink", "queryParams", 4, "ngIf"], ["class", "btn bg-white mb-4", "routerLinkActive", "active", 3, "btn-active", "routerLink", "queryParams", 4, "ngFor", "ngForOf"], [1, "btn", "bg-white", "mb-4", 3, "routerLink", "queryParams"], ["routerLinkActive", "active", 1, "btn", "bg-white", "mb-4", 3, "routerLink", "queryParams"]], template: function BlogListPaginationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BlogListPaginationComponent_a_2_Template, 2, 5, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BlogListPaginationComponent_a_3_Template, 2, 8, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, BlogListPaginationComponent_a_4_Template, 2, 5, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage > 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.total);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.correctPage < ctx.totalPage);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkActive"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QtcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "PCNd":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/meta/meta.component */ "CPxR");
/* harmony import */ var _components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/theme-toggle/theme-toggle.component */ "BUtL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__["ThemeToggleComponent"], _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__["MetaComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]], exports: [_components_theme_toggle_theme_toggle_component__WEBPACK_IMPORTED_MODULE_2__["ThemeToggleComponent"], _components_meta_meta_component__WEBPACK_IMPORTED_MODULE_1__["MetaComponent"]] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_services_theme_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/services/theme.service */ "ETNk");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




class AppComponent {
    constructor(themeService) {
        this.themeService = themeService;
        this.isOpen = false;
        themeService.load();
    }
    ngOnInit() { }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_theme_service__WEBPACK_IMPORTED_MODULE_1__["ThemeService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 22, vars: 4, consts: [[1, "fixed", "z-999", "top-0", "left-0", "flex", "justify-between", "items-center", "w-full", "bg-secondary", "p-4", "border-b-4", "border-solid", "border-primary"], [1, "text-2xl", "font-semibold", "font-dosis"], ["routerLink", "/", 1, "text-primary"], [1, "display-inlinie", "font-light", "text-text"], ["href", "javascript:void(0);", "title", "MENU", 1, "hamburger", "md:hidden", "sm:block", 3, "ngClass", "click"], [1, "social", "md:block", 3, "ngClass"], [1, "btn", 3, "routerLink", "click"], ["href", "//github.com/mtwmt", "target", "_blank", 1, "btn", 3, "click"], [1, "container", "mx-auto", "pt-24", "pb-8", "px-4"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Mandy's");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Web");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_6_listener() { return ctx.isOpen = !ctx.isOpen; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "MENU");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "nav", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_12_listener() { return ctx.isOpen = !ctx.isOpen; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Blog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_15_listener() { return ctx.isOpen = !ctx.isOpen; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Portfolio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_18_listener() { return ctx.isOpen = !ctx.isOpen; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "GitHub");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isOpen ? "active" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isOpen ? "active" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "portfolio");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: [".hamburger[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 1.875rem;\n  margin: auto;\n  width: 1.875rem;\n  height: 1.5625rem;\n  z-index: 999;\n}\n\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  text-indent: -9999px;\n  transition: 0.5s;\n  position: absolute;\n  display: block;\n  cursor: pointer;\n  width: 30px;\n  height: 5px;\n  background: var(--primary);\n  margin: 10px 0;\n}\n\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  transition: 0.5s;\n  content: \"\";\n  position: absolute;\n  top: -10px;\n  left: 0;\n  display: block;\n  width: 30px;\n  height: 5px;\n  background: var(--primary);\n}\n\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after {\n  transition: 0.5s;\n  content: \"\";\n  position: absolute;\n  top: 10px;\n  left: 0;\n  display: block;\n  width: 30px;\n  height: 5px;\n  background: var(--primary);\n}\n\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  background-color: transparent;\n}\n\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  top: -10px;\n  transform: translateY(10.5px) rotate(45deg);\n}\n\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after {\n  top: -10px;\n  transform: translateY(10.5px) rotate(-45deg);\n}\n\n.social[_ngcontent-%COMP%] {\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n\n@media (min-width: 640px) {\n  .social[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n  }\n}\n\n@media (min-width: 768px) {\n  .social[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n\n.social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n@media (max-width: 768px) {\n  .social[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 68px;\n    left: 0;\n    display: block;\n    padding-top: 5rem;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    transition: 0.5s;\n    transform: translateX(-100%);\n    z-index: 99;\n    background: white;\n    box-shadow: 0px 1px 0.5rem 0px rgba(214, 214, 214, 0.7);\n  }\n\n  .social.active[_ngcontent-%COMP%] {\n    transform: translateX(0%);\n    overflow: hidden;\n  }\n\n  .social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    display: block;\n    text-align: center;\n    line-height: 2;\n  }\n\n  .social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    width: 70%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3RhaWx3aW5kY3NzL2xpYi9saWIvc3Vic3RpdHV0ZUNsYXNzQXBwbHlBdFJ1bGVzLmpzIiwiPG5vIHNvdXJjZT4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NBO0VBRUUsa0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUFsQ0Y7O0FBbUNFO0VBQ0UscUJBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBMUNGLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxXQXdDcUM7RUF2Q3JDLFdBQUE7RUFDQSwwQkFzQ3FCO0VBckNyQixjQUFBO0FBVUY7O0FBVEU7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsY0FBQTtFQUNBLFdBNkJtQztFQTVCbkMsV0FBQTtFQUNBLDBCQTJCbUI7QUFoQnZCOztBQVRFO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGNBQUE7RUFDQSxXQWtCbUM7RUFqQm5DLFdBQUE7RUFDQSwwQkFnQm1CO0FBTHZCOztBQVFJO0VBRUUseUJBQUE7RUFDQSw2QkFBQTtBQVBOOztBQVFNO0VBQ0UsVUFBQTtFQUNBLDJDQUFBO0FBTlI7O0FBUU07RUFDRSxVQUFBO0VBQ0EsNENBQUE7QUFOUjs7QUFZQTtFQy9EQSx5SUFBbUI7RUFBbkIsaUlBQW1CO0VBQW5CLDBKQUFtQjtFQUFuQix3REFBbUI7RUFBbkIsMEJBQW1CO0VBQW5CLHdEQUFtQjtFQUFuQiwwQkFBbUI7QUR1RG5COztBRXpEQTtFREVBO0lBQUEsa0JBQW1CO0lBQW5CLFFBQW1CO0lBQW5CO0VBQW1CO0NDRm5COztBQUFBO0VERUE7SUFBQTtFQUFtQjtDQ0ZuQjs7QUZrRUU7RUNoRUYscUJBQW1CO0FEMERuQjs7QUFhQTtFQUNFO0lBQ0UsZUFBQTtJQUNBLFNBQUE7SUFDQSxPQUFBO0lBQ0EsY0FBQTtJQUNBLGlCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxTQUFBO0lBQ0EsZ0JBQUE7SUFDQSw0QkFBQTtJQUNBLFdBQUE7SUFDQSxpQkFBQTtJQUNBLHVEQUFBO0VBVkY7O0VBV0U7SUFDRSx5QkFBQTtJQUNBLGdCQUFBO0VBVEo7O0VBWUU7SUMzRkosbUJBQW1CO0lENkZiLGNBQUE7SUFDQSxrQkFBQTtJQUNBLGNBQUE7RUFWSjs7RUFZSTtJQUNFLFVBQUE7RUFWTjtBQUNGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL2Fzc2V0cy9zY3NzL2NvbW1vbic7XHJcblxyXG5AbWl4aW4gaGFtYnVyZ2VyKCRjb2xvciwgJGljb25XKSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB3aWR0aDogJGljb25XO1xyXG4gIGhlaWdodDogJGljb25XLzY7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yO1xyXG4gIG1hcmdpbjogJGljb25XLzMgMDtcclxuICAmOmJlZm9yZSB7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjVzO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IC0kaWNvblcvMztcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAkaWNvblc7XHJcbiAgICBoZWlnaHQ6ICRpY29uVy82O1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yO1xyXG4gIH1cclxuICAmOmFmdGVyIHtcclxuICAgIHRyYW5zaXRpb246IDAuNXM7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogJGljb25XLzM7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogJGljb25XO1xyXG4gICAgaGVpZ2h0OiAkaWNvblcvNjtcclxuICAgIGJhY2tncm91bmQ6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbi5oYW1idXJnZXIge1xyXG4gIC8vIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiByZW0oMzBweCk7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHdpZHRoOiByZW0oMzBweCk7XHJcbiAgaGVpZ2h0OiByZW0oMjVweCk7XHJcbiAgei1pbmRleDogOTk5O1xyXG4gIHNwYW4ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgdGV4dC1pbmRlbnQ6IC05OTk5cHg7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjVzO1xyXG4gICAgQGluY2x1ZGUgaGFtYnVyZ2VyKHZhcigtLXByaW1hcnkpLCAzMHB4KTtcclxuICB9XHJcbiAgJi5hY3RpdmUge1xyXG4gICAgc3BhbiB7XHJcbiAgICAgIC8vIHJpZ2h0OiByZW0oMTVweCk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgdG9wOiAtMTBweDtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAuNXB4KSByb3RhdGUoNDVkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgIHRvcDogLTEwcHg7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwLjVweCkgcm90YXRlKC00NWRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5zb2NpYWwge1xyXG4gIGxpIHtcclxuICAgIEBhcHBseSBpbmxpbmUtYmxvY2s7XHJcbiAgfVxyXG5cclxuICBAYXBwbHkgbWQ6c3RhdGljIHNtOmFic29sdXRlIHNtOnRvcC0wIHNtOmxlZnQtMCB0cmFuc2l0aW9uIGR1cmF0aW9uLTMwMCBlYXNlLWluLW91dDtcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLnNvY2lhbCB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDY4cHg7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwYWRkaW5nLXRvcDogcmVtKDgwcHgpO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjVzO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcclxuICAgIHotaW5kZXg6IDk5O1xyXG4gICAgYmFja2dyb3VuZDogbGlnaHRlbigjZWZlZmVmLCAxMCUpO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCByZW0oOHB4KSAwcHggcmdiYShkYXJrZW4oI2VmZWZlZiwgMTAlKSwgMC43KTtcclxuICAgICYuYWN0aXZlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIH1cclxuXHJcbiAgICBsaSB7XHJcbiAgICAgIEBhcHBseSBtYi00O1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBsaW5lLWhlaWdodDogMjtcclxuXHJcbiAgICAgIGEge1xyXG4gICAgICAgIHdpZHRoOiA3MCU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiQHRhaWx3aW5kIGJhc2U7XG5AdGFpbHdpbmQgY29tcG9uZW50cztcbkB0YWlsd2luZCB1dGlsaXRpZXM7IixudWxsXX0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: EnvironmentToken, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentToken", function() { return EnvironmentToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about/about.component */ "84zG");
/* harmony import */ var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @scullyio/ng-lib */ "sbAP");
/* harmony import */ var _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blog-list/blog-list.component */ "1SZ1");
/* harmony import */ var _blog_list_blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blog-list/blog-list-pagination/blog-list-pagination.component */ "K2wa");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "zyDg");
/* harmony import */ var _blog_list_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blog-list/blog-list-tag/blog-list-tag.component */ "t4R7");
/* harmony import */ var _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./blog-list/blog-list-categories/blog-list-categories.component */ "sPeH");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/service-worker */ "Jho9");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/shared.module */ "PCNd");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ "3Pt+");



















const EnvironmentToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('ENVIRONMENT');
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"],
            _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyLibModule"].forRoot({ useTransferState: true, alwaysMonitor: true }),
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorkerModule"].register('ngsw-worker.js', {
                enabled: src_environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].production,
            }),
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"],
        _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_6__["BlogListComponent"],
        _blog_list_blog_list_pagination_blog_list_pagination_component__WEBPACK_IMPORTED_MODULE_7__["BlogListPaginationComponent"],
        _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_9__["PortfolioComponent"],
        _blog_list_blog_list_tag_blog_list_tag_component__WEBPACK_IMPORTED_MODULE_10__["BlogListTagComponent"],
        _blog_list_blog_list_categories_blog_list_categories_component__WEBPACK_IMPORTED_MODULE_11__["BlogListCategoriesComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"], _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__["ScullyLibModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_12__["ServiceWorkerModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]] }); })();


/***/ }),

/***/ "sPeH":
/*!**********************************************************************************!*\
  !*** ./src/app/blog-list/blog-list-categories/blog-list-categories.component.ts ***!
  \**********************************************************************************/
/*! exports provided: BlogListCategoriesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogListCategoriesComponent", function() { return BlogListCategoriesComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _blog_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blog-list.service */ "9eaD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






const _c0 = function (a0) { return [a0]; };
function BlogListCategoriesComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const link_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, link_r1.route));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", link_r1.date, "\u3000", link_r1.title, "");
} }
class BlogListCategoriesComponent {
    constructor(activatedRoute, blogListService) {
        this.activatedRoute = activatedRoute;
        this.blogListService = blogListService;
    }
    ngOnInit() {
        this.tagList$ = this.activatedRoute.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])('categories'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((categories) => {
            if (!categories) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]);
            }
            return this.blogListService.blogAllList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((links) => {
                const newLink = links
                    .map((link) => {
                    var _a;
                    if (((_a = link.categories) === null || _a === void 0 ? void 0 : _a[0]) != null) {
                        link.categories = link.categories.map((e) => e.toLowerCase());
                    }
                    return link;
                })
                    .filter((link) => {
                    var _a;
                    return ((_a = link.categories) === null || _a === void 0 ? void 0 : _a[0]) != null &&
                        link.categories.includes(categories.toLowerCase());
                });
                return newLink;
            }));
        }));
    }
}
BlogListCategoriesComponent.ɵfac = function BlogListCategoriesComponent_Factory(t) { return new (t || BlogListCategoriesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_blog_list_service__WEBPACK_IMPORTED_MODULE_4__["BlogListService"])); };
BlogListCategoriesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: BlogListCategoriesComponent, selectors: [["app-blog-list-categories"]], decls: 4, vars: 3, consts: [["class", "py-2", 4, "ngFor", "ngForOf"], [1, "py-2"], [3, "routerLink"]], template: function BlogListCategoriesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BlogListCategoriesComponent_li_2_Template, 3, 5, "li", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 1, ctx.tagList$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QtY2F0ZWdvcmllcy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "t4R7":
/*!********************************************************************!*\
  !*** ./src/app/blog-list/blog-list-tag/blog-list-tag.component.ts ***!
  \********************************************************************/
/*! exports provided: BlogListTagComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogListTagComponent", function() { return BlogListTagComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class BlogListTagComponent {
    constructor() { }
    ngOnInit() {
    }
}
BlogListTagComponent.ɵfac = function BlogListTagComponent_Factory(t) { return new (t || BlogListTagComponent)(); };
BlogListTagComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BlogListTagComponent, selectors: [["app-blog-list-tag"]], decls: 2, vars: 0, template: function BlogListTagComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "blog-list-tag works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9nLWxpc3QtdGFnLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "up8g":
/*!*************************************************************!*\
  !*** ./src/app/shared/operators/latest-by-date.operator.ts ***!
  \*************************************************************/
/*! exports provided: latestByDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latestByDate", function() { return latestByDate; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");

function latestByDate() {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])((items) => items.sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2.getTime() - d1.getTime();
    }));
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about/about.component */ "84zG");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "zyDg");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    // {
    //   path: '',
    //   loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    // },
    {
        path: 'portfolio',
        component: _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_2__["PortfolioComponent"],
    },
    {
        path: 'about',
        component: _about_about_component__WEBPACK_IMPORTED_MODULE_1__["AboutComponent"],
    },
    {
        path: '',
        loadChildren: () => __webpack_require__.e(/*! import() | blog-blog-module */ "blog-blog-module").then(__webpack_require__.bind(null, /*! ./blog/blog.module */ "U4+L")).then(m => m.BlogModule),
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zyDg":
/*!**************************************************!*\
  !*** ./src/app/portfolio/portfolio.component.ts ***!
  \**************************************************/
/*! exports provided: PortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function() { return PortfolioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PortfolioComponent {
    constructor() { }
    ngOnInit() {
    }
}
PortfolioComponent.ɵfac = function PortfolioComponent_Factory(t) { return new (t || PortfolioComponent)(); };
PortfolioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PortfolioComponent, selectors: [["app-portfolio"]], decls: 1, vars: 0, template: function PortfolioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, "portfolio\n");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwb3J0Zm9saW8uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map