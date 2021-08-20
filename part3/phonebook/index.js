const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./mongoose')
const Person = require ('./models/people')

let phonebook = require('./phonebook')


morgan.token('privatedata', function getId (req) {
    let data = JSON.stringify(req.body)
    
    return data
})
app.use(express.json())
app.use(morgan(':method :url :response-time :privatedata'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>home</h1>')
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${phonebook.length} people</p><br>${new Date()}`
    )
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

//original that searches through array
// app.get('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     let person = phonebook.find(person => person.id === id)
//     console.log(person)
//     if(person){
//         res.send(
//             `<h1>${person.name}</h1><br><h3>${person.number}</h3>`
//         )
//     }else{
//         res.status(404).end()
//     }
    
// })

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

//old post with arrays
// app.post('/api/persons', (request, response) => {
//     const body = request.body

//     if(!body.name || !body.number) {
//         return response.status(400).json({
//             error: 'name or number missing'
//         })
//     }
//     if(phonebook.find(person => person.name === body.name)){
//         return response.status(400).json({
//             error: 'name not unique'
//         })
//     }

//     const person = {
//         name: body.name,
//         number: body.number,
//         date: new Date(),
//         id: Math.round(Math.random()*10000)
//     }

//     phonebook = phonebook.concat(person)

//     response.json(person)
// })

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name){
        return res.status(400).json({
            error: `name missing`
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    res.status(204).end()
})
   
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})