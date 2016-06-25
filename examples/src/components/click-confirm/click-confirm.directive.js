import { Directive, EventEmitter } from '@angular/core';

@Directive({
    selector: 'button[clickConfirm]',
    outputs: ['clickConfirm'],
    host: {
        '(click)': 'onClick()'
    }
})
export default class ClickConfirm {
    constructor () {
        this.clickConfirm = new EventEmitter();
    }
    onClick () {
        if (confirm('Are you sure?')) {
            this.clickConfirm.emit();
        }
    }
}