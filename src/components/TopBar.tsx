import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import LoginContext from "../contexts/loginContext";
import { logoutHandler } from "../utils";
import Verification from "./Verification";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { username, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigateTo = useNavigate();
  const logout = () => {
    logoutHandler();
    setIsLoggedIn(false);
    navigateTo("/");
    window.location.reload();
  };
  return (
    <div className="topbar-div">
        <Verification>
        <Navbar.Text style={{ color: "#dddddd", fontSize: "20px" }}>
          Welcome , {username}
        </Navbar.Text>
      </Verification>
      <div >
        <Nav
          className="me-auto"
          style={{
            display: "flex",
            justifyContent: "center ",
          }}
        >
          {isLoggedIn ? (
            <Nav.Link
              onClick={logout}
            >
              <div className="sidebar-link">Logout</div>
            </Nav.Link>
          ) : (
            <Nav.Link
              
              href="/login"
            >
              <div className="sidebar-link">Login</div>
            </Nav.Link>
          )}
        </Nav>
      </div >
      <Nav.Link href="/" >
        <div className="sidebar-link">Home</div>
      </Nav.Link>
      <Verification>
        <Nav.Link href="/bookmarks">
          <div className="sidebar-link">My Bookmarks</div>
        </Nav.Link>
      </Verification>
      </div>
  );
}
export default Topbar;
