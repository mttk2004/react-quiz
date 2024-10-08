/**
 *  Project: react-quiz
 *  File: StartScreen.jsx
 *  Created: 1:24 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useQuiz } from '../contexts/QuizContext.jsx';


export default function StartScreen() {
	const { dispatch, numQuestions } = useQuiz();
	
	return <div className="start">
		<h2>Welcome to The React Quiz</h2>
		<h3>{numQuestions} questions to test your React mastery</h3>
		<button className="btn btn-ui" onClick={() => dispatch({ type: 'start' })}>Let's start</button>
	</div>;
}
