export default class AirSlot extends HTMLElement{ 

    constructor(){ 
        super();
    }

    connectedCallback() { 
        console.log('air slot is loaded');
    }

}

customElements.define('air-slot',AirSlot);