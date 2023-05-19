import React, { useContext, useEffect, useRef, useState } from "react";
import InputField from "../components/SearchBar";
import TopBar from "../components/TopBar";
import Map from "../components/MapComponents";
import Verification from "../components/Verification";
import { restrauntsList, setCookie, getCookie } from "../utils";
import LoginContext from "../contexts/loginContext";
import bookmarkContext from "../contexts/bookmarkContext";
import HomePageContext from "../contexts/homePageContext";

function Home() {
  const [restraunts, setRestraunts] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { username, isLoggedIn } = useContext(LoginContext);
  const { bookmarks } = useContext(bookmarkContext);
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const [homePageMaps, setHomePageMaps] = useState<string[]>(
    JSON.parse(getCookie("cookie") || JSON.stringify(""))?.homePageMaps
  );
  
  const addRestrauntHandler = async () => {
    const query = searchBarRef.current?.value;
    const updatedHomePageMaps = [...homePageMaps, query!];
    setCookie(
      "cookie",
      JSON.stringify({
        user: username,
        homePageMaps: updatedHomePageMaps,
        bookmarks: bookmarks,
      })
    );
    setHomePageMaps(updatedHomePageMaps);
  };
  const generateAutoComplete = async () => {
    const query = searchBarRef.current?.value;
    const suggestions = restraunts.filter((restraunt) =>
      restraunt.startsWith(query!)
    );
    setSuggestions(suggestions);
  };

  const setInputField = (e: any) => {
    if (searchBarRef && searchBarRef.current && e.target.innerText)
      searchBarRef.current.value = e.target.innerText;
    setSuggestions([]);
  };

  useEffect(() => {
    const getRestraunts = async () => {
      const restraunts = await restrauntsList();
      setRestraunts(
        restraunts.map(
          (restraunt: { fields: { Name: any } }) => restraunt.fields?.Name
        )
      );
    };
    getRestraunts();
  }, []);

  return (
    <>
      <div className="main-home" >
        <TopBar />
        <div className="flex-div">
          <HomePageContext.Provider value={{ homePageMaps, setHomePageMaps }}>
            {!isLoggedIn ? (
              <div>
                <div className="heading-div">
                  <h1 className="heading"> Restaurent</h1>
                  <h1 className="heading"> Finder</h1>
                </div>
                <div className="home-body-signout">
                  The one stop destination for all your food cravings.
                </div>
              </div>
            ) : null}

            <Verification>
              <h2 className="heading">Restaurant Finder</h2>
              <div className="home-body-signout">
                Search for your favourite restraunts and add them to your bucket
                list.
              </div>
              <br></br>
              <InputField
                
                placeholder="Search restraunts"
                ref={searchBarRef}
                onChange={generateAutoComplete}
                buttonText="Add"
                buttonOnClick={addRestrauntHandler}
              />

              {searchBarRef.current?.value && 
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginRight:"115px"}}>
                
                {suggestions.map((suggestion) => {
                  return (
                    <li
                      className="list-suggestions"
                      style={{

                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        width: "260px",
                      }}
                      onClick={setInputField}
                      >
                      {suggestion}
                    </li>
                  );
                })}
                
                </div>
                }
              <br></br>
              <div>
              {homePageMaps.map((restraunt) => {
                return <Map restrauntName={restraunt}  />;
              })}
              </div>
            </Verification>
          </HomePageContext.Provider>
        </div>
      </div>
    </>
  );
}
export default Home;
