import React, { useContext } from "react";
import "./SideBar.css";
import { ThemeContext } from "../../ContextApi/Context";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { genres, themeChanger } = useContext(ThemeContext);
  console.log(genres);

  return (
    <div className={themeChanger ? "sideBar light" : "sideBar dark"}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1>MADARA</h1>
      </Link>
      {genres &&
        genres.map((obj, i) => {
          return <h3>{obj.name}</h3>;
        })}
    </div>
  );
};

export default SideBar;
