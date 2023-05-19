import React, { useContext } from "react";
import LoginContext from "../contexts/loginContext";
type VerificationProps = {
  children: React.ReactNode;
};
function Verification(props: VerificationProps) {
  const { isLoggedIn } = useContext(LoginContext);
  return <div>{isLoggedIn ? props.children : null}</div>;
}
export default Verification;
