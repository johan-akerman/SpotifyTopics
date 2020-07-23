import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = { episode: "", user: "" };
  }

  componentDidMount() {
    spotifyWebApi.getEpisode("512ojhOuo1ktJprKbVcKyQ").then((response) => {
      console.log(response);
      this.setState({
        episode: response,
      });
    });

    spotifyWebApi.getMe().then((response) => {
      console.log(response);
      this.setState({
        user: response,
      });
    });
  }

  render() {
    return (
      <div className="episodesContainer">
        <h1>Welcome {this.state.user.display_name},</h1>
        <br />
        <br />

        <h2>Recommended episodes</h2>
        <div className="row">
          <div class="col-lg-2">
            <Link to="/episode">
              <div class="podcastEpisodeCard">
                <img
                  alt="thumbnail"
                  className="img img-fluid"
                  src="https://i.scdn.co/image/6bcff849a483dd3c2883b3f0272848b909f1bbce"
                />
                <h1>Skitsnack</h1>
                <p>Anis don Demina</p>
              </div>
            </Link>
          </div>
        </div>
        <br />
        <br />
        <br />

        {/* <h2>Trending topics</h2>
        <a>
          <span class="badge  badge-secondary badgeTopic">
            <h1>Introduction to marketing</h1>
            <p>Anis don Demina</p>
          </span>
        </a>

        <br />
        <br />
        <br />

        <h2>Topics you may find interesting</h2>
        <a>
          <span class="badge  badge-secondary badgeTopic">
            <h1>Introduction to marketing</h1>
            <p>Anis don Demina</p>
          </span>
        </a>
        <a>
          <span class="badge  badge-secondary badgeTopic">
            <h1>Traditional marketing</h1>
            <p>Anis don Demina</p>
          </span>
        </a> */}
      </div>
    );
  }
}

export default Discover;
