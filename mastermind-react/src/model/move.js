export default class Move {
    constructor(guess,perfectMatch,partialMatch){
        this.guess = guess;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
        if (perfectMatch === 0 && partialMatch === 0){
            this.message = "No match";
        } else {
            this.message = "";
            if (partialMatch > 0){
                this.message = `-${partialMatch}`;
            }
            if (perfectMatch > 0){
                this.message = `${this.message}+${perfectMatch}`;
            }
        }
    }
}