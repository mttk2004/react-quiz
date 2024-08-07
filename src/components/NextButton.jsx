/**
 *  Project: react-quiz
 *  File: NextButton.jsx
 *  Created: 3:06 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


export default function NextButton({ answer, dispatch, numQuestions, index }) {
	if (answer === null) return;
	if (index < numQuestions - 1) return <button
			className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
		Next question
	</button>;
	return <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>Finish</button>;
}
