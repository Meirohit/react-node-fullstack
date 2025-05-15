import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router";

function Header() {

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          {/* Brand/Logo */}
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            Q&A App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
                Home
              </Nav.Link>
              {/* You can add more links here, e.g., About, Profile, etc. */}
            </Nav>
            {/* Optional: Add user info, logout, etc. */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}

export default Header;
