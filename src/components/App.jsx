import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Actors,
  MovieInformation,
  Profile,
  NavBar,
  SideBar,
  MoviesContainer,
} from "./index";
import "./App.css";
import { ThemeContext } from "../ContextApi/Context";
const App = () => {
  const themeContextValue = {
    Action: "/action-movie.png",
    Adventure: "/adventure.png",
    Animation: "/anime.png",
    Comedy: "/cinema.png",
    Crime: "/crime.png",
    Dokumentarfilm: "/documentary.png",
    Drama: "/genre.png",
    Family: "/family.png",
    Historie: "/history.png",
    Horror: "/horror.png",
    Musik: "/music.png",
    Mystery: "/mystery.png",
    Liebesfilm: "/romantic.png",
    "Science Fiction": "/science.png",
    "TV-Film": "/television-film.png",
    Thriller: "/thriller.png",
    Fantasy: "/magical.png",
    Western: "/western.png",
    War: "/sword.png",
  };
  const [themeChanger, setThemeChanger] = useState(false);
  const [genres, setGenres] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ3YjFjYzg1YjY1Y2Q5ZjhiNGM4MzQ2NWQxOTc5ZSIsInN1YiI6IjY2NzA0MWM1OTljMWIyYWUyY2VjMjAzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZgJbQGIq1FPgurKusCCLF5-JlnrohZqon5AOce-iCUs",
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err));
  }, []);
  return (
    <ThemeContext.Provider
      value={{ themeContextValue, themeChanger, setThemeChanger, genres }}
    >
      <div className={themeChanger ? "app light" : "app dark"}>
        <div className="sideBar-left">
          <SideBar />
        </div>
        <div className="staticSideBar">
          <NavBar />
          <main>
            <Routes>
              <Route exact path="/" element={<MoviesContainer />} />
              <Route path="/movie/:id" element={<MovieInformation />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/actors/:id" element={<Actors />} />
              <Route path="/genre/:id" element={<Actors />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
