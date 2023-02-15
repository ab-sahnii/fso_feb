import { useState, useEffect } from 'react'
import SearchName from './components/SearchName'
import DisplayPersons from './components/DisplayPerson'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([])
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [nameSearch, setNameSearch] = useState('')


const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}

useEffect(hook, [])


const handleFormSubmit = (event) => {
  event.preventDefault()
  const nameExists = persons.find(person => person.name === newName)
  if(nameExists)
  {
    alert(`${newName} is already added to phonebook.`)
  }
  else{
    const newPersonObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewNumber('')
  }

}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFitler = (event) => {
  setNameSearch(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with <input onChange ={handleFitler} /></div>
      <h2>Add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>Name: <input value={newName} onChange={handleNameChange}/></div>
          <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.match(nameSearch)).map((person, index) => <DisplayPersons person={person.name} number={person.number} key={index}/>)}
      
    </div>
  );
}

export default App;


/*

const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

*/
