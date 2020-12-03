import React from "react";
import Health from "./health";

const DataDisplay = props => {
  return (
    <div className="show-display row justify-content-between align-items-center">
      <Health player={props.players[0]} status={"p1"} />

      <div className="time">
        <button
          className={`btn m-0 px-1 ${
            props.players[0].health === 0 || props.players[1].health === 0
              ? "shake-once"
              : null
          }`}
          onClick={props.runButton}
        >
          <span
            className="font-weight-bold game-font"
            style={{ fontFamily: "mk1" }}
          >
            {props.timeRunning
              ? props.players[0].health === 0 || props.players[1].health === 0 || props.time === 0
                ? "RETRY!"
                : "PAUSE"
              : "START!"}
          </span>
        </button>
        <h2
          className={
            props.time > 10 ? "game-font mb-0" : "game-font mb-0 text-out"
          }
        >
          {props.time}
        </h2>
        <p
          className={
            props.timeRunning && props.time === 20
              ? "m-0 show-round"
              : props.time === 20
              ? "m-0 hide-title"
              : "m-0"
          }
        >
          round {props.round}
        </p>
      </div>
      <div>
        <Health player={props.players[1]} status={"p2"} />
      </div>
    </div>
  );
};

export default DataDisplay;
