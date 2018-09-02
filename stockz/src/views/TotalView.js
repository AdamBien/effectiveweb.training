import Stocks from './Stocks.js';
export default class TotalView extends HTMLElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        addEventListener('air-stocks', _ => this.render());
        this.render();
    }

    render() { 
        this.innerHTML = `
        <output>
            total: ${Stocks.total()} units
        </output>`;
    }

}

customElements.define('total-view',TotalView);