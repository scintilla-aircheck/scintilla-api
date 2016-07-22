import {Component, AfterViewInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {HeaderComponent} from './header.component';
import {HomeComponent} from './home.component';
import {SettingsComponent} from './settings.component';

import {SignupComponent} from './signup.component';
import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';
import {LogoutRedirectComponent} from './logout-redirect.component';
import {ResetPasswordComponent} from './reset-password.component';
import {ResetPasswordThankYouComponent} from './reset-password-thank-you.component';

import {AuthService} from './auth.service';
import {UtilsService} from './utils.service';

declare var window: any;

@Component({
    selector: 'dashboard',
    templateUrl: '/dashboard_app/index',
    directives: [HeaderComponent, SettingsComponent, ROUTER_DIRECTIVES],
    providers: [AuthService, UtilsService],
    pipes: [],
})

@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true},
    {path: '/settings', name: 'Settings', component: SettingsComponent, useAsDefault: false},
    {path: '/signup', name: 'Signup', component: SignupComponent, useAsDefault: false},
    {path: '/login', name: 'Login', component: LoginComponent, useAsDefault: false},
    {path: '/reset-password', name: 'ResetPassword', component: ResetPasswordComponent, useAsDefault: false},
    {path: '/reset-password-thank-you', name: 'ResetPasswordThankYou', component: ResetPasswordThankYouComponent, useAsDefault: false},
    {path: '/logout', name: 'Logout', component: LogoutComponent, useAsDefault: false},
    {path: '/logout-redirect', name: 'LogoutRedirect', component: LogoutRedirectComponent, useAsDefault: false},
])

export class DashboardComponent implements AfterViewInit {

    constructor() {

    }

    ngAfterViewInit() {
        this.hide_loading();
    }

    hide_loading() {
        document.getElementById('loading').style.display = 'none';
    }
}