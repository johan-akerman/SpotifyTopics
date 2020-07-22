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
    };
  }

  generateClasses(startTime, endTime) {
    if (
      this.state.currentTime < endTime &&
      this.state.currentTime > startTime
    ) {
      return "activeListGroup";
    } else {
      return "";
    }
  }

  forwardAudioToTimeStamp(time) {
    var player = document.getElementById("Player");
    player.currentTime = time;
  }

  componentDidMount() {
    spotifyWebApi.getEpisode("512ojhOuo1ktJprKbVcKyQ").then((response) => {
      console.log(response);
      this.setState({
        episode: response,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          <div className="row">
            <div className="col col-lg-8 episodeDescriptionContainer">
              <div className="episodeDescriptionInnerContainer">
                <Link className="backBtn" to="/">
                  ← Back to episodes
                </Link>
                <div className="row episodeHeaderRow">
                  <div class="col-lg-3">
                    <img
                      className="episode-thumbnail"
                      src="https://i.scdn.co/image/6bcff849a483dd3c2883b3f0272848b909f1bbce"
                      alt="episode thumbnail"
                    />
                  </div>

                  <div className="col-lg-9 episodeHeader">
                    <div className="episodeFragment">
                      <h3 className="episodeType">Podcast</h3>
                      <h1 className="episodeTitle">
                        {" "}
                        {this.state.episode.name}
                      </h1>
                      <h2 className="episodePublisher">Showname</h2>
                    </div>
                  </div>
                </div>

                <div className="episodePlayer">
                  <audio controls id="Player">
                    <source
                      src="https://p.scdn.co/mp3-preview/566fcc94708f39bcddc09e4ce84a8e5db8f07d4d"
                      type="audio/mpeg"
                    ></source>
                    Your browser does not support the audio element.
                  </audio>

                  {/* <button onClick={spotifyWebApi.pause}>Paus</button>
                  <button
                    onClick={() =>
                      spotifyWebApi.play({
                        context_uri: "spotify:episode:4d237GqKH4NP1jtgwy6bP3",
                        position_ms: 0,
                      })
                    }
                  >
                    Play
                  </button>
                  <button onClick={() => spotifyWebApi.seek(1000)}>Seek</button> */}
                </div>

                <div className="episodeDescriptionContainer">
                  <h2 className="episodeDescriptionTitle">
                    Episode description
                  </h2>
                  <p className="episodeDescriptionText">
                    {this.state.episode.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="col col-lg-4 episodeTopicsContainer">
              <ListGroup variant="flush">
                <ListGroup.Item className="listGroupItemHeader">
                  Episode topics
                </ListGroup.Item>

                <ListGroup.Item
                  className={this.generateClasses(0, 1)}
                  onClick={() => this.forwardAudioToTimeStamp(0)}
                >
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

                <ListGroup.Item
                  onClick={() => this.forwardAudioToTimeStamp(20)}
                >
                  <span className="listGroupItemTitle">Email marketing</span>
                  <span className="listGroupItemTime">0:20 - 0:30</span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Episode;
