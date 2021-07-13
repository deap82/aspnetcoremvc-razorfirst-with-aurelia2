import { Route, IRouter } from "aurelia";
import { MvcRouteNavigationRouteConfig } from 'common/routing/mvc-route-navigation/mvc-route-contracts';

export class AppEntry {

    constructor(@IRouter private router: IRouter) {

        Route.configure(
            {
                routes:
                    [
                        new MvcRouteNavigationRouteConfig()
                    ]
            },
            AppEntry
        );

    }

    attached() {
        if (!location.hash) {
            this.router.load('Home/Start');
        }
    }
}