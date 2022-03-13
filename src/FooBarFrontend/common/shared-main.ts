import 'common/core/startup';
import Aurelia, { RouterConfiguration, Registration, EventAggregator } from 'aurelia';
import { HtmlPlaceholder } from 'common/html-placeholder';
import * as globalValueConverters from 'common/value-converters';

let allRegistrations: any[];

export function configure(appEntry: any, ...registrations: any[]) {
    let au = Aurelia
        .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))

    if (!registrations)
        registrations = [];

    registrations.push(HtmlPlaceholder);

    registrations.push(globalValueConverters);

    allRegistrations = registrations;

    for (var i = 0; i < allRegistrations.length; i++) {
        au.register(<any>allRegistrations[i]);
    }

    au.app(appEntry).start();

    window['AureliaRoot'] = au;
}