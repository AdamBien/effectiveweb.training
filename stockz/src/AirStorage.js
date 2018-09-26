import AirElement from './views/AirElement.js';
import { html } from './lit-html/lit-html.js';
export default class AirStorage extends AirElement { 
    constructor() { 
        super();
        this.storageManager = navigator.storage;
        this.quota = 0;
        this.usage = 0;
    }

    connectedCallback() { 
        this.calculateStorage();
    }

    async calculateStorage() { 
        const estimation = await this.storageManager.estimate();
        this.quota =  Math.round(estimation.quota / (1024 * 1024));
        this.usage = Math.round(estimation.usage / (1024 * 1024));
        console.log(estimation);
        this.viewChanged();

    }

    createView() { 
        return html`
           <style>
               :host{
                   display: block;
               }
               output{
                   font-size: 0.8em;
               }

            </style>
            <output>Usage: ${this.usage} MB</output>
            <output>Quota: ${this.quota} MB</output>
        `;
    }

}

customElements.define('air-storage',AirStorage);