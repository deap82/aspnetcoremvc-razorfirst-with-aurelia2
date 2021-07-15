import { EventAggregator, inject } from 'aurelia';
import { AureliaEnhanceMetaData } from 'common/core/aurelia-enhancer';

/** @ignore */ const dataKey: string = 'HomeAboutModel';

export function createMetaData(): AureliaEnhanceMetaData {
    return new AureliaEnhanceMetaData(dataKey, HomeAboutClientModel);
}

@inject(dataKey)
//For Au2 we no longer need to specify all injected types to the @inject decorator,
//just the ones using string keys, so receive those first in the constructor and
//specify the keys above.
//(Details at https://docs.aurelia.io/getting-to-know-aurelia/dependency-injection-di)
class HomeAboutClientModel {
    constructor(protected data: HomeAboutModel, ea: EventAggregator, ) {
        console.log('data', data);
        console.log('ea', ea);
    }
}

interface HomeAboutModel {
    topic: string;
}