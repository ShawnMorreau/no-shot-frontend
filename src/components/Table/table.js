import React from "react";
import "./table.css";
import PotentialWinningHand from "../PotentialWinningHand/PotentialWinningHand";
const Table = ({
  whoAmI,
  judge,
  playersAndCards,
  action,
  selectWinner,
}) => {
  const pickWinner = (player) => {
    selectWinner(player);
  };
  const playersPlayedCards = playersAndCards.map((player, i) => (
    <li key={i}>
      <PotentialWinningHand
        player={player.Player}
        whiteCards={player.WhiteCards}
        redCard={player.RedCard}
      />
      <button className="selectWinner"
        onClick={() => pickWinner(player.Player)}
        disabled={judge.props.children !== whoAmI}
        style={{
          visibility:
            action === "Pick a winner" && whoAmI === judge.props.children
              ? "visible"
              : "hidden",
        }}
      >
        {player.Player}
      </button>
    </li>
  ));
  return (
    <div id="table">
      <h1>Judge - {judge.props.children}</h1>
      <ul>{playersPlayedCards}</ul>
    </div>
  );
};
export default Table;
