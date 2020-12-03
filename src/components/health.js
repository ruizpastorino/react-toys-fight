import React from "react";

const Health = (props) => {
  const { health, data, wins } = props.player;
  return (
    <div className={`d-flex ${props.status === "p2" ? "flex-row-reverse" : ""}`}>
      <div className={`health-thumb mx-4 ${health < 30 ? "shake-once" : ""}`}>
        <img
          className={`w-100 rounded border border-light ${props.status === "p2" ? "player-2" : ""} `}
          src={data.thumb}
          alt=""
        />
        <p className="mt-2">WINS:{wins}</p>
      </div>
      <div className="flex-1">
        <div className={props.status === "p2" ? "player-2" : ""}>
          <div className={`health ${health < 30 ? "shake-once" : ""}`}>
            <div
              className={`energy ${health < 50 ? (health < 30 ? "bg-danger" : "bg-warning") : ""}`}
              style={{ width: health + "%" }}
            />
            <div className="gradient"/>
          </div>
        </div>
        <p
          className={props.status === "p2" ? "w-100 text-right" : "w-100 text-left"}
          style={{ fontFamily: "mk4", fontSize: "20px" }}
        >
          {data.name}
        </p>
      </div>
    </div>
  );
};

export default Health;
