import { useState } from 'react'

const Display = ({anecdotes, votes, value}) => {
  const sumVotes = votes.reduce((a,v) => a + v, 0)
  if(sumVotes === 0)
  {
    return(
      <div>
        <p>Click the vote button to get started...</p>
      </div>
    )
  }
  return(
    <div>
      <p>{anecdotes[value]}</p>
      <p>has {votes[value]} votes</p>
    </div>

  )
}


const Button = ({text, handleClick}) => {
  return(<button onClick={handleClick} >{text}</button>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () =>{
    const newAnecdote =  Math.floor(Math.random() * anecdotes.length)
    setSelected(newAnecdote)
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected]+= 1
    setVotes(newVotes)
  }

  let maxVotes = votes.indexOf(Math.max(...votes))


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Display anecdotes={anecdotes} votes={votes} value={selected} />
      
      <Button text='vote' handleClick = {addVote}/>
      <Button text='next anecdote' handleClick = {nextAnecdote}/>

      <h2>Anecdote with most votes</h2>
      <Display anecdotes={anecdotes} votes={votes} value={maxVotes} />
    </div>
  );
}

export default App;