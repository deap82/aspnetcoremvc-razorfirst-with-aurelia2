import Aurelia, { RouterConfiguration } from 'aurelia';
import { AppEntry } from './app-entry';
import * as mainCustomElements from 'custom-elements';

window['AureliaRoot'] = Aurelia
    .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))
    .register(<any>mainCustomElements)
    .app(AppEntry);

window['AureliaRoot'].start();