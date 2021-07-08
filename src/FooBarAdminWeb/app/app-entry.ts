import { route } from "@aurelia/router";
import Aurelia, { DI } from "aurelia";

@route({
    routes: [
        { path: '', /*redirectTo: '',*/ component: import('./mvc-route') }, //RedirectTo not working, handled in mvc-route component for now...
        { path: ':mvcController/:mvcAction/:id?', component: import('./mvc-route') }
    ]
})
export class AppEntry {
    message: string = 'Hello World!';
}