import Move from "../model/move";

export default function createSecret(level) {
    const digits = [createDigit(1, 9)];
    while (digits.length < level) {
        const digit = createDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    let number = Number(digits.join(""));
    console.log(number);
    return number;
}

function createDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function evaluateMove({secret,guess}){
    const secretAsString = secret.toString();
    const guessAsString = guess.toString();
    let perfectMatch = 0;
    let partialMatch = 0;
    for (let i=0; i<secretAsString.length; i++){
        const s = secretAsString.charAt(i);
        for (let j=0; j<guessAsString.length; j++){
            const g = guessAsString.charAt(j);
            if (g === s){
                if (i === j){
                   perfectMatch++;
                } else {
                   partialMatch++;
                }
            }
        }
    }
    return new Move(guess,perfectMatch,partialMatch);
}
