import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Row({ title, fetchURL, rowID }) {
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    const response = await axios.get(fetchURL);
    setMovies(response.data.results);
  };

  useEffect(() => {
    getMovie();
  }, [fetchURL]);

  //console.log(movies);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      <h1 className="text-white font-bold p-4 md:text-xl">{title}</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={30}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-30 hidden group-hover:block left-0"
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((movie) => (
            <Movie movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={30}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-100 hidden group-hover:block  right-0"
        />
      </div>
    </>
  );
}

export default Row;
