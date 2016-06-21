import { Component } from '@angular/core';

@Component({
    selector: 'hooked',
    inputs:['text'],
    template: `
        <h2>Input value: {{ text }}</h2>
        <p *ngFor="let c of cycles">{{ c }}</p>
    `
})
export class Hooked {
    constructor () {
        this.cycles = [];
        this._register('constructor');
    }

    _register(name) {
        this.cycles.push(name + ': ' + this.text);
    }

    ngOnInit () { this._register('ngOnInit') }
    ngOnChanges () { this._register('ngOnChanges') }
    ngOnDestroy () { alert('ngOnDestroy') }
}