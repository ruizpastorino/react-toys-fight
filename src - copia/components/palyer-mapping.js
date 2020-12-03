import React from "react";
////////////////////////////////static
import batman from "../media/img/batman-static.png";
import joker from "../media/img/joker-static.png";
import thanos from "../media/img/thanos-static.png";
import hellboy from "../media/img/hellboy-static.png";
import superman from "../media/img/superman-static.png";
import venom from "../media/img/venom-static.png";
import homer from "../media/img/homer-static.png";
//////////////////////////////////////////////////////////////
import batmanP from "../media/img/batman-punch.png";
import jokerP from "../media/img/joker-punch.png";
import thanosP from "../media/img/thanos-punch.png";
import hellboyP from "../media/img/hellboy-punch.png";
import supermanP from "../media/img/superman-punch.png";
import venomP from "../media/img/venom-punch.png";
import homerP from "../media/img/homer-punch.png";
//////////////////////////////////////////////////////////////
import batmanH from "../media/img/batman-hited.png";
import jokerH from "../media/img/joker-hited.png";
import thanosH from "../media/img/thanos-hited.png";
import hellboyH from "../media/img/hellboy-hited.png";
import supermanH from "../media/img/superman-hited.png";
import venomH from "../media/img/venom-hited.png";
import homerH from "../media/img/homer-hited.png";

let players = [batman, joker, thanos, hellboy, superman, venom, homer];
let hit = [batmanP, jokerP, thanosP, hellboyP, supermanP, venomP, homerP];
let hited = [batmanH, jokerH, thanosH,hellboyH, supermanH, venomH, homerH];

const PlayerMapping = props => {
  return (
    <div className="">
      <img
        className={props.action === "hited" ? "shake w-100" : "w-100"}
        src={
          props.action === "hit"
            ? hit[props.selected.key]
            : props.action === "static"
            ? players[props.selected.key]
            : hited[props.selected.key]
        }
        alt=""
      />
    </div>
  );
};

export default PlayerMapping;
