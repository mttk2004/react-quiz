import { useEffect, useReducer } from 'react';
import Header                    from './Header.jsx';
import Main                      from './Main.jsx';
import Loader                    from './Loader.jsx';
import Error                     from './Error.jsx';
import StartScreen               from './StartScreen.jsx';
import Question                  from './Question.jsx';
import Options                   from './Options.jsx';
import NextButton                from './NextButton.jsx';
import Progress                  from './Progress.jsx';
import FinishScreen              from './FinishScreen.jsx';
import Timer                     from './Timer.jsx';
import Footer                    from './Footer.jsx';
import initialData from '../../data/questions.json';


const SECONDS_PER_QUESTION = 30;

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

export default function App() {
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
	
	return <div className="app">
		<Header />
		
		<Main>
			{status === 'loading' && <Loader />}
			{status === 'error' && <Error />}
			{status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
			{status === 'active' && <>
				<Progress points={points} maxPoints={maxPoints} numQuestions={numQuestions} index={index} />
				<Question question={questions[index]}>
					<Options question={questions[index]} dispatch={dispatch} answer={answer} />
				</Question>
				<Footer>
					<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
					<NextButton
							answer={answer} dispatch={dispatch} index={index} numQuestions={numQuestions} />
				</Footer>
			</>}
			{status === 'finished' && <FinishScreen
					points={points} maxPoints={maxPoints} highScore={highScore}
					dispatch={dispatch} />}
		</Main>
	</div>;
}
