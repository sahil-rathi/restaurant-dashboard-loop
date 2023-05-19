import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHandler, setCookie } from "../utils";
import InputField from "../components/SearchBar";
import LoginContext from "../contexts/loginContext";
import TopBar from "../components/TopBar";
import bookmarkContext from "../contexts/bookmarkContext";
import HomePageContext from "../contexts/homePageContext";

function Login() {
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const { bookmarks } = useContext(bookmarkContext);
  const { homePageMaps } = useContext(HomePageContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigateTo = useNavigate();
  const { setUserName } = useContext(LoginContext);
  const login = async (e: any) => {
    e.preventDefault();
    const data = await loginHandler(
      userNameRef.current?.value,
      passwordRef.current?.value
    );
    if (data.message) {
      setErrorMessage(data.message);
      return;
    }
    console.log(document.cookie);
    setUserName(data?.fields?.username);
    setCookie(
      "cookie",
      JSON.stringify({
        user: data.fields.username,
        bookmarks: bookmarks,
        homePageMaps: homePageMaps,
      })
    );
    navigateTo("/");
  };
  return (
    <div style={{ backgroundColor: "#333333", height: "100vh" }}>
      <TopBar />
      <div className="home-div">
        <div className="body-content" style={{ marginTop: "100px" }}>
          <h1 className="subheading">Login</h1>
          <br></br>
          <br></br>
          <InputField
            className="input-field"
            id="username"
            placeholder="Username"
            ref={userNameRef}
          />
          <br></br>
          <InputField
            className="input-field"
            id="password"
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />

          <br></br>
          <button className="lgn-btn" onClick={login}>
            Login
          </button>
          <p className="error-msg">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
