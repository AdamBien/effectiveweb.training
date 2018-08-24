context('navigation', () => {
    beforeEach(() => { 
        cy.visit("http://localhost:3000");
    })

    it('navigation by click', () => {
        cy.get('[href="#Overview"]').
            click().should("have.class","a-link");
    });

});