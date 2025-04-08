import logo from './logo.svg';
import './App.css';
import React from "react";
import button from "bootstrap/js/src/button";
// View (Html + CSS) -> js -> functional programming -> reactive programming
// View: index.html -> <div id="root"> ** View ** </div>
// Html -> Tag + Composite Pattern
// Browser -> View -> UI
//                    Document -> DOM API -> DOM Manipulation
// --> ReactDOM --> reconciliation alg. -> render() -> ReactDOM

// Model -- declarative --> UI
// Update Model (js) -----> Update UI -> render()
//        reactive --> UI
//        reactive <-- UI
//  One-way/Two-way Binding
//  React -> programmatic

//  I. Stateful Component
//      i. class -> ii. function + hooks (useState())
// II. Stateless Component
//      function
// State Management: I. Stateful Component(s)
//                  II. Context API, Reducer
// Stateful Component: this.state
class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            symbols: [],
            symbol: "BTCUSDT",
            price: NaN
        }
        this.timerId = null;
        console.log("App's constructor is triggered");
    }

    componentDidMount() {
        fetch("https://api.binance.com/api/v3/ticker/price", {
            method: "GET",
            headers: {
                accept: "application/json"
            }
        }).then(res => res.json())
            .then(tickers => {
                const symbols = tickers.map(ticker => ticker.symbol).sort();
                this.setState({symbols});
            })
        this.timerId = setInterval(this.getMarketPrice, 3_000);
    }

    componentWillUnmount() {
        if (this.timerId) clearInterval(this.timerId);
    }

    handleSymbolChange = async e => {
        // Wrong: this.state.symbol = e.target.value;
        let symbol = e.target.value;
        // User -- event --> update UI -> Model (this.state)
        this.setState({symbol}, () => {
            console.log(`selected symbol: ${this.state.symbol}`);
        }) // asynchronous
    }

    getMarketPrice = async event => {
        fetch(`https://api.binance.com/api/v3/ticker?symbol=${this.state.symbol}`, {
            method: "GET",
            headers: {
                accept: "application/json"
            }
        }).then(res => res.json())
            .then(ticker => {
                const price = Number(ticker.lastPrice);
                this.setState({price});
            })

    }

    render() {
        return (
            <div className={"card"}>
                <div className="card-header">
                    <h3 className="card-title font-weight-light">Market</h3>
                </div>
                <div className="card-body">
                    <label htmlFor={"symbols"} className={"form-label"}>Symbols:</label>
                    <select id="symbols"
                            value={this.state.symbol}
                            onChange={this.handleSymbolChange}
                            className={"form-select"}>
                        {
                            this.state.symbols.map(symbol => (
                                <option key={symbol} value={symbol}>{symbol}</option>
                            ))
                        }
                    </select>
                    <button className={"btn btn-success"}
                            onClick={this.getMarketPrice}>Get price
                    </button>
                    {Number.isFinite(this.state.price) && (<h3 className={"card-title"}>{this.state.price}</h3>)}
                </div>
            </div>
        );
    }
}// Component

export default App;
