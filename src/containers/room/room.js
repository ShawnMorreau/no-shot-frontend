import React, { useEffect, useState } from "react";
import { connect, sendMsg } from "../../api/";
import Game from "../game/game";
import "./room.css";
import HowToPlay from "../../components/HowToPlay/HowToPlay"
const CLIENT_CONNECTED = 2;
const CLIENT_DISCONNECTED = 3;
const END_OF_ROUND = 6;
const END_GAME = 99;

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
    return <li className="players" key={idx}>{player}</li>;
  });

  const startGame = () => {
    sendMsg("start game");
  };
  const endGame = () => {
    sendMsg("game ended");
    setGameStarted(false);
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
        decodedMessage.Type !== END_GAME
      ) {
        if(decodedMessage.Body === "New Game Starting"){
          setWinner("")
        }
        setWhiteCards(decodedMessage.MyOpCards);
        setRedCards(decodedMessage.MyNoShotCards);
        setJudge(decodedMessage.Judge);
        setWhoseTurn(decodedMessage.TurnAndAction.Turn);
        setAction(decodedMessage.TurnAndAction.Action);
        setCardsOnTable(decodedMessage.CardsPlayed);
      }else if(decodedMessage.Type === END_OF_ROUND){
        setWinner(decodedMessage.Winner)
      }

      if (!gameStarted) {
        if (decodedMessage.GameStarted) {
          setGameStarted(true);
        }
        if (host == null) {
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
    winner
  ]);

  return (
    <div>
      {!gameStarted && (
        <div id="lobby">
          <h1>{`Welcome to ${host}'s game ${whoAmI}`}</h1>
          <h3>Players</h3>
          <ul>{people}</ul>
          {host === whoAmI && <button id="start" onClick={startGame}>Start Game</button>}
          <HowToPlay/>
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
            setWinner = {setWinner}
          />
        </>
      )}
    </div>
  );
};
export default Room;
