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
        const event = new CustomEvent('air-nav', {
            detail: {
                uri: evt.target.href
            },
            bubbles:true

        });
        this.dispatchEvent(event);
    }

}

customElements.define('air-nav', AirNav);

document.body.addEventListener('air-nav',e => console.log(e.detail.uri));