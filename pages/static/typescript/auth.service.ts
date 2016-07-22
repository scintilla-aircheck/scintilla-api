import {Injectable} from '@angular/core';

declare var CSRF: any;

@Injectable()
export class AuthService {

    public_profile(username): any {
        return $.ajax({
            type: "GET",
            url: '/api/v1/users/public_profile/',
            data: {username: username, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    check_username(username): any {
        return $.ajax({
            type: "GET",
            url: '/api/v1/users/check_username/',
            data: {username: username, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    me(): any {
        return $.ajax({
            type: "GET",
            url: '/api/v1/accounts/me/',
            data: {"csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    change_email(email, confirm_email, current_password): any {
        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/change_email/',
            data: {email: email, confirm_email: confirm_email, password: current_password, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    change_password(current_password, password, password_repeat): any {
        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/change_password/',
            data: {current_password: current_password, password: password, password_repeat: password_repeat, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    change_settings(first_name, last_name): any {
        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/change_settings/',
            data: {first_name: first_name, last_name: last_name, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    login(email, password): any {
        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/auth/login/',
            data: {email: email, password: password, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    signup(email, password, password2, display_name, username): any {
        if( password != password2 ) {
            console.log('Passwords must match!');
            return;
        }

        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/auth/signup/',
            data: {email: email, password: password, display_name: display_name, username: username, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    reset_password(email): any {
        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/auth/reset_password/',
            data: {email: email, "csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }

    logout(): any {
        return $.ajax({
            type: "POST",
            url: '/api/v1/accounts/auth/logout/',
            data: {"csrfmiddlewaretoken": CSRF},
            dataType: 'json'
        });
    }
}