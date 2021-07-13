import { IRouteConfig } from '@aurelia/router';
import { MvcRoute } from './mvc-route';

export class MvcRouteNavigationRouteConfig implements IRouteConfig {
    public readonly id: string = 'MvcRoute';
    public readonly path: string = ':mvcController/:mvcAction/:id?/:detailSection?';
    public component = MvcRoute;

    constructor(area?) {
        if (area) {
            this.id = area;
            this.path = (`${area}/${this.path}`);
        }
    }
}