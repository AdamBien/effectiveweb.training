import AirElement from "./AirElement.js";
import { html } from "../lit-html/lit-html.js";

export default class AboutView extends AirElement { 

    constructor() { 
        super();
        this.name = "duke";
    }
    connectedCallback() { 
        this.viewChanged();
    }

    createView() { 
        return html`
        <article>
         <h3>powered by web standards && ${name}</h3>
        </article>
        `;

    }
}

customElements.define('about-view',AboutView);



