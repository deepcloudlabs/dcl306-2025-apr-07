import React from "react";
import Card from "./components/common/card";
import Select from "./components/common/select";
import Button from "./components/common/button";
import Badge from "./components/common/badge";
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
        return ( // View
            <Card title={"Market"}>
                <Select handleChange={this.handleSymbolChange}
                        id={"symbol"}
                        label={"Symbol"}
                        value={this.state.symbol}
                        optionValues={this.state.symbols}
                />
                <Button click={this.getMarketPrice}
                        color={"btn-warning"}
                        label={"Get Market Price"}/>
                <Badge isVisible={Number.isFinite(this.state.price)}
                       value={this.state.price}
                       color={"bg-primary"}
                       label={"Price"}/>
            </Card>
        );
    }
}// Component

export default App;
