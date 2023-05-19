import React, { useContext } from "react";

import { logoutHandler } from "../utils";
import LoginContext from "../contexts/loginContext";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  const { username, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const logout = () => {
    logoutHandler();
    setIsLoggedIn(false);
    window.location.reload();
  };
  return (
    <Navbar bg="light" variant="light" style={{ padding: "10px" }}>
      <Container>
        <Nav.Link style={{ color: "black", fontSize: "20px" }} href="/">
          About
        </Nav.Link>
        <Nav className="me-auto" style={{ marginLeft: "79%" }}>
          {isLoggedIn ? (
            <Nav.Link
              style={{ color: "black", fontSize: "20px" }}
              onClick={logout}
            >
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link
              style={{ color: "black", fontSize: "20px" }}
              href="/login"
            >
              Login
            </Nav.Link>
          )}
        </Nav>
        {isLoggedIn ? (
          <Navbar.Text>Signed in as: {username}</Navbar.Text>
        ) : null}
      </Container>
    </Navbar>
  );
}
export default Header;
