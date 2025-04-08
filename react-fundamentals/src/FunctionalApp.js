import React, {useCallback, useEffect, useRef, useState} from "react";
import Card from "./components/common/card";
import Select from "./components/common/select";
import Button from "./components/common/button";
import Badge from "./components/common/badge";

export default function FunctionalApp() {
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [price, setPrice] = useState(NaN);
    const timerId = useRef(null);

    useEffect(() => {
        console.log("FunctionalApp is constructed");
        const controller = new AbortController();

        async function fetchSymbols() {
            try {
                const response = await fetch("https://api.binance.com/api/v3/ticker/price", {
                    method: "GET",
                    headers: {
                        accept: "application/json"
                    },
                    signal: controller.signal
                });
                const tickers = await response.json();
                setSymbols(tickers.map(ticker => ticker.symbol).sort());
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.error(`Fetch fails: ${err}`);
                }
            }
        }

        fetchSymbols().then(() => console.log("fetch is successful"));
        return () => {
            controller.abort();
        }
    }, [])

    const handleSymbolChange = async e => {
        setSymbol(e.target.value)
    };

    const getMarketPrice = useCallback( () => {
        fetch(`https://api.binance.com/api/v3/ticker?symbol=${symbol}`, {
            method: "GET",
            headers: {
                accept: "application/json"
            }
        }).then(res => res.json())
            .then(ticker => setPrice(Number(ticker.lastPrice)))
    },[symbol]);

    useEffect(() => {
        timerId.current = setInterval(getMarketPrice, 3_000);
        return () => {
            if (timerId) clearInterval(timerId.current);
        };
    }, [getMarketPrice]);

    return ( // Model[price] -> View
        <Card title={"Market"}>
            <Select handleChange={handleSymbolChange}
                    id={"symbol"}
                    label={"Symbol"}
                    value={symbol}
                    optionValues={symbols}
            />
            <Button click={getMarketPrice}
                    color={"btn-warning"}
                    label={"Get Market Price"}/>
            <Badge isVisible={Number.isFinite(price)}
                   value={price}
                   color={"bg-primary"}
                   label={"Price"}/>
        </Card>
    );
}// Component
