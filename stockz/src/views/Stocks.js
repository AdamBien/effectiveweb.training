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

    static get(name) { 
        const stringified = localStorage.getItem(name);
        return JSON.parse(stringified);
    }

    static remove(name) { 
        localStorage.removeItem(name);
    }

    static all() { 
        return { ...localStorage };
    }
}