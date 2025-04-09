import {useEffect, useState} from "react";
import io from "socket.io-client";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Line} from "react-chartjs-2";

import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select";
import Button from "./components/common/button";
import Badge from "./components/common/badge";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = io("ws://127.0.0.1:5555");

const chartOptions = {
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
        legend: { position: 'top' },
        title: { display: true, text: 'BINANCE Market Data' }
    }
};

const initialChartData = {
    labels: [],
    datasets: [
        {
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
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
        }
    ]
};

function AlgoTrader() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [symbols, setSymbols] = useState([]);
    const [volume, setVolume] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [windowSize, setWindowSize] = useState(50);
    const [connected, setConnected] = useState(false);
    const [chartData, setChartData] = useState(initialChartData);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSymbols() {
            try {
                const response = await fetch("https://api.binance.com/api/v3/ticker/price", {
                    headers: { accept: "application/json" },
                    signal: controller.signal
                });
                const tickers = await response.json();
                setSymbols(tickers.map(t => t.symbol).sort());
            } catch (err) {
                if (err.name !== "AbortError") console.error(`Fetch failed: ${err}`);
            }
        }

        fetchSymbols();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        setTotalVolume(prev => prev + volume);
    }, [volume]);

    useEffect(() => {
        if (!connected) return;

        const handleTrade = (trade) => {
            setVolume(trade.volume);

            setChartData(prev => {
                const newLabels = [...prev.labels, trade.timestamp].slice(-windowSize);
                const newData = [...prev.datasets[0].data, Number(trade.price)].slice(-windowSize);

                return {
                    ...prev,
                    labels: newLabels,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: newData
                        }
                    ]
                };
            });
        };

        socket.on("ticker", handleTrade);
        return () => socket.off("ticker", handleTrade);
    }, [connected, windowSize]);

    return (
        <Container>
            <Card title="Algo Trader">
                <SelectBox
                    handleChange={(e) => setSymbol(e.target.value)}
                    id="symbol"
                    label="Symbol"
                    value={symbol}
                    optionValues={symbols}
                />

                <SelectBox
                    handleChange={(e) => setWindowSize(Number(e.target.value))}
                    id="windowSize"
                    label="Window Size"
                    value={windowSize}
                    optionValues={[25, 50, 100, 250]}
                />

                <Button
                    click={() => setConnected(!connected)}
                    color={connected ? "btn-danger" : "btn-success"}
                    label={connected ? "Disconnect" : "Connect"}
                />
            </Card>

            <Card title="Market Trend">
                <Badge
                    label="Market Volume"
                    color="bg-primary"
                    isVisible={true}
                    value={totalVolume.toFixed(0)}
                />
                <Button
                    click={() => setTotalVolume(0)}
                    color="btn-danger"
                    label="Reset Total Volume"
                />
                <Line data={chartData} width={1080} height={720} options={chartOptions} />
            </Card>
        </Container>
    );
}

export default AlgoTrader;
