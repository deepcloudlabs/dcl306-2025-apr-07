import {useEffect, useRef, useState} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import InputText from "./components/common/input-text";
import Button from "./components/common/button";
import Badge from "./components/common/badge";

// Deadline -> 14:20
function Mastermind() {
    //region define states
    const [secret, setSecret] = useState(549);
    const [guess, setGuess] = useState(123);
    const [level, setLevel] = useState(3);
    const [lives, setLives] = useState(3);
    const [numberOfMoves, setNumberOfMoves] = useState(0);
    const [maxNumberOfMoves, setMaxNumberOfMoves] = useState(10);
    const [maxTimeout, setMaxTimeout] = useState(60);
    const [counter, setCounter] = useState(maxTimeout);
    const [moves, setMoves] = useState([]);
    // endregion

    const timerId = useRef(null);
    useEffect(() => {
        timerId.current = setInterval(() => {
            setCounter(prev => prev - 1);
        }, 1_000)
        console.log("Mastermind component is mounted");
        return () => {
            console.log("Mastermind component is unmounted");
            if (timerId) clearInterval(timerId.current);
        }
    },[]);

    const play = () => {
        
    }
    //return View
    return (
        <Container>
            <Card title={"Mastermind Game Console"}>
                <InputText label={"Guess"}
                           value={guess}
                           handleChange={(e) => setGuess(Number(e.target.value))}
                           id={"guess"}
                           explain={"Enter your guess"}/>
                <Button label={"Play"}
                        click={play}
                        color={"btn-success"}/>
                <Badge value={counter}
                       label={"Counter"}
                       color={"bg-warning"}
                       isVisible={true}/>
            </Card>
        </Container>
    );
}

export default Mastermind;
