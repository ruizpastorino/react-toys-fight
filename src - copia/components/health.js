import React from "react";

const Health = (props) => {
  return (
    <div className={props.status === 'p2' ? 'd-flex flex-row-reverse' : 'd-flex'}>
      <div className={`health-thumb mx-4 ${props.player.health < 30 ? 'shake-once' :null}`}>
        <img className={`w-100 rounded border border-light ${props.status === 'p2' ? 'player-2' : null} `} src={props.player.data.img} alt="" />
      <p className="mt-2">WINS:{props.player.wins}</p>
      </div>
      <div>
        <div className="pt-4">
          <div className={props.status === 'p2' ? 'player-2' : null}>

          <div className={`health rounded  ${props.player.health < 30 ? 'shake-once' :''}` }>
            <div className={`energy ${props.player.health < 50 ? props.player.health < 30 ? 'bg-danger' : 'bg-warning' : ""}`} style={{width:props.player.health+'%'}}></div>
          </div>
          </div>
          <p
            className={props.status === 'p2' ? 'w-100 text-right' : 'w-100 text-left'}
            style={{ fontFamily: "mk4", fontSize: "20px" }}
          >
            {props.player.data.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Health;
