import { route } from "@aurelia/router";
import Aurelia, { DI } from "aurelia";
import { MvcRoute } from 'common/routing/mvc-route';

@route({
    routes: [
        { path: '', /*redirectTo: '',*/ component: MvcRoute }, //RedirectTo not working, handled in mvc-route component for now...
        { path: ':mvcController/:mvcAction/:id?', component: MvcRoute }
    ]
})
export class AppEntry {
    message: string = 'Hello World!';
}