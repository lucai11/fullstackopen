import React from 'react';
import ReactDOM from 'react-dom'
import store from './store'
import { useSelector, useDispatch } from 'react-redux';
import {increment_good, increment_ok, increment_bad, reset_count} from './reducer'
import { Provider } from 'react-redux'

const App = () => {
  const counts = useSelector(state => state.counter)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment_good())}>good</button> 
      <button onClick= {() => dispatch(increment_ok())}>ok</button> 
      <button onClick = {() => dispatch(increment_bad())}>bad</button>
      <button onClick = { () => dispatch(reset_count())}>reset stats</button>
      <div>good {counts.good}</div>
      <div>ok {counts.ok}</div>
      <div>bad {counts.bad}</div>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);




