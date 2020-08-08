import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactTooltip from "react-tooltip";

import "../App.css";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const spotifyWebApi = new Spotify();
const topics = require("../topics.json");

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: "",
      show: "",
      currentTime: 0,
      playing: false,
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
      let myCurrentTime = audio.currentTime;

      let percent = (audio.currentTime / 30) * 100 + "%";
      this.updateTimeline(percent);
      this.setState({
        currentTime: myCurrentTime,
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  generatePlayButtonContent() {
    if (this.state.playing) {
      return [<FontAwesomeIcon icon={faPauseCircle} />];
    } else {
      return [<FontAwesomeIcon icon={faPlayCircle} />];
    }
  }

  getThisEpisodesTopics() {
    var temp = [];
    topics.map((topic) => {
      if (
        topic.episodeId ===
        window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1
        )
      ) {
        temp.push(topic);
      }
    });

    return temp;
  }

  calculateProcentage(start, stop) {
    let duration = 30;
    return ((stop - start) / duration) * 100;
  }

  updateTimeline(percent) {
    let progress = document.querySelector(".timeline-progress");
    progress.style["width"] = percent;
  }

  updateTime(timestamp) {
    var player = document.getElementById("Player");
    player.currentTime = timestamp;
    timestamp = Math.floor(timestamp);
    let percent = (player.currentTime / 30) * 100 + "%";
    this.updateTimeline(percent);
    this.setState({
      currentTime: timestamp,
    });
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
    if (!this.state.episode) {
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

                <div className="col-lg-12">
                  <div className="timeline">
                    <ProgressBar className="progressBarContainer">
                      {this.getThisEpisodesTopics().map((topic) => {
                        return (
                          <ProgressBar
                            data-tip
                            data-for={topic.title}
                            className="topicTimelineSegment"
                            now={this.calculateProcentage(
                              topic.start,
                              topic.stop
                            )}
                            onClick={() => this.updateTime(topic.start)}
                          />
                        );
                      })}

                      {this.getThisEpisodesTopics().map((topic) => {
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
                  <div className="playerControls">
                    <a className="playBtn" onClick={() => this.togglePlay()}>
                      {this.generatePlayButtonContent()}
                    </a>
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

              {this.getThisEpisodesTopics().map((topic) => {
                return (
                  <ListGroup.Item
                    onClick={() => this.updateTime(topic.start)}
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
