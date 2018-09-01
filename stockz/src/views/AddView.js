import Stocks from './Stocks.js';

export default class AddView extends HTMLElement { 
    constructor() { 
        super();
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() { 
        this.root.innerHTML = `
            <input id="name" placeholder="name"/>
            <input id="price" placeholder="price"/>
            <input id="amount" placeholder="amount"/>
            <button>add</button>
        `;
        this.nameInput = this.root.querySelector('#name');
        this.priceInput = this.root.querySelector('#price');
        this.amountInput = this.root.querySelector('#amount');
        this.root.querySelector('button').onclick = _ => this.addStock();
    }

    addStock() { 
        const name = this.nameInput.value;
        const price = this.priceInput.value;
        const amount = this.amountInput.value;
        Stocks.add(name, price, amount);
        console.log(Stocks.all());
    }

}

customElements.define('add-view',AddView);