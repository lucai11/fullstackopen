import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect( () => {
    async function fetchData() {
      const result = await axios(`${baseUrl}`)
      setResources(result.data)
    }
    fetchData()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const create = async (resource) => {
    const res = await axios.post(`${baseUrl}`, resource)
    console.log(resources)
    setResources([...resources, res.data])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div className='container'>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <Input {...name} /> <br/>
        number <Input {...number} />
        <Button type='submit'>create</Button>
      </form>
      <Table striped>
        <tbody>
          {persons.map(n => 
            <tr key={n.id}>
              <td>
                {n.name} {n.number}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App