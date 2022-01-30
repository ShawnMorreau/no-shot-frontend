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
      <h3><u>{ID}</u></h3>
      <p className="title OPTitle">OP Cards</p>
      <ul>{whiteCardsLi}</ul>
      <br/>
      <p className="title NSTitle">No Shot Cards</p>
      <p id="redCard">{NoShot}</p>
    </div>
  );
};
export default PotentialWinningHand;
