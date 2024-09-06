const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var FitbitApiClient = require("fitbit-node");
const cors = require('cors');
var admin = require("firebase-admin");
var serviceAccount = require("/home/josiah/Documents/fitbitchallenge-main/src/fitbitchallenge-2dfee-firebase-adminsdk-k7iih-e9010e3a3e.json");
const { get } = require('http');
const fs = require('fs');
const axios = require('axios');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
var steps = [];


const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const client = new FitbitApiClient({
    clientId: "23PK5R",
    clientSecret: "f8a0ebde9e9fab6f3a49d706da3d1a59",
    apiVersion: '1.2' // 1.2 is the default
});
const redirectUrl= "http://localhost:3000/Code";



app.get('/ping', function (req, res) {
 return res.send('pong');
});


app.get('/authcode', function (req, res) {
    console.log(req.headers.codevalue);
    client.getAccessToken(req.headers.codevalue, redirectUrl)
        .then(tokenData => {
            console.log('Access Token:', tokenData.access_token);
            getName(tokenData.access_token);
        })
        .catch(error => {
            console.error('Error:', error.context);
        });

    function getName(accessToken)
    {
    client.get('/profile.json', accessToken)
        .then(profileData => {
          console.log('Profile Data:', profileData[0].user.displayName);
          addAuth(profileData[0].user.displayName, accessToken);
          res.json({done:"finished"});
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
   });

app.get('/', function (req, res) {
    const scope = "activity profile sleep"
    const urlAuth = client.getAuthorizeUrl(scope, redirectUrl);
    //console.log(urlAuth);
  res.json({url: urlAuth});
});

function addAuth(name, token)
{
console.log("push to database");

  const collectionRef = db.collection('Users');
  const docRef = collectionRef.doc('keys'); // Optionally specify a document ID  
  name = name.replace(/\./g, '');
  const data = {
    [name]: token,
  };

  console.log(data);
  

  docRef.update(data)
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
}

app.get('/addSteps', function (req, res)
 {

  const docRef = db.collection('Users').doc('keys');

  docRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      const data = doc.data();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {

          getSteps(data[key], key, Object.keys(data).length);
        }
      }
      
    }
  })
  .catch(err => {
    console.error('Error getting document', err);
  });

  
  steps = [];

  function getSteps(tableToken, name, datalength)
  {
    var todaydate = getCurrentDate();
    console.log(todaydate);
    client.get(`/activities/date/${todaydate}.json`, tableToken)
    .then(dailydata => {
      console.log('Today\'s Data:', dailydata[0].summary.steps);
      steps.push({"name": name, "steps":  dailydata[0].summary.steps});
      steps.length >= datalength ? res.json({"data": steps}) : "";
    })
    .catch(error => {
      console.error('Error:', error);
      res.json({"data": steps});
    }); 
  }
});

app.get('/sleep', function (req, res) {
  const sleeptoken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1BLNVIiLCJzdWIiOiI0UldDVEQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IHJwcm8gcnNsZSIsImV4cCI6MTcyMDkzMTcyMywiaWF0IjoxNzIwOTAyOTIzfQ.c0t1PsuzVTRi88nMZ5Y7xW1mLOciamEVL46ZCSZQQRI";
  var todaydate = getCurrentDate();
    console.log(todaydate);
    client.get(`/sleep/date/${todaydate}.json`, sleeptoken)
    .then(dailydata => {
      console.log(dailydata);
      var indexofmain = 0;
      for(var j = 0; j < dailydata[0].sleep.length; j++)
      {
         if(dailydata[0].sleep[j].isMainSleep)
         {
          indexofmain = j;
         }
      }
      res.json({sleepdata: dailydata[0].sleep[j-1].levels.summary});
    })
    .catch(error => {
      console.error('Error:', error);
      res.json({"data": dailydata});
    }); 
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