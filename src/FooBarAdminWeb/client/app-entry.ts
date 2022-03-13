import { Route } from "aurelia";
import { MvcRoute } from 'common/routing/mvc-route-navigation/mvc-route';
import { MvcRouteNavigationRouteConfig } from 'common/routing/mvc-route-navigation/mvc-route-contracts';

export class AppEntry {

    constructor() {
        Route.configure(
            {
                routes:
                    [
                        //{ path: '', redirectTo: 'Home/Start' },
                        //{ path: 'Home/Start', component: MvcRoute },
                        { path: '', component: MvcRoute.WithDefaults('Home', 'Start') },
                        new MvcRouteNavigationRouteConfig(),
                    ]
            },
            AppEntry
        );
    }

}