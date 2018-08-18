export default class AirNav extends HTMLElement { 
    constructor() { 
        super();
        this.activeLink = null;
    }

    connectedCallback() { 
        this.activeLinkClass = this.getAttribute('activeLinkClass');
        if (!this.activeLinkClass)
            this.activeLinkClass = 'active-link';
        const links = this.querySelectorAll("a");
        console.log(links);
        links.forEach(e => this.registerListener(e));
    }

    registerListener(e) { 
        e.onclick = evt => this.onLinkClicked(evt);
    }

    onLinkClicked(evt) { 
        const { target } = evt;
        if (this.activeLink) { 
            this.activeLink.classList.toggle(this.activeLinkClass);
        }
        this.activeLink = target;
        this.activeLink.classList.toggle(this.activeLinkClass);
        evt.preventDefault();
        const event = new CustomEvent('air-nav', {
            detail: {
                uri: target.href
            },
            bubbles:true

        });
        this.dispatchEvent(event);
    }

}

customElements.define('air-nav', AirNav);

document.body.addEventListener('air-nav',e => console.log(e.detail.uri));