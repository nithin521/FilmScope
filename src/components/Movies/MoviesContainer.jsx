import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider.jsx";
import Movies from "./Movies.jsx";

const MoviesContainer = () => {
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ3YjFjYzg1YjY1Y2Q5ZjhiNGM4MzQ2NWQxOTc5ZSIsInN1YiI6IjY2NzA0MWM1OTljMWIyYWUyY2VjMjAzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZgJbQGIq1FPgurKusCCLF5-JlnrohZqon5AOce-iCUs",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }, [page]);
  return (
    <div className="movies-container">
      <Slider />
      <Movies movies={movies} />
    </div>
  );
};

export default MoviesContainer;
