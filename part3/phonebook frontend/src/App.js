import React, { useEffect, useState } from 'react'
import peopleServices from './services/people'

//component returns phonebook names
const People = ({phonebook, filter, handleDelete}) => {
  const phonebookFiltered = filter === '' ? phonebook : phonebook.filter(person => person.name === filter)
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {phonebookFiltered.map(person=>
          <li key={person.name}>
            {person.name}: {person.number}
            <button style={{marginLeft: "10px"}} onClick={()=>handleDelete(person.id)}>Delete</button>
          </li>
        )}
      </ul>
    </>
    ) 
  
}

//component with name number and submit button
const AddPerson = ({newName, newNumber, handleChange, handleSubmit}) => {
  return (
    <>
      <h4>Add Person</h4>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input id='name' value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input id='number' value={newNumber} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

//component to search by name
const SearchFilter = ({filter, onChange}) => {
  return(
    <>
      <h4>Search By Name</h4>
      <input id='search' value = {filter} onChange={onChange}/>
    </>
  )
}

//notification component
const Notification = ({message}) => {

  const notifyStyle = {
    border: '3px solid blue',
    borderRadius: 8,
    backgroundColor: 'grey',
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  if(message === null){
    return null
  }
  return(
    <div style = {notifyStyle}>
      <h5>{message}</h5>
    </div>
  )
}
//main app
const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: 911
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMsg, setNotificationMsg] = useState(null)

  //pre-load state with database
  const hook = () => {
    peopleServices.getPeople()
    .then(people => {
      setPersons(people)
    })
  }
  useEffect(hook, [])
  
  //trigger notification setTimeout

 useEffect(()=>{
    if(notificationMsg !== null){
      setTimeout(() => setNotificationMsg(null), 3000)
    }
  }, [notificationMsg])

  //delete person
  const handleDelete = (id) => {
    let name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}?`)){
      peopleServices.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id ))
      })
      .catch(error => {
        setNotificationMsg(`${name} already deleted`)
        peopleServices.getPeople()
          .then(people => {
            setPersons(people)
          })
      })
    }
  }

  //handleSubmit handles submitting new person
  const handleSubmit = (event) => {
    event.preventDefault()
    
    const filteredBook = persons.filter(person => person.name === newName)
    const newObj = {
      name: newName,
      number: newNumber
    }
    if(filteredBook.length===0){
      
      peopleServices.createPerson(newObj)
        .then((newPerson)=>{
          setNotificationMsg(`Added ${newPerson.name}`)
          setPersons(persons.concat(newPerson))
        })
      
      
    }else if(filteredBook.length > 0){
      if(window.confirm(`Duplicate name found: ${filteredBook[0].name}, replace number?`)){
        peopleServices.updatePerson(filteredBook[0].id, newObj)
          .then(newPerson => {
            //console.log(newPerson)
            setNotificationMsg(`Updated ${newPerson.name}`)
            setPersons(persons.map(person => person.id !== filteredBook[0].id ? person : newPerson))
          })
      }
      
    }
    setNewName(''); setNewNumber('')
  }

  const handleChange = (event) => {
    //event.target.id === 'name' ? setNewName(event.target.value) : setNewNumber(event.target.value) 
    switch (event.target.id) {
      case 'name':
        setNewName(event.target.value)
        break;
      case 'number':
        setNewNumber(event.target.value)
        break;
      case 'search':
        setFilter(event.target.value)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notificationMsg} />
      <SearchFilter filter = {filter} onChange = {handleChange}/>
      <AddPerson newName = {newName} newNumber = {newNumber} handleChange = {handleChange} handleSubmit = {handleSubmit}/>
      <People phonebook = {persons} filter={filter} handleDelete = {handleDelete} />
      
    </div>
  )
}

export default App