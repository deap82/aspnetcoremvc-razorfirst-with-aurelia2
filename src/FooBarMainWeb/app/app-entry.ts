import { route } from "@aurelia/router";
import Aurelia, { DI, EventAggregator } from "aurelia";
import { MvcRoute } from 'SHARED/routing/mvc-route';

@route({
    routes: [
        { path: '', /*redirectTo: '',*/ component: MvcRoute }, //RedirectTo not working, handled in mvc-route component for now...
        { path: ':mvcController/:mvcAction/:id?', component: MvcRoute }
    ]
})
export class AppEntry {
    constructor(private ea: EventAggregator) {
        ea.subscribe('baz', () => {
            console.log('something said baz', new Date());
        });
    }


    message: string = 'Hello World!';
}