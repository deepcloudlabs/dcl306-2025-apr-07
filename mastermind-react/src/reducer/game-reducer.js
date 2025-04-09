import createSecret, {evaluateMove} from "../utils/utility";

const moveToNextLevel = (game) => {
    game.moves = [];
    game.numberOfMoves = 0;
    game.maxTimeout += 10
    game.counter = game.maxTimeout;
    game.maxNumberOfMoves += 2;
    game.secret = createSecret(game.level);
}

const replayLevel = (game) => {
    game.moves = [];
    game.numberOfMoves = 0;
    game.counter = game.maxTimeout;
    game.secret = createSecret(game.level);
};

export default function GameReducer(gameState, action) {
    const newGameState = {...gameState};
    newGameState.moves = [...gameState.moves];
    switch (action.type) {
        case "PLAY_EVENT":
            newGameState.numberOfMoves++;
            if (newGameState.secret === newGameState.guess) {
                newGameState.level++;
                if (newGameState.level === 10) {
                    // TODO: player wins
                }
                moveToNextLevel(newGameState);
            } else {
                if (newGameState.numberOfMoves >= newGameState.maxNumberOfMoves) {
                    newGameState.lives--;
                    if (newGameState.lives === 0) {
                        // TODO: player loses
                    }
                    replayLevel(newGameState);
                } else {
                    newGameState.moves.push(evaluateMove({secret: newGameState.secret, guess: newGameState.guess}));
                }
            }
            break;
        case "CHANGE_EVENT":
            newGameState.guess = Number(action.value);
            break;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
    return newGameState;
}