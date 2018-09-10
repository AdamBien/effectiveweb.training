import Stocks from './Stocks.js';
import AirElement from './AirElement.js';
import { html } from './../lit-html/lit-html.js';
export default class TotalView extends AirElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        addEventListener('air-stocks', _ => this.viewChanged());
        this.viewChanged();
    }

    createView() { 
        return html`
        <output>
            total: ${Stocks.total()} units
        </output>`;
    }

}

customElements.define('total-view',TotalView);