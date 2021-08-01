import logo from './logo.svg';
import './App.css';
import {useState} from 'react'


const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}
const Stats = ({good, neutral, bad}) => {
  if((good+bad+neutral) === 0){
    return <p>No feedback given</p>
  }else{
    return (
      <table>
        <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={bad + neutral + good} />
        <StatisticLine text='average' value={((1*good)+(-1*bad))/(bad + neutral + good)} />
        <StatisticLine text='percent' value={(good/(bad + neutral + good))*100 + ' %'} />
        
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}: </td> 
      <td>{value}</td>
    </tr>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const logFeedback = (type) => {
    switch(type){
      case 'good':
        setGood(prev =>  prev+1)
        break
      case 'neutral':
        setNeutral(prev => prev+1)
        break
      case 'bad':
        setBad(prev => prev+1)
        break
      default: 
        console.log('whoops')
    }
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={()=> logFeedback('good') } text='good'/>
      <Button onClick={()=> logFeedback('neutral') } text='neutral'/>
      <Button onClick={()=> logFeedback('bad') } text='bad'/>
      <h3>statistics</h3> 
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
