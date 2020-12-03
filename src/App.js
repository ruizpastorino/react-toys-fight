import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectPlayers from "./pages/select-players";
import Settings from "./pages/settings";
import FightZone from "./pages/fight-zone";
import Home from "./pages/home";
import DataProvider from "./data-context";

class App extends Component {
  render() {
    return (
      <div className="p-5">
        <Router>
          <DataProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/players" component={SelectPlayers} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/fight" component={FightZone} />
            </Switch>
          </DataProvider>
        </Router>
      </div>
    );
  }
}

export default App;
