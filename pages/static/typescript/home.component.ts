import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';

declare var window: any;

@Component({
    selector: 'home',
    host: {
        id: 'home_container'
    },
    templateUrl: '/dashboard_app/home',
    directives: [],
    providers: [],
    pipes: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/home.css' + window.System.cacheBust],
})

export class HomeComponent implements AfterViewInit {

    constructor() {

    }

    ngAfterViewInit() {

    }
}