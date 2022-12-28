import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

function SavedShows() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((movie) => movie.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <h1 className="text-white font-bold p-4 md:text-xl">My Shows</h1>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={slideLeft}
            size={30}
            className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-30 hidden group-hover:block left-0"
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            {movies.map((movie, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative cursor-pointer p-2"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                  alt={movie.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {movie?.title}
                  </p>
                  <p
                    onClick={() => deleteShow(movie.id)}
                    className="absolute top-4 right-4 text-gray-300 font-bold"
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            onClick={slideRight}
            size={30}
            className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-100 hidden group-hover:block  right-0"
          />
        </div>
      </>
    </div>
  );
}

export default SavedShows;
