export default class AirCrumb extends HTMLElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        document.addEventListener('air-nav',e => this.onNavigation(e));
    }
    
    onNavigation({ detail }) { 
        const { hash } = detail;
        this.displayCurrent(hash);
    }

    displayCurrent(linkName) { 
        this.innerText = `>${linkName}`;
    }
}

customElements.define('air-crumb',AirCrumb);