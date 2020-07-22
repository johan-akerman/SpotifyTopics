import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Spotify from "spotify-web-api-js";
import Header from "./components/Header";
import Episodes from "./components/Episodes";
import Episode from "./components/Episode";
const spotifyWebApi = new Spotify(); //needs to be initialized since it is a class.

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {};

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  showSignIn() {
    if (!this.state.loggedIn) {
      return (
        <a href="http://localhost:8888/login">
          <button>Log in with Spotify</button>
        </a>
      );
    } else {
      return <div>Logged in</div>;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Router>
          <div>
            <Switch>
              <Route path="/episodes">
                <Episodes />
              </Route>

              <Route path="/episode">
                <Episode />
              </Route>
              <Route path="/">
                {this.showSignIn()}

                <Link to="/episodes">Episodes</Link>
                <Link to="/episode">Episode</Link>
              </Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
