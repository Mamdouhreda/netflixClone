import React, { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { db } from '../firebase';  // path to your firebase initialization file
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function Movie({ item }) {
    const [like, setLike] = useState(false);
    const { user } = useAuth();
    const userDoc = doc(db, 'users', `${user?.email}`);
    const likedMoviesCollection = collection(userDoc, 'likedMovies');
    
    // Function to handle liking a movie
    const handleLike = async () => {
        // If the user is logged in
        if (user) {
            // If the new like state is true, add the movie to the database
            if (!like) {
                try {
                    await addDoc(likedMoviesCollection, {
                        name: item.title,
                        id: item.id,
                        picture: `https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`,
                    });
                    setLike(true);
                } catch (e) {
                    console.error("Error adding movie: ", e);
                }
            } else {  // If the movie is unliked, remove it from the database
                const q = query(likedMoviesCollection, where("id", "==", item.id));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc) => {
                    try {
                        await deleteDoc(doc.ref);
                        setLike(false);
                    } catch (e) {
                        console.error("Error removing movie: ", e);
                    }
                });
            }
        } else {
            alert("Please log in to like movies.");
        }
    };

    return (
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2" key={item.id}>
            <img
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.title}
            />
            <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black text-white hover:opacity-100">
                <p className="white-space-normal text-[8px] md:text-xs flex justify-center items-center font-bold text-center h-full">
                    {item?.title}
                </p>
                <p onClick={handleLike}>
                    {like ? (
                        <FaHeart className="absolute top-4 left-4 text-gray-400" />
                    ) : (
                        <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
                    )}
                </p>
            </div>
        </div>
    );
}

export default Movie;
