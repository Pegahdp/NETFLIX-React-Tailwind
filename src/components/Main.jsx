import axios from "axios";
import { useEffect, useState } from "react";
import requests from "../Requests";

function Main() {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await axios.get(requests.requestPopular);
    setMovies(response.data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  //console.log(movie);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };
  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r  from-black "></div>
        <img
          className="w-full h-[550px] object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute top-[20%] p-4 md:p-8 ">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white ml-4 border-gray-300 py-2 px-5">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Release: {movie?.release_date}
          </p>
          <p className="w-full text-gray-400 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
