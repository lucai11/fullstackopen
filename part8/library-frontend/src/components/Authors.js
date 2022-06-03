import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [ yob, setYob ] = useState('')
  
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useQuery(ALL_AUTHORS)
  if (data.loading) {
    return (<div></div>)
  }

  const authors = data.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()
    const born = parseInt(yob)
    updateAuthor({ variables: { name, born }})

    setYob('')
    setName('')
  }

  const options = authors.map( (a) => ({
    value: a.name,
    label: a.name
  }))
 

  return (
    <div>
      <div>
        <div>
          <h2>authors</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit = {handleSubmit}>
          <Select 
            onChange = { (newname) => setName(newname.value) }
            options = { options } 
          />
          born
          <input
            value={yob}
            onChange={({ target }) => setYob(target.value)}
          />
          <button type="submit">
            update author
          </button>
        </form>
      </div>
    </div>
  )
}

export default Authors
