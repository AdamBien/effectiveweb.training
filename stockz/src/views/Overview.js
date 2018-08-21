export default class OverviewView extends HTMLElement{ 
    constructor(){ 
        super();
    }

    connectedCallback(){ 
        this.innerHTML = `
            <output>10000 SUN Micro</output>
        `;
    }
}
customElements.define('overview-view',OverviewView);