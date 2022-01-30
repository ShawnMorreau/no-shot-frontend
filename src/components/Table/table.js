import React from "react";
import "./table.css";
import Judge from "../../images/judge2.png"
import PotentialWinningHand from "../PotentialWinningHand/PotentialWinningHand";
const noShotCardAction = "Choose noShot cards";
const opCardAction = "Choose OP cards";
const Table = ({ whoAmI, judge, playersAndCards, action, selectWinner }) => {
  const pickWinner = (player) => {
    selectWinner(player);
  };
  const playersPlayedCards = playersAndCards.map((player, i) => (
    <li key={i} className="container">
      <PotentialWinningHand
        ID={player.ID}
        OP={player.OP}
        NoShot={player.NoShot}
      />
      {action !== "" && (
        <button
          className="selectWinner"
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
      )}

    </li>
  ));
  return (
    <div id="table">
      {(action !== noShotCardAction && action !== opCardAction) ? <></> :
        <div className="judge">
          <img src={Judge} width={200} alt="" />
          <h1>{judge.props.children === whoAmI ? `${judge.props.children} (you)` : judge.props.children}</h1>
        </div>
      }

      <ul>{playersPlayedCards}</ul>
    </div>
  );
};
export default Table;
