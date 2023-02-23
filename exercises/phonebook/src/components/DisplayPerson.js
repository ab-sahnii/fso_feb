import phoneService from '../services/phone'

const DisplayPersons = ({person, deleteEntry}) => {

  // const handleDelete = () => {
  //   console.log(`Delete button for id: ${personId} clicked`)
  //   if(window.confirm(`Delete ${person} ?`))
  //   { 
  //     phoneService.remove(personId)
  //     //.then(returnedPB => console.log(returnedPB))
  //     persons.filter(person => persons.id !== personId)
  //     setPersons(persons)
  //   }
  // }

  const handleDelete = () => {
    deleteEntry(person)
  }

    return(
      <div>{person.name} {person.number} <button onClick={handleDelete}>delete</button></div>
    )
  }

export default DisplayPersons