import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'signup',
    host: {
        id: 'authentication_container'
    },
    templateUrl: '/dashboard_app/signup',
    directives: [],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/auth.css' + window.System.cacheBust],
})

export class SignupComponent implements AfterViewInit {

    username_error_message: string = '';
    email_error_message: string = '';
    password_error_message: string = '';
    desired_username: string = '';
    username_available: boolean = null;

    constructor(private _authService: AuthService) { }

    ngAfterViewInit() {

    }

    signup(email, password, password2, display_name, username) {
        if( password != password2 ) {
            console.log('Passwords must match!');
            alert('Passwords must match!');
            return;
        }

        this._authService.signup(email, password, password2, display_name, username).done((data) => {
            window.location.href = '/';
        }).fail((data) => {
            console.log(data);
            this.username_error_message = '';
            this.email_error_message = '';
            this.password_error_message = '';

            var error: any = data['responseJSON']['error'];
            if( error['username'] ) {
                this.username_error_message = error['username'][0];
            } else if( error['email'] ) {
                this.email_error_message = error['email'][0];
            } else if( error['password'] ) {
                this.password_error_message = error['password'][0];
            }
        });
    }

    check_username(username) {
        console.log('CHECK USERNAME');
        if( username == '' || username == null ) {
            return;
        }

        this.desired_username = username;

        this._authService.check_username(username).done((data) => {
            this.username_available = true;
            this.username_error_message = '';
        }).fail((data) => {
            this.username_available = false;
            console.log(data);
        });
    }
}