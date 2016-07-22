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
    var ResetPasswordThankYouComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ResetPasswordThankYouComponent = (function () {
                function ResetPasswordThankYouComponent() {
                    this.error_message = '';
                }
                ResetPasswordThankYouComponent.prototype.ngAfterViewInit = function () {
                };
                ResetPasswordThankYouComponent = __decorate([
                    core_1.Component({
                        selector: 'reset-password-thank-you',
                        host: {
                            id: 'authentication_container'
                        },
                        templateUrl: '/dashboard_app/reset-password-thank-you',
                        directives: [],
                        providers: [],
                        encapsulation: core_1.ViewEncapsulation.None,
                        styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResetPasswordThankYouComponent);
                return ResetPasswordThankYouComponent;
            }());
            exports_1("ResetPasswordThankYouComponent", ResetPasswordThankYouComponent);
        }
    }
});
//# sourceMappingURL=reset-password-thank-you.component.js.map