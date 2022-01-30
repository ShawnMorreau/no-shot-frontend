import React from "react";
import "./EndGameScreen.css";
import Website from "../../images/website2.png";
const EndGameScreen = () => {
  return (
    <div className="endScreen">
      <div className="options">
        <h1>
          THANK YOU
          <br /> FOR PLAYING
        </h1>
      </div>
      <div className="contactMe">
        <p>
          The game is in early stages meaning you may encounter bugs. If this happens, you can take a
          screenshot and describe the bug and I will gladly investigate it.
        </p>
        <br/>
        <p>
          Ideally, there will be lobbies and private codes that you can send to
          your friends but I just wanted to get something up and running
          initially and worry about after I have all the initial logic setup.
        </p>
        <br/>
        <p>Thanks and I hope you enjoyed the game!</p>
        <br/>
        <>
          <h2>shawn.morreau@gmail.com</h2>
        </>
        <img src={Website} width={450} height={250} alt="" />
      </div>
    </div>
  );
};

export default EndGameScreen;
