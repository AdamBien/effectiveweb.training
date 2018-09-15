import { html,render } from "./lit-html/lit-html.js";

export default class AirUpdate extends HTMLElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        render(this.createView(),this);
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