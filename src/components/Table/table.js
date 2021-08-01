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
        ID={player.ID}
        OP={player.OP}
        NoShot={player.NoShot}
      />
      <button className="selectWinner"
        onClick={() => pickWinner(player.ID)}
        disabled={judge.props.children !== whoAmI}
        style={{
          visibility:
            action === "Pick a winner" && whoAmI === judge.props.children
              ? "visible"
              : "hidden",
        }}
      >
        {player.ID}
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
