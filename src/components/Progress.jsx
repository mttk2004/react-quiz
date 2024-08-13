/**
 *  Project: react-quiz
 *  File: Progress.jsx
 *  Created: 3:24 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useQuiz } from '../contexts/QuizContext.jsx';


export default function Progress() {
	const { index, points, numQuestions, maxPoints } = useQuiz();
	
	return <header className="progress">
		<progress max={numQuestions} value={index} />
		<p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
		<p><strong>{points}</strong> / {maxPoints} points</p>
	</header>;
}
