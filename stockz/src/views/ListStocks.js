export default class ListStocks extends HTMLElement { 

    constructor() { 
        super();
    }

    connectedCallback() { 
        this.innerHTML = `
            <header>
            <h2>the stocks</h2>
            </header>
        `

    }

}

customElements.define('list-stocks',ListStocks);