import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select";
import Button from "./components/common/button";
import {useEffect, useState} from "react";
import io from "socket.io-client";
import Badge from "./components/common/badge";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, Tooltip, PointElement, Title} from "chart.js";
import Table from "./components/common/table";

const socket = io("ws://127.0.0.1:5555");
const options = {
    responsive: false,
    animation: false,
    maintainAspectRatio: true,
    scales: {
        y: {
            type: 'linear',
            position: 'left',
            stack: 'demo',
            stackWeight: 2
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'BINANCE Market Data',
        }
    }
};
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function AlgoTrader() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [symbols, setSymbols] = useState([]);
    const [volume, setVolume] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [windowSize, setWindowSize] = useState(50);
    const [trades,setTrades] = useState([]);
    const [connected, setConnected] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }]
    });
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
            setTrades([...trades, trade]);
            const newChartData = {...chartData};
            newChartData.labels = [...chartData.labels, trade.timestamp];
            newChartData.datasets = [...chartData.datasets];
            newChartData.datasets[0].data = [...chartData.datasets[0].data,Number(trade.price)];
            if (newChartData.datasets[0].data.length > windowSize){
                newChartData.datasets[0].data.slice(newChartData.datasets[0].data.length-windowSize);
            }
            if (newChartData.labels.length > windowSize){
                newChartData.labels.slice(newChartData.labels.length-windowSize);
            }
            setChartData(newChartData);
        });
    }, [trades,windowSize,chartData]);
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
                <SelectBox handleChange={(e) => setWindowSize(e.target.value)}
                           id={"windowSize"}
                           label={"Window Size"}
                           value={windowSize}
                           optionValues={[25,50,100,250]}
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
            <Card title={"Market Data"}>
                <Table values={trades}
                       keyField={"timestamp"}
                       handleRowClick={()=>{}}
                       headers={["Price","Quantity","Timestamp"]}
                       fields={["price","quantity","timestamp"]} />
            </Card>
            <Card title={"Market Trend"}>
                <Badge label={"Market Volume"}
                       color={"bg-primary"}
                       isVisible={true}
                       value={totalVolume.toFixed(0)}/>
                <Button click={()=>{setTotalVolume(0)}}
                        color={"btn-danger"}
                        label={"Reset Total Volume"}/>
                <Line data={chartData}
                      width={1080}
                      height={720}
                      options={options}/>
            </Card>
        </Container>
    );
}

export default AlgoTrader;
