require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(morgan('combined'))


const unknownEndpoint = (request, response)=> {
    response.status(404).send({error: 'unknown endpoint'})
}


app.use(express.json())


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

    return maxId+1

  }

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    //response.json(notes)
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const note = notes.find( note => note.id === id)
    
    if(note) {
        response.json(note)    
    } else {
        response.status(404).end()
    }
    
})

app.delete('/api/notes/:id', (request, response) => {
    //const id = Number(request.params.id)
    //notes = notes.filter(note => note.id !== id)

    //response.status(204).end()

    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.post('/api/notes', (request, response) => {
    
    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }


    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })



})

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})