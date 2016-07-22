import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'reset-password',
    host: {
        id: 'authentication_container'
    },
    templateUrl: '/dashboard_app/reset-password',
    directives: [],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
})

export class ResetPasswordComponent implements AfterViewInit {

    error_message: string = '';

    constructor(private _authService: AuthService) { }

    ngAfterViewInit() {

    }

    reset_password(email) {
        this._authService.reset_password(email).done((data) => {
            window.location.href = '/reset-password'
        }).fail((data) => {
            this.error_message = 'Reset password failed.';
            console.log(data);
        });
    }
}