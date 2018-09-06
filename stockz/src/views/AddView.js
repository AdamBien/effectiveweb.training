import Stocks from './Stocks.js';
import ListView from './ListView.js';
import { html, render } from './../lit-html/lit-html.js';
import AirElement from './AirElements.js';

export default class AddView extends AirElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        this.viewChanged();
    }


    createView() { 
        return html`
        <style>
        form{
            width: 80%;
        }
        label{
            display:flex;
            justify-content: space-between;
        }
        input[type="number"]{
            width: 3em;
        }
        </style>
          <form @submit=${(e)=>this.addStock(e)}>
            <fieldset>
            <legend>add stock</legend>
            <label for="name">name:
            <input id="name" required autocomplete="off" placeholder="name"/>
            </label>
            <label for="price">price:
            <input id="price" required type="number" min="0" value="0" placeholder="price"/>
            </label>
            <label for="amount">amount:
            <input id="amount" required type="number" min="1" placeholder="amount" value="1"/>
            </label>
            <input type="submit" value="add"/>
            </fieldset>
        </form>
        <list-view></list-view>
        `;
    }

    addStock(event) { 
        event.preventDefault();
        const { name,price,amount } = event.target.elements
        Stocks.add(name.value, price.value, amount.value);
        console.log(Stocks.all());
    }

}

customElements.define('add-view',AddView);