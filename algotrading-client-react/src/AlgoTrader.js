import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select";
import Button from "./components/common/button";
import {useEffect, useState} from "react";
import io from "socket.io-client";
import Badge from "./components/common/badge";

const socket = io("ws://127.0.0.1:5555");

function AlgoTrader() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [symbols, setSymbols] = useState([]);
    const [volume, setVolume] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
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

    useEffect(() => {
        setTotalVolume(vol => vol + volume);
    },[volume])
    const handleSymbolChange = async e => {
        setSymbol(e.target.value)
    };

    useEffect(() => {
        socket.on("ticker", (trade) => {
            setVolume(trade.volume);
        });
    }, []);
    return (
        <Container>
            <p></p>
            <Card title={"Algo Trader"}>
                <SelectBox handleChange={handleSymbolChange}
                        id={"symbol"}
                        label={"Symbol"}
                        value={symbol}
                        optionValues={symbols}
                />
                {
                    connected &&
                    <Button click={()=>{setConnected(false)}}
                            color={"btn-danger"}
                            label={"Disconnect"}/>
                }
                {
                    !connected &&
                    <Button click={()=>{setConnected(true)}}
                            color={"btn-success"}
                            label={"Connect"}/>
                }
            </Card>
            <p></p>
            <Card title={"Market Trend"}>
                <Badge label={"Market Volume"}
                       color={"bg-primary"}
                       isVisible={true}
                       value={totalVolume.toFixed(0)}/>
                <Button click={()=>{setTotalVolume(0)}}
                        color={"btn-danger"}
                        label={"Reset Total Volume"}/>
            </Card>
        </Container>
    );
}

export default AlgoTrader;
