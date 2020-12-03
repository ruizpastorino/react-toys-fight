import React, { useState, useEffect } from "react";
import PlayerMapping from "../components/palyer-mapping";
import { Link } from "react-router-dom";
import DataDisplay from "../components/data-display";
import { withRouter } from "react-router-dom";
import Toasty from "../media/img/toasty.png";
import PauseScreen from "../components/pause-screen";
import Wall from "../components/wall";
import { GetData } from "../data-context";

let _timeInterval;
let _roundInterval;

const FightZone = (props) => {
  let [winner, setWinner] = useState(false);
  let [time, setTime] = useState(99);
  let [round, setRound] = useState(1);
  let [players, setPlayers] = useState(initPlayers);
  let [toasty, setToasty] = useState(false);
  const [utility, setUtility] = useState(initUtility);

  let { settings, playerOne, playerTwo } = GetData();

  const { rounds, handicap, recovery, speed } = settings;
  let { timeRunning, shift, attack } = utility;

  useEffect(() => {
    setTime(settings.time);
    players[0].data = playerOne;
    players[1].data = playerTwo;
    players[0].wins = 0;
    players[1].wins = 0;
    reload();
  }, [playerTwo, playerOne]);

  const handleStartButton = () => {
    timeRunning = !timeRunning;
    if (timeRunning) {
      _roundInterval = setInterval(handleFight, (1 / speed) * 750);
      _timeInterval = setInterval(timeDown, 1000);
    } else {
      stopFight();
    }
    setUtility({ ...utility, timeRunning });
  };

  const stopFight = () => {
    setUtility({ ...utility, attack: false });
    clearInterval(_timeInterval);
    clearInterval(_roundInterval);
  };

  const handleFight = () => {
    if (players[0].health > 0 && players[1].health > 0) {
      attack = !attack;
      if (attack) {
        shift = Math.floor(Math.random() * 2);
        let hit = Math.floor(Math.random() * (2 + handicap * 10) + 1);
        handleToasty(hit);
        players[shift].health -= hit;
        if (players[shift].health < 0) {
          players[shift].health = 0;
        }
        setPlayers(players);
      } else {
        healthRecovery();
      }
    } else {
      handleWinner();
      stopFight();
    }
    setUtility({ ...utility, timeRunning, attack, shift });
  };

  const timeDown = () => {
    time--;
    setTime(time);
    if (time === 0) {
      handleWinner();
      stopFight();
    }
  };

  const healthRecovery = () => {
    shift = Math.floor(Math.random() * 2);
    let random = Math.floor(((Math.random() * 1) / recovery) * 10);
    if (random === 0) {
      if (players[shift].health < 100) {
        let extraLife = Math.floor(Math.random() * (5 + handicap * 10));
        players[shift].health = parseInt(players[shift].health) + extraLife;
        if (players[shift].health > 99) {
          players[shift].health = 99;
        }
        setPlayers(players);
      }
    }
  };

  const handleWinner = () => {
    let h1 = players[0].health;
    let h2 = players[1].health;
    round++;
    if (h1 !== h2) {
      winner = h1 > h2 ? players[0] : players[1];
      winner.wins += 1;
      winner.data.victories += 1;
      setWinner(winner);
    } else {
      setWinner("TIE");
    }
    setRound(round);
  };

  const reload = () => {
    if (round <= rounds) {
      players.map((player) => {
        player.health = 100;
      });
      time = settings.time;
      setPlayers(players);
      setTime(time);
      setWinner(false);
      setUtility({ ...initUtility });
      setToasty(false);
    } else {
      props.history.push("/players");
    }
  };

  const handleToasty = (hit) => {
    if (hit > handicap * 10 && !toasty) {
      setToasty(true);
    }
  };

  return (
    <div>
      <Wall status={"up"} />
      <DataDisplay data={{ players, timeRunning, time, round }} actions={{ handleStartButton, reload }} />
      {/* fight area */}
      <div className="d-flex justify-content-center mt-3">
        <h2 className={timeRunning && time === settings.time ? "display-1 show-title game-font" : "hide-title"}>
          fight!
        </h2>
        {/* titles */}
        <div style={{ zIndex: 100 }} className="position-fixed">
          {!winner ? null : (
            <h2 className="display-2 text-shadow">
              {winner !== "TIE" ? winner.data.name.toUpperCase() + " WINS" : "TIE FIGH!"}
            </h2>
          )}

          {winner ? (
            players[0].health === 100 || players[1].health === 100 ? (
              <h2 className="w-100 text-blink mt-5">flawless victory</h2>
            ) : null
          ) : null}
        </div>
        {winner ? (
          <div className="exit-button text-center">
            <Link to="/players">
              <h3 className="rounded p-3 settings-shadows">Select Again</h3>
            </Link>
          </div>
        ) : null}
        {/* figthers area */}
        <div className={`p1-zone ${shift === 1 ? "on-top" : "below"}`}>
          <PlayerMapping
            timerunning={!winner}
            action={attack ? (shift === 0 ? "hited" : "hit") : "static"}
            player={playerOne}
          />
        </div>
        <div className={`player-2 p2-zone ${players[0].data.name === players[1].data.name ? "set-color" : null}`}>
          <PlayerMapping
            timerunning={!winner}
            action={attack ? (shift === 1 ? "hited" : "hit") : "static"}
            player={playerTwo}
          />
        </div>
      </div>
      {/* pause screen */}
      {time < settings.time && !timeRunning && !winner ? (
        <div className="container col-4 p-2 bg-pause rounded">
          <PauseScreen resume={handleStartButton} restart={reload} />
        </div>
      ) : null}
      {/* toasty guy */}
      {toasty ? (
        <div className="toasty">
          <img src={Toasty} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(FightZone);

const initPlayers = [
  {
    data: {},
    health: 100,
    wins: 0,
  },
  {
    data: {},
    health: 100,
    wins: 0,
  },
];
const initUtility = {
  timeRunning: false,
  shift: 0,
  attack: false,
};
