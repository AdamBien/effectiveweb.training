import Stocks from './Stocks.js';
export default class TotalView extends HTMLElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        this.innerHTML = `total: ${Stocks.total()} units`;
    }

}

customElements.define('total-view',TotalView);