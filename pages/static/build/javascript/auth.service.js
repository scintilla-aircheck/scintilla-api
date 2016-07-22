System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService() {
                }
                AuthService.prototype.public_profile = function (username) {
                    return $.ajax({
                        type: "GET",
                        url: '/api/v1/users/public_profile/',
                        data: { username: username, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.check_username = function (username) {
                    return $.ajax({
                        type: "GET",
                        url: '/api/v1/users/check_username/',
                        data: { username: username, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.me = function () {
                    return $.ajax({
                        type: "GET",
                        url: '/api/v1/accounts/me/',
                        data: { "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.change_email = function (email, confirm_email, current_password) {
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/change_email/',
                        data: { email: email, confirm_email: confirm_email, password: current_password, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.change_password = function (current_password, password, password_repeat) {
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/change_password/',
                        data: { current_password: current_password, password: password, password_repeat: password_repeat, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.change_settings = function (first_name, last_name) {
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/change_settings/',
                        data: { first_name: first_name, last_name: last_name, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.login = function (email, password) {
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/auth/login/',
                        data: { email: email, password: password, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.signup = function (email, password, password2, display_name, username) {
                    if (password != password2) {
                        console.log('Passwords must match!');
                        return;
                    }
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/auth/signup/',
                        data: { email: email, password: password, display_name: display_name, username: username, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.reset_password = function (email) {
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/auth/reset_password/',
                        data: { email: email, "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService.prototype.logout = function () {
                    return $.ajax({
                        type: "POST",
                        url: '/api/v1/accounts/auth/logout/',
                        data: { "csrfmiddlewaretoken": CSRF },
                        dataType: 'json'
                    });
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map