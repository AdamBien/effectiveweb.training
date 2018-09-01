import Stocks from '../src/views/Stocks.js';
context("Stocks", () => { 

    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });


    it('add_get', () => {
        const key = 'sun';
        Stocks.add(key, 42, 2);
        
        const { name, price, amount } = Stocks.get(key);
        expect(name).to.eq(key);
        expect(price).to.eq(42);
        expect(amount).to.eq(2);

        Stocks.remove(key);

        const shouldNotExist = Stocks.get(key);
        expect(shouldNotExist).to.be.null;
    });

});