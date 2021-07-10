import { customElement, bindable } from 'aurelia';
import template from './html-placeholder.html';

/** The purpose of this custom element is to have a reusable element that can display server side rendered
  * html in a way that actually executes any included <script> blocks. To accomplish that the html has to be
  * appended to the DOM - NOT bound using innerhtml.bind. */
@customElement({ name: HtmlPlaceholder.HtmlName, template })
export class HtmlPlaceholder {
    public static readonly HtmlName: string = 'fbau-html-placeholder';

    @bindable html: string;
    private placeholder: HTMLElement;
    private htmlChangedHandlers: (() => void)[] = [];
    private htmlAppendedHandlers: (() => void)[] = [];

    appendManual: boolean = false;
    private invisiblePlaceholder: HTMLElement;

    protected getPlaceholder() {
        return this.placeholder;
    }

    protected attached() {
        if (this.appendManual) {
            return;
        }

        console.log('foo');

        this.performAppend();
    }

    htmlChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            setTimeout(() => {
                for (var i = 0; i < this.htmlChangedHandlers.length; i++) {
                    this.htmlChangedHandlers[i]();
                }
            }, 100);
        }

        if (this.appendManual || newValue === oldValue) {
            return;
        }

        this.performAppend();
    }

    performAppend() {
        $(this.placeholder).empty();
        $(this.placeholder).append(this.html);
        for (var i = 0; i < this.htmlAppendedHandlers.length; i++) {
            this.htmlAppendedHandlers[i]();
        }
    }

    onHtmlChanged(handler: () => void) {
        this.htmlChangedHandlers.push(handler);
    }

    onHtmlAppended(handler: () => void) {
        this.htmlAppendedHandlers.push(handler);
    }

    /**
     * Returns the current height of the element.
     */
    currentHeight() {
        return $(this.getPlaceholder()).outerHeight();
    }

    /**
     * Returns the current height of the element, even if the assigned html has not yet been appended to the DOM.
     * Use in conjuction with setting appendManual to true.
     */
    heightOfCurrentHtml() {
        if (this.html === '') {
            return 0;
        }
        return $(this.invisiblePlaceholder).outerHeight();
    }

    protected detached() {
        this.htmlChangedHandlers = [];
    }
}