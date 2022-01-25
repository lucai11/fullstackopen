import logo from './logo.svg';
import './App.css';
import { decrement, increment, zero } from './features/counterSlice'
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />    
        <div>
          Count: {count}
        </div>
        <div>
          <button onClick = {() => dispatch(increment())}>Increment</button>
          <button onClick = {() => dispatch(decrement())}>Decrement</button>
          <button onClick = {() => dispatch(zero())}>Zero</button>
        </div>
      </header>
    </div>
  );
}

export default App;
