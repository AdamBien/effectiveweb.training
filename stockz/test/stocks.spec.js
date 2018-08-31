import Stocks from '../src/views/Stocks.js';
context("Stocks", () => { 

    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });


    it('add', () => {
        const key = 'sun';
        Stocks.add(key, 42, 2);
        
        const stringified = localStorage.getItem(key);
        const stock = JSON.parse(stringified);
        const { name, price, amount } = stock;
        expect(name).to.eq(key);
        expect(price).to.eq(42);
        expect(amount).to.eq(1);
    });

});