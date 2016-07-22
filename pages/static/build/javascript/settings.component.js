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
    var SettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            SettingsComponent = (function () {
                function SettingsComponent(_authService) {
                    this._authService = _authService;
                    this.display_name = '';
                    this.profile_image = '';
                }
                SettingsComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this._authService.public_profile('').done(function (data) {
                        console.log('GET PUBLIC PROFILE');
                        console.log(data);
                        _this.profile_image = data['profile_image'];
                        _this.display_name = data['display_name'];
                    }).fail(function (data) {
                        console.log(data);
                    });
                };
                SettingsComponent.prototype.save_settings = function (first_name, last_name, email, change_email_current_password, change_password_current_password, password, password_repeat) {
                    var _this = this;
                    var pending_requests = 0;
                    var failure = false;
                    pending_requests += 1;
                    this._authService.change_settings(first_name, last_name).done(function (data) {
                        pending_requests -= 1;
                        console.log(pending_requests);
                    }).fail(function (data) {
                        console.log(data);
                        failure = true;
                    });
                    if (email != '' && email != null && change_email_current_password != '' && change_email_current_password != null) {
                        pending_requests += 1;
                        this._authService.change_email(email, email, change_email_current_password).done(function (data) {
                            if (change_password_current_password != '' && change_password_current_password != null && password != '' && password != null && password_repeat != '' && password_repeat != null) {
                                pending_requests += 1;
                                _this._authService.change_password(change_password_current_password, password, password_repeat).done(function (data) {
                                    pending_requests -= 1;
                                }).fail(function (data) {
                                    console.log(data);
                                    failure = true;
                                });
                            }
                            pending_requests -= 1;
                        }).fail(function (data) {
                            console.log(data);
                            failure = true;
                            if (change_password_current_password != '' && change_password_current_password != null && password != '' && password != null && password_repeat != '' && password_repeat != null) {
                                pending_requests += 1;
                                _this._authService.change_password(change_password_current_password, password, password_repeat).done(function (data) {
                                    pending_requests -= 1;
                                }).fail(function (data) {
                                    console.log(data);
                                    failure = true;
                                });
                            }
                        });
                    }
                    else {
                        if (change_password_current_password != '' && change_password_current_password != null && password != '' && password != null && password_repeat != '' && password_repeat != null) {
                            pending_requests += 1;
                            this._authService.change_password(change_password_current_password, password, password_repeat).done(function (data) {
                                pending_requests -= 1;
                            }).fail(function (data) {
                                console.log(data);
                                failure = true;
                            });
                        }
                    }
                    function check_done() {
                        window.setTimeout(function () {
                            if (pending_requests > 0 && !failure) {
                                check_done();
                            }
                            else {
                                if (!failure) {
                                    console.log('GREAT SUCCESS!');
                                }
                                else {
                                    console.log('FAILURE');
                                }
                            }
                        });
                    }
                    check_done();
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'settings',
                        host: {
                            id: 'settings_container'
                        },
                        templateUrl: '/dashboard_app/settings/',
                        directives: [],
                        providers: [],
                        pipes: [],
                        encapsulation: core_1.ViewEncapsulation.None,
                        styleUrls: ['static/build/css/common/pages/settings.css' + window.System.cacheBust]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], SettingsComponent);
                return SettingsComponent;
            }());
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map