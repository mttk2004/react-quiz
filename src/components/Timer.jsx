/**
 *  Project: react-quiz
 *  File: Timer.jsx
 *  Created: 9:44 SA, 08/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useEffect } from 'react';
import { useQuiz }   from '../contexts/QuizContext.jsx';


export default function Timer() {
	const { dispatch, secondsRemaining } = useQuiz();
	const min = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
	const sec = String(secondsRemaining - min * 60).padStart(2, '0');
	
	useEffect(() => {
		const id = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);
		
		return () => clearInterval(id);
	}, [dispatch]);
	
	return <div className="timer">
		{min}:{sec}
	</div>;
}
