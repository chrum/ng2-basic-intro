import { Component } from '@angular/core';
import { NumberedRow } from './../numbered-row/numbered-row.component';
import { ListData } from './list-data.service';

@Component({
    selector: 'numbered-list',
    directives: [NumberedRow],
    providers: [ListData],
    template: require('./numbered-list.html')
})
export class NumberedList {
    static get parameters () {
        return [[ListData]];
    }
    constructor (listData) {
        this.items = listData.getData();
    }
}