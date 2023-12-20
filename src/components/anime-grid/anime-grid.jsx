import { Col, Container, Row } from "react-bootstrap";
import SliderCard from "../anime-slider/slider-card/slider-card";

function AnimeGrid({ animes }) {
  return (
    <Container>
      <Row>
        <Col>
          <div className="mt-3 d-flex flex-wrap gap-3 justify-content-md-between justify-content-center">
            {animes.map((anime) => {
              return <SliderCard key={anime.mal_id} anime={anime} />;
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AnimeGrid;
