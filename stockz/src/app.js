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
        console.log(evt.target.href);
        const event = new CustomEvent('air-navigation', {
            detail: {
                uri: evt.target.href
            }

        });
        this.dispatchEvent(event);
    }

}

customElements.define('air-nav',AirNav);