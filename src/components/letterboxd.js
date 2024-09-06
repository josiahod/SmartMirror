import React, { useState, useEffect } from 'react';

const Letterboxd = () => {
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch('http://localhost:8080/letterboxd'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.diary.slice(0,5));
                setMovieData(data.diary.slice(0, 3));
               
            } catch (error) {
                console.error('Error fetching Wordle data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, []);

    // Check if wordleData is still a Promise
    if (movieData instanceof Promise) {
        return <p>Loading...</p>; // Show loading indicator if wordleData is still a Promise
    }

    return (
        <div style={{ textAlign: 'center', fontSize: "20px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                     {movieData ? (
                        <div> 
                            {  movieData.map((movie, index) => (
                                <div key={index} style={{ display: 'inline-block', margin: '10px', textAlign: 'center'}}>
                                <img src={movie.film.image.medium} style={{ width: '170px', height: 'auto', borderRadius: '2px'}} /> 
                                <div styles={{marginTop: "0px", marginBottom: "0px"}}>{movie.film?.title ? movie.film.title : "Title not available"}:{movie.rating.text}</div>
                                </div>
                            ))}     
                        </div>
                    ) 
                    : (
                        <p>No data available</p>
                    )} 
                </div>
            )}
        </div>
    );
};

export default Letterboxd;
