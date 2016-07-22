import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

    get_unique_key() {
        var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return Array.apply(null, Array(32)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
    }

    seconds_to_minutes_and_seconds(_seconds) {
        var rounded_seconds: any = Math.floor(_seconds);
        var minutes: any = "" + Math.floor(rounded_seconds / 60);
        var seconds: any = "0" + (rounded_seconds - minutes * 60);

        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }

    getFirstChild(el){
        var firstChild = el.firstChild;
        while(firstChild != null && firstChild.nodeType == 3){ // skip TextNodes
            firstChild = firstChild.nextSibling;
        }
        return firstChild;
    }
}
