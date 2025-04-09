import Card from "./components/common/card";
import InputText from "./components/common/input-text";
import Button from "./components/common/button";
import Badge from "./components/common/badge";
import ProgressBar from "./components/common/progress-bar";
import Table from "./components/common/table";
import Container from "./components/common/container";
import {useContext, useEffect, useRef} from "react";
import {GameContext, useGameDispatcher} from "./provider/MastermindProvider";
import {useNavigate} from "react-router";

export default function MastermindStateless(){
    const {game} = useContext(GameContext);
    const gameDispatcher = useGameDispatcher();
    const timerId = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        timerId.current = setInterval(() => {
            gameDispatcher({type: "TIMER_TICK"});
        }, 1_000)
        return () => {
            if (timerId) clearInterval(timerId.current);
        }
    }, []);

    useEffect(() => {
        if(game.status === "WINS")
            navigate("/wins");
        else if(game.status === "LOSES")
            navigate("/loses");
    });

    const play = (event) => {
        // event => action
        const action = {type: "PLAY_EVENT"};
        gameDispatcher(action);
    };

    const handleGuess = (event) => {
        const action = {type: "CHANGE_EVENT", value: event.target.value};
        gameDispatcher(action);
    };

    return (
        <Container>
            <Card title={"Mastermind Game Console"}>
                <InputText label={"Guess"}
                           value={game.guess}
                           handleChange={handleGuess}
                           id={"guess"}
                           explain={"Enter your guess"}/>
                <Button label={"Play"}
                        click={play}
                        color={"btn-success"}/>
                <Badge value={game.level}
                       label={"Level"}
                       color={"bg-primary"}
                       isVisible={true}/>
                <Badge value={game.lives}
                       label={"Lives"}
                       color={"bg-secondary"}
                       isVisible={true}/>
                <Badge value={`${game.numberOfMoves} out of ${game.maxNumberOfMoves}`}
                       label={"Number of moves"}
                       color={"bg-warning"}
                       isVisible={true}/>
                <Badge value={game.counter}
                       label={"Counter"}
                       color={"bg-warning"}
                       isVisible={true}/>
                <ProgressBar value={game.counter}
                             max={game.maxTimeout}
                             min={0}/>
            </Card>
            <Card title={"Moves"}>
                <Table values={game.moves}
                       headers={["Guess", "Perfect Match", "Partial Match", "Message"]}
                       fields={["guess", "perfectMatch", "partialMatch", "message"]}
                       keyField={"guess"}/>
            </Card>
        </Container>
    )
}