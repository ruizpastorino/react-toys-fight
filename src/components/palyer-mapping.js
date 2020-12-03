import React from "react";

const PlayerMapping = (props) => {
  const player = props.player;
  return (
    <div>
      <img
        className={`${props.action === "hited" && props.timerunning ? "shake" : null} w-100 h-100`}
        src={props.action === "hit" ? player.attack : props.action === "static" ? player.waiting : player.hited}
        alt=""
      />
    </div>
  );
};

export default PlayerMapping;
