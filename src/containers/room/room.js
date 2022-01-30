import React, { useEffect, useState } from "react";
import { connect, sendMsg } from "../../api/";
import Game from "../game/game";
import "./room.css";
import HowToPlay from "../../components/HowToPlay/HowToPlay";
import Vial from "../../images/vial.svg";
import Start from "../../images/start2.svg";

const CLIENT_CONNECTED = 2;
const CLIENT_DISCONNECTED = 3;
const END_OF_ROUND = 6;
const END_GAME = 99;
const RANDOM_PING = 55;

const Room = () => {
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [whoAmI, setWhoAmI] = useState(null);
  const [host, setHost] = useState(null);
  const [whiteCards, setWhiteCards] = useState(null);
  const [redCards, setRedCards] = useState(null);
  const [judge, setJudge] = useState(null);
  const [turn, setWhoseTurn] = useState(null);
  const [action, setAction] = useState(null);
  const [cardsOnTable, setCardsOnTable] = useState(null);
  const [winner, setWinner] = useState("");

  const people = players.map((player, idx) => {
    return (
      <li className="players" key={idx}>
        {player === whoAmI ? `${player}` : player}
      </li>
    );
  });

  const startGame = () => {
    sendMsg("start game");
  };
  // const addBot = () => {
  //   sendMsg(";'wp';");
  // };
  // const removeBot = () => {
  //   sendMsg(";[];");
  // };
  const pingHeroku = () => {
    sendMsg("randomPing");
  };
  useEffect(() => {
    connect((msg) => {
      let decodedMessage = JSON.parse(msg);
      console.log(decodedMessage);
      if (decodedMessage.Type === END_GAME) {
        setGameStarted(false);
      }
      if (
        decodedMessage.Type !== CLIENT_CONNECTED &&
        decodedMessage.Type !== CLIENT_DISCONNECTED &&
        decodedMessage.Type !== END_OF_ROUND &&
        decodedMessage.Type !== END_GAME &&
        decodedMessage.Type !== RANDOM_PING
      ) {
        if (decodedMessage.Body === "New Round Starting") {
          setWinner("");
        }
        setWhiteCards(decodedMessage.MyOpCards);
        setRedCards(decodedMessage.MyNoShotCards);
        setJudge(decodedMessage.Judge);
        setWhoseTurn(decodedMessage.TurnAndAction.Turn);
        setAction(decodedMessage.TurnAndAction.Action);
        setCardsOnTable(decodedMessage.CardsPlayed);
      } else if (decodedMessage.Type === END_OF_ROUND) {
        setWinner(decodedMessage.Winner);
      }

      if (!gameStarted) {
        if (decodedMessage.GameStarted) {
          setGameStarted(true);
        }
        if (host == null || host !== decodedMessage.Host) {
          setHost(decodedMessage.Host);
        }
        if (whoAmI == null) {
          setWhoAmI(decodedMessage.ID);
        }
        if (
          decodedMessage.Type === CLIENT_CONNECTED ||
          decodedMessage.Type === CLIENT_DISCONNECTED
        ) {
          setPlayers(decodedMessage.Players);
        }
      }
    });
    setInterval(() => {
      pingHeroku();
    }, 29000);
  }, [
    players,
    host,
    whoAmI,
    judge,
    redCards,
    whiteCards,
    turn,
    gameStarted,
    action,
    cardsOnTable,
    winner,
  ]);

  return (
    <div>
      {!gameStarted && (
        <div id="lobby">
          <h1 className="title">NO SHOT!</h1>
          <div className="description">
            <img src={Vial} alt="" id="vial" />
            <p className="intro">
              Welcome to my game, No Shot!, a card game where you can create the
              most amazing, dream come true scenarios for another person to
              sabotage.
            </p>
          </div>
          <div className="container">
            <HowToPlay className="howToPlayContainer" />
            <div className="players">
              <h3>Players</h3>
              <ul>{people}</ul>
            </div>
          </div>
          <h2>Welcome to {host}&apos;s lobby!</h2>
          {host === whoAmI && people.length > 1 ? (
            <img id="startButton" src={Start} alt="" onClick={startGame}/>

            // <button id="start" onClick={startGame}>
            //   Start Game
            // </button>
          ) : (
            host === whoAmI && (
              <p style={{ textAlign: "center" }}>
                You must have at least 2 players to start!
              </p>
            )
          )}
          <br />
        </div>
      )}
      {gameStarted === true && (
        <>
          <Game
            judge={judge}
            whoAmI={whoAmI}
            OPCards={whiteCards}
            noShotCards={redCards}
            players={people}
            turn={turn}
            action={action}
            cardsOnTable={cardsOnTable}
            host={host}
            winner={winner}
            setWinner={setWinner}
          />
        </>
      )}
    </div>
  );
};
export default Room;
