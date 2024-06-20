import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../ContextApi/Context";
import "./MovieInformation.css";
import Movies from "../Movies/Movies";

const MovieInformation = () => {
  const { themeContextValue, themeChanger } = useContext(ThemeContext);
  const { id } = useParams();
  const [data, setData] = useState();
  const [smovies, setSMovies] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ3YjFjYzg1YjY1Y2Q5ZjhiNGM4MzQ2NWQxOTc5ZSIsInN1YiI6IjY2NzA0MWM1OTljMWIyYWUyY2VjMjAzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZgJbQGIq1FPgurKusCCLF5-JlnrohZqon5AOce-iCUs",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSMovies(response.results))
      .catch((err) => console.error(err));
  }, [id]);

  return !loading ? (
    <div className="movie-info">
      <div className="main">
        <img
          src={"https://image.tmdb.org/t/p/original/" + data?.poster_path}
          className="movie-img"
          alt=""
        />
        <h1>{data?.title}</h1>
      </div>
      <div className="overview">
        <h2>Overview : </h2>
        <h3 className="overview-h3">{data?.overview}</h3>
        <div className="ratings-container">
          <div className="genre-container">
            {data?.genres.map((obj, i) => {
              return (
                <div className="movie-genres" key={i}>
                  <img
                    src={themeContextValue[obj.name]}
                    alt=""
                    className="genre-img"
                  />
                  <h4>{obj.name}</h4>
                </div>
              );
            })}
          </div>
          <div className="movie-ratings">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                style={{
                  color:
                    i < data?.vote_average - 1
                      ? "gold"
                      : themeChanger
                      ? "grey"
                      : "white",
                }}
                className="stars"
              >
                &#9733;
              </span>
            ))}
            <span style={{ fontWeight: 900 }}>
              &nbsp;{parseInt(data?.vote_average)}
            </span>
            <span className="vote-count">
              &nbsp;{parseInt(data?.vote_count)}
            </span>
          </div>
        </div>
        <div className="movie-finance">
          <div>
            <h4>Production Name</h4>
            <span>{data?.production_companies[0].name}</span>
          </div>
          <div>
            <h4>Release Date</h4>
            <span>{data?.release_date}</span>
          </div>
          <div>
            <h4>Budget</h4>
            <span>${data?.budget}</span>
          </div>
          <div>
            <h4>Revenue</h4>
            <span>${data?.revenue}</span>
          </div>
          <div>
            <h4>RunTime</h4>
            <span>${data?.runtime} Min</span>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ textAlign: "center", marginTop: 50 }}>
          You Might Also Like
        </h2>
        {smovies && <Movies movies={smovies} />}
      </div>
    </div>
  ) : (
    <div className="loading-container">
      <img src="/loading.gif" />
    </div>
  );
};

export default MovieInformation;
