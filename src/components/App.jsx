import Header       from './Header.jsx';
import Main         from './Main.jsx';
import Loader       from './Loader.jsx';
import Error        from './Error.jsx';
import StartScreen  from './StartScreen.jsx';
import Question     from './Question.jsx';
import Options      from './Options.jsx';
import NextButton   from './NextButton.jsx';
import Progress     from './Progress.jsx';
import FinishScreen from './FinishScreen.jsx';
import Timer        from './Timer.jsx';
import Footer       from './Footer.jsx';
import { useQuiz }  from '../contexts/QuizContext.jsx';


export default function App() {
	const { status } = useQuiz();
	
	return <div className="app">
		<Header />
		<Main>
			{status === 'loading' && <Loader />}
			{status === 'error' && <Error />}
			{status === 'ready' && <StartScreen />}
			{status === 'active' && <>
				<Progress />
				<Question>
					<Options />
				</Question>
				<Footer>
					<Timer />
					<NextButton />
				</Footer>
			</>}
			{status === 'finished' && <FinishScreen />}
		</Main>
	</div>;
}
