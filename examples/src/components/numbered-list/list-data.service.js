import {Injectable} from '@angular/core';

@Injectable()
export class ListData {
    constructor () {}
    getData () {
        return ['first', 'second'];
    }
}