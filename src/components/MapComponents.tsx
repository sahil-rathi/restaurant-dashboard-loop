import React, { useContext} from "react";
import bookmarkContext from "../contexts/bookmarkContext";
import { setCookie } from "../utils";
import LoginContext from "../contexts/loginContext";
import HomePageContext from "../contexts/homePageContext";

type MapProps = {
  restrauntName: string;
  isBookmarked?: boolean;
};

function Map(props: MapProps) {
  const { bookmarks, setBookmarks } = useContext(bookmarkContext);
  const { username } = useContext(LoginContext);
  const { homePageMaps, setHomePageMaps } = useContext(HomePageContext);

  const bookmarkHandler = () => {
    const updatedBookmarks = [...bookmarks, props.restrauntName];
    setBookmarks(updatedBookmarks);

    const updatedHomePageMaps = homePageMaps.filter(
      (restaurant) => restaurant !== props.restrauntName
    );
    setHomePageMaps(updatedHomePageMaps);

    setCookie(
      "cookie",
      JSON.stringify({
        user: username,
        bookmarks: updatedBookmarks,
        homePageMaps: updatedHomePageMaps,
      })
    );
  };
  const removeFromBookmarks = () => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark !== props.restrauntName
    );
    setBookmarks(updatedBookmarks);
    setCookie(
      "cookie",
      JSON.stringify({
        user: username,
        bookmarks: updatedBookmarks,
        homePageMaps,
      })
    );
  };

  const removeRestraunt = () => {
    const updatedHomePageMaps = homePageMaps.filter(
      (restaurant) => restaurant !== props.restrauntName
    );
    setHomePageMaps(updatedHomePageMaps);

    setCookie(
      "cookie",
      JSON.stringify({
        user: username,
        bookmarks,
        homePageMaps: updatedHomePageMaps,
      })
    );
  };

  return (
    <div>
      <iframe
        title={props.restrauntName}
        width="400"
        height="400"
        src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${props.restrauntName}%22%7D`}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="map-heading">{props.restrauntName}</div>
        <div style={{ display: "flex" }}>
          {!props.isBookmarked && (
            <button className="lgn-btn" onClick={bookmarkHandler}>
              Bookmark
            </button>
          )}
          {props.isBookmarked ? (
            <button className="lgn-btn" onClick={removeFromBookmarks}>
              Remove from Bookmarks
            </button>
          ) : (
            <button className="lgn-btn" onClick={removeRestraunt}>
              Remove
            </button>
          )}
        </div>
      </span>
    </div>
  );
}
export default Map;
