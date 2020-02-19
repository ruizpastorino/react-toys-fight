import React, { Component } from "react";
import PlayerMapping from "../components/palyer-mapping";
import { Link } from "react-router-dom";
import DataDisplay from "../components/data-display";
import { withRouter } from "react-router-dom";
import toasty from "../media/img/toasty.png";
import PauseScreen from "../components/pause-screen";
import Wall from '../components/wall';

let _timeInterval;
let _roundInterval;

class FightZone extends Component {
  state = {
    settings: {
      rounds: 3,
      time: 20,
      handicap: 2,
      recovery: 1,
      speed: 3
    },
    players: [
      {
        data: {},
        health: 100,
        wins: 0
      },
      {
        data: {},
        health: 100,
        wins: 0
      }
    ],
    timeRunning: false,
    time: 20,
    round: 1,
    shift: 0,
    toggleRound: false,
    winner: false,
    toasty: false,
  };

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("players"));
    let players = this.state.players;
     if (data !== null) {
    players[0].data = data[0];
    players[1].data = data[1];
    } else {
    this.props.history.push("/players");
    }
    let settings = JSON.parse(localStorage.getItem("fightData"));
    if (settings === null) {
      settings = { rounds: 3, time: 20, handicap: 2, recovery: 1, speed: 3 };
    }
    this.setState({
      settings,
      time: settings.time,
      players: players
    });
  }

  handleSwitchTime = () => {
    let timeRunning = this.state.timeRunning;
    if (timeRunning) {
      timeRunning = false;
    } else {
      timeRunning = true;
    }
    this.setState({ timeRunning }, () => {
      this.handleFight();
    });
  };

  handleFight = () => {
    if (this.state.timeRunning === true) {
      this.timeDown();
      this.fightOn();
    } else {
      this.fightOff();
    }
  };

  fightOn = () => {
    _roundInterval = setInterval(() => {
      let toggleRound = this.state.toggleRound;

      if (toggleRound) {
        toggleRound = false;
        this.healthDown();
      } else if (
        this.state.players[0].health > 0 &&
        this.state.players[1].health > 0
      ) {
        let shift = Math.floor(Math.random() * 2);
        this.setState({ shift }, this.healthRecovery());
        toggleRound = true;
      }
      this.setState({ toggleRound });
    }, (1 / this.state.settings.speed) * 750);
  };
  fightOff = () => {
    clearInterval(_timeInterval);
    clearInterval(_roundInterval);
  };

  timeDown = () => {
    _timeInterval = setInterval(() => {
      if (this.state.time > 0 && this.state.winner === false) {
        let time = this.state.time - 1;
        this.setState({ time });
      }
      if (this.state.time <= 0) {
        this.fightOff();
        this.setState({
          toggleRound: false,
          winner: true
        });
      }
    }, 1000);
  };

  healthDown = () => {
    let shift = this.state.shift;
    let players = this.state.players;
    let hit = Math.floor(
      Math.random() * (2 + this.state.settings.handicap * 10) + 1
    );
    this.handleToasty(hit);
    let health = parseInt(players[shift].health) - hit;
    if (health < 0) {
      health = 0;
    }
    players[shift].health = health;
    this.setState({ players }, this.handleWinner());
  };
  healthRecovery = () => {
    let players = this.state.players;
    let shift = Math.floor(Math.random() * 2);
    let random = Math.floor(
      ((Math.random() * 1) / this.state.settings.recovery) * 10
    );
    if (random === 0) {
      if (players[shift].health < 100) {
        let extraLife = Math.floor(
          Math.random() * (5 + this.state.settings.handicap * 10)
        );
        players[shift].health = parseInt(players[shift].health) + extraLife;
        if (players[shift].health > 99) {
          players[shift].health = 99;
        }
        this.setState({
          players
        });
      }
    }
  };
  handleWinner = () => {
    if (
      this.state.players[0].health === 0 ||
      this.state.players[1].health === 0
    ) {
      let player = this.state.players;
      let winner;
      if (player[0].health > player[1].health) {
        winner = player[0];
      } else {
        winner = player[1];
      }
      winner.wins++;
      this.setState({
        wins: winner.wins
      });
      this.setState({
        winner: true
      });
    }
  };
  handleRounds = () => {
    let round = this.state.round;
    round++;
    this.setState({
      round
    });
  };
  rebirth = () => {
    let players = this.state.players;
    players[0].health = 100;
    players[1].health = 100;
    this.setState({
      players,
      timeRunning: false,
      time: this.state.settings.time,
      round: 0,
      shift: 0,
      toggleRound: false,
      winner: false,
      toasty: false
    });
  };
  nextRound =()=>{
    this.rebirth();
    this.handleRounds();
    this.fightOff();
  }
  reSelect = () => {
    this.props.history.push("/players");
  };
  handleToasty = hit => {
    if (hit > this.state.settings.handicap * 10) {
      this.setState({ toasty: true });
    }
  };
  render() {
    return (
      <div className="container pt-3">
        <Wall status={'up'}/>
        <DataDisplay
          players={this.state.players}
          time={this.state.time}
          round={this.state.round}
          runButton={
            this.state.winner
              ? this.state.round === this.state.settings.rounds
                ? this.reSelect
                : this.nextRound
              : this.handleSwitchTime
          }
          timeRunning={this.state.timeRunning}
        />

        <div className="row justify-content-center mt-3">
          <h2
            className={
              this.state.timeRunning &&
              this.state.time === this.state.settings.time
                ? "display-1 show-title game-font"
                : "hide-title"
            }
          >
            fight!
          </h2>

          {this.state.winner ? (
            <h2 className="display-2 text-shadow position-fixed">
              {this.state.players[0].health > this.state.players[1].health
                ? this.state.players[0].data.name.toUpperCase()
                : this.state.players[1].data.name.toUpperCase()}{" "}
              WINS
            </h2>
          ) : (
            ""
          )}

          {this.state.winner === true ? (
            this.state.players[0].health === 100 ||
            this.state.players[1].health === 100 ? (
              <h2 className="w-100 text-blink mt-5">flawless victory</h2>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {this.state.winner ? (
            <div className="exit-button">
              <Link to="/players">
                <h3 className="rounded p-3 settings-shadows">Select Again</h3>
              </Link>
            </div>
          ) : (
            ""
          )}
          <div
            className={
              this.state.shift === 1
                ? "show-player p1-zone on-top"
                : "show-player p1-zone below"
            }
          >
            <PlayerMapping
              action={
                this.state.toggleRound
                  ? this.state.shift === 0
                    ? "hited"
                    : "hit"
                  : "static"
              }
              selected={this.state.players[0].data}
            />
          </div>
          <div
            className={
              this.state.players[0].data.key === this.state.players[1].data.key
                ? "player-2 set-color p2-zone"
                : "player-2 p2-zone"
            }
          >
            <PlayerMapping
              action={
                this.state.toggleRound
                  ? this.state.shift === 1
                    ? "hited"
                    : "hit"
                  : "static"
              }
              selected={this.state.players[1].data}
            />
          </div>
        </div>
        {this.state.players[0].health === 100 &&
        this.state.players[1].health === 100 ? (
          ""
        ) : this.state.timeRunning === false ? (
          <div className="container col-4 p-2 bg-pause rounded">
            <PauseScreen resume={this.handleSwitchTime} restart={this.rebirth} />
          </div>
        ) : (
          ""
        )}
        <div className={`toasty ${this.state.toasty ? "show-toasty" : ""}`}>
          <img src={toasty} alt="" />
        </div>
      </div>
    );
  }
}

export default withRouter(FightZone);
