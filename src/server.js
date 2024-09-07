const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var FitbitApiClient = require("fitbit-node");
const cors = require('cors');
const { get } = require('http');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());


app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/wordle', function (req, res) {
  const cookies = JSON.parse(fs.readFileSync('nyt_cookies.json', 'utf8'));

    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    const axiosInstance = axios.create({
      headers: {
        'Cookie': cookieString,
      }
    });

    var wordleGrid = [];
    async function getWordleData() {
      try {
        var answerLink = `https://www.nytimes.com/svc/wordle/v2/${getCurrentDate()}.json`;
        const response = await axiosInstance.get("https://www.nytimes.com/svc/games/state/wordleV2/latest");
        const response2 = await axiosInstance.get(answerLink);
        var correctWord = response2.data.solution;

        const correctAnswer = 'crush';
        printWordleGrid(correctWord, response.data.game_data.boardState);

      } catch (error) {
        console.error('Error fetching Wordle data:', error);
      }
    }

    getWordleData();

    function printWordleGrid(correctAnswer, guesses) {
      const GREEN = '🟩';
      const YELLOW = '🟨';
      const BLACK = '⬜';

      function getLetterColors(guess) {
          let colors = Array(guess.length).fill(BLACK);
          let answerArr = correctAnswer.split('');
          let guessArr = guess.split('');

          for (let i = 0; i < guessArr.length; i++) {
              if (guessArr[i] === answerArr[i]) {
                  colors[i] = GREEN;
                  answerArr[i] = null; // Mark this letter as used
              }
          }

          for (let i = 0; i < guessArr.length; i++) {
              if (colors[i] !== GREEN && answerArr.includes(guessArr[i])) {
                  colors[i] = YELLOW;
                  answerArr[answerArr.indexOf(guessArr[i])] = null; // Mark this letter as used
              }
          }

          return colors.join('');
      }

      guesses.forEach(guess => {
          const coloredGuess = getLetterColors(guess);
          console.log(coloredGuess);
          if(coloredGuess)
          {
            wordleGrid.push(coloredGuess);
          }
      });

      res.json({"grid": wordleGrid});
}


function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
 
});

function getCurrentDate() {
  const now = new Date();
  
  // Get the current date components
  const year = now.getFullYear();
  let month = now.getMonth() + 1; // Month starts from 0
  let day = now.getDate();
  
  // Pad month and day with leading zeros if needed
  if (month < 10) {
      month = `0${month}`;
  }
  if (day < 10) {
      day = `0${day}`;
  }
  
  // Return the formatted date string in yyyy-mm-dd format
  return `${year}-${month}-${day}`;
}


app.get('/letterboxd', function (req, res) {
  (async () => {
    try {
      const { default: letterboxd } = await import("letterboxd");

      letterboxd("josiahphobic")
        .then((items) => {console.log("movies logged"); res.json({diary: items});})
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Error importing or using the letterboxd function:", error);
    }
  })();
});

app.get('/albums', function (req, res) {
  (async () => {
    try {
      const { lastSundayUnix, nextSundayUnix } = getLastSundayAndNextSundayTimestamps();
      const response = await fetch( `https://api.stats.fm/api/v1/users/josiahodunade/top/albums?after=${lastSundayUnix}&before=${nextSundayUnix}`); 
                if (!response.ok) 
                {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                res.json({albums: data})
    } catch (error) {
      console.error("Error getting albums", error);
    }
  })();
});

function getLastSundayAndNextSundayTimestamps() {
  const now = new Date();

  // Find last Sunday
  const lastSunday = new Date(now);
  lastSunday.setDate(now.getDate() - now.getDay()); // Subtracting the current day of the week to go back to Sunday
  lastSunday.setHours(0, 0, 0, 0); // Set time to 00:00:00 for last Sunday

  // Find next Sunday
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + (7 - now.getDay())); // Adding the days needed to reach the next Sunday
  nextSunday.setHours(0, 0, 0, 0); // Set time to 00:00:00 for next Sunday

  // Convert to UNIX timestamps
  const lastSundayUnix = Math.floor(lastSunday.getTime() ); // UNIX timestamp for last Sunday
  const nextSundayUnix = Math.floor(nextSunday.getTime() ); // UNIX timestamp for next Sunday

  return { lastSundayUnix, nextSundayUnix };
}



app.listen(process.env.PORT || 8080);