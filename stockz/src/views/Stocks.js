export default class Stocks { 

    static add(name, price, amount) { 
        const { localStorage } = window;
        const stock = {
            name,
            price,
            amount
        };
        const stringified = JSON.stringify(stock);
        localStorage.setItem(`stockz.${name}`, stringified);
        Stocks.stocksChanged('add',name);
    }

    static getWithoutPrefix(name) { 
        const stringified = localStorage.getItem(name);
        return JSON.parse(stringified);
    }

    static get(name) { 
        return Stocks.getWithoutPrefix(`stockz.${name}`);
    }

    static remove(name) { 
        localStorage.removeItem(`stockz.${name}`);
        Stocks.stocksChanged('remove',name);
    }

    static all() { 
        const all = { ...localStorage };
        return Object.keys(all).
            filter(key => key.startsWith('stockz.')).
            map(key => Stocks.getWithoutPrefix(key));
    }

    static stocksChanged(type,name) { 
        const changeEvent = new CustomEvent('air-stocks', {
            detail: {
                type,
                name
            },
            bubbles: true
        });
        document.dispatchEvent(changeEvent);
    }

    static total() { 
        return Stocks.
            all().
            map(stock => (stock.price * stock.amount)).
            reduce((p, c) => p + c);
    }
}