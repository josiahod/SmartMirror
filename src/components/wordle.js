import React, { useState, useEffect } from 'react';

const Wordle = () => {
    const [wordleData, setWordleData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchWordleData = async () => {
            try {
                const response = await fetch('http://localhost:8080/wordle'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWordleData(data);
            } catch (error) {
                console.error('Error fetching Wordle data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWordleData();
    }, []);

    // Check if wordleData is still a Promise
    if (wordleData instanceof Promise) {
        return <p>Loading...</p>; // Show loading indicator if wordleData is still a Promise
    }

    return (
        <span style={{ textAlign: 'left' }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <span>
                    {wordleData ? (
                        <span> 
                            {wordleData.grid.map((string, index) => (
                                <div key={index}>
                                    <span styles={{marginTop: "0px", marginBottom: "0px"}}>{string}</span>
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

export default Wordle;
