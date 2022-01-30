import React, {} from "react";
import "./HowToPlay.css";
const HowToPlay = () => {
    return (
        <div className="howToPlayContainer">
            <h3 className="cardTitle">how to play:</h3>
            <ul>
                <li>
                    In each round a player will automatically be chosen as a Judge
                </li>
                <li>
                    In a counter-clockwise order, each player will lay down two OP cards
                    to create an amazing scenario for the Judge
                </li>
                <li>
                    In the same order, the player will sabotage the next players
                    scenario with a No Shot! card in hopes that the Judge will pick your
                    scenario
                </li>
            </ul>
        </div>
    )
}

export default HowToPlay;