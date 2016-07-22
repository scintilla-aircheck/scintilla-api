import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'date_to_string'
})

export class DateToStringPipe implements PipeTransform {
    transform(date, args) {
        var date: any = new Date(date);

        var new_date: any = new Date();

        var seconds: any = Math.floor((new_date - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
}