import React, { useState } from "react";
import { sendMsg } from "../../api";
import Card from "../../components/Card/Card";
import Table from "../Table/table";
import OptionsPane from "../../components/OptionsPane/OptionsPane";

import "./Game.css";

const MAX_OP_CARDS_SELECTED = 2;
const MAX_NOSHOT_CARDS_SELECTED = 1;
const NO_SHOT_DELIMITER = "@#@@$@#@";
const OP_DELIMITER = "~+~...$";
const WINNER_DELIMITER = "(k(*3@#";


const Game = ({ judge, whoAmI, OPCards, noShotCards, players, turn, action, cardsOnTable, host, winner, setWinner }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const selectCard = (card, type) => {
    if (action === "Choose noShot cards" && type === "noShot") {
      if (selectedCards.includes(card)) {
        setSelectedCards([]);
      } else if (selectedCards.length !== MAX_NOSHOT_CARDS_SELECTED) {
        setSelectedCards([...selectedCards, card]);
      }
    } else if (action === "Choose OP cards" && type === "OP") {
      if (selectedCards.includes(card)) {
        let newCards = selectedCards.filter((aCard) => aCard !== card);
        setSelectedCards(newCards);
      } else if (selectedCards.length !== MAX_OP_CARDS_SELECTED) {
        setSelectedCards([...selectedCards, card]);
      }
    } else {
      console.log("Yung blood that's illegal.");
    }

  };

  const playSelectedCards = () => {
    //It looks like there's some duplication here.... fix it :arrghhh:
    switch (action) {
      case "Choose noShot cards":
        if (selectedCards.length === MAX_NOSHOT_CARDS_SELECTED) {
          sendMsg(selectedCards[0] + NO_SHOT_DELIMITER);
          setSelectedCards([]);
        } else {
          console.log(
            `cmon G, you know that you need ${MAX_NOSHOT_CARDS_SELECTED} to play`
          );
        }
        break;
      case "Choose OP cards":
        if (selectedCards.length === MAX_OP_CARDS_SELECTED) {
          sendMsg(selectedCards[0] + OP_DELIMITER + selectedCards[1]);
          setSelectedCards([]);
        } else {
          console.log(
            `cmon G, you know that you need ${MAX_OP_CARDS_SELECTED} to play`
          );
        }
        break;
      default:
        console.log("Something's clearly broken");
        break;
    }
  };

  const noShot = noShotCards.map((card, id) => (
    <Card key={id} value={card} type="noShot" selectCard={selectCard} />
  ));
  const OP = OPCards.map((card, id) => (
    <Card key={id} value={card} type="OP" selectCard={selectCard} />
  ));
  const selected = selectedCards.map((card, idx) => <li key={idx}>{card}</li>);
  const selectOption = option => {
    switch (option) {
      case "continue":
        sendMsg("new round")
        break;

      case "end":
        sendMsg("game ended")
        break;
    }
  }
  const selectWinner = player => {
    selectWinner(player)
    sendMsg(player + WINNER_DELIMITER)
  }
  return (
    <div className="game">

      <h4>Turn = {players[turn].props.children}</h4>
      <Table
        whoAmI={whoAmI}
        playersAndCards={cardsOnTable}
        judge={players[judge]}
        action={action}
        selectWinner={(player) => sendMsg(player + WINNER_DELIMITER)}
      />


      {(winner !== "" &&
        <>
          <h1>{winner} has won this round!</h1>
          {host === whoAmI &&
            <OptionsPane
              selectOption={selectOption}
            />
          }
        </>
      )}


      {winner === "" && (players[judge].props.children !== whoAmI) && (
        <div id="nonJudge">
          <section className="cards">
            <ul>{noShot}</ul>
            <ul>{OP}</ul>
            <h4>Selected Cards</h4>
            <ul id="selected">{selected}</ul>
            <br/>
            {players[turn].props.children === whoAmI && (
              <button onClick={() => playSelectedCards()}>Play Cards</button>
            )}
          </section>
        </div>
      )}
      {players[judge].props.children === whoAmI && <div></div>}
    </div>
  );
};

export default Game;
