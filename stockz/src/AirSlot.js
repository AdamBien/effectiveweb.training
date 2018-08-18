export default class AirSlot extends HTMLElement{ 

    constructor(){ 
        super();
    }

    connectedCallback() { 
        document.addEventListener('air-nav',e => this.onNavigation(e));
    }

    onNavigation(evt) { 
        const { detail } = evt;
        console.log(detail);
    }

}

customElements.define('air-slot',AirSlot);