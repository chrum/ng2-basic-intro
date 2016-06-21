import { Component } from '@angular/core';

@Component({
    selector: 'numbered-row',
    inputs:['number', 'text'],
    template: '<p>{{ content }}</p>'
})
export class NumberedRow {
    constructor () { }

    ngOnInit () {
        this.content = this.number + '. ' + this.text;
    }
}