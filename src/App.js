import logo from './logo.svg';
import './App.css';
import './components/style.css';
import './components/responsive.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import BudgetPlanner from './components/BudgetPlanner';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/budget-planner' exact element={<BudgetPlanner/>} />
          <Route path='*' element={<Error />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
