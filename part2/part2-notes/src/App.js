import React, { useEffect, useState } from 'react'
import Note from './components/Note'
//import axios from 'axios'
import noteService from './services/notes'

const App = (props) => {

  const [notes, setNotes]  = useState(props.notes)
  const [newNote, setNewNote] = useState('new note')
  const [showAll, setShowAll] = useState(false)
  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      
      content: newNote,
      date: 'January 1st',
      important: false
    }
    try{
      noteService.create(noteObj)
        .then(response => {
          setNotes(notes.concat(response))
          setNewNote('')
        })
    }catch (error){
      console.error(error.response)
    }
    
  }

  const handleNoteInputChange = (event) =>{
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))
      })

  }
  const getNotes = () => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(getNotes, [])
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance = {() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value = {newNote} onChange = {handleNoteInputChange}/>
        <button type="submit">save</button>
      </form> 
      <button onClick={toggleShowAll}>Show All</button>
    </div>
  )
}

export default App