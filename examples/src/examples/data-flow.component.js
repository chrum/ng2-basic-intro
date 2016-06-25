import { Component, ViewEncapsulation } from '@angular/core';
import { ColorClicker } from './../components/color-clicker/color-clicker.component';

@Component({
    selector: 'data-flow',
    styles: [`
        p { color: white }
        .half {
            float: left;
            width: 50%;
            background-color: gray;
        }
    `],
    encapsulation: ViewEncapsulation.Emulated,
    template: `
    <div class="half">
        <p *ngFor="let color of colors">
            {{ color }}: {{ stats[color] }}
        </p>
    </div>
    <div class="half">
        <color-clicker
            [colors]="colors"
            (colorClick)="onColorClick($event)"></color-clicker>
    </div>`,
    directives: [ColorClicker]
})
export class DataFlow {
    constructor () {
        this.colors = ['blue', 'orange', 'green'];
        this.stats = this.colors.reduce((res, val) => {
            res[val] = 0;
            return res;
        }, {})
    }
    onColorClick(color) {
        this.stats[color]++;
    }
}