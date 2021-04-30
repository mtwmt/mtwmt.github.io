(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "9vUh":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_services_meta_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/services/meta.service */ "IX8d");
/* harmony import */ var _blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blog-list/blog-list.service */ "9eaD");
/* harmony import */ var _side_side_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./side/side.component */ "Yvv/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





class HomeComponent {
    constructor(metaService, blogListService) {
        this.metaService = metaService;
        this.blogListService = blogListService;
    }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_meta_service__WEBPACK_IMPORTED_MODULE_1__["MetaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_2__["BlogListService"])); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 6, vars: 0, consts: [[1, "grid", "gap-x-4", "grid-cols-1", "lg:grid-cols-4", "px-4"], [1, "col-span-4", "lg:col-span-1"], [1, "col-span-4", "lg:col-span-3"], [1, "rounded"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "aside", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-side");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "main", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_side_side_component__WEBPACK_IMPORTED_MODULE_3__["SideComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "A3+G":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../about/about.component */ "84zG");
/* harmony import */ var _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blog-list/blog-list.component */ "1SZ1");
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.component */ "9vUh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






const routes = [
    {
        path: '',
        component: _home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        children: [
            {
                path: '',
                component: _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_2__["BlogListComponent"]
            },
            {
                path: 'about',
                component: _about_about_component__WEBPACK_IMPORTED_MODULE_1__["AboutComponent"]
            },
        ]
    }
];
class HomeRoutingModule {
}
HomeRoutingModule.ɵfac = function HomeRoutingModule_Factory(t) { return new (t || HomeRoutingModule)(); };
HomeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: HomeRoutingModule });
HomeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](HomeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "W9Gu":
/*!************************************************************!*\
  !*** ./src/app/home/side/side-info/side-info.component.ts ***!
  \************************************************************/
/*! exports provided: SideInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideInfoComponent", function() { return SideInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class SideInfoComponent {
    constructor() { }
    ngOnInit() {
    }
}
SideInfoComponent.ɵfac = function SideInfoComponent_Factory(t) { return new (t || SideInfoComponent)(); };
SideInfoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SideInfoComponent, selectors: [["app-side-info"]], decls: 4, vars: 0, consts: [[1, "font-bold", "mb-4", "text-xl"], [1, "font-hairline", "mb-4"]], template: function SideInfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Mandy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " hey!\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWRlLWluZm8uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "XXxO":
/*!****************************************************************!*\
  !*** ./src/app/home/side/side-avatar/side-avatar.component.ts ***!
  \****************************************************************/
/*! exports provided: SideAvatarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideAvatarComponent", function() { return SideAvatarComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SideAvatarComponent {
    constructor() {
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        this.destroy$.next();
        this.destroy$.complete();
    }
    reload(hasUpdate) {
        var _a;
        if (!hasUpdate) {
            return;
        }
        (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.reload();
    }
}
SideAvatarComponent.ɵfac = function SideAvatarComponent_Factory(t) { return new (t || SideAvatarComponent)(); };
SideAvatarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SideAvatarComponent, selectors: [["app-side-avatar"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 1, consts: [["role", "img", "aria-label", "Avatar of the blog author", 1, "w-16", "h-16", "relative", "mb-4"], [1, "group", "w-full", "h-full", "rounded-full", "border-4", "border-transparent", "text-center", "flex", "items-center", "relative", "avatar"], ["src", "https://avatars.githubusercontent.com/u/9474129?s=460&u=40a7b60af5d85d9fb0c9ff455a59da17099eea05&v=4", "alt", "avatar", "width", "64", "height", "64", 1, "object-cover", "object-center", "rounded-full", "w-full", "h-full", "visible", "group-hover:hidden"]], template: function SideAvatarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-tooltip", "New version available \uD83D\uDE80");
    } }, styles: [".avatar[_ngcontent-%COMP%] {\n  background-clip: padding-box;\n  \n}\n\n.avatar[_ngcontent-%COMP%]:before {\n  content: \"\";\n  z-index: -1;\n  margin: -10%;\n  \n  border-radius: inherit;\n  \n  background: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);\n  opacity: 0;\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n\n.avatar[_ngcontent-%COMP%]:after {\n  opacity: 0;\n  content: attr(data-tooltip);\n  top: -1rem;\n  left: 100%;\n  transform: translateX(10%) translateY(0);\n  background: transparent;\n  border-color: var(--text-color);\n  color: var(--text-color);\n  transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);\n  border-radius: 0.25rem;\n  border-style: solid;\n  border-width: 1px;\n  display: block;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  max-width: 8rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  position: absolute;\n  visibility: visible;\n  width: 8rem;\n  z-index: 10;\n}\n\n.avatar.show[_ngcontent-%COMP%]:after, .avatar.show[_ngcontent-%COMP%]:before {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcc2lkZS1hdmF0YXIuY29tcG9uZW50LnNjc3MiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFpbHdpbmRjc3MvbGliL2xpYi9zdWJzdGl0dXRlQ2xhc3NBcHBseUF0UnVsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw0QkFBQTtFQUE4QixlQUFBO0FBRWhDOztBQUFFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQWMsZUFBQTtFQUNkLHNCQUFBO0VBQXdCLGVBQUE7RUFDeEIsNkdBQUE7RUNOSixVQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIsUUFBbUI7RUFBbkIsVUFBbUI7RUFBbkIsV0FBbUI7RUFBbkIsU0FBbUI7RUFBbkIsNEJBQW1CO0VBQW5CLHdEQUFtQjtFQUFuQiwwQkFBbUI7RUFBbkIsc0RBQW1CO0VBQW5CLDBCQUFtQjtBRFduQjs7QUFNRTtFQUNFLFVBQUE7RUFDQSwyQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0Esd0NBQUE7RUFDQSx1QkFBQTtFQUNBLCtCQUFBO0VBQ0Esd0JBQUE7RUFDQSw0R0FBQTtFQzFCSixzQkFBbUI7RUFBbkIsbUJBQW1CO0VBQW5CLGlCQUFtQjtFQUFuQixjQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIsaUJBQW1CO0VBQW5CLGVBQW1CO0VBQW5CLG9CQUFtQjtFQUFuQix1QkFBbUI7RUFBbkIsb0JBQW1CO0VBQW5CLHFCQUFtQjtFQUFuQixrQkFBbUI7RUFBbkIsbUJBQW1CO0VBQW5CLFdBQW1CO0VBQW5CLFdBQW1CO0FEdUJuQjs7QUFTSTtFQ2hDSixVQUFtQjtBRDBCbkIiLCJmaWxlIjoic2lkZS1hdmF0YXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXZhdGFyIHtcclxuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94OyAvKiAhaW1wb3J0YW50ICovXHJcblxyXG4gICY6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgei1pbmRleDogLTE7XHJcbiAgICBtYXJnaW46IC0xMCU7IC8qICFpbXBvcnRhbnQgKi9cclxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7IC8qICFpbXBvcnRhbnQgKi9cclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcclxuICAgICAgdG8gYm90dG9tIHJpZ2h0LFxyXG4gICAgICAjYjgyN2ZjIDAlLFxyXG4gICAgICAjMmM5MGZjIDI1JSxcclxuICAgICAgI2I4ZmQzMyA1MCUsXHJcbiAgICAgICNmZWM4MzcgNzUlLFxyXG4gICAgICAjZmQxODkyIDEwMCVcclxuICAgICk7XHJcbiAgICBAYXBwbHkgYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBib3R0b20tMCBsZWZ0LTAgb3BhY2l0eS0wIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0yMDAgZWFzZS1vdXQ7XHJcbiAgfVxyXG5cclxuICAmOmFmdGVyIHtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtdG9vbHRpcCk7XHJcbiAgICB0b3A6IC0xcmVtO1xyXG4gICAgbGVmdDogMTAwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMCUpIHRyYW5zbGF0ZVkoMCk7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XHJcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XHJcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgY3ViaWMtYmV6aWVyKDAuNjQsIDAuMDksIDAuMDgsIDEpLFxyXG4gICAgICB0cmFuc2Zvcm0gMC4ycyBjdWJpYy1iZXppZXIoMC42NCwgMC4wOSwgMC4wOCwgMSk7XHJcbiAgICBAYXBwbHkgYmxvY2sgdy0zMiBtYXgtdy0zMiB2aXNpYmxlIGFic29sdXRlIHB5LTEgcHgtMiBib3JkZXIgYm9yZGVyLXNvbGlkIHJvdW5kZWQgei0xMCB0ZXh0LXhzO1xyXG4gIH1cclxuXHJcbiAgJi5zaG93IHtcclxuICAgICY6YWZ0ZXIsXHJcbiAgICAmOmJlZm9yZSB7XHJcbiAgICAgIEBhcHBseSBvcGFjaXR5LTEwMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiQHRhaWx3aW5kIGJhc2U7XG5AdGFpbHdpbmQgY29tcG9uZW50cztcbkB0YWlsd2luZCB1dGlsaXRpZXM7Il19 */"] });


/***/ }),

