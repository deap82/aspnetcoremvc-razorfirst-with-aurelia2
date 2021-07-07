import { IHttpClient } from '@aurelia/fetch-client';
import { RouteNode } from 'aurelia';

export class MvcRoute {
    html: string;

    constructor(@IHttpClient private httpClient: IHttpClient) {

    }

    load(params: any, current: RouteNode, arg3: RouteNode) {
        let url = this.resolveMvcUrl(params, current);
        this.loadHtml(url).then(html => {
            this.html = html;
        });
    }

    private resolveMvcUrl(params: any, current: RouteNode): string {
        let url = `/${params.mvcController || 'Home'}/${params.mvcAction || 'Start'}${(params.id ? '/' + params.id : '')}`;

        if (!url) {
            url = '/Home/Start'; //TODO: Handle start page route
        }

        var queryString = current.queryParams?.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
        return url;
    }

    private loadHtml(mvcRoute: string): Promise<string> {
        const result = this.httpClient.fetch(mvcRoute).then(response => response.text());
        return result;
    }
}