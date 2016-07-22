import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'logout-redirect',
    host: {
        id: 'authentication_container'
    },
    templateUrl: '/dashboard_app/logout_redirect',
    directives: [],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
})

export class LogoutRedirectComponent implements AfterViewInit {

    error_message: string = '';

    constructor(private _authService: AuthService) { }

    ngAfterViewInit() {

    }

    login(email, password) {
        this._authService.login(email, password).done((data) => {
            window.location.href = '/';
        }).fail((data) => {
            this.error_message = 'Email and/or password incorrect.';
            console.log(data);
        });
    }
}