import logo from './logo.svg';
import './App.css';
import './components/style.css';
import './components/responsive.css';
import 'bootstrap/dist/css/bootstrap.css';
import BudgetPlanner from './components/BudgetPlanner';

function App() {
  return (
    <div className="App">
      <BudgetPlanner/>
    </div>
  );
}

export default App;
