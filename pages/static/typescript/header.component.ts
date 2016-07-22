import {Component, AfterViewInit, ViewChild} from '@angular/core';

import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'header',
    templateUrl: '/dashboard_app/header',
    directives: [],
    providers: [],
    pipes: [],
})

export class HeaderComponent implements AfterViewInit {

    constructor(private _authService: AuthService) {

    }

    ngAfterViewInit() {

    }
}