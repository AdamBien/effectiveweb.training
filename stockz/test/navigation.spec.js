context('navigation', () => {
    beforeEach(() => { 
        cy.visit("http://localhost:3000");
    })

    const view = "Add";
    it(`navigation by click -> ${view}`, () => {
        cy.get(`[href="#${view}"]`).
            click().should("have.class", "a-link");
        cy.get('air-crumb').should('contain',view);
    });

});