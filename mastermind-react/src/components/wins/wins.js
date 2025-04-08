import Container from "../common/container";
import Card from "../common/card";
import {Link} from "react-router";

export default function PlayerWins() {
    const clearItem = () => localStorage.removeItem("mastermind-sbm");
    return (
        <Container>
            <Card title={"Player Wins"}>
                <h4>Good game!</h4>
                <Link onClick={clearItem} to="/">Would you like to play again?</Link>
            </Card>
        </Container>
    )
}
