import Header        from './Header.jsx';
import Main                      from './Main.jsx';
import { useEffect, useReducer } from 'react';


const initialState = {
	questions: [],
	status: 'loading' // ready, error, active, finished
}

const reducer = function(state, action) {
	switch (action.type) {
	case 'dataReceived': return {
		questions: action.payload,
		status: 'ready'
	}
	case 'dataReceiveFailed': return {
		...state,
		status: 'error'
	}
	default: throw new Error("unknown action")
	}
}

export default function App() {
	const [{ questions, status }, dispatch] = useReducer(reducer, initialState)
	
	useEffect(() => {
		const fetchQuestions = async function () {
			try {
				const res = await fetch('http://localhost:3333/questions');
				const data = await res.json();
				dispatch({ type: 'dataReceived', payload: data })
			}
			catch (err) {
				console.error(err);
				dispatch({ type: 'dataReceiveFailed' })
			}
		};
		
		fetchQuestions();
	}, []);
	
	return <div className="app">
		<Header />
		
		<Main>
			<p>1/{questions?.length}</p>
			<p>{status}</p>
			<p>{questions?.at(0)?.question}</p>
		</Main>
	</div>;
}
