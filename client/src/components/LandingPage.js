import React, { Component } from "react";

class LandingPage extends Component {
  checkAuthentication() {
    if (this.props.auth) {
      window.history.pushState({}, "", "/discover");
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h1>Spotify Topics</h1>
          Find interesting podcasts
          <br /> <br />
          <a href="http://localhost:8888/login">
            <button>Log in with Spotify</button>
          </a>
        </div>
      );
    }
  }

  render() {
    return <div>{this.checkAuthentication()}</div>;
  }
}

export default LandingPage;
