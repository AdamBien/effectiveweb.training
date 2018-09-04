import {html,render } from './../lit-html/lit-html.js';
import Stocks from './Stocks.js';
export default class ListView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        addEventListener('air-stocks', _ => this.render());
        this.render();
    }

    render() {
        const row = ({name,price,amount,total}) => html`
        <tr>
          <td>${name}</td><td>${price}</td><td>${amount}</td><td>${total}</td><td><button id="${name}" @click=${(e) => this.removeStock(e)}>remove</button></td>
        </tr>
        `;

        const template = html `
        <style>
         header{
             background: var(--air-brown, red);
         }
        </style>
            <header>
            <h2>the stocks</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>name</th><th>price</th><th>amount</th><th>total</th>
                    </tr>
                </thead>
                <tbody>
                    ${Stocks.all().map(stock => row(stock))}
                </tbody>
            </table>
        `;
        render(template, this.root);
    }

    removeStock({ target }) {
        Stocks.remove(target.id);
    }

}

customElements.define('list-view', ListView);