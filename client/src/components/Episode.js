import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "../App.css";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const spotifyWebApi = new Spotify();

const topics = [
  { title: "Intro", start: 0, stop: 7, key: 1 },
  { title: "Middle", start: 7, stop: 16, key: 2 },
  { title: "End", start: 16, stop: 30, key: 3 },
];

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: "",
      show: "",
      currentTime: 0,
      playing: false,
      FontAwesomeIcon: "faPlayCircle",
    };
  }

  componentDidMount() {
    var episodeId = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    spotifyWebApi.getEpisode(episodeId).then((response) => {
      this.setState({
        episode: response,
        show: response.show,
      });
    });
  }

  generatePlayButtonContent() {
    if (this.state.playing) {
      return [
        <FontAwesomeIcon icon={faPauseCircle} />,
        <span className="playBtnText">Paus</span>,
      ];
    } else {
      return [
        <FontAwesomeIcon icon={faPlayCircle} />,
        <span className="playBtnText">Play</span>,
      ];
    }
  }

  calculateProcentage(start, stop) {
    let duration = 30;
    return ((stop - start) / duration) * 100;
  }

  updateTime(timestamp) {
    timestamp = Math.floor(timestamp);
    this.setState({
      currentTime: timestamp,
    });
  }

  updateTimeline(percent) {
    let progress = document.querySelector(".timeline-progress");
    progress.style["width"] = percent;
  }

  //second version
  togglePlay() {
    let status = this.state.playing;
    let audio = document.getElementById("Player");

    //if not currently playing
    if (!status) {
      status = true;
      audio.play();
      let that = this;

      setInterval(function () {
        let currentTime = audio.currentTime;
        let duration = 30; //all audio-clips are previews of 30s from the podcast.
        let percent = (currentTime / duration) * 100 + "%";
        that.updateTimeline(percent);
        that.updateTime(currentTime);
      }, 100);
    } else if (status) {
      audio.pause();
      status = false;
    }
    this.setState({ playing: status });
  }

  forwardAudioToTimeStamp(time) {
    var player = document.getElementById("Player");
    player.currentTime = time;
    let percent = (player.currentTime / 30) * 100 + "%";
    this.updateTimeline(percent);
    this.updateTime(time);
  }

  render() {
    var player = document.getElementById("Player");
    console.log(topics);
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

              <div className="row episodePlayerContainer">
                <audio id="Player">
                  <source
                    src={this.state.episode.audio_preview_url}
                    type="audio/mpeg"
                  ></source>
                </audio>

                <div class="col-lg-3">
                  <button className="playBtn" onClick={() => this.togglePlay()}>
                    {this.generatePlayButtonContent()}
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

                <div className="col-lg-9">
                  <div className="timeline">
                    <ProgressBar className="progressBarContainer">
                      {topics.map((topic) => {
                        return (
                          <ProgressBar
                            data-toggle="tooltip"
                            data-placement="top"
                            title="tooltip"
                            className="topicTimelineSegment"
                            now={this.calculateProcentage(
                              topic.start,
                              topic.stop
                            )}
                            onClick={() =>
                              this.forwardAudioToTimeStamp(topic.start)
                            }
                          />
                        );
                      })}
                    </ProgressBar>
                    <div className="timeline-progress"></div>
                  </div>
                </div>
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
