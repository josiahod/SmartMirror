const fs = require('fs');
const axios = require('axios');

// Read cookies from the exported JSON file
const cookies = JSON.parse(fs.readFileSync('nyt_cookies.json', 'utf8'));

// Format cookies for Axios
const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

// Set up axios instance with cookies
const axiosInstance = axios.create({
  headers: {
    'Cookie': cookieString,
  }
});

// Fetch the Wordle data
async function getWordleData() {
  try {
    var answerLink = `https://www.nytimes.com/svc/wordle/v2/${getCurrentDate()}.json`;
    const response = await axiosInstance.get("https://www.nytimes.com/svc/games/state/wordleV2/latest");
    const response2 = await axiosInstance.get(answerLink);
     var correctWord = response2.data.solution;

    // Example usage
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
  const BLACK = '⬛';

  function getLetterColors(guess) {
      let colors = Array(guess.length).fill(BLACK);
      let answerArr = correctAnswer.split('');
      let guessArr = guess.split('');

      // First pass: Mark greens
      for (let i = 0; i < guessArr.length; i++) {
          if (guessArr[i] === answerArr[i]) {
              colors[i] = GREEN;
              answerArr[i] = null; // Mark this letter as used
          }
      }

      // Second pass: Mark yellows
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
  });
}

function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}