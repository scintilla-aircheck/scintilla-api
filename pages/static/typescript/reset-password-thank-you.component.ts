import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';

declare var window: any;

@Component({
    selector: 'reset-password-thank-you',
    host: {
        id: 'authentication_container'
    },
    templateUrl: '/dashboard_app/reset-password-thank-you',
    directives: [],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
})

export class ResetPasswordThankYouComponent implements AfterViewInit {

    error_message: string = '';

    constructor() { }

    ngAfterViewInit() {

    }
}