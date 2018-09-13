import AddView from './views/AddView.js';
import ListView from './views/ListView.js';
import Overview from './views/Overview.js';
import AboutView from './views/AboutView.js';


export default class AirSlot extends HTMLElement{ 

    constructor(){ 
        super();
        this.oldChild = null;
        this.currentView = null;
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() { 
        this.root.innerHTML = `
        <slot name="header">HEADER</slot>
        <slot name="view">VIEW</slot>
        <slot name="footer">AFTER</slot>

        `;
        document.addEventListener('air-nav',e => this.onNavigation(e));
        this.oldChild = this.root.querySelector("[name=view]");
    }

    onNavigation(evt) { 
        const { detail } = evt;
        const { hash: linkName } = detail;
        this.currentView = linkName;
        this.loadView(linkName);
    }
    
    async loadView(linkName) { 
        let newChild;
        switch (linkName) { 
            case 'About':
                newChild = new AboutView();
                break;
            case 'Add':
                newChild = new AddView();
                break;
            case 'List':
                newChild = new ListView();
                break;
            case 'Overview':
                newChild = new Overview();
                break;
            default:
                throw new Error(`Unknown route: ${linkName}`);
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