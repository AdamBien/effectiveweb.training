export default class AddStock extends HTMLElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        this.innerHTML = `
            <input placeholder="stock"/>
            <button>add</button>
        `
    }

}

customElements.define('add-stock',AddStock);