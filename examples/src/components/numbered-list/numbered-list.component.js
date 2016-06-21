import { Component } from '@angular/core';
import { NumberedRow } from './../numbered-row/numbered-row.component';
import { ListData } from './list-data.service';

@Component({
    selector: 'numbered-list',
    directives: [NumberedRow],
    providers: [ListData],
    template: `
    <numbered-row 
        *ngFor="let item of items; let i = index"
         [number]="(i + 1)"
         [text]="item"></numbered-row>
    `
})
export class NumberedList {
    static get parameters () {
        return [[ListData]];
    }
    constructor (listData) {
        this.items = listData.getData();
    }
}