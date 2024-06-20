import React, { useContext, useEffect, useState } from "react";
import "./Movies.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ContextApi/Context";

const Movies = ({ movies }) => {
  const { themeChanger } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleMovie = (data) => {
    navigate(`/movie/${data.id}`);
  };
  return (
    <div className="movies">
      {movies &&
        movies.map((data, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.238, type: "spring" }}
              key={i}
              className="movies-box"
              style={
                themeChanger
                  ? { boxShadow: "0px 1px 25px rgba(0, 0, 0,0.8)" }
                  : { boxShadow: "" }
              }
              onClick={() => handleMovie(data)}
            >
              <img
                src={"https://image.tmdb.org/t/p/original" + data.poster_path}
                alt="No-Image"
                className="movies-img"
              />
            </motion.div>
          );
        })}
    </div>
  );
};

export default Movies;
