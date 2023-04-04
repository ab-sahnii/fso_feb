const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    order: Number,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Phonebook', phonebookSchema)



/*
if(process.argv.length === 3){
    console.log(`Phonebook:`)
    Phonebook.find({}).then(result => {
        
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number} `)
        })
        mongoose.connection.close()
    })
}

if(process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4] 
    
    const entry = new Phonebook({
        name: name,
        number: number,
    })
    
    entry.save().then(result => {
        console.log(`added ${name} ${number} to pheonbook`)
        mongoose.connection.close()
    })
    
}
*/




