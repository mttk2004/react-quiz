/**
 *  Project: react-quiz
 *  File: QuizContext.jsx
 *  Created: 2:49 CH, 13/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { createContext, useContext, useEffect, useReducer } from 'react';
import Error                                                from '../components/Error.jsx';
import initialData                                          from '../../data/questions.json';


const SECONDS_PER_QUESTION = 30;
const QuizContext = createContext(undefined);
const initialState = {
	questions       : [],
	status          : 'loading', // ready, error, active, finished
	index           : 0,
	answer          : null,
	points          : 0,
	highScore       : 0,
	secondsRemaining: null,
};

const reducer = function (state, action) {
	const question = state.questions.at(state.index);
	
	switch (action.type) {
	case 'dataReceived':
		return {
			...state,
			questions: action.payload,
			status   : 'ready'
		};
	case 'dataReceiveFailed':
		return {
			...state,
			status: 'error'
		};
	case 'start':
		return {
			...state,
			status          : 'active',
			secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
		};
	case 'newAnswer':
		return {
			...state,
			answer: action.payload,
			points: action.payload === question.correctOption ? state.points + question.points
																												: state.points
		};
	case 'nextQuestion':
		return {
			...state,
			index : state.index + 1,
			answer: null
		};
	case 'finish':
		return {
			...state,
			status   : 'finished',
			highScore: Math.max(state.highScore, state.points)
		};
	case 'restart':
		return {
			...initialState,
			questions: state.questions,
			status   : 'ready',
			highScore: state.highScore
		};
	case 'tick':
		return {
			...state,
			secondsRemaining: state.secondsRemaining - 1,
			status          : state.secondsRemaining === 1 ? 'finished' : state.status,
		};
	default:
		throw new Error('unknown action');
	}
};

function QuizProvider({ children }) {
	const [
					{
						questions,
						status,
						index,
						answer,
						points,
						highScore,
						secondsRemaining
					}, dispatch
				] = useReducer(reducer,
											 initialState);
	
	// Derived states
	const numQuestions = questions.length;
	const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
	
	useEffect(() => {
		const fetchQuestions = async function () {
			try {
				// const res = await fetch('http://localhost:3333/questions');
				// const data = await res.json();
				// dispatch({ type: 'dataReceived', payload: data });
				dispatch({ type: 'dataReceived', payload: initialData.questions });
			}
			catch (err) {
				console.error(err);
				dispatch({ type: 'dataReceiveFailed' });
			}
		};
		
		fetchQuestions();
	}, []);
	
	return <QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highScore,
				secondsRemaining,
				numQuestions,
				maxPoints,
				dispatch
			}}>
		{children}
	</QuizContext.Provider>;
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined) {
		throw new Error('useQuiz must be used within a QuizProvider');
	}
	
	return context;
}

export { useQuiz, QuizProvider };
