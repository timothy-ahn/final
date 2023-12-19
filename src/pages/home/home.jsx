import { Col, Container, Row } from "react-bootstrap";
import AnimeSlider from "../../components/anime-slider";
import { JikanClient } from "@tutkli/jikan-ts";

const jikanClient = new JikanClient({
  enableLogging: true,
});

function Home() {
  function topAiring() {
    return jikanClient.anime.getAnimeSearch({
      sfw: true,
      status: "airing",
      sort: "desc",
      order_by: "score",
      type: "tv",
      limit: 5,
    });
  }

  function currentSeason() {
    return jikanClient.seasons.getSeasonNow({ limit: 5 });
  }

  function recommended() {
    return jikanClient.top.getTopAnime({ sfw: true, type: "tv", filter: "favorite", limit: 5 })
  }

  return (
    <>
      <Container>
        <Row>
          <Col xxl={12}>
            <AnimeSlider title="Top Airing" apiCallback={topAiring} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <AnimeSlider title="Current Season" apiCallback={currentSeason}/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <AnimeSlider title="Users Most Favorite" apiCallback={recommended}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
