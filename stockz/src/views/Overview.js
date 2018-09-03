import Stocks from './Stocks.js';
export default class OverviewView extends HTMLElement{ 
    constructor(){ 
        super();
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() { 
        this.render();
        addEventListener('air-stocks',e=>this.render());
    }

    render(){ 
        this.root.innerHTML = `
        <style>
        .chart div {
          font: 10px sans-serif;
          background-color: steelblue;
          text-align: right;
          padding: 3px;
          margin: 1px;
          color: white;
        }
        
        </style>
        <div class="chart">
        </div>
        `;
        const data = Stocks.all();
        const chartNode = this.root.querySelector('.chart');
        d3.select(chartNode)
        .selectAll("div")
          .data(data)
            .enter().
            append("div")
          .style("width",  stock => stock.total * 10 + "px")
          .text(stock => `${stock.name}: ${stock.total}`);        
    }
}
customElements.define('overview-view',OverviewView);