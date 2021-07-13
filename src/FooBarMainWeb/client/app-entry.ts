import { EventAggregator, Route, IRouter } from "aurelia";
import { MvcRouteNavigationRouteConfig } from 'common/routing/mvc-route-navigation/mvc-route-contracts';

export class AppEntry {

    constructor(private ea: EventAggregator, @IRouter private router: IRouter) {

        Route.configure(
            {
                routes:
                    [
                        new MvcRouteNavigationRouteConfig()
                    ]
            },
            AppEntry
        );

        

        ea.subscribe('baz', () => {
            console.log('something said baz', new Date());
        });

    }

    attached() {
        if (!location.hash) {
            this.router.load('Home/Start');
        }
    }
}