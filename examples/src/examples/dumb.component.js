import { Component } from '@angular/core';
import { NumberedRow } from './../components/numbered-row/numbered-row.component';

@Component({
    selector: 'dumb',
    template: `
        <numbered-row
            number="1"
            text="First row"></numbered-row>
    `,
    directives: [NumberedRow]
})
export class Dumb {
    constructor () {}
}