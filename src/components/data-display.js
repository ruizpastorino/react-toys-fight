import React from "react";
import Health from "./health";

const DataDisplay = (props) => {
  const { players, time, round, timeRunning } = props.data;
  const { handleStartButton, reload } = props.actions;

  const fightStatus = players[0].health === 0 || players[1].health === 0 || time === 0 ? false : true;
  return (
    <div className="show-display d-flex align-items-center w-100">
      <div className="flex-1">
        <Health player={players[0]} status={"p1"} />
      </div>

      <div className="mx-4">
        <button
          style={{ fontFamily: "mk1" }}
          className={`btn m-0 px-1 font-weight-bold game-font text-warning ${
            players[0].health === 0 || players[1].health === 0 ? "shake-once" : null
          }`}
          onClick={fightStatus ? handleStartButton : reload}
        >
          {timeRunning ? (fightStatus ? "PAUSE" : "RETRY!") : "START!"}
        </button>
        <h2 className={`game-font mb-0 ${time < 10 && "text-out"}`}>{time}</h2>
        <p style={{ opacity: fightStatus ? 1 : 0 }} className="m-0">
          round {round}
        </p>
      </div>
      <div className="flex-1">
        <Health player={players[1]} status={"p2"} />
      </div>
    </div>
  );
};

export default DataDisplay;
