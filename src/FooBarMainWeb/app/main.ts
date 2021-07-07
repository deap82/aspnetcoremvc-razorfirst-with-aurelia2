import Aurelia, { RouterConfiguration } from 'aurelia';
import { App } from './app';

window['AureliaRoot'] = Aurelia
   .register(RouterConfiguration.customize({ useUrlFragmentHash: true }))
    .app(App);

window['AureliaRoot'].start();
