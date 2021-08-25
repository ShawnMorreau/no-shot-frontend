import React, { useEffect, useState } from "react";
import { connect, sendMsg } from "../../api";
import HowToPlay from "../../components/HowToPlay/HowToPlay";
import Room from "../room/room";
import "./styling/landingPage.css";
const MAX_GAME_SIZE = 5;
const CREATE_NEW_GAME = "---Create a new game---";
const LandingPage = () => {
  const [joinedGame, setJoinedGame] = useState(false);
  const [games, setGames] = useState([]);
  const [whoAmI, setWhoAmI] = useState();
  useEffect(() => {
    connect((msg) => {
      const decryptedMessage = JSON.parse(msg);
      if (decryptedMessage.Games !== undefined) {
        // console.log([...decryptedMessage.Games])
        // setGames([...decryptedMessage.Games]);
      }
      if (whoAmI === undefined) {
        setWhoAmI(decryptedMessage.ID);
      }
    });
  },[games,whoAmI]);
  const createNewGame = () => {
    sendMsg(CREATE_NEW_GAME);
    setJoinedGame(!joinedGame)
  };
  const gamesList = games.map((game, i) => (
    <li key={i} id="game">
      <div id="info">
        <span>
          {game}'s Game - {game.currSize}/{MAX_GAME_SIZE} &nbsp;
        </span>
        {game.currSize < MAX_GAME_SIZE && <button id="joinRoom">Join</button>}
      </div>
    </li>
  ));
  return (
    <>
      {!joinedGame && (
        <>
          <h1>No Shot!</h1>
          <p>
            Welcome! Names are randomly generated for the time being. You shall
            be known as<b>{whoAmI}!</b>
          </p>
          <h2>Play Now!</h2>
          <p>Join a game or create your own!</p>
          <ul id="gamesContainer">{gamesList}</ul>
          <button onClick={createNewGame}>Create New Game</button>
          <br />
          <HowToPlay />
        </>
      )}
      {joinedGame && 
        <Room/>
      }
    </>
  );
};

export default LandingPage;
