import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

declare var window: any;

@Component({
    selector: 'settings',
    host: {
        id: 'settings_container'
    },
    templateUrl: '/dashboard_app/settings/',
    directives: [],
    providers: [],
    pipes: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['static/build/css/common/pages/settings.css' + window.System.cacheBust]
})

export class SettingsComponent implements AfterViewInit {

    display_name: string = '';
    profile_image: string = '';

    constructor(private _authService: AuthService) {

    }

    ngAfterViewInit() {
        this._authService.public_profile('').done((data) => {
            console.log('GET PUBLIC PROFILE');
            console.log(data);
            this.profile_image = data['profile_image'];
            this.display_name = data['display_name'];
        }).fail((data) =>  {
            console.log(data);
        });
    }

    save_settings(first_name, last_name, email, change_email_current_password, change_password_current_password, password, password_repeat) {
        var pending_requests = 0;
        var failure = false;

        pending_requests += 1;
        this._authService.change_settings(first_name, last_name).done((data) => {
            pending_requests -= 1;
            console.log(pending_requests);
        }).fail((data) => {
            console.log(data);
            failure = true;
        });

        if( email != '' && email != null && change_email_current_password != '' && change_email_current_password != null ) {
            pending_requests += 1;

            this._authService.change_email(email, email, change_email_current_password).done((data) => {
                if (change_password_current_password != '' && change_password_current_password != null && password != '' && password != null && password_repeat != '' && password_repeat != null) {
                    pending_requests += 1;

                    this._authService.change_password(change_password_current_password, password, password_repeat).done((data) => {
                        pending_requests -= 1;
                    }).fail((data) => {
                        console.log(data);
                        failure = true;
                    });
                }

                pending_requests -= 1;
            }).fail((data) => {
                console.log(data);
                failure = true;

                if (change_password_current_password != '' && change_password_current_password != null && password != '' && password != null && password_repeat != '' && password_repeat != null) {
                    pending_requests += 1;

                    this._authService.change_password(change_password_current_password, password, password_repeat).done((data) => {
                        pending_requests -= 1;
                    }).fail((data) => {
                        console.log(data);
                        failure = true;
                    });
                }
            });
        } else {
            if (change_password_current_password != '' && change_password_current_password != null && password != '' && password != null && password_repeat != '' && password_repeat != null) {
                pending_requests += 1;

                this._authService.change_password(change_password_current_password, password, password_repeat).done((data) => {
                    pending_requests -= 1;
                }).fail((data) => {
                    console.log(data);
                    failure = true;
                });
            }
        }

        function check_done() {
            window.setTimeout(() => {
                if( pending_requests > 0 && !failure ) {
                    check_done();
                } else {
                    if( !failure ) {
                        console.log('GREAT SUCCESS!');
                    } else {
                        console.log('FAILURE');
                    }
                }

            });
        }

        check_done();
    }
}