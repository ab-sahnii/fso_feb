const Hello = (props) => {
  const bornYear = () =>{
    const currentYear = new Date().getFullYear()
    return currentYear-props.age

  }

  return(
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>
        You were born in {bornYear()}
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Grretings</h1>
      <Hello name = "Maya" age={26+10} />
      <Hello name = {name} age={age} />
    </div>
  );
}

export default App;
