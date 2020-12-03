//////////////////////////////////////////////////////thumbs
import batmanThumb from "../media/img/batman-profile.jpg";
import jokerThumb from "../media/img/joker-profile.jpg";
import thanosThumb from "../media/img/thanos-profile.jpg";
import hellboyThumb from "../media/img/hellboy-profile.jpg";
import supermanThumb from "../media/img/superman-profile.jpg";
import venomThumb from "../media/img/venom-profile.jpg";
import homerThumb from "../media/img/hulk-profile.jpg";
////////////////////////////////static
import batman from "../media/img/batman-static.png";
import joker from "../media/img/joker-static.png";
import thanos from "../media/img/thanos-static.png";
import hellboy from "../media/img/hellboy-static.png";
import superman from "../media/img/superman-static.png";
import venom from "../media/img/venom-static.png";
import homer from "../media/img/homer-static.png";
////////////////////////////////////////////////////////////// attack
import batmanP from "../media/img/batman-punch.png";
import jokerP from "../media/img/joker-punch.png";
import thanosP from "../media/img/thanos-punch.png";
import hellboyP from "../media/img/hellboy-punch.png";
import supermanP from "../media/img/superman-punch.png";
import venomP from "../media/img/venom-punch.png";
import homerP from "../media/img/homer-punch.png";
////////////////////////////////////////////////////////////// hited
import batmanH from "../media/img/batman-hited.png";
import jokerH from "../media/img/joker-hited.png";
import thanosH from "../media/img/thanos-hited.png";
import hellboyH from "../media/img/hellboy-hited.png";
import supermanH from "../media/img/superman-hited.png";
import venomH from "../media/img/venom-hited.png";
import homerH from "../media/img/homer-hited.png";

let playersName = ["batman", "joker", "thanos", "hellboy", "superman", "venom", "hulk"];
let waiting = [batman, joker, thanos, hellboy, superman, venom, homer];
let attack = [batmanP, jokerP, thanosP, hellboyP, supermanP, venomP, homerP];
let hited = [batmanH, jokerH, thanosH, hellboyH, supermanH, venomH, homerH];
let thumb = [batmanThumb, jokerThumb, thanosThumb, hellboyThumb, supermanThumb, venomThumb, homerThumb];

const createPlayers = () => {
  let playersData = playersName.map((name, idx) => {
    const newPlayer = {
      name,
      waiting: waiting[idx],
      attack: attack[idx],
      hited: hited[idx],
      thumb: thumb[idx],
      victories:0
    };
    return newPlayer;
  });
  return playersData;
};

export default createPlayers;
