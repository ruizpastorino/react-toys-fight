import React, {Component} from "react";
import PlayersChart from "../components/players-chart";

class SelectPlayers extends Component {

  render() {
    return (
      <div className="">
        <h1>TOYS MORTAL FIGHT</h1>
        <div className="players-chart">
          <PlayersChart />
        </div>
      </div>
    );
  }
}

export default SelectPlayers;
