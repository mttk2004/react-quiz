/**
 *  Project: react-quiz
 *  File: Question.jsx
 *  Created: 1:53 CH, 07/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


export default function Question({ question, children }) {
	return <div>
		<h4>{question.question}</h4>
		{children}
	</div>;
}
