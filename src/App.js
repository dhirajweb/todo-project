import './App.css';
import AddTodo from './AddTodo/AddTodo'
import TodoList from './TodoList/TodoList'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function App() {
  return (
    <div className="App">
      <h1 className='App-title'>Tod{<CheckCircleIcon style={{color: '#1266F1', verticalAlign:'middle'}}/>} App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
