import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Component } from "react";

class Home extends Component {
  

  render() {
    return (
      <div style={{ width: "100vh" }} className="container mt-5">
        <h1 className="start-title display-4 mt-5 text-warning p-0">Toys </h1>
      <h1 className="start-title mortal-title text-warning display-2 p-0">
      mortal
      </h1>
    <h1 className="fitght-title display-xl p-0">FIGHT</h1>
          <Link to='/players'>
          <h3>START</h3>
          </Link>


        <Link to="/settings">
          <h3>settings</h3>
        </Link>

        <div className="footer mt-5 text-dark">
          <p>copyright © 2020 - developed by Agustin Ruiz Pastorino</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
