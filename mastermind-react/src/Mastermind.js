import {useEffect, useRef, useState} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import InputText from "./components/common/input-text";
import Button from "./components/common/button";
import Badge from "./components/common/badge";
import createSecret, {evaluateMove} from "./utils/utility";
import Table from "./components/common/table";
import ProgressBar from "./components/common/progress-bar";

// Deadline -> 14:20
const initialState = {
    secret: createSecret(3)
}

function Mastermind() {
    //region define states
    const [secret, setSecret] = useState(initialState.secret);
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
            if (counter <= 0){
                //TODO: player loses that level
            }
        }, 1_000)
        console.log("Mastermind component is mounted");
        return () => {
            console.log("Mastermind component is unmounted");
            if (timerId) clearInterval(timerId.current);
        }
    }, []);

    const play = () => {
        setNumberOfMoves(current => current + 1);
        if (secret === guess) {
            let nextLevel = level + 1;
            if (level === 10){
                //TODO: player wins
            }
            setLevel(nextLevel);
            setMoves([]);
            setNumberOfMoves(0);
            setCounter(maxTimeout + 10);
            setMaxTimeout(timeout => timeout + 10);
            setMaxNumberOfMoves(current => current + 2);
            setSecret(createSecret(nextLevel));
        } else {
            if (numberOfMoves >= maxNumberOfMoves) {
                setLives(lives - 1);
                if (lives === 1){
                    // TODO: player loses the game
                }
                setMoves([]);
                setNumberOfMoves(0);
                setCounter(maxTimeout);
                setSecret(createSecret(level));
            } else {
                setMoves([...moves, evaluateMove({secret, guess})]);
            }
        }
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
                <Badge value={level}
                       label={"Level"}
                       color={"bg-primary"}
                       isVisible={true}/>
                <Badge value={lives}
                       label={"Lives"}
                       color={"bg-secondary"}
                       isVisible={true}/>
                <Badge value={`${numberOfMoves} out of ${maxNumberOfMoves}`}
                       label={"Number of moves"}
                       color={"bg-warning"}
                       isVisible={true}/>
                <Badge value={counter}
                       label={"Counter"}
                       color={"bg-warning"}
                       isVisible={true}/>
                <ProgressBar value={counter}
                             max={maxTimeout}
                             min={0}/>
            </Card>
            <Card title={"Moves"}>
                <Table values={moves}
                       headers={["Guess", "Perfect Match", "Partial Match", "Message"]}
                       fields={["guess", "perfectMatch", "partialMatch", "message"]}
                       keyField={"guess"}/>
            </Card>
        </Container>
    );
}

export default Mastermind;
