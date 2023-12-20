import { AnimeSeason, JikanClient } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AnimeGrid from "../../components/anime-grid";

const jikanClient = new JikanClient({
  enableLogging: true,
});

function Season() {
  const params = useParams();
  const [error, setError] = useState(null);
  const [animes, setAnimes] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  function loadMore() {
    setLoading(true);
    jikanClient.seasons
      .getSeason(new Date().getFullYear(), getSeason(), {
        sfw: true,
        page: page + 1,
        limit: 10,
      })
      .then((res) => {
        console.log(res.data);
        setAnimes((prevState) => {
          console.log([...prevState, ...res.data]);
          return [...prevState, ...res.data];
        });
        setHasMore(res.pagination.has_next_page);
        setPage(res.pagination.current_page);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getSeason() {
    let strSeason = params.season;
    if (strSeason === "winter") return AnimeSeason.winter;
    if (strSeason === "fall") return AnimeSeason.fall;
    if (strSeason === "summer") return AnimeSeason.summer;
    return AnimeSeason.spring;
  }

  useEffect(() => {
    setPage(1);
    jikanClient.seasons
      .getSeason(new Date().getFullYear(), getSeason(), {
        sfw: true,
        page: 1,
        limit: 10,
      })
      .then((res) => {
        setAnimes(res.data);
        setHasMore(res.pagination.has_next_page);
        setPage(res.pagination.current_page);
      })
      .catch((err) => {
        setError(err);
      });
  }, [params.season]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Season: {params.season}</h1>
          </Col>
        </Row>
      </Container>
      {error ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          Error occured, please try again later
        </div>
      ) : !animes ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <AnimeGrid animes={animes}></AnimeGrid>
      )}
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <Button
                size="xxl"
                onClick={loadMore}
                disabled={loading}
                style={{ visibility: hasMore ? "visible" : "hidden" }}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span>Load More</span>
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Season;
