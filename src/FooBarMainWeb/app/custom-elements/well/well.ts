import { bindable, customElement } from 'aurelia';
import template from './well.html';

/** Example of custom element only existing in one app. */
@customElement({ name: Well.HtmlName, template })
export class Well {
    public static readonly HtmlName: string = "fbau-well";

    @bindable text: string;

    attached() {
        console.log('well attached', this);
    }
}