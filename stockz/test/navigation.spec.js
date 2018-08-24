context('navigation', () => {
    beforeEach(() => { 
        cy.visit("http://localhost:3000");
    })

    const views = ["Overview", "Add", "List", "About"];
    views.forEach(view => {
        it(`navigation by click -> ${view}`, () => {
            cy.get(`[href="#${view}"]`).
                click().should("have.class", "a-link");
            cy.get('air-crumb').should('contain',view);
        });
    

    });

});