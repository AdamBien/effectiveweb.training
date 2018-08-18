export default class AirSlot extends HTMLElement{ 

    constructor(){ 
        super();
    }

    connectedCallback() { 
        document.addEventListener('air-nav',e => this.onNavigation(e));
    }

    onNavigation(evt) { 
        const { detail } = evt;
        const { hash } = detail;
        const { text } = detail;
        const { href } = detail;

        console.log(href, hash, text);
     }

}

customElements.define('air-slot',AirSlot);