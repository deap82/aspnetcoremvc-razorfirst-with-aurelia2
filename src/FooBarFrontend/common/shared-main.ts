import 'common/core/startup';
import Aurelia, { RouterConfiguration } from 'aurelia';
import { HtmlPlaceholder } from 'common/html-placeholder';
import * as globalValueConverters from 'common/value-converters';
import * as aureliaEnhancerModule from 'common/core/aurelia-enhancer';

export function configure(appEntry: any, ...registrations: any[]) {
    let au = Aurelia
        .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))
        .register(HtmlPlaceholder)
        .register(globalValueConverters)

    for (var i = 0; i < registrations.length; i++) {
        au.register(registrations[i]);
    }

    window['AureliaRoot'] = au;
    aureliaEnhancerModule.init(au);

    au.app(appEntry).start();
}