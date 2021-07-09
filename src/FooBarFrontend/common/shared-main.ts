import Aurelia, { RouterConfiguration } from 'aurelia';
import { HtmlPlaceholder } from 'SHARED/html-placeholder';

let allRegistrations: any[];

export function configure(appEntry: any, ...registrations: any[]) {
    window['AureliaRoot'] = Aurelia
        .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))

    if (!registrations)
        registrations = [];

    registrations.push(HtmlPlaceholder);

    allRegistrations = registrations;

    register(window['AureliaRoot']);

    window['AureliaRoot'].app(appEntry).start();
}

export function register(au: Aurelia) {
    for (var i = 0; i < allRegistrations.length; i++) {
        au.register(<any>allRegistrations[i]);
    }
}