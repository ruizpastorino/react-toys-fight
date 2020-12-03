import React, { Component } from "react";
import PlayerMapping from "./palyer-mapping";
import batman from "../media/img/batman-profile.jpg";
import joker from "../media/img/joker-profile.jpg";
import thanos from "../media/img/thanos-profile.jpg";
import hellboy from "../media/img/hellboy-profile.jpg";
import superman from "../media/img/superman-profile.jpg";
import venom from "../media/img/venom-profile.jpg";
import hulk from "../media/img/hulk-profile.jpg";
import { Link, withRouter } from "react-router-dom";
import Wall from "./wall";

/////////////////////////////////////////////////////////////

class PlayersChart extends Component {
  state = {
    wallState: false,
    time: "",
    selectedP1: false,
    selectedP2: false,
    players: [
      { key: 0, name: "batman", img: batman },
      { key: 1, name: "joker", img: joker },
      { key: 2, name: "thanos", img: thanos },
      { key: 3, name: "hellboy", img: hellboy },
      { key: 4, name: "superman", img: superman },
      { key: 5, name: "venom", img: venom },
      { key: 6, name: "hulk", img: hulk }
    ],
    playerOne: "",
    playerTwo: ""
  };

  handlePick = e => {
    let p1 = this.state.selectedP1;
    let p2 = this.state.selectedP2;
    if (p1 === false)
      this.setState({
        playerOne: this.state.players[e.target.id]
      });
    if (p2 === false && p1 === true) {
      this.setState({
        playerTwo: this.state.players[e.target.id]
      });
    }
  };

  togglePlayers = () => {
    let p1 = this.state.selectedP1;
    let p2 = this.state.selectedP2;
    if (p1 === false) {
      this.setState({
        selectedP1: true,
        playerTwo: this.state.playerOne
      });
    }
    if (p1 === true && p2 === false) {
      this.setState({
        selectedP2: true
      });
    }
  };

  unSelect = () => {
    if (this.state.selectedP1 === false) {
      this.setState({ playerOne: "" });
    }
    if (this.state.selectedP2 === false) {
      this.setState({ playerTwo: "" });
    }
  };

  handlePlayers = () => {
    let st = this.state;
    if (st.selectedP1 && st.selectedP2) {
      let players = [st.playerOne, st.playerTwo];
      localStorage.setItem("players", JSON.stringify(players));
    }
  };

  handleWall = () => {
    this.handlePlayers();
    setTimeout(this.timer, 1000);
    this.setState({ wallState: true });
  };

  timer = () => {
    let time = this.state.time;
    time++;
    this.setState({
      time
    });
    if (this.state.time > 0.65) {
      this.props.history.push("/fight");
    }
  };

  render() {
    return (
      <div className="row justify-content-center col-12">
        {this.state.wallState ? <Wall status="down" /> : ""}
        <div className="">
          <h4 style={{ width: "200px", height: "29px" }}>
            {this.state.playerOne !== ""
              ? this.state.playerOne.name.toUpperCase()
              : ""}
          </h4>
          <div
            className={`player-1 chart-size ${
              this.state.selectedP1 ? "" : "darkly"
            }`}
          >
            <PlayerMapping
              action={this.state.selectedP1 ? "static" : "static"}
              selected={this.state.playerOne}
            />
          </div>
        </div>
        <div
          style={{ width: "600px", zIndex: 1 }}
          className="chart-bg container mt-1 rounded p-4"
        >
          <h3>SELECT YOUR CHARACTER</h3>
          <div className="row m-0 p-0 justify-content-center flex-wrap">
            {this.state.players.map((item, idx) => {
              return (
                  <img
                    id={idx}
                    className={`thumb-fighter m-0 ${
                      this.state.selectedP1 && this.state.selectedP2
                        ? null
                        : this.state.selectedP1 === false
                        ? "blink"
                        : "blink2"
                    }`}
                    src={item.img}
                    onMouseOver={this.handlePick}
                    onClick={this.togglePlayers}
                    onMouseOut={this.unSelect}
                    alt=""
                  />
              );
            })}
            <div className="bg-dark mt-4 p-2">
              <button
                className="chart-btn btn btn-outline-light"
                onClick={() => {
                  this.setState({
                    selectedP1: false,
                    selectedP2: false,
                    playerOne: "",
                    playerTwo: ""
                  });
                }}
              >
                <h3>select</h3>
              </button>
              <button
                className={
                  this.state.selectedP1 && this.state.selectedP2
                    ? "chart-btn btn btn-danger mx-3 blink"
                    : "chart-btn btn btn-outline-light mx-3"
                }
                onClick={this.handleWall}
              >
                <h3>fight</h3>
              </button>
              <Link to="/settings">
                <button
                  className="chart-btn btn btn-outline-light"
                  data-toggle="modal"
                  data-target="#settings"
                >
                  <h3>settings</h3>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h4 style={{ width: "200px", height: "29px" }}>
            {this.state.playerTwo !== ""
              ? this.state.playerTwo.name.toUpperCase()
              : ""}
          </h4>
          <div
            className={`player-2 chart-size ${
              this.state.playerOne.key === this.state.playerTwo.key
                ? "set-color"
                : ""
            } ${this.state.selectedP2 ? "" : "darkly"} `}
          >
            <PlayerMapping
              action={this.state.selectedP2 ? "static" : "static"}
              selected={this.state.playerTwo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PlayersChart);
