import React from "react";
import Card from "../Card/Card";
const Hand = ({ redCards, whiteCards }) => {
  const redHand = redCards.map((card, idx) => (
    <Card value={card} type={"red"} key={idx} />
  ));
  const whiteHand = whiteCards.map((card,idx) => (
    <Card value={card} type={"white"} key={idx} />
  ));
  console.log(whiteHand)
  return (
    <div>
      {redHand}
      {whiteHand}
    </div>
  );
};

export default Hand;
