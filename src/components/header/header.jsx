import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (search.length > 0) {      
      navigate(`/search?q=${search}`);      
      setSearch("");
    }
  }

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="bg-body-tertiary"
      data-bs-theme="dark"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#">MyAnimeList</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link>Browse</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/seasons">
              <Nav.Link>Seasons</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/random">
              <Nav.Link>Random</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search">
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
