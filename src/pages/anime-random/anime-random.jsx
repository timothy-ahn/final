import { JikanClient } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import { nFormatter } from "../../utils";
import { Col, Container, Nav, Row, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

import "../anime/anime.css"

const jikanClient = new JikanClient({
  enableLogging: true,
});

function AnimeRandom() {
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(null);
  const title =
    anime?.titles.find((t) => t.type === "English")?.title ??
    anime?.titles.find((t) => t.type === "Default").title;
  const secondTitle = anime?.titles.find((t) => t.type === "Default").title;

  useEffect(() => {
    jikanClient.anime.api
      .get("https://api.jikan.moe/v4/random/anime")
      .then((res) => {
        console.log(res.data.data);
        setAnime(res.data.data);
        console.log(anime);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {error ? (
        <div className="d-flex justify-content-center align-items-center">
          Error occured, please try again later
        </div>
      ) : !anime ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          <Col md={12}>
            <div className="title-block">
              <h1 className="fs-4">{title}</h1>
              <h2 className="fs-5">{secondTitle}</h2>
            </div>
          </Col>
          <Col md={3}>
            <div className="poster">
              {anime && (
                <img src={`${anime.images.webp.large_image_url}`} alt={title} />
              )}
            </div>
            <div className="info-col">
              <div className="info-block">
                <h6>Alternative Titles</h6>
                <hr className="m-0" />
                {anime.titles.map((title, i) => {
                  return (
                    <p className="m-0" key={i}>
                      <span className="key">{title.type}: </span>
                      <span className="value">{title.title}</span>
                    </p>
                  );
                })}
              </div>
              <div className="info-block">
                <h6>Information</h6>
                <hr className="m-0" />
                <p className="m-0">
                  <span className="key">Type: </span>
                  <span className="value">{anime.type}</span>
                </p>
                <p className="m-0">
                  <span className="key">Episodes: </span>
                  <span className="value">{anime.episodes}</span>
                </p>
                <p className="m-0">
                  <span className="key">Status: </span>
                  <span className="value">{anime.status}</span>
                </p>
                <p className="m-0">
                  <span className="key">Producers: </span>
                  <span className="value">
                    {anime.producers.map((p) => p.name).join(", ")}
                  </span>
                </p>
                <p className="m-0">
                  <span className="key">Licensors: </span>
                  <span className="value">
                    {anime.licensors.map((p) => p.name).join(", ")}
                  </span>
                </p>
                <p className="m-0">
                  <span className="key">Strudios: </span>
                  <span className="value">
                    {anime.studios.map((p) => p.name).join(", ")}
                  </span>
                </p>
                <p className="m-0">
                  <span className="key">Source: </span>
                  <span className="value">{anime.source}</span>
                </p>
                <p className="m-0">
                  <span className="key">Genres: </span>
                  <span className="value">
                    {anime.genres.map((g) => g.name).join(", ")}
                  </span>
                </p>
                <p className="m-0">
                  <span className="key">Duration: </span>
                  <span className="value">{anime.duration}</span>
                </p>
                <p className="m-0">
                  <span className="key">Rating: </span>
                  <span className="value">{anime.rating}</span>
                </p>
              </div>
              <div className="info-block">
                <h6>Statistics</h6>
                <hr className="m-0" />
                <p className="m-0">
                  <span className="key">Score: </span>
                  <span className="value">
                    {anime.score} ({nFormatter(anime.scored_by)})
                  </span>
                </p>
                <p className="m-0">
                  <span className="key">Ranked: </span>
                  <span className="value">{anime.rank}</span>
                </p>
                <p className="m-0">
                  <span className="key">Popularity: </span>
                  <span className="value">{anime.popularity}</span>
                </p>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Nav fill variant="tabs" className="mt-2">
              <Nav.Item>
                <LinkContainer to="/random">
                  <Nav.Link>Details</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to={`episodes`}>
                  <Nav.Link>Episodes</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to={`videos`}>
                  <Nav.Link>Videos</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
            <Outlet context={anime} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default AnimeRandom;
