import React, { Component } from "react";
import Option from "../components/option";
import { withRouter } from "react-router-dom";

class Settings extends Component {
  state = {
    rounds: 3,
    time: 20,
    handicap: 2,
    recovery: 1,
    speed: 3,
    options: ["rounds", "time", "handicap", "recovery", "speed"],
    minValue: [1, 10, 1, 1, 1],
    maxValue: [7, 99, 10, 7, 5]
  };
  componentDidMount() {
    let stored = JSON.parse(localStorage.getItem("fightData"));
    console.log(stored);
    if (stored !== null) {
      let { rounds, time, handicap, recovery, speed } = stored;
      this.setState({
        rounds,
        time,
        handicap,
        recovery,
        speed
      });
    }
  }
  set = (x, flow, idx) => {
    let currentValue = this.state[x];
    if (flow === "up") {
      if (currentValue < this.state.maxValue[idx]) currentValue++;
    } else {
      if (currentValue > this.state.minValue[idx]) currentValue--;
    }
    this.setState({
      [x]: currentValue
    });
  };
  apply = () => {
    let { rounds, time, handicap, recovery, speed } = this.state;
    let data = {
      rounds,
      time,
      handicap,
      recovery,
      speed
    };
    localStorage.setItem("fightData", JSON.stringify(data));
    this.props.history.push("/players");
  };
  render() {
    return (
      <div>
        <h1 className="mt-5 text-blink">FIGHT SETTINGS</h1>
        <div className="container rounded p-4 col-7 chart-bg">
          {this.state.options.map((item, idx) => {
            return (
              <Option
                key={idx}
                idx={idx}
                min={this.state.minValue[idx]}
                max={this.state.maxValue[idx]}
                set={this.set}
                option={item}
                value={this.state[item]}
              />
            );
          })}

          <div className="w-100 bg-dark text-center py-3 mt-2 mb-0">
            <button className="btn mx-5 p-0" onClick={this.apply}>
              <h3 className="settings-shadows">DONE!</h3>
            </button>
            <button
              className="btn mx-5 p-0"
              onClick={() => {
                this.setState({
                  rounds: 3,
                  time: 20,
                  handicap: 2,
                  recovery: 1,
                  speed: 3,
                });
              }}
            >
              <h3 className="settings-shadows">RESTORE</h3>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Settings);
