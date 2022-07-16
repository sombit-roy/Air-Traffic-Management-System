import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
		<Router>
    		<div className='App'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home formName='Enter flight details' />} />
					<Route path='/schedule' element={<Schedule />} />
				</Routes>
      		</div>
		  </Router>
    );
}

export default App;