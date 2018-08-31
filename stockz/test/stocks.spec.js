import Stocks from '../src/views/Stocks.js';
context("Stocks", () => { 

    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });


    it('add', () => {
        Stocks.add('sun',42,2);
    });

});