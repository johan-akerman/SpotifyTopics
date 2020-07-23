import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import "../App.css";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
const spotifyWebApi = new Spotify();

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: "",
      show: "",
    };
  }

  togglePlay() {
    var player = document.getElementById("Player");
    return player.paused ? player.play() : player.pause();
  }

  forwardAudioToTimeStamp(time) {
    var player = document.getElementById("Player");
    player.currentTime = time;
    player.play();
  }

  componentDidMount() {
    var player = document.getElementById("Player");
    spotifyWebApi.getEpisode("512ojhOuo1ktJprKbVcKyQ").then((response) => {
      console.log(response);
      this.setState({
        episode: response,
        show: response.show,
      });
    });
  }

  showTime() {
    return <div>{this.state.currentTime}</div>;
  }

  render() {
    if (!this.state.show.images) {
      return <span></span>;
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col col-lg-9 episodeDescriptionContainer">
            <div className="episodeDescriptionInnerContainer">
              <Link className="backBtn" to="/discover">
                ← Back to discover
              </Link>
              {this.showTime()}
              <div className="row episodeHeaderRow">
                <div class="col-lg-3">
                  <img
                    className="episode-thumbnail"
                    src={this.state.episode.images[0].url}
                    alt="episode thumbnail"
                  />
                </div>

                <div className="col-lg-9 episodeHeader">
                  <div className="episodeFragment">
                    <h3 className="episodeType">Podcast</h3>
                    <h1 className="episodeTitle"> {this.state.episode.name}</h1>
                    <h2 className="episodePublisher">{this.state.show.name}</h2>
                  </div>
                </div>
              </div>

              <div className="episodePlayer">
                <audio id="Player">
                  <source
                    src={this.state.episode.audio_preview_url}
                    type="audio/mpeg"
                  ></source>
                </audio>

                <button className="playBtn" onClick={() => this.togglePlay()}>
                  Play / Pause
                </button>
                <button
                  className="openInSpotifyBtn"
                  onClick={() =>
                    (window.location.href = this.state.episode.uri)
                  }
                >
                  Open in Spotify
                </button>
              </div>

              <div className="episodeDescriptionContainer">
                <h2 className="episodeDescriptionTitle">Episode description</h2>
                <p className="episodeDescriptionText">
                  {this.state.episode.description}
                </p>
              </div>
            </div>
          </div>

          <div className="col col-lg-3 episodeTopicsContainer">
            <ListGroup variant="flush">
              <ListGroup.Item className="listGroupItemHeader">
                Episode topics
              </ListGroup.Item>

              <ListGroup.Item onClick={() => this.forwardAudioToTimeStamp(0)}>
                <span className="listGroupItemTitle">
                  Introduction to marketing
                </span>
                <span className="listGroupItemTime">0:00 - 0:13</span>
              </ListGroup.Item>

              <ListGroup.Item
                className="activeListGroup"
                onClick={() => this.forwardAudioToTimeStamp(13)}
              >
                <span className="listGroupItemTitle">
                  Traditional marketing
                </span>
                <span className="listGroupItemTime">0:13 - 0:20</span>
              </ListGroup.Item>

              <ListGroup.Item onClick={() => this.forwardAudioToTimeStamp(20)}>
                <span className="listGroupItemTitle">Email marketing</span>
                <span className="listGroupItemTime">0:20 - 0:30</span>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Episode;
