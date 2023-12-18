import { Col, Container, Row } from "react-bootstrap";
import AnimeSlider from "../../components/anime-slider";
import { JikanClient } from "@tutkli/jikan-ts";
import { buildWebStorage } from "axios-cache-interceptor";

const jikanClient = new JikanClient({
  cacheOptions: { storage: buildWebStorage(localStorage, "axios-cache:") },
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

  return (
    <>
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <AnimeSlider
              title="Top Airing"
              apiCallback={topAiring}
            ></AnimeSlider>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <AnimeSlider
              title="Current Season"
              apiCallback={currentSeason}
            ></AnimeSlider>
          </Col>
        </Row>
      </Container>
      {/* 
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <AnimeSlider title="Recommended" items={[]}></AnimeSlider>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default Home;
