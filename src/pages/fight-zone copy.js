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
  const [players, setPlayers] = useState(initPlayers);
  const [utility, setUtility] = useState(initUtility);

  let { settings, playerOne, playerTwo } = GetData();

  const { rounds, handicap, recovery, speed } = settings;
  let { timeRunning, time, round, shift, toggleRound, winner, toasty } = utility;

  useEffect(() => {
    players[0].data = playerOne;
    players[1].data = playerTwo;
  }, [playerTwo, playerOne]);

  const handleSwitchTime = () => {
    setUtility({ ...utility, timeRunning: !timeRunning });
    handleFight();
  };

  const handleFight = () => {
    if (timeRunning) {
      timeDown();
      fightOn();
    } else {
      fightOff();
    }
  };

  const fightOn = () => {
    _roundInterval = setInterval(() => {
      if (toggleRound) {
        toggleRound = false;
        healthDown();
      } else if (players[0].health > 0 && players[1].health > 0) {
        let shift = Math.floor(Math.random() * 2);
        setUtility({ ...utility, shift });
        healthRecovery();
        toggleRound = true;
        healthRecovery();
      }
      setUtility({ ...utility, toggleRound });
    }, (1 / speed) * 750);
  };
  const fightOff = () => {
    clearInterval(_timeInterval);
    clearInterval(_roundInterval);
  };

  const timeDown = () => {
    _timeInterval = setInterval(() => {
      if (time > 0 && !winner) {
        setUtility({ ...utility, time: time - 1 });
      }
      if (time <= 0) {
        fightOff();
        setUtility({ ...utility, toggleRound: false, winner: true });
      }
    }, 1000);
  };

  const healthDown = () => {
    let hit = Math.floor(Math.random() * (2 + handicap * 10) + 1);
    handleToasty(hit);
    let currentHealth = parseInt(players[shift].health) - hit;
    if (currentHealth < 0) {
      currentHealth = 0;
      handleWinner();
    }
    players[shift].health = currentHealth;
    setPlayers(players);
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
    if (players[0].health === 0 || players[1].health === 0) {
      if (players[0].health > players[1].health) {
        winner = players[0];
      } else {
        winner = players[1];
      }
      winner.wins++;
      /*       setState({
        wins: winner.wins,
      });
      setState({
        winner: true,
      }); */
      setUtility({ ...utility, winner: true });
    }
  };
  const handleRounds = () => {
    let round = round;
    round++;
    /*     setState({
      round,
    }); */
  };
  const rebirth = () => {
    let players = players;
    players[0].health = 100;
    players[1].health = 100;
    /*     setState({
      players,
      timeRunning: false,
      time: time,
      round: 0,
      shift: 0,
      toggleRound: false,
      winner: false,
      toasty: false,
    }); */
  };
  const nextRound = () => {
    rebirth();
    handleRounds();
    fightOff();
  };
  const reSelect = () => {
    props.history.push("/players");
  };
  const handleToasty = (hit) => {
    if (hit > handicap * 10) {
      setUtility({ utility, toasty: true });
    }
  };
  return (
    <div className="container-fluid m-0 pt-3">
      <Wall status={"up"} />
      <DataDisplay
        players={players}
        time={time}
        round={round}
        runButton={winner ? (round === rounds ? reSelect : nextRound) : handleSwitchTime}
        timeRunning={timeRunning}
      />

      <div className="row justify-content-center mt-3">
        <h2 className={timeRunning && time === time ? "display-1 show-title game-font" : "hide-title"}>fight!</h2>

        {winner ? (
          <h2 className="display-2 text-shadow position-fixed">
            {players[0].health > players[1].health
              ? players[0].data.name.toUpperCase()
              : players[1].data.name.toUpperCase()}{" "}
            WINS
          </h2>
        ) : (
          ""
        )}

        {winner === true ? (
          players[0].health === 100 || players[1].health === 100 ? (
            <h2 className="w-100 text-blink mt-5">flawless victory</h2>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {winner ? (
          <div className="exit-button">
            <Link to="/players">
              <h3 className="rounded p-3 settings-shadows">Select Again</h3>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className={`p1-zone ${shift === 1 ? "on-top" : "below"}`}>
          <PlayerMapping action={toggleRound ? (shift === 0 ? "hited" : "hit") : "static"} player={playerOne} />
        </div>
        <div className={`player-2 p2-zone ${players[0].data.key === players[1].data.key ? "set-color" : null}`}>
          <PlayerMapping action={toggleRound ? (shift === 1 ? "hited" : "hit") : "static"} player={playerTwo} />
        </div>
      </div>
      {players[0].health === 100 && players[1].health === 100 ? (
        ""
      ) : timeRunning === false ? (
        <div className="container col-4 p-2 bg-pause rounded">
          <PauseScreen resume={handleSwitchTime} restart={rebirth} />
        </div>
      ) : null}
      <div className={`toasty ${toasty ? "show-toasty" : ""}`}>
        <img src={Toasty} alt="" />
      </div>
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
  time: 20,
  round: 1,
  shift: 0,
  toggleRound: false,
  winner: false,
  toasty: false,
};
