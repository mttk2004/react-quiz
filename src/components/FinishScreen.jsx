/**
 *  Project: react-quiz
 *  File: FinishScreen.jsx
 *  Created: 4:20 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useQuiz } from '../contexts/QuizContext.jsx';


export default function FinishScreen() {
	const { questions, dispatch, points, highScore } = useQuiz();
	
	const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
	const percentage = +(points / maxPoints * 100).toFixed(2);
	const highPercentage = (highScore / maxPoints * 100).toFixed(2);
	
	let emoji;
	if (percentage < 40) emoji = '😒';
	if (percentage >= 40 && percentage < 65) emoji = '🤔';
	if (percentage >= 65 && percentage < 80) emoji = '🫡';
	if (percentage >= 80 && percentage < 100) emoji = '😁';
	if (percentage === 100) emoji = '🥇';
	
	return <>
		<p className="result">
			<span>{emoji}</span>You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
		</p>
		<p className="highscore">(Record: {highScore}/{maxPoints} points &mdash; {highPercentage}%)</p>
		<button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>Restart quiz
		</button>
	</>;
}
