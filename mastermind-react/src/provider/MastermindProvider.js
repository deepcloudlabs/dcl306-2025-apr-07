import createSecret from "../utils/utility";
import {useReducer, createContext, useContext} from "react";
import MastermindStateless from "../mastermind-stateless";
import GameReducer from "../reducer/game-reducer";

const initialGameState = {
    secret: createSecret(3),
    guess: 123,
    level: 3,
    maxTimeout: 60,
    lives: 3,
    moves: [],
    counter: 60,
    numberOfMoves: 0,
    maxNumberOfMoves: 10,
    status: "PLAYING" // WINS, LOSES, PLAYING
};

export const GameContext = createContext(initialGameState);

export function useGameDispatcher(){
    const {dispatchGame} = useContext(GameContext);
    return dispatchGame;
}

export default function MastermindProvider() {
    const [game,dispatchGame] = useReducer(GameReducer,initialGameState)
    return (
        <GameContext.Provider value={{game,dispatchGame}}>
            <MastermindStateless />
        </GameContext.Provider>
    );
}