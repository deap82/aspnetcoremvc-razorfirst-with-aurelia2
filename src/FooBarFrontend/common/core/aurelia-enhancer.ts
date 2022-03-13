import { Aurelia, IEnhancementConfig, Registration } from 'aurelia';
import { StringHelpers } from 'common/utils/string-helpers';
import * as sharedMain from 'common/shared-main';

let AuEnhancedConstants = {
    viewModelDataKey: 'enhancedViewModel',
    globalDataKey: 'enhancedGlobal',
    viewDataKey: 'enhancedView',
    dataAttribute: 'data-vk-aurelia-enhanced'
}

/**
 * Called from AureliaEnhanceTagHelper.cs
 */
export function enhanceServerHtml(elementId: string, modulePath?: string, data?: string | any, global?: string, injectableAs?: string, injectionDictionary?: { [key: string]: string }, model?: any) {
    let performEnhanceCalled: boolean = false;

    let element = document.getElementById(elementId);

    if (data && typeof (data) === 'string') {
        if (data === 'undefined') {
            data = null;
        } else {
            data = JSON.parse(data);
        }
    }

    function assignGlobal(clientModel: any) {
        if (global) {
            window[global] = clientModel;
            $(element).data(AuEnhancedConstants.globalDataKey, global);
        }
    }

    function performEnhance() {
        performEnhanceCalled = true;

        let au = <Aurelia>window['AureliaRoot'];

        function finalize(clientModel: any) {
            
            if (clientModel.data && injectableAs) {
                //aurelia.container.unregister(injectableAs);
                //aurelia.use.instance(injectableAs, clientModel.data);
                au.register(Registration.instance(injectableAs, clientModel.data));
            }

            enhance(au, clientModel, element, /*partial*/ false);
            assignGlobal(clientModel);
        }

        if (modulePath) {
            window['requirejs']([modulePath], (module: any) => {
                let clientModel: any = {};

                if (module && module.createMetaData && typeof (module.createMetaData) === 'function') {
                    var diMetaData = module.createMetaData();
                    clientModel = createViewModel(au, diMetaData, data);
                }
                finalize(clientModel);
            });
        }
        else {
            let clientModel: any = {};
            if (model) {
                clientModel = model;
            }
            if (data) {
                clientModel['data'] = data;
            }

            if (injectionDictionary) {
                Object.keys(injectionDictionary).forEach((key: string) => {
                    let injectionKey = injectionDictionary[key];
                    let instance = au.container.get(injectionKey);
                    if (instance && instance !== injectionKey) {
                        clientModel[key] = instance;
                    } else {
                        console && console.warn("VKLASS: Failed to resolve instance by key " + injectionKey);
                    }
                });
            }

            finalize(clientModel);
        }
    }

    (function ensureEnhancementIsDoneAfterHtmlLoaded() {
        let uniqueNS = StringHelpers.randomString(8);
        $(document).one('vk-ready.enhancer-' + uniqueNS, function () {
            if (performEnhanceCalled) {
                return;
            }
            performEnhance();
        });
        if ($('html').hasClass('vk-html-ready')) {
            $(document).off('.enhancer-' + uniqueNS);
            performEnhance();
        }
    })();
}

export function enhance(au: Aurelia, viewModel: any, element: HTMLElement, partial: boolean = true): void {
    if (!partial) {
        $(element).data(AuEnhancedConstants.viewModelDataKey, viewModel).attr(AuEnhancedConstants.dataAttribute, 'true');
    }

    let finalize = () => {
        //if (!partial) {
        //	$(element).data(AuEnhancedConstants.viewDataKey, view);
        //	if (viewModel.created && typeof (viewModel.created) === 'function') {
        //		viewModel.created(null, view);
        //	}
        //	if (viewModel.bind && typeof (viewModel.bind) === 'function') {
        //		viewModel.bind(view.bindingContext, view.overrideContext);
        //	}
        //	if (viewModel.attached && typeof (viewModel.attached) === 'function') {
        //		viewModel.attached();
        //	}
        //}

        $(document).trigger('vk-aurelia-enhanced', <AureliaEnhancedEventArgs>{ isPartial: partial, element: element });
    }

    au.enhance({ host: element, component: viewModel });
    finalize();
}


function createViewModel(au: Aurelia, metaData: AureliaEnhanceMetaData, data: any): any {
    if (data) {
        //aurelia.container.unregister(metaData.clientModelType); //Ensure new instance each time we have new data, so that constructor is called with new data
        //aurelia.container.unregister(metaData.dataTypeName);
        //aurelia.use.instance(metaData.dataTypeName, data);
        au.register(Registration.instance(metaData.dataTypeName, data));
    }

    //aurelia.use.singleton(metaData.clientModelType);
    au.register(Registration.singleton(metaData.clientModelType, metaData.clientModelType));

    let viewModel = au.container.get(metaData.clientModelType); //constructor of home-about.ts (and other MVC-view models) is called here
    return viewModel;
}


export class AureliaEnhanceMetaData {
    /**
     * @param dataTypeName The name used to name the instance in Aurelia DI, commonly this is the name of the interface that the data object implements.
     * @param clientModelType The type that should be created through Aurelia DI and used as client side model for the enhanced markup.
     */
    constructor(public dataTypeName: string, public clientModelType: any) {
    }
}

export interface AureliaEnhancedEventArgs {
    isPartial: boolean;
    element: HTMLElement;
}