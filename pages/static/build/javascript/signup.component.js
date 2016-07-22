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
    var SignupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(_authService) {
                    this._authService = _authService;
                    this.username_error_message = '';
                    this.email_error_message = '';
                    this.password_error_message = '';
                    this.desired_username = '';
                    this.username_available = null;
                }
                SignupComponent.prototype.ngAfterViewInit = function () {
                };
                SignupComponent.prototype.signup = function (email, password, password2, display_name, username) {
                    var _this = this;
                    if (password != password2) {
                        console.log('Passwords must match!');
                        alert('Passwords must match!');
                        return;
                    }
                    this._authService.signup(email, password, password2, display_name, username).done(function (data) {
                        window.location.href = '/';
                    }).fail(function (data) {
                        console.log(data);
                        _this.username_error_message = '';
                        _this.email_error_message = '';
                        _this.password_error_message = '';
                        var error = data['responseJSON']['error'];
                        if (error['username']) {
                            _this.username_error_message = error['username'][0];
                        }
                        else if (error['email']) {
                            _this.email_error_message = error['email'][0];
                        }
                        else if (error['password']) {
                            _this.password_error_message = error['password'][0];
                        }
                    });
                };
                SignupComponent.prototype.check_username = function (username) {
                    var _this = this;
                    console.log('CHECK USERNAME');
                    if (username == '' || username == null) {
                        return;
                    }
                    this.desired_username = username;
                    this._authService.check_username(username).done(function (data) {
                        _this.username_available = true;
                        _this.username_error_message = '';
                    }).fail(function (data) {
                        _this.username_available = false;
                        console.log(data);
                    });
                };
                SignupComponent = __decorate([
                    core_1.Component({
                        selector: 'signup',
                        host: {
                            id: 'authentication_container'
                        },
                        templateUrl: '/dashboard_app/signup',
                        directives: [],
                        providers: [],
                        encapsulation: core_1.ViewEncapsulation.None,
                        styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.component.js.map