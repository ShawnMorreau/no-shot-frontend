import React, { useState } from "react";
import { sendMsg } from "../../api";
import Card from "../../components/Card/Card";
import Table from "../../components/Table/table";
import OptionsPane from "../../components/OptionsPane/OptionsPane";

import "./Game.css";

const MAX_OP_CARDS_SELECTED = 2;
const MAX_NOSHOT_CARDS_SELECTED = 1;
const NO_SHOT_DELIMITER = "@#@@$@#@";
const OP_DELIMITER = "~+~...$";
const WINNER_DELIMITER = "(k(*3@#";

const Game = ({
  judge,
  whoAmI,
  OPCards,
  noShotCards,
  players,
  turn,
  action,
  cardsOnTable,
  host,
  winner,
  setWinner,
}) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const selectCard = (card, type) => {
    if (action === "Choose noShot cards" && type === "noShot") {
      if (selectedCards.includes(card)) {
        setSelectedCards([]);
        return false;
      } else if (selectedCards.length !== MAX_NOSHOT_CARDS_SELECTED) {
        setSelectedCards([...selectedCards, card]);
        return true;
      }
    } else if (action === "Choose OP cards" && type === "OP") {
      if (selectedCards.includes(card)) {
        let newCards = selectedCards.filter((aCard) => aCard !== card);
        setSelectedCards(newCards);
        return false;
      } else if (selectedCards.length !== MAX_OP_CARDS_SELECTED) {
        setSelectedCards([...selectedCards, card]);
        return true;
      }
    } else {
      return false;
    }
  };
  const select = (e) => {
    let type = e.target.className.split(" ")[0];
    let value = e.target.children[0].innerHTML;
    if (players[turn].props.children === whoAmI) {
      let select = selectCard(value, type);

      select
        ? (e.target.className += " cardIsSelected")
        : (e.target.className = removeAnyExtraClassesOnCard(
            e.target.className
          ));
    }
  };
  const noShot = noShotCards.map((card, id) => (
    <Card
      key={id}
      value={card.value}
      type="noShot"
      selectCard={selectCard}
      clicked={select}
    />
  ));

  const OP = OPCards.map((card, id) => (
    <Card
      key={id}
      value={card.value}
      type="OP"
      selectCard={selectCard}
      clicked={select}
    />
  ));
  const removeAnyExtraClassesOnCard = (target) => {
    target = target.replace(" cardIsSelected", "");
    return target;
  };
  const resetAllCardStyles = (cards) => {
    cards.forEach(
      (card) =>
        (card.classList = removeAnyExtraClassesOnCard(card.classList.value))
    );
  };
  const playSelectedCards = () => {
    switch (action) {
      case "Choose noShot cards":
        if (selectedCards.length === MAX_NOSHOT_CARDS_SELECTED) {
          let cards = document.querySelectorAll(".noShot");
          resetAllCardStyles(cards);
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
          let cards = document.querySelectorAll(".OP");
          resetAllCardStyles(cards);

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
  const selectOption = (option) => {
    switch (option) {
      case "continue":
        sendMsg("new round");
        break;

      case "end":
        sendMsg("game ended");
        break;
      default:
        console.error("something bad happened");
    }
  };
  return (
    <div className="game">
      <Table
        whoAmI={whoAmI}
        playersAndCards={cardsOnTable}
        judge={players[judge]}
        action={action}
        selectWinner={(player) => sendMsg(player + WINNER_DELIMITER)}
      />
      {winner === "" && (
        <h4>
          Turn = {players[turn].props.children}, please {action} - you are{" "}
          {whoAmI}
        </h4>
      )}
      {winner !== "" && (
        <>
          <h1>{winner} has won this round!</h1>
          {host === whoAmI && <OptionsPane selectOption={selectOption} />}
        </>
      )}
      {winner === "" && players[judge].props.children !== whoAmI && (
        <div id="nonJudge">
          <section className="cards">
            <div>
              <p className="typeOfCardText">noShot cards</p>
              <ul>{noShot}</ul>
            </div>
            <div>
              <p className="typeOfCardText">OP cards</p>
              <ul>{OP}</ul>
            </div>
          </section>
          {players[turn].props.children === whoAmI && (
            <button id="playCards" onClick={() => playSelectedCards()}>
              Play Cards
            </button>
          )}
        </div>
      )}
      {players[judge].props.children === whoAmI && <div></div>}
    </div>
  );
};

export default Game;
