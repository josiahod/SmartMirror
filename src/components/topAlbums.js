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
                setAlbumData(data.albums.items.slice(0,5));
               
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
        <span style={{fontSize: "30px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <span>

                     {albumData ? (
                        <span> 
                            <h3 style={{ color: 'red', fontSize: "30px"}}>top albums this week</h3>
                                {  albumData.map((album, index) => (
                                <div key={index}>
                                    <span styles={{fontSize: "40px", marginTop: "0px", marginBottom: "0px"}}>{album.album?.name ? album.album.name.length > 25 ? album.album.name.substring(0, 16) + "..." : album.album.name : "Album not available"}{" · "}{album.album.artists[0]?.name}</span>
                                </div>
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
