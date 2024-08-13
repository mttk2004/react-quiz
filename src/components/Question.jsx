/**
 *  Project: react-quiz
 *  File: Question.jsx
 *  Created: 1:53 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useQuiz } from '../contexts/QuizContext.jsx';


export default function Question({ children }) {
	const { questions, index } = useQuiz();
	const question = questions[index];
	
	return <div>
		<h4>{question.question}</h4>
		{children}
	</div>;
}
