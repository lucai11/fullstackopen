import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = useQuery(ALL_BOOKS)
  if (response.loading) {
    return (<div></div>)
  }

  const books = [response.data.allBooks][0]
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
