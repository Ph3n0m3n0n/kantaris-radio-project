import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http} from '@angular/http';

let studiosURL = SERVER_URL + 'studios/';

@Injectable()
export class StudioService {

    constructor(public http: Http) {

    }

    findAll() {
        alert("findall");
        return this.http.get(studiosURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(studiosURL + id)
            .map(res => res.json())
            .toPromise();
    }

}
