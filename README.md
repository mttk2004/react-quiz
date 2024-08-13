# The React Quiz App
Take a deep look at https://re-quiz.netlify.app

## Project Description
This project is a React-based quiz application that allows users to answer a series of questions and track their scores. The application consists of client-side components: 

### Client-Side (React)  
- Components: The application is built using various React components such as App, Header, 
  Main, 
Loader, Error, StartScreen, Question, Options, NextButton, Progress, FinishScreen, Timer, and Footer.
- State Management: The application uses the useReducer hook to manage the state, which includes 
  the list of questions, the current status of the quiz, the user's answers, points, high score, and remaining time.
- Data Fetching: The questions are fetched from a server-side API endpoint using the fetch API.

## Key Features
- Quiz Functionality: Users can start the quiz, answer questions, and see their scores.
- Timer: A countdown timer is implemented to limit the time for answering each question.
- High Score Tracking: The application tracks and displays the user's high score.
- Server Communication: The client communicates with the server to fetch questions and update 
  results.

## Note:
I create this webapp with the help of a tutorial from Teacher Jonas (https://github.com/jonasschmedtmann)

Last update: 13/08/2024
