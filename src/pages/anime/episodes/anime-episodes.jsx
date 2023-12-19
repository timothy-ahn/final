import { JikanClient } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const jikanClient = new JikanClient({
  enableLogging: true,
});

function AnimeEpisodes() {
  const [episodes, setEpisodes] = useState(null);
  const [error, setError] = useState(null);
  const anime = useOutletContext();

  const episodeRows = episodes?.sort((a, b) => a.mal_id < b.mal_id).map(episode => {
    return (
      <tr key={episode.mal_id}>
        <td className="text-center">{episode.mal_id}</td>
        <td>{episode.title}</td>
        <td className="text-center">{new Date(episode.aired).toDateString()}</td>
      </tr>
    )
  });

  useEffect(() => {
    async function fetchAsync() {
      try {
        const response = await jikanClient.anime.getAnimeEpisodes(anime.mal_id);
        setEpisodes(response.data);        
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }

    fetchAsync();
  }, [anime.mal_id]);

  return error ? (
    <div className="d-flex justify-content-center align-items-center mt-5">
      Error occured, please try again later
    </div>
  ) : !episodes ? (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr className="text-center">
          <th>#</th>
          <th>Episode Title</th>
          <th>Aired</th>
        </tr>
      </thead>
      <tbody>
        {episodeRows}
      </tbody>
    </Table>
  );
}

export default AnimeEpisodes;
