import Stocks from '../src/views/Stocks.js';
context("Stocks", () => { 

    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });


    it('crud', () => {
        const key = 'sun';
        Stocks.add(key, 42, 2);
        const stock = Stocks.get(key);
        const { name, price, amount } = stock;
        expect(name).to.eq(key);
        expect(price).to.eq(42);
        expect(amount).to.eq(2);

        const all = Stocks.all();
        expect(all).to.be.an('array');
        expect(all).to.include(stock);
        expect(all).not.to.be.empty;

        Stocks.remove(key);

        const shouldNotExist = Stocks.get(key);
        expect(shouldNotExist).to.be.null;

        const shouldBeEmpty = Stocks.all();
        expect(shouldBeEmpty.length).to.eq(0);
        expect(shouldBeEmpty).to.be.empty;

    });

});