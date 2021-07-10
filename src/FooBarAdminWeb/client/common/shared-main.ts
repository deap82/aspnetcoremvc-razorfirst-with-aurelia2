import Aurelia, { RouterConfiguration, Registration, EventAggregator } from 'aurelia';
import { HtmlPlaceholder } from 'common/html-placeholder';

let allRegistrations: any[];

export function configure(appEntry: any, ...registrations: any[]) {
    let au = Aurelia
        .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))

    if (!registrations)
        registrations = [];

    registrations.push(HtmlPlaceholder);

    let globalEventAggregator = au.container.get(EventAggregator);
    registrations.push(Registration.instance(EventAggregator, globalEventAggregator));

    allRegistrations = registrations;

    register(au);

    au.app(appEntry).start();

    window['AureliaRoot'] = au;
}

export function register(au: Aurelia) {
    for (var i = 0; i < allRegistrations.length; i++) {
        au.register(<any>allRegistrations[i]);
    }
}