import { Component, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'color-clicker',
    inputs: ['colors'],
    outputs: ['colorClick'],
    styles: ['p { text-align: center }'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <p *ngFor="let color of colors"
            [ngStyle]="{'background-color': color}"
            (click)="onClick(color)">
                {{ color }}
        </p>`
})
export class ColorClicker {
    constructor () {
        this.colorClick = new EventEmitter();
    }
    onClick (color) {
        this.colorClick.emit(color);
    }
}