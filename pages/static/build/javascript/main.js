System.register(['@angular/platform-browser-dynamic', '@angular/core', '@angular/router-deprecated', '@angular/common', './dashboard.component', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, core_1, router_deprecated_1, common_1, dashboard_component_1, forms_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            if (window.PRODUCTION == 'True') {
                core_1.enableProdMode();
            }
            platform_browser_dynamic_1.bootstrap(dashboard_component_1.DashboardComponent, [router_deprecated_1.ROUTER_PROVIDERS, { provide: common_1.APP_BASE_HREF, useValue: '/' }, forms_1.disableDeprecatedForms(), forms_1.provideForms()]);
        }
    }
});
//# sourceMappingURL=main.js.map