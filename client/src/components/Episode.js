import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactTooltip from "react-tooltip";

import "../App.css";
import Spotify from "spotify-web-api-js";
import { Link, Redirect } from "react-router-dom";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const spotifyWebApi = new Spotify();

const topics = [
  { title: "Topic #1", start: 0, stop: 7, key: 1 },
  { title: "Topic #2", start: 7, stop: 16, key: 2 },
  { title: "Topic #3", start: 16, stop: 30, key: 3 },
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

    this.inter = setInterval(() => {
      let audio = document.getElementById("Player");
      let currentTime = audio.currentTime;
      let duration = 30; //all audio-clips are previews of 30s from the podcast.
      let percent = (currentTime / duration) * 100 + "%";
      this.updateTimeline(percent);
      this.updateTime(currentTime);
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.inter);
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

  togglePlay() {
    let status = this.state.playing;
    let audio = document.getElementById("Player");

    //if not currently playing
    if (!status) {
      status = true;
      audio.play();
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

  generateTimeStampNumbers(start, stop) {
    let startValue;
    let stopValue;
    if (start < 10) {
      startValue = `0:0${start}`;
    }
    if (start > 9) {
      startValue = `0:${start}`;
    }
    if (stop < 10) {
      stopValue = `0:0${stop}`;
    }
    if (stop > 9) {
      stopValue = `0:${stop}`;
    }

    return `${startValue} - ${stopValue} `;
  }

  checkTopicListClass(start, stop) {
    if (
      this.state.currentTime < stop - 0.5 &&
      this.state.currentTime > start - 0.5
    ) {
      return "activeTopicList";
    }
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

              <div className="row episodeHeaderRow">
                <div className="col-lg-3">
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

                <div className="col-lg-3">
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
                            data-tip
                            data-for={topic.title}
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

                      {topics.map((topic) => {
                        return (
                          <ReactTooltip
                            id={topic.title}
                            place="bottom"
                            type="light"
                            effect="solid"
                          >
                            <h1 className="tooltipTitle">{topic.title}</h1>
                            <p className="tooltipDescription">
                              {this.generateTimeStampNumbers(
                                topic.start,
                                topic.stop
                              )}
                            </p>
                          </ReactTooltip>
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

              {topics.map((topic) => {
                return (
                  <ListGroup.Item
                    onClick={() => this.forwardAudioToTimeStamp(topic.start)}
                    className={this.checkTopicListClass(
                      topic.start,
                      topic.stop
                    )}
                  >
                    <span className="listGroupItemTitle">{topic.title}</span>
                    <span className="listGroupItemTime">
                      {this.generateTimeStampNumbers(topic.start, topic.stop)}
                    </span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Episode;
