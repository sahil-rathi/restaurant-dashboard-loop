import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Bookmarks from "./pages/BookmarksPage";
import { useState } from "react";
import LoginContext from "./contexts/loginContext";
import bookmarkContext from "./contexts/bookmarkContext";
import { getCookie } from "./utils";
import HomePageContext from "./contexts/homePageContext";
function App() {
  const [loggedinUsername, setLoggedInUsername] = useState<string | undefined>(
    JSON.parse(getCookie("cookie") || JSON.stringify(""))?.user || undefined
  );
  const [bookmarkedMaps, setBookmarkedMaps] = useState<string[]>(
    JSON.parse(getCookie("cookie") || JSON.stringify(""))?.bookmarks || []
  );
  const [homePage, setHomePage] = useState<string[]>(
    JSON.parse(getCookie("cookie") || JSON.stringify(""))?.homePageMaps || []
  );
  return (
    <div className="App">
      <LoginContext.Provider
        value={{
          isLoggedIn: loggedinUsername === undefined ? false : true,
          setIsLoggedIn: () => {},
          username: loggedinUsername,
          setUserName: setLoggedInUsername,
        }}
      >
        <bookmarkContext.Provider
          value={{ bookmarks: bookmarkedMaps, setBookmarks: setBookmarkedMaps }}
        >
          <HomePageContext.Provider
            value={{ homePageMaps: homePage, setHomePageMaps: setHomePage }}
          >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </Router>
          </HomePageContext.Provider>
        </bookmarkContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
