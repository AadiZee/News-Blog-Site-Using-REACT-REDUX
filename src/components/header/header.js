import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar className="yellotail">
        <LinkContainer to="/">
          <Navbar.Brand>The Daily News</Navbar.Brand>
        </LinkContainer>
      </Navbar>
      <Nav>
        <Nav.Item></Nav.Item>
      </Nav>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <LinkContainer to="/" exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/contact">
            <Nav.Link eventKey="link-1">Contact</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {/* <Nav.Item>
          <LinkContainer to="/link">
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </LinkContainer>
        </Nav.Item> */}
      </Nav>
    </>
  );
};

export default Header;
