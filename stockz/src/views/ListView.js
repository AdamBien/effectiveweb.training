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
        this.root.innerHTML = `
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
        this.root.querySelectorAll('button').forEach(button => button.onclick = e => this.removeStock(e));
    }
    table() { 
        return `
        <table>
        <thead>
        <tr>
        <th>name</th><th>price</th><th>amount</th>
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
            map(stock => this.row(stock)).
            reduce((p, c) => p + c);
    }

    row({name,price,amount}) { 
        return `
        <tr>
        <td>${name}</td><td>${price}</td><td>${amount}</td><td><button id="${name}">remove</button></td>
        </tr>
        `;
    }

    removeStock({ target }) { 
        Stocks.remove(target.id);
    }


}

customElements.define('list-view',ListView);