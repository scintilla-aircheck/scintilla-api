System.register(['@angular/core', './auth.service'], function(exports_1, context_1) {
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
    var core_1, auth_service_1;
    var ResetPasswordComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            ResetPasswordComponent = (function () {
                function ResetPasswordComponent(_authService) {
                    this._authService = _authService;
                    this.error_message = '';
                }
                ResetPasswordComponent.prototype.ngAfterViewInit = function () {
                };
                ResetPasswordComponent.prototype.reset_password = function (email) {
                    var _this = this;
                    this._authService.reset_password(email).done(function (data) {
                        window.location.href = '/reset-password';
                    }).fail(function (data) {
                        _this.error_message = 'Reset password failed.';
                        console.log(data);
                    });
                };
                ResetPasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'reset-password',
                        host: {
                            id: 'authentication_container'
                        },
                        templateUrl: '/dashboard_app/reset-password',
                        directives: [],
                        providers: [],
                        encapsulation: core_1.ViewEncapsulation.None,
                        styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], ResetPasswordComponent);
                return ResetPasswordComponent;
            }());
            exports_1("ResetPasswordComponent", ResetPasswordComponent);
        }
    }
});
//# sourceMappingURL=reset-password.component.js.map