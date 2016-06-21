import { Component } from '@angular/core';
import { NumberedList } from './../components/numbered-list/numbered-list.component';

@Component({
    selector: 'smart',
    template: `
        <numbered-list></numbered-list>
    `,
    directives: [NumberedList]
})
export class Smart {
    constructor () {}
}