import { Col, Container, Row } from "react-bootstrap";
import ScrollList from "../../components/scroll-list";
import { useState } from "react";

function Home() {
  const [items, setItems] = useState([
    { id: 1, title: "Undead Unluck" },
    { id: 2, title: "Rising of the shield hero" },
    { id: 3, title: "My Hero Academy" },
    { id: 4, title: "My Hero Academy" },
    { id: 5, title: "My Hero Academy" },
    { id: 6, title: "My Hero Academy" },
    { id: 7, title: "My Hero Academy" },
    { id: 8, title: "My Hero Academy" },
    { id: 9, title: "My Hero Academy" },
    { id: 10, title: "My Hero Academy" },
    { id: 11, title: "My Hero Academy" },
    { id: 12, title: "My Hero Academy" },
    { id: 13, title: "My Hero Academy" },
    { id: 14, title: "My Hero Academy" },
    { id: 15, title: "My Hero Academy" },
    { id: 16, title: "My Hero Academy" },
    { id: 17, title: "My Hero Academy" },
    { id: 18, title: "My Hero Academy" },
  ]);

  return (
    <>
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <ScrollList title="Airing Today" items={items}></ScrollList>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <ScrollList title="Current Season" items={items}></ScrollList>
          </Col>
        </Row>
      </Container>
      <Container>
      <Row>
        <Col xxl={12} className="mt-4">
          <ScrollList title="Most Popular" items={items}></ScrollList>
        </Col>
      </Row>
    </Container>
        <Container>
        <Row>
          <Col xxl={12} className="mt-4">
            <ScrollList title="Recommended" items={items}></ScrollList>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
