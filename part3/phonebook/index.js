// eslint-disable-next-line no-unused-vars
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

const errorHandler = (err, req, res, next) => {
    if(err.name === 'ValidationError'){
        res.status(400).send({
            error: err.message
        })
    }
    next(err)
}

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


app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})



app.post('/api/persons', (req, res, next) => {
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
    }).catch( err => next(err) )
})

app.put(`/api/persons/:id`, (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    const opts = {
        new: true,
        runValidators: true,
        context: 'query'
    }
    Person.findOneAndUpdate( { _id: req.params.id }, person, opts)
        .then((updatedPerson) => {
            res.json(updatedPerson)
        }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        }).catch( err => next(err))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})