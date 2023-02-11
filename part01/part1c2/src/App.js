import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}


const Display = ({counter}) => {
  return(
    <div>{counter}</div>
  )
}

const App = () =>  {
  const [counter, setCounter] = useState(0)
  const inceaseByOne = () => {setCounter(counter+1)
  }
  const deceaseByOne = () => {
    setCounter(counter-1)}
  const setToZero = () => {
    setCounter(0)}

  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={inceaseByOne} text='Plus'/>
      <Button onClick={setToZero} text='Zero'/>
      <Button onClick={deceaseByOne} text='Minus'/>

    </div>
  );
}

export default App;
