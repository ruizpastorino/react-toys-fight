import React, { useState } from "react";
import PlayerMapping from "./palyer-mapping";
import Wall from "./wall";
import { Link, withRouter } from "react-router-dom";
import createPlayers from "./players-data";
import { GetData } from "../data-context";

/////////////////////////////////////////////////////////////

const initUtility = { wallState: false, time: "", selectedP1: false, selectedP2: false };
const players = createPlayers();

const PlayersChart = (props) => {
  const [utility, setUtility] = useState(initUtility);

  const {playerOne, playerTwo, setPlayerOne, setPlayerTwo} = GetData()

  let { wallState, selectedP1, selectedP2 } = utility;

  const handlePick = (player) => {
    if (selectedP1 === false) {
      setPlayerOne(player);
    }
    if (selectedP2 === false && selectedP1 === true) {
      setPlayerTwo(player);
    }
  };

  const togglePlayers = () => {
    if (selectedP1 === false) {
      setPlayerTwo(playerOne);
      setUtility({ ...utility, selectedP1: true });
    }
    if (selectedP1 === true && selectedP2 === false) {
      setUtility({ ...utility, selectedP2: true });
    }
  };

  const unSelect = () => {
    if (selectedP1 === false) {
      setPlayerOne("");
    }
    if (selectedP2 === false) {
      setPlayerTwo("");
    }
  };

  const handleWall = () => {
    if (selectedP1 && selectedP2) {
      let players = [playerOne, playerTwo];
      setTimeout(timer, 1000);
      setUtility({ ...utility, wallState: true });
    }
  };

  const timer = () => {
    setTimeout(() => {
      props.history.push("/fight");
    }, 65);
  };

  return (
    <div className="row justify-content-center col-12">
      {wallState ? <Wall status="down" /> : ""}
      <div className="">
        <h4 style={{ width: "200px", height: "29px" }}>{playerOne !== "" ? playerOne.name.toUpperCase() : ""}</h4>
        <div className={`player-1 chart-size ${selectedP1 ? "" : "darkly"}`}>
          <PlayerMapping action={selectedP1 ? "static" : "static"} player={playerOne} />
        </div>
      </div>
      <div style={{ width: "600px", zIndex: 1 }} className="chart-bg container mt-1 rounded p-4">
        <h3>SELECT YOUR CHARACTER</h3>
        <div className="row m-0 p-0 justify-content-center flex-wrap">
          {players.map((player, idx) => {
            return (
              <img
                id={idx}
                className={`thumb-fighter m-0 ${
                  selectedP1 && selectedP2 ? null : selectedP1 === false ? "blink" : "blink2"
                }`}
                src={player.thumb}
                onMouseOver={() => handlePick(player)}
                onClick={() => togglePlayers(player)}
                onMouseOut={unSelect}
                alt=""
              />
            );
          })}
          <div className="bg-dark mt-4 p-2">
            <button
              className="chart-btn btn btn-outline-light"
              onClick={() => {
                setUtility({ ...utility, selectedP1: false, selectedP2: false });
                setPlayerOne("");
                setPlayerTwo("");
              }}
            >
              <h3>select</h3>
            </button>
            <button
              className={
                selectedP1 && selectedP2
                  ? "chart-btn btn btn-danger mx-3 blink"
                  : "chart-btn btn btn-outline-light mx-3"
              }
              onClick={handleWall}
            >
              <h3>fight</h3>
            </button>
            <Link to="/settings">
              <button className="chart-btn btn btn-outline-light" data-toggle="modal" data-target="#settings">
                <h3>settings</h3>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ width: "200px", height: "29px" }}>{playerTwo !== "" ? playerTwo.name.toUpperCase() : ""}</h4>
        <div
          className={`player-2 chart-size ${playerOne.name === playerTwo.name ? "set-color" : ""} ${
            selectedP2 ? "" : "darkly"
          } `}
        >
          <PlayerMapping action={selectedP2 ? "static" : "static"} player={playerTwo} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(PlayersChart);
