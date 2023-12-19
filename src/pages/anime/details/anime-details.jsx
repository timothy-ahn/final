import { useOutletContext } from "react-router-dom";

function AnimeDetails() {
  const anime = useOutletContext();

  return (
    <div className="mt-3">
      <h6>Synopsis</h6> <hr />
      <p>{anime.synopsis}</p>

      <h6>Background</h6> <hr />
      <p>{anime.background}</p>
    </div>
  );
}

export default AnimeDetails;
