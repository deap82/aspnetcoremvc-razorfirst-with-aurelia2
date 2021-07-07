import Aurelia, { RouterConfiguration } from 'aurelia';
import { AppEntry } from './app-entry';

window['AureliaRoot'] = Aurelia
   .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))
    .app(AppEntry);

window['AureliaRoot'].start();