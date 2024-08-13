/**
 *  Project: react-quiz
 *  File: Options.jsx
 *  Created: 2:03 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useQuiz } from '../contexts/QuizContext.jsx';


export default function Options() {
	const { questions, index, answer, dispatch } = useQuiz();
	const question = questions[index];
	const hasAnswered = answer !== null;
	
	return <div className="options">
		{
			question.options.map((option, i) => <button
					className={`btn btn-option ${answer === i && 'answer'} ${hasAnswered ? i
																																								 === question.correctOption
																																								 ? 'correct'
																																								 : 'wrong' : ''}`}
					key={option}
					onClick={() => answer ?? dispatch({ type: 'newAnswer', payload: i })}>
				{option}
			</button>)
		}
	</div>;
}
