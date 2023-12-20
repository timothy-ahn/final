import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Seasons() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Seasons</h2>
        </Col>
        <Col md={12}>
          <div className="d-flex gap-2">
            <LinkContainer to="/seasons/winter">
              <Button variant="secondary" size="lg">
                Winter
              </Button>
            </LinkContainer>
            <LinkContainer to="/seasons/spring">
              <Button variant="secondary" size="lg">
                Spring
              </Button>
            </LinkContainer>
            <LinkContainer to="/seasons/summer">
              <Button variant="secondary" size="lg">
                Summer
              </Button>
            </LinkContainer>
            <LinkContainer to="/seasons/fall">
              <Button variant="secondary" size="lg">
                Fall
              </Button>
            </LinkContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Seasons;
