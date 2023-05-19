import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import bookmarkContext from "../contexts/bookmarkContext";
import Map from "../components/MapComponents";
import Verification from "../components/Verification";
function Bookmarks() {
  const { bookmarks } = useContext(bookmarkContext);
  return (
    <Verification>
      <>
      <div className="main-home">
          <TopBar />
          <div className="body-div">
          <h2 className="subheading">Bookmarks</h2>
          <div className="home-body">
            Find your best restraunts here!
          </div>
          </div>
          <div className="bookmarks">
          {bookmarks.map((bookmark) => {
            return <Map restrauntName={bookmark} isBookmarked />;
          })}
          </div>
      </div>
      </>
    </Verification>
  );
}
export default Bookmarks;
