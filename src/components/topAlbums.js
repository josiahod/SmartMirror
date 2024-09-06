import React, { useState, useEffect } from 'react';

const TopAlbums = () => {
    const [albumData, setAlbumData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const response = await fetch('http://localhost:8080/albums'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.albums.items.slice(0,5));
                setAlbumData(data.albums.items.slice(0,3));
               
            } catch (error) {
                console.error('Error fetching album data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumData();
    }, []);

    // Check if wordleData is still a Promise
    if (albumData instanceof Promise) {
        return <p>Loading...</p>; // Show loading indicator if wordleData is still a Promise
    }

    return (
        <span style={{fontSize: "12px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <span>

                     {albumData ? (
                        <span> 
                            <h3 style={{ color: 'white', fontSize: "20px"}}>Top Albums This Week</h3>
                                {  albumData.map((album, index) => (
                                <span key={index} style={{ margin: '5px', display: 'inline-block'}}>
                                    <img src={album.album.image} style={{ width: '176px', height: 'auto', borderRadius: '2px'}} /> 
                                </span>
                            ))}   
                        </span>
                    ) 
                    : (
                        <p>No data available</p>
                    )} 
                </span>
            )}
        </span>
    );
};

export default TopAlbums;
