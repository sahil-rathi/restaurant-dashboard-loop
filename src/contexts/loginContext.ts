import React from "react";

interface LoginContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  username: string | undefined;
  setUserName: (value: string | undefined) => void;
}

const LoginContext = React.createContext<LoginContextInterface>({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  username: undefined,
  setUserName: (value: string | undefined) => {},
});
export default LoginContext;
