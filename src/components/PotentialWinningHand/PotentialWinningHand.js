import React from "react";
import "./PotentialWinningHand.css";
const PotentialWinningHand = ({ player, whiteCards, redCard }) => {
  const whiteCardsLi = whiteCards.map((card, idx) => (
    <li key={idx}>
      {card}
    </li>
  ));
  return (
    <div id="cardsPlayed">
      <p className="title"><u>OP Cards</u></p>
      <ul>{whiteCardsLi}</ul>
      <br/>
      <p className="title"><u>No Shot Cards</u></p>
      <p id="redCard">{redCard}</p>
      <h3>{player}</h3>
    </div>
  );
};
export default PotentialWinningHand;
