import {useCallback, useEffect, useRef, useState} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import InputText from "./components/common/input-text";
import Button from "./components/common/button";
import Badge from "./components/common/badge";
import createSecret, {evaluateMove} from "./utils/utility";
import Table from "./components/common/table";
import ProgressBar from "./components/common/progress-bar";
import {useNavigate} from "react-router";

const initialState = {
    secret: createSecret(3),
    maxTimeout: 60
}

const Mastermind = () => {
    //region define states
    const [secret, setSecret] = useState(initialState.secret);
    const [guess, setGuess] = useState(123);
    const [level, setLevel] = useState(3);
    const [lives, setLives] = useState(3);
    const [numberOfMoves, setNumberOfMoves] = useState(0);
    const [maxNumberOfMoves, setMaxNumberOfMoves] = useState(10);
    const [maxTimeout, setMaxTimeout] = useState(initialState.maxTimeout);
    const [counter, setCounter] = useState(initialState.maxTimeout);
    const [moves, setMoves] = useState([]);
    const navigate = useNavigate();
    // endregion
    const hasMounted = useRef(false);

    const timerId = useRef(null);

    const replayLevel = useCallback(() => {
        setMoves([]);
        setNumberOfMoves(0);
        setCounter(maxTimeout);
        setSecret(createSecret(level));
    }, [maxTimeout, level]);

    const moveToNextLevel = useCallback((nextLevel) => {
        setLevel(nextLevel);
        setMoves([]);
        setNumberOfMoves(0);
        setCounter(maxTimeout + 10);
        setMaxTimeout(timeout => timeout + 10);
        setMaxNumberOfMoves(current => current + 2);
        setSecret(createSecret(nextLevel));
    }, [maxTimeout]);

    const loadStateFromLocalStorage = () => {
        let gameState = localStorage.getItem("mastermind-sbm");
        if (gameState) {
            gameState = JSON.parse(gameState);
            setLevel(gameState.level);
            setCounter(gameState.counter);
            setLives(gameState.lives);
            setMaxNumberOfMoves(gameState.maxNumberOfMoves);
            setCounter(gameState.counter);
            setGuess(gameState.guess);
            setMaxTimeout(gameState.maxTimeout);
            setNumberOfMoves(gameState.numberOfMoves);
            setMoves(gameState.moves);
        }
    }

    const serializeStateToJson = useCallback(() => {
        return JSON.stringify(
            {
                secret: secret,
                guess: guess,
                level: level,
                maxTimeout: maxTimeout,
                lives: lives,
                moves: moves,
                counter: counter,
                numberOfMoves: numberOfMoves,
                maxNumberOfMoves: maxNumberOfMoves,
            }
        );
    }, [secret, guess, level, maxTimeout, lives, moves, counter, numberOfMoves, maxNumberOfMoves]);

    const killOneLive = useCallback(() => {
        setLives(lives => lives - 1);
    }, []);

    useEffect(() => {
        if (counter <= 0) {
            killOneLive();
            if (lives === 1) {
                navigate("/loses");
                return;
            }
            replayLevel();
        }
    }, [counter, killOneLive, lives, navigate, replayLevel]);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCounter(prev => prev - 1);
        }, 1_000)
        return () => {
            if (timerId) clearInterval(timerId.current);
        }
    }, []);

    useEffect(() => {
        if (hasMounted.current) {
            localStorage.setItem("mastermind-sbm", serializeStateToJson());
        } else {
            loadStateFromLocalStorage();
            hasMounted.current = true;
        }
        return () => {
            localStorage.setItem("mastermind-sbm", serializeStateToJson());
        }
    }, [counter, serializeStateToJson]);

    const play = () => {
        setNumberOfMoves(current => current + 1);
        if (secret === guess) {
            let nextLevel = level + 1;
            if (level === 10) {
                navigate("/wins");
                return;
            }
            moveToNextLevel(nextLevel);
        } else {
            if (numberOfMoves >= maxNumberOfMoves) {
                setLives(lives - 1);
                if (lives === 1) {
                    navigate("/loses");
                    return;
                }
                replayLevel();
            } else {
                setMoves([...moves, evaluateMove({secret, guess})]);
            }
        }
        localStorage.setItem("mastermind-sbm", JSON.stringify(
            {
                secret: secret,
                guess: guess,
                level: level,
                maxTimeout: maxTimeout,
                lives: lives,
                moves: [...moves, evaluateMove({secret, guess})],
                counter: counter,
                maxNumberOfMoves: maxNumberOfMoves,
            }
        ));
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
