import { Component } from '@angular/core';
import { Hooked } from './../components/hooked/hooked.component';

@Component({
    selector: 'hooks',
    template: `<button (click)="changeText()">Change text</button>
        <hooked [text]="text"></hooked>`,
    directives: [Hooked]
})
export class Hooks {
    constructor () { this.text = 'Initial txt' }
    changeText () { this.text = (new Date()).getTime() }
}