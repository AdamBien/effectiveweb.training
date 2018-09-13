import AirElement from "./views/AirElement.js";
import { html } from "./lit-html/lit-html.js";

export default class AirUpdate extends AirElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        this.viewChanged();
    }

    createView() { 
        return html`
            <a href="#" @click=${e => this.update(e)}>update</a>
        `;
    }

    update(e) { 
        e.preventDefault();
        console.log('---updating??');
        navigator.serviceWorker.controller.postMessage('update,please');
    }
}
customElements.define('air-update',AirUpdate);