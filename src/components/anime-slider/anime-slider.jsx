import { ScrollMenu } from "react-horizontal-scrolling-menu";
import SliderCard from "./slider-card/slider-card";

import "./anime-slider.css";
import { useEffect, useState } from "react";

function AnimeSlider({ title, apiCallback }) {
  const [animes, setAnimes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiCallback()
      .then((res) => {
        setAnimes(res.data);
      })
      .catch((err) => setError(err));
  }, [apiCallback]);

  function render() {    
    if (error) return <p>Failed to retrive data from server</p>;

    if (!animes) return <p>Loading...</p>;
    
    if (animes.length > 0)
      return (
        <ScrollMenu Header={<h2>{title}</h2>}>
          {animes.map((anime) => (
            <SliderCard key={anime.mal_id} anime={anime} />
          ))}
        </ScrollMenu>
      );

    return <p>No Data</p>;
  }

  return <div>{render()}</div>;
}

export default AnimeSlider;
