import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'logout',
    host: {
        id: 'authentication_container'
    },
    templateUrl: '/dashboard_app/logout',
    directives: [],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
})

export class LogoutComponent implements AfterViewInit {

    error_message: string = '';

    constructor(private _authService: AuthService) { }

    ngAfterViewInit() {
        this.logout();
    }

    logout() {
        this._authService.logout().done((data) => {
            window.location.href = '/logout-redirect';
        }).fail((data) => {
            this.error_message = 'Logout failed.';
            console.log(data);
        });
    }
}