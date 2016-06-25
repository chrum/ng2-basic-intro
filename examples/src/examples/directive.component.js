import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';
// import { ClickConfirm } from '../components/click-confirm/click-confirm.directive'

/**
 * TODO: Investigate why imported directive doesnt work :(
 */
import { Directive } from '@angular/core';
@Directive({
    selector: 'button[clickConfirm]',
    outputs: ['clickConfirm'],
    host: {
        '(click)': 'onClick()'
    }
})
class ClickConfirm {
    constructor () {
        this.clickConfirm = new EventEmitter();
    }
    onClick () {
        if (confirm('Are you sure?')) {
            this.clickConfirm.emit();
        }
    }
}

@Component({
    selector: 'directive',
    directives: [ClickConfirm],
    template: `
        <button *ngFor="let route of routes"
            (clickConfirm)="go(route)">
            {{ route }}</button>
    `
})

export class DirectiveExample {
    static get parameters () {
        return [[Router]];
    }
    constructor (Router) {
        this.router = Router;
        this.routes = [
            'Dumb', 'Smart', 'Hooks', 'Data-flow'
        ]
    }
    go (to) {
        this.router.navigate(['/' + to]);
    }
}
