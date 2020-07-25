import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Discover from "./components/Discover";
import Episode from "./components/Episode";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: "",
    };
  }

  componentDidMount() {
    spotifyApi.getMe().then((response) => {
      this.setState({
        user: response,
      });
    });
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  checkAuth() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login" />;
    } else {
      return <Redirect to="/discover" />;
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header auth={this.state.loggedIn} user={this.state.user} />
          {this.checkAuth()}
          <Switch>
            <Route
              auth={this.state.loggedIn}
              path="/login"
              exact
              component={LandingPage}
            />

            <Route
              auth={this.state.loggedIn}
              path="/discover"
              exact
              component={Discover}
            />
            <Route path="/discover/:id" exact component={Episode} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
