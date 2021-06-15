import React from "react";
import Card from "../Card/Card";
const PotentialWinningHand = ({ player, whiteCards, redCard }) => {
  const whiteCardsLi = whiteCards.map((card, idx) => (
    <li key={idx}>
      {/* <Card value={card} type={"OP"} selectCard={() => console.log("ok.")} /> */}
      {card}
    </li>
  ));
  
//   const RedCard = <Card value={redCard} type={"noShot"} selectCard={() => console.log("K")} />;

  return (
    <div>
      <ul>{whiteCardsLi}</ul>
      <br/>
      <p>{redCard}</p>
      <h3>{player}</h3>
    </div>
  );
};
export default PotentialWinningHand;
