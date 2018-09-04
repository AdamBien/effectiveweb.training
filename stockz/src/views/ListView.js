const escape = (strings, ...value) => { 
    return strings.
        map((string, index) =>
            string + (value[index] || '')).
        join('\n');
}
import { html, render } from './../lit-html/lit-html.js';
import Stocks from './Stocks.js';
export default class ListView extends HTMLElement { 

    constructor() { 
        super();
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() { 
        addEventListener('air-stocks', _ => this.render());
        this.render();
    }

    render() { 
        const template  = html`
        <style>
         header{
             background: var(--air-brown, red);
         }
        </style>
            <header>
            <h2>the stocks</h2>
            </header>
            ${this.table()}
        `;
        render(template, this.root);
        this.root.querySelectorAll('button').forEach(button => button.onclick = e => this.removeStock(e));
    }
    table() { 
        return html`
        <table>
        <thead>
        <tr>
        <th>name</th><th>price</th><th>amount</th><th>total</th>
        </tr>
        </thead>
        <tbody>
        ${this.content()}
        </tbody>
        </table>
        `
    }

    content() { 
        return Stocks.all().
            map(stock => this.row(stock));
            
    }

    row({name,price,amount,total}) { 
        return html`
        <tr>
        <td>${name}</td><td>${price}</td><td>${amount}</td><td>${total}</td><td><button id="${name}">remove</button></td>
        </tr>
        `;
    }

    removeStock({ target }) { 
        Stocks.remove(target.id);
    }


}

customElements.define('list-view',ListView);