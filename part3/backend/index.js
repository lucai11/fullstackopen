require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
const password = process.argv[2]
const mongoose = require('mongoose')

const { response } = require('express')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.log('used')
  console.log(`errorHandler: ${error.message}`)

  if(error.name === 'CastError'){
    return response.status(400).send({
      error: 'malformed id'
    })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({
      error: error.message
    })
  }
  
  next(error)
}



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get(`/api/notes/:id`, (req, res, next)=>{
    const id = req.params.id
    //const note = notes.find(note => note.id === id)
    Note.findById(id).then(note => {
        if(note){
          res.json(note)
        } else {
          res.status(404).end()
        }
    })
    .catch(err => {
      console.log('caught')
      next(err) 
    })
    
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post(`/api/notes`, (request, response, next) => {
  const body = request.body

  if (!body.content) {
      return response.status(400).json({ 
      error: `content missing: ${JSON.stringify(body)}` 
      })
  }

  const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(err=>next(err))

})

app.put(`/api/notes/:id`, (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote)
    }).catch(err => next(err))
})

//old delete
// app.delete(`/api/notes/:id`, (req, res) => {
//     const id = Number(req.params.id)
//     notes = notes.filter(note => note.id !== id)

//     res.status(204).end()
// })

app.delete(`/api/notes/:id`, (req, res, next) => {
  Note.findByIdAndRemove(req.params.id).then( (result) => {
    res.status(204).end()
  }).catch(err => next(err))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})