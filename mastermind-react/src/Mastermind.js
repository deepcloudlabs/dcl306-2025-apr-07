import {useEffect, useState} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";

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

    let timerId = null;
    useEffect(()=>{
      timerId = setInterval(()=>{
          setCounter(counter - 1);
      })
      return() => {
          if (timerId) clearInterval(timerId);
      }
    });

    //return View
    return (
        <Container>
            <Card title={"Mastermind Game Console"}>

            </Card>
        </Container>
    );
}

export default Mastermind;
