import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const WeatherTable = ({ data }) => {
    const [weatherData, setWeather] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    var weatherArr = []

    function convertTime(timestamp)
    {
        const date = new Date(timestamp * 1000);
        const options = {
        timeZone: 'America/New_York', 
        hour: '2-digit',
        hour12: true 
        };
        const estHour = date.toLocaleString('en-US', options);
        console.log(estHour);
        return estHour;
    }

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=33.9349736&lon=-84.1770881&appid=3131aaa98e284731ab085884aeec1d24&units=imperial'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
               for(var i = 0; i < 5; i++)
               {
                var tempObj = {time: convertTime(data.list[i].dt), icon: data.list[i].weather[0].icon, temp: data.list[i].main.temp, precipitation: data.list[i].pop};
                weatherArr.push(tempObj);
               }
               console.log(weatherArr);
                setWeather(weatherArr);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

  return (
    <div> 
    {loading ? ( <p> Loading </p> ) : (
    <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} style={{width: 330}}>
      <Table aria-label="weather table">
        <TableHead>
          <TableRow style={{height: 50}}>
            <TableCell sx={{ border: 'none', color: 'white' }} ></TableCell>
            <TableCell sx={{ border: 'none', color: 'white' }} ></TableCell>
            <TableCell sx={{ border: 'none' , color: 'white'}}></TableCell>
            <TableCell sx={{ border: 'none' , color: 'white'}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weatherData.map((row, index) => (
            <TableRow key={index} sx={{color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.5)', }}>
              <TableCell sx={{ border: 'none' , color: 'white', padding: '5px', fontSize: "1.2rem" }} >{row.time}</TableCell>
              <TableCell sx={{ border: 'none', color: 'white', padding: '1px', width: '2px' }}>
                <img src={`http://openweathermap.org/img/wn/${row.icon}@2x.png`} alt="weather icon" height="63px" width="63px"/>
              </TableCell>
              <TableCell sx={{ border: 'none', color: 'white', fontSize: '2rem' }} >{row.temp}°F</TableCell>
              <TableCell sx={{ border: 'none', color: 'white' }}>{row.precipitation}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> ) }
    </div>
  );
};

export default WeatherTable;
