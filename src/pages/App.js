import '../App.css';
import { useState } from "react";
import { makeStyles } from '@mui/styles';
//import Button from '@mui/material/Button';
import ClockDate from '../components/datetime';
//import WeatherWidget from '../components/weather';
import Wordle from '../components/wordle';
import Letterboxd from '../components/letterboxd';
import WeatherCard from '../components/weathercard';
import ReloadPage from '../components/reloadpage';
import TopAlbums from '../components/topAlbums';
import Carousel from '../components/carousel';





const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#ffcc80', // Custom background color
    color: 'red', // Custom text color
    borderRadius: '20px', // Rounded corners
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
    padding: '0px 0px', // Padding
    fontWeight: 'bold', // Bold text
    '&:hover': {
      backgroundColor: '#ffb74d', // Darker background color on hover
    },
  },
}));


function App() {
  const classes = useStyles();


  const [authUrl, setAuthUrl] = useState({});

  
    const fetchAuthUrl = async () => {
      try {
        const response = await fetch('http://localhost:8080/');
        if (!response.ok) {
          throw new Error('Failed to fetch auth URL');
        }
        const data = await response.json();
        console.log(data.url); // Assuming the response is JSON with a 'url' property
        setAuthUrl(data); // Assuming the response is JSON with a 'url' property
        window.location.href = data.url;

      } catch (error) {
        console.error('Failed to fetch auth URL:', error);
      }
    };
  
  return (
    <div className="container">
      <div className="top-left"> <ClockDate/> <Carousel/> </div>
      <div className="top-right"><WeatherCard/> </div>
      <div className="bottom-left" style={{ textAlign: 'center'}}> </div>
      <div className='bottom-right' style={{ textAlign: 'center' }}>  Wordle <Wordle/> </div>
      <div> <ReloadPage/> </div>
      

      {/* <Button className={classes.button} variant="contained" onClick={fetchAuthUrl}>Sign In!</Button> */}
         <div>
        {authUrl.url ? <p>{authUrl.url} </p>: null}
        </div>
      </div>
  );
}

export default App;
