## MasterMind Game

Mastermind is a simple number guessing game. Computer picks a **3-digit** random number where all digits are distinct.
This number is a secret and a player tries to find the secret by guessing. Computer guides the player with a hint
message summarizing how much the guess is close the secret. Assume that the secret number is **549** and player's first
move is **123**. Computer evaluates the input **123** and produces "No Match!" message, hence there is no digit matched!
Player's next move is **456**. Computer again evaluates the input 456 and produces the message **"-2"**: The digits 4
and 5 are all matched but at the very wrong places! Player's next move is **567**. Computer again evaluates the input **
567** and produces the message **"+1"**:
Only one digit is matched at the correct place! Player's next move is **584**. Computer again evaluates the input **
584** and produces the message **"+1-1"**: The digit 5 is matched at the correct place and the digit 4 is matched at the
wrong place. Player's next move is **540**. Computer again evaluates the input **540** and produces the message **"
+2"**: The digits 5 and 4 are all matched at the correct places! Finally, the player inputs **549** and wins the game!

```
Game Level : 3 
Secret : 549 
Player tries to guess the secret: 
    123 -> No Match 
    456 -> -2 
    574 -> -1 +1 
    548 -> +2 
    549 -> Next Game Level: 4 
Secret: 3615
    ... 
    Game Level: 10 -> Player wins!

60 + 10 * (Game Level - 3) seconds 
Number of moves: 10 + 2 * (Game Level - 3)
3 Lives +1 Live at each level
```