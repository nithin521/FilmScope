import React, { useState, useEffect } from "react";
import "./Slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [sliders, setSliders] = useState();

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
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setSliders(response.results.slice(0, 7)))
      .catch((err) => console.error(err));
  }, []);

  const next = () => {
    console.log(index);
    setIndex((index + 1) % sliders.length);
  };
  const prev = () => {
    if (index === 0) setIndex(sliders.length - 1);
    else setIndex((index - 1) % sliders.length);
  };
  console.log(index);
  return (
    <div className="slider">
      <FontAwesomeIcon
        icon={faArrowRight}
        className="right-icon"
        onClick={() => next()}
      />
      {sliders &&
        sliders.map((obj, i) => {
          console.log(obj);
          return (
            <div
              className={
                index === i ? "slide-wrapper active" : "slide-wrapper disable"
              }
            >
              <img
                key={i}
                src={"https://image.tmdb.org/t/p/original" + obj.backdrop_path}
                className="slider-img"
                alt="slider-img"
              />
              <h1 className="h1-pos">{obj.name}</h1>
              <h5 className="h5-pos">{obj.overview}</h5>
            </div>
          );
        })}
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="left-icon"
        onClick={() => prev()}
      />
    </div>
  );
};

export default Slider;
