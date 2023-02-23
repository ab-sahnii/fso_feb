import { useState, useEffect } from 'react'
import SearchName from './components/SearchName'
import DisplayPersons from './components/DisplayPerson'

import phoneService from './services/phone'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')


const hook = () => {
  phoneService
    .getAll()
    .then(initialNotes => {
      setPersons(initialNotes)
    })
}

useEffect(hook, [])


const handleFormSubmit = (event) => {
  event.preventDefault()
  const nameExists = persons.find(person => person.name === newName)
  if(nameExists)
  {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
    {
      console.log(`Name Exists id: ${nameExists.id}`)
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }
      phoneService
        .update(nameExists.id, newPersonObject)
        .then(returnedNote => {
          setPersons(persons.map(person => person.id !== nameExists.id ? person: returnedNote))
        })
        setNewName('')
        setNewNumber('')

      
    }
  }
  else{
    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    phoneService
      .create(newPersonObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')
      })
  }

}


const deleteEntry = (person) => {
  console.log(`Delete button for id: ${person.id} clicked`)
  if(window.confirm(`Delete ${person.name} ?`))
  { 
    phoneService.remove(person.id)
    const newPersons= persons.filter(people => people.id !== person.id)
    setPersons(newPersons)
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
      
      {persons.filter(person => person.name.match(nameSearch)).map((person, index) => <DisplayPersons person={person} key={index} deleteEntry={deleteEntry} />)}
      
    </div>
  );
}

export default App;