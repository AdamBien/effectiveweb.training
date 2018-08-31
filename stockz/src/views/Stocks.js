export default class Stocks { 

    static add(name, price, amount) { 
        const { localStorage } = window;
        const stock = {
            name,
            price,
            amount
        };
        const stringified = JSON.stringify(stock);
        localStorage.setItem(name,stringified);
    }
}