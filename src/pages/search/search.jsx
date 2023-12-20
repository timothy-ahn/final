import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import AnimeGrid from "../../components/anime-grid";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { JikanClient } from "@tutkli/jikan-ts";

const jikanClient = new JikanClient({
  enableLogging: true,
});

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [animes, setAnimes] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams((prevParams) => {
      prevParams.set("q", new FormData(e.target).get("search"));
      return prevParams;
    });
  }

  function loadMore() {
    setLoading(true);
    jikanClient.anime
      .getAnimeSearch({
        q: searchParams.get("q"),
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

  useEffect(() => {
    setPage(1);
    jikanClient.anime
      .getAnimeSearch({
        q: searchParams.get("q"),
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
  }, [searchParams]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                name="search"
                id="search"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                defaultValue={() => searchParams.get("q")}
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
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

export default Search;
