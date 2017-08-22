import {Injectable} from '@angular/core';
import studios from './mock-studios';

@Injectable()
export class StudioService {

    findAll() {
        return Promise.resolve(studios);
    }

    findById(id) {
        return Promise.resolve(studios[id - 1]);
    }

}
