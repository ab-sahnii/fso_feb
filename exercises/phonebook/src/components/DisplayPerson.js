import phoneService from '../services/phone'

const DisplayPersons = ({person, deleteEntry}) => {

  const handleDelete = () => {
    deleteEntry(person)
  }

    return(
      <div>{person.name} {person.number} <button onClick={handleDelete}>delete</button></div>
    )
  }

export default DisplayPersons