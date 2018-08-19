import AddStock from './views/AddStock.js';
import ListStocks from './views/ListStocks.js';
export default class AirSlot extends HTMLElement{ 

    constructor(){ 
        super();
        this.oldChild = null;
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() { 
        this.root.innerHTML = `
        <slot name="header">HEADER</slot>
        <slot name="view">VIEW</slot>
        <slot name="footer">AFTER</slot>

        `;
        this.oldChild = this.root.querySelector("[name=view]");
        document.addEventListener('air-nav',e => this.onNavigation(e));
    }

    onNavigation(evt) { 
        const { detail } = evt;
        const { hash:linkName } = detail;
        const { text } = detail;
        const { href } = detail;

        console.log(href, linkName, text);

        let newChild = null;

        if (linkName === 'add') { 
            newChild = new AddStock();
        }
        if (linkName === 'list') { 
            newChild = new ListStocks();
        }

        if (this.oldChild) {
            this.root.replaceChild(newChild, this.oldChild);
        } else { 
            this.root.appendChild(newChild);
        }

        this.oldChild = newChild;
     }

}

customElements.define('air-slot',AirSlot);