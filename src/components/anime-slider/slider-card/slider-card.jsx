import { Link } from "react-router-dom";
import { nFormatter } from "../../../utils";

function SliderCard({ anime }) {
  const title =
    anime.titles?.find((t) => t.type === "English")?.title ??
    anime.titles?.find((t) => t.type === "Default").title ?? "";
  return (
    <div className="scroll-card">
      <div className="scroll-card-body">
        <div className="scroll-card-image">
          <img src={`${anime.images.webp.large_image_url}`} alt={title} />
          <div className="scroll-card-image-back">
            <Link to={`/anime/${anime.mal_id}`} className="text-decoration-none text-white">
              <p className="text-break fw-bold fs-6">{title}</p>
              <span className="score">
                <b className="me-1">Score:</b> {anime.score}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star-fill ms-1 me-1 text-warning"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                ({nFormatter(anime.scored_by)})
              </span>
              <span>
                <b className="me-1">Rating:</b> {anime.rating?.split(" ")[0]}
              </span>
              <span>
                <b className="me-1">Episodes:</b> {anime.episodes ?? "-"}
              </span>
              <span>
                <b className="me-1">Season:</b> {anime.season}
              </span>
              <p className="synopsis text-truncate">{anime.synopsis}</p>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <Link to={`/anime/${anime.mal_id}`} className="scroll-card-title">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
