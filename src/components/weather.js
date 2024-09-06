import React from 'react';
import {WeatherWidget} from "@daniel-szulc/react-weather-widget"


  
const weather  = () => {
    return (
         <div style={{
      textAlign: 'center',
      maxHeight: '40vh',  // Maximum 40% of viewport height
      width: '100%',      // Full width of the container
      margin: 'auto',     // Center align horizontally
      overflow: 'scroll'  // Hide overflow content if necessary
    }}>
      <WeatherWidget
        provider='openWeather'
        apiKey='3131aaa98e284731ab085884aeec1d24'
        location='Norcross'
        tempUnit="F"
        windSpeedUnit="mps"
        lang="en"
    />
    </div>
);
};
  
  export default weather;