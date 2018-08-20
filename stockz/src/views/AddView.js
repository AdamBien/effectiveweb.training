export default class AddView extends HTMLElement { 
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

customElements.define('add-view',AddView);