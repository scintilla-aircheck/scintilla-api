import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { NgForm }    from '@angular/common';
import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'login',
    host: {
        id: 'authentication_container'
    },
    templateUrl: '/dashboard_app/login',
    directives: [],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
})

export class LoginComponent implements AfterViewInit {

    error_message: string = '';

    constructor(private _authService: AuthService) { }

    ngAfterViewInit() {

    }

    login(email, password) {
        this._authService.login(email, password).done((data) => {
            console.log('LOGIN');
            window.location.href = '/';
        }).fail((data) => {
            this.error_message = 'Email and/or password incorrect.';
            console.log(data);
        });
    }
}