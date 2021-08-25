import React from "react";
import "./HowToPlay.css";
const HowToPlay = () => {
  return (
    <section className="gameDescription">
      <h2>About</h2>
      <p>
        Welcome to my game! No Shot!, a card game in which you create the
        perfect scenarios that will quickly become less than ideal when another
        person sabotages you! Each round, a player will be chosen as a Judge and
        in a counter-clockwise order each player will lay down two OP cards to
        create an amazing scenario for this judge. You will then be able to
        sabotage the player to your lefts scenario, in hopes that the judge
        would still rather pick your set of OP cards.
      </p>
      <br />
      <h3>Disclaimer</h3>
      <p>
        The game is in early stages so there is still a lot of work to do to
        make it look like a solid finalized game, although, from my testing it
        is fully functional. On that note you may encounter bugs.{" "}
        <b>
          It is also worth mentioning that the game it self will be best played
          on desktop since I have barly had time to work out a layout for a
          desktop let alone smaller screen sizes. Sorry for any inconveniences
          that may bring.
        </b>
        Thank you, Enjoy!
      </p>
    </section>
  );
};

export default HowToPlay;
