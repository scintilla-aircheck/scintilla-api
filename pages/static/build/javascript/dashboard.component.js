System.register(['@angular/core', '@angular/router-deprecated', './header.component', './home.component', './settings.component', './signup.component', './login.component', './logout.component', './logout-redirect.component', './reset-password.component', './reset-password-thank-you.component', './auth.service', './utils.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, header_component_1, home_component_1, settings_component_1, signup_component_1, login_component_1, logout_component_1, logout_redirect_component_1, reset_password_component_1, reset_password_thank_you_component_1, auth_service_1, utils_service_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (logout_redirect_component_1_1) {
                logout_redirect_component_1 = logout_redirect_component_1_1;
            },
            function (reset_password_component_1_1) {
                reset_password_component_1 = reset_password_component_1_1;
            },
            function (reset_password_thank_you_component_1_1) {
                reset_password_thank_you_component_1 = reset_password_thank_you_component_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent() {
                }
                DashboardComponent.prototype.ngAfterViewInit = function () {
                    this.hide_loading();
                };
                DashboardComponent.prototype.hide_loading = function () {
                    document.getElementById('loading').style.display = 'none';
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard',
                        templateUrl: '/dashboard_app/index',
                        directives: [header_component_1.HeaderComponent, settings_component_1.SettingsComponent, router_deprecated_1.ROUTER_DIRECTIVES],
                        providers: [auth_service_1.AuthService, utils_service_1.UtilsService],
                        pipes: [],
                    }),
                    router_deprecated_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: '/settings', name: 'Settings', component: settings_component_1.SettingsComponent, useAsDefault: false },
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent, useAsDefault: false },
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent, useAsDefault: false },
                        { path: '/reset-password', name: 'ResetPassword', component: reset_password_component_1.ResetPasswordComponent, useAsDefault: false },
                        { path: '/reset-password-thank-you', name: 'ResetPasswordThankYou', component: reset_password_thank_you_component_1.ResetPasswordThankYouComponent, useAsDefault: false },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent, useAsDefault: false },
                        { path: '/logout-redirect', name: 'LogoutRedirect', component: logout_redirect_component_1.LogoutRedirectComponent, useAsDefault: false },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map