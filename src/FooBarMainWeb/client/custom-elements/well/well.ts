import { bindable, customElement, EventAggregator } from 'aurelia';
import template from './well.html';

/** Example of custom element only existing in one app. */
@customElement({ name: Well.HtmlName, template })
export class Well {
    public static readonly HtmlName: string = "fbau-well";

    @bindable text: string;

    constructor(private ea: EventAggregator) {

    }

    attached() {
        this.ea.publish('baz');
    }
}