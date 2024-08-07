/**
 *  Project: react-quiz
 *  File: Options.jsx
 *  Created: 2:03 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


export default function Options({ question, answer, dispatch }) {
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
