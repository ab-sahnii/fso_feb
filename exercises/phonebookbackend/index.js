require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')

morgan.token('data', (request, response) => {
  return JSON.stringify({"name": request.body.name, "number": request.body.number})
})

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data '))

/*
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

*/ 

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(result => {
    response.json(result)
    
  })
  
})

app.get('/info', (request, response) => {
  Phonebook.find({}).then(result => {
    const numContacts = (result.map(person => person.id)).length
  const todayDate = Date(Date.now())
  const dateString = todayDate.toString()
  const responseString = `Phonebook has info for ${numContacts} people. <br> ${dateString}`
  response.send(responseString)
  })
  
})

/*
app.get('/api/persons/:id', (request, response) => {
  Phonebook.find({id : Number(request.params.id)}).then(result => {
    result.forEach(person => response.json(person))
    mongoose.connection.close()

  })
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
  console.log('Inside Generate ID')
  Phonebook.find({}).then (result => {
    console.log('After phonebook.find, the results are ', result.length)
    maxId = result.length
    console.log('Next id should be ',maxId)
    return maxId + 1
  }) 
  
}
*/



app.post('/api/persons', (request, response) => {
  const body = request.body
  //const dupName = persons.filter(person => person.name === body.name)

  /*

if(!body.name || !body.number)
{
  return response.status(400).json({error: 'content missing'})
}

if(dupName.length > 0)
{
  return response.status(400).json({error: 'name must be unique'})
}
*/

const person = new Phonebook({
  name : body.name,
  number: body.number,
})

person.save().then(savedNote => {
  console.log('Saved note', savedNote)
  response.json(savedNote)
})

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

