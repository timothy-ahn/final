import { ScrollMenu } from "react-horizontal-scrolling-menu";
import SliderCard from "./slider-card/slider-card";

import "./anime-slider.css";
import React from "react";

class AnimeSlider extends React.Component {
  state = {
    animes: null,
    error: null,
  };

  intervalId = null;

  componentDidMount() {
    this.runCallback();
    this.intervalId = setInterval(() => console.log("interval happend"), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.apiCallback !== this.props.apiCallback) {
      this.runCallback();
    }
  }

  componentDidCatch() {
    console.log("Error happend in component AnimeSlider");
  }

  componentWillUnmount() {
    console.log(this.intervalId);
    clearInterval(this.intervalId);
  }

  runCallback() {
    this.props
      .apiCallback()
      .then((res) => {
        this.setState({
          animes: res.data,
          error: null,
        });
      })
      .catch((err) =>
        this.setState({
          animes: null,
          error: err,
        })
      );
  }

  getElements() {
    if (this.state.error) return <p>Failed to retrive data from server</p>;
    if (!this.state.animes) return <p>Loading...</p>;
    if (this.state.animes.length > 0)
      return (
        <ScrollMenu>
          {this.state.animes.map((anime) => (
            <SliderCard key={anime.mal_id} anime={anime} />
          ))}
        </ScrollMenu>
      );

    return <p>No Data</p>;
  }

  render() {
    return (
      <>
        <h2>{this.props.title}</h2>
        <div>{this.getElements()}</div>
      </>
    );
  }
}

export default AnimeSlider;
