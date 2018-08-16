class AirNav extends HTMLElement { 
    constructor() { 
        super();
    }

    connectedCallback() { 
        const links = this.querySelectorAll("a");
        console.log(links);
        links.forEach(e => this.registerListener(e));
    }

    registerListener(e) { 
        e.onclick = evt => this.onLinkClicked(evt);
    }

    onLinkClicked(evt) { 
        evt.preventDefault();
        console.log(evt);
    }

}

customElements.define('air-nav',AirNav);



