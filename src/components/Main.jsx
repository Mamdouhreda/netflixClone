import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Request";

function Main() {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => setMovies(response.data.results))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //console.log(movie);
  const truncateString =(str,num)=>{
    if(str.length > num){
        return str.slice(0, num) + '....';
    }else{
        return str
    }
  }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
      </div>
      <div className=" absolute top-[30%] p-3 md:p-7">
        <h1 className=" font-bold text-3xl py-2">{movie?.title}</h1>
        <div>
          <button className="border border-gray-300 bg-white text-black py-2 px-5 ">
            Play
          </button>
          <button className="border border-gray-300 py-2 px-5 ml-4">
            Watch Later
          </button>
        </div>
        <p className=" pt-3 text-gray-500 text-sm">{movie?.release_date}</p>
        <p className="w-full md:max-w-[70%] xl:max-w-[50%] 2xl:max-w-[30%] text-gray-300">
            {movies.length > 0 && truncateString(movie?.overview, 150)}
        </p>
      </div>
    </div>
  );
}

export default Main;
