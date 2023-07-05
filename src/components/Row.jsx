// Required imports
import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import {MdChevronLeft , MdChevronRight} from "react-icons/md" 

// Component declaration
function Row({ title, fetchUrl,rowId }) {
  // State to hold the movies
  const [movies, setMovies] = useState([])

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch movies data from the provided URL
    axios.get(fetchUrl).then((response) => setMovies(response.data.results));
  }, [fetchUrl]);

  // Function to handle left scroll
  const leftClick = () =>{
    // Retrieve the element
    const movieRow = document.getElementById(rowId);
    // Change the scroll position
    movieRow.scrollLeft += 500
 }

  // Function to handle right scroll
  const rightClick = () =>{
    // Retrieve the element
    const movieRow = document.getElementById(rowId);
    // Change the scroll position
    movieRow.scrollLeft -= 500
 }

  // Rendered JSX
  return (
    <>
      {/* Display the title of the category  */}
      <h1 className="text-white font-bold md:text-xl p-4">{title}</h1>
      <div className="relative flex items-center group">
        {/* Left scroll button */}
        <MdChevronLeft onClick={leftClick} size={30} className=" md:h-12 md:w-12 bg-white rounded-full opacity-50 hover:opacity-100 absolute left-0 z-50 hidden group-hover:block"/>
        <div id={rowId} className="h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {/* Map through the movies array and render each movie */}
          {movies.map((item, id) => {
            // Skip movies without a backdrop image
            if(!item.backdrop_path){
                return null; 
            }
            // Render the Movie component for each movie
            return <Movie key={id} item={item} />;
            })}
        </div>
        {/* Right scroll button */}
        <MdChevronRight onClick={rightClick} size={30} className=" md:h-12 md:w-12 bg-white rounded-full opacity-50 hover:opacity-100 absolute right-0 z-50 hidden group-hover:block"/>
      </div>
    </>
  );
}

// Export the component
export default Row;
