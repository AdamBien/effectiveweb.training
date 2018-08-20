export default class ListView extends HTMLElement { 

    constructor() { 
        super();
    }

    connectedCallback() { 
        this.innerHTML = `
        <style>
         header{
             background: var(--air-brown, red);
         }
        </style>
            <header>
            <h2>the stocks</h2>
            </header>
        `

    }

}

customElements.define('list-view',ListView);