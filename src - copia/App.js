import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectPlayers from "./pages/select-players";
import Settings from "./pages/settings"
import FightZone from "./pages/fight-zone";
import Home from "./pages/home";

class App extends Component {
  render() {
    return (
      <div className="container-fluid m-0 p-0 w-100">
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path="/players" component={SelectPlayers} />
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/fight" component={FightZone} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
