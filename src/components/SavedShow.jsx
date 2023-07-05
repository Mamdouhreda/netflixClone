// SavedShows.jsx

import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    const movieCollection = collection(db, 'users', `${user?.email}`, 'likedMovies');
    const unsubscribe = onSnapshot(movieCollection, (snapshot) => {
      let movies = [];
      snapshot.forEach((doc) => {
        movies.push({ ...doc.data(), docId: doc.id });
      });
      setMovies(movies);
    });
    return () => unsubscribe();
  }, [user?.email]);

  const deleteShow = async (docId) => {
    try {
      const docToDelete = doc(db, 'users', `${user?.email}`, 'likedMovies', docId);
      await deleteDoc(docToDelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {movies.map((item) => (
            <div key={item.id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
              <img className='w-full h-auto block' src={item.picture} alt={item.name} />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item.name}</p>
                <p onClick={() => deleteShow(item.docId)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;
