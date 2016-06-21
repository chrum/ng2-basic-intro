import 'zone.js';
import 'reflect-metadata';

import { bootstrap }  from '@angular/platform-browser-dynamic';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { provide } from '@angular/core';
import { LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';

import { Dumb } from './examples/dumb.component';
import { Smart } from './examples/smart.component';
import { Hooks } from './examples/hooks.component';

@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/Dumb', as: 'Dumb', component: Dumb },
    { path: '/Smart', as: 'Smart', component: Smart },
    { path: '/Hooks', as: 'Hooks', component: Hooks }
])
class App {
    static get parameters () {
        return [[Router]];
    }
    constructor (Router) {
        this.router = Router;

        this.routes = [
            'Dumb', 'Smart', 'Hooks'
        ]
    }
    go (to) {
        this.router.navigate(['/' + to]);
    }
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);