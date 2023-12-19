import { JikanClient } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import "./anime-videos.css"

const jikanClient = new JikanClient({
  enableLogging: true,
});

function AnimeVideos() {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);
  const anime = useOutletContext();

  useEffect(() => {
    jikanClient.anime
      .getAnimeVideos(anime.mal_id)
      .then((res) => {
        setVideos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [anime.mal_id]);

  return error ? (
    <div className="d-flex justify-content-center align-items-center mt-5">
      Error occured, please try again later
    </div>
  ) : !videos ? (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="mt-3">
      <div>
        <h5>Music Videos</h5> <hr />
        {videos.music_videos.length === 0 ? (
          <p>No data</p>
        ) : (
          <div className="d-flex">
            {videos.music_videos.map((video) => {
              return (
                <div className="video-block" key={video.video.youtube_id}>
                  <img src={video.video.images.image_url} alt={video.title} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <h5>Trailers</h5> <hr />
        {videos.promo.length === 0 ? (
          <p>No data</p>
        ) : (
          <div className="d-flex gap-2 flex-wrap justify-content-between">
            {videos.promo.map((promo) => {
              return (
                <div className="video-block" key={promo.trailer.youtube_id}>
                  <a className="d-inline-block" href={promo.trailer.embed_url} target="_blank" rel="noreferrer">
                    <img src={promo.trailer.images.medium_image_url} alt={promo.title} />
                  </a>
                  <div className="video-block-title">{promo.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimeVideos;
