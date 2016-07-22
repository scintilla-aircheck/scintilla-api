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
    var UtilsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UtilsService = (function () {
                function UtilsService() {
                }
                UtilsService.prototype.get_unique_key = function () {
                    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    return Array.apply(null, Array(32)).map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
                };
                UtilsService.prototype.seconds_to_minutes_and_seconds = function (_seconds) {
                    var rounded_seconds = Math.floor(_seconds);
                    var minutes = "" + Math.floor(rounded_seconds / 60);
                    var seconds = "0" + (rounded_seconds - minutes * 60);
                    return minutes.substr(-2) + ":" + seconds.substr(-2);
                };
                UtilsService.prototype.getFirstChild = function (el) {
                    var firstChild = el.firstChild;
                    while (firstChild != null && firstChild.nodeType == 3) {
                        firstChild = firstChild.nextSibling;
                    }
                    return firstChild;
                };
                UtilsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UtilsService);
                return UtilsService;
            }());
            exports_1("UtilsService", UtilsService);
        }
    }
});
//# sourceMappingURL=utils.service.js.map