const express = require('express');
const morgan = require('morgan');


const app = express()

morgan.token('data', (request, response) => {
  //const body = request.body
  //const dataString = `{"name": ${body.name}, "number": ${body.number}}`
  //console.log(`Inside morgan : ${body.name}, ${body.number}`)
  return JSON.stringify({"name": request.body.name, "number": request.body.number})
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data '))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const numContacts = (persons.map(person => person.id)).length
  const todayDate = Date(Date.now())
  const dateString = todayDate.toString()
  const responseString = `Phonebook has info for ${numContacts} people. <br> ${dateString}`
  response.send(responseString)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if(person){
    response.json(person)    
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id != id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n=> n.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
const body = request.body
const dupName = persons.filter(person => person.name === body.name)


if(!body.name || !body.number)
{
  return response.status(400).json({error: 'content missing'})
}

if(dupName.length > 0)
{
  return response.status(400).json({error: 'name must be unique'})
}


console.log(body.content)
const person = {
  name : body.name,
  number: body.number,
  id: generateId()
}

persons = persons.concat(person)
  

response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