/***/ "Yvv/":
/*!*********************************************!*\
  !*** ./src/app/home/side/side.component.ts ***!
  \*********************************************/
/*! exports provided: SideComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideComponent", function() { return SideComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/blog-list/blog-list.service */ "9eaD");
/* harmony import */ var _side_avatar_side_avatar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./side-avatar/side-avatar.component */ "XXxO");
/* harmony import */ var _side_info_side_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./side-info/side-info.component */ "W9Gu");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");






const _c0 = function (a0) { return [a0]; };
function SideComponent_a_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, "categories/" + item_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1);
} }
class SideComponent {
    constructor(blogListService) {
        this.blogListService = blogListService;
    }
    ngOnInit() {
    }
}
SideComponent.ɵfac = function SideComponent_Factory(t) { return new (t || SideComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_blog_list_blog_list_service__WEBPACK_IMPORTED_MODULE_1__["BlogListService"])); };
SideComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SideComponent, selectors: [["app-side"]], decls: 6, vars: 3, consts: [[1, "max-w-full", "lg:max-w-sm", "rounded", "overflow-hidden", "mb-4", "p-4", "border-2", "border-solid", "border-gray-300", "shadow-card-side"], ["class", "inline-block rounded mr-2 mt-2 px-3 py-1 bg-gray-100 hover:bg-gray-500 hover:text-white", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "inline-block", "rounded", "mr-2", "mt-2", "px-3", "py-1", "bg-gray-100", "hover:bg-gray-500", "hover:text-white", 3, "routerLink"]], template: function SideComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-side-avatar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-side-info");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SideComponent_a_4_Template, 2, 4, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 1, ctx.blogListService.blogCategories$));
    } }, directives: [_side_avatar_side_avatar_component__WEBPACK_IMPORTED_MODULE_2__["SideAvatarComponent"], _side_info_side_info_component__WEBPACK_IMPORTED_MODULE_3__["SideInfoComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWRlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "ct+p":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-routing.module */ "A3+G");
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.component */ "9vUh");
/* harmony import */ var _side_side_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./side/side.component */ "Yvv/");
/* harmony import */ var _side_side_avatar_side_avatar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./side/side-avatar/side-avatar.component */ "XXxO");
/* harmony import */ var _side_side_info_side_info_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./side/side-info/side-info.component */ "W9Gu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class HomeModule {
}
HomeModule.ɵfac = function HomeModule_Factory(t) { return new (t || HomeModule)(); };
HomeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: HomeModule });
HomeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _home_routing_module__WEBPACK_IMPORTED_MODULE_1__["HomeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](HomeModule, { declarations: [_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], _side_side_component__WEBPACK_IMPORTED_MODULE_3__["SideComponent"], _side_side_avatar_side_avatar_component__WEBPACK_IMPORTED_MODULE_4__["SideAvatarComponent"], _side_side_info_side_info_component__WEBPACK_IMPORTED_MODULE_5__["SideInfoComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _home_routing_module__WEBPACK_IMPORTED_MODULE_1__["HomeRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map