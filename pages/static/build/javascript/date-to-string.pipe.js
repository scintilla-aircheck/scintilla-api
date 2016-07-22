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
    var DateToStringPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DateToStringPipe = (function () {
                function DateToStringPipe() {
                }
                DateToStringPipe.prototype.transform = function (date, args) {
                    var date = new Date(date);
                    var new_date = new Date();
                    var seconds = Math.floor((new_date - date) / 1000);
                    var interval = Math.floor(seconds / 31536000);
                    if (interval > 1) {
                        return interval + " years ago";
                    }
                    interval = Math.floor(seconds / 2592000);
                    if (interval > 1) {
                        return interval + " months ago";
                    }
                    interval = Math.floor(seconds / 86400);
                    if (interval > 1) {
                        return interval + " days ago";
                    }
                    interval = Math.floor(seconds / 3600);
                    if (interval > 1) {
                        return interval + " hours ago";
                    }
                    interval = Math.floor(seconds / 60);
                    if (interval > 1) {
                        return interval + " minutes ago";
                    }
                    return Math.floor(seconds) + " seconds ago";
                };
                DateToStringPipe = __decorate([
                    core_1.Pipe({
                        name: 'date_to_string'
                    }), 
                    __metadata('design:paramtypes', [])
                ], DateToStringPipe);
                return DateToStringPipe;
            }());
            exports_1("DateToStringPipe", DateToStringPipe);
        }
    }
});
//# sourceMappingURL=date-to-string.pipe.js.map