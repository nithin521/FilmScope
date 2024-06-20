import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { ThemeContext } from "../../ContextApi/Context";

const NavBar = () => {
  const { themeChanger, setThemeChanger } = useContext(ThemeContext);
  const handleThemeChange = () => {
    setThemeChanger(!themeChanger);
  };
  return (
    <div className="navBar">
      <FontAwesomeIcon
        icon={faSun}
        className={
          themeChanger ? "themeChanger dark-text" : "themeChanger light-text"
        }
        onClick={handleThemeChange}
      />
      <input type="text" placeholder="Enter a Movie..." className="nav-input" />
      <div className="login">Login</div>
    </div>
  );
};

export default NavBar;

// import handleLogin from "../Actors/Actors";

// const handleClick = () => {
//   let username = "abc";
//   let password = "abc";
//   //calling function handleClick from my backend
//   let success = handleLogin(username, password);
//   if (success === true) console.log("authorized");
//   else console.log("user not found in db");
// };

// //backend handle login defination

// function handleLogin(username, password) {
//   db.query(
//     `select * from login where username=${username} and password=${password}`,
//     (err, data) => {
//       if (data) return true;
//       else return false;
//     }
//   );
// }
