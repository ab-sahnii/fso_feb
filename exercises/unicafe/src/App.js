import { useState } from 'react'

const Header = () => {
  return( <h2>Give feedback</h2> )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({text, value}) =>{
  return(
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const averageScore = (good*1) + (neutral*0) + (bad*-1)
  if(total === 0){
  return(
    <div>
    <h2>Statistics</h2>
    <p>No feedback given</p>
    </div>
  )}
  
  return(
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <Display text='Good' value={good}/>
        <Display text='Neutral' value={neutral}/>
        <Display text='Bad' value={bad}/>
        <Display text='All' value={total}/>
        <Display text='Average' value={averageScore/3}/>
        <Display text='Positive' value={(good * 100)/total}/>
        </tbody>
      </table>
    </div>
  )


}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    return(setGood(good+1))
  }

  const handleNeutralClick = () => {
    return(setNeutral(neutral+1))
  }

  const handleBadClick = () => {
    return(setBad(bad+1))
  }

  

  return (
    <div>
      <Header />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral ={neutral} bad={bad} />
      

    </div>
  );
}

export default App;


/*

<Display text='Good' value={good}/>
      <Display text='Neutral' value={neutral}/>
      <Display text='Bad' value={bad}/>
      <Display text='All' value={total}/>
      <Display text='Average' value={averageScore/3}/>
      <Display text='Positive' value={(good * 100)/total}/>

      */