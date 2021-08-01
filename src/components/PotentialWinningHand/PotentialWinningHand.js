import React from "react";
import "./PotentialWinningHand.css";
const PotentialWinningHand = ({ID, OP, NoShot}) => {
  const whiteCardsLi = OP.map((card, idx) => (
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
      <p id="redCard">{NoShot}</p>
      <h3>{ID}</h3>
    </div>
  );
};
export default PotentialWinningHand;
