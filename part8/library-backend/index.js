const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'lovesasecret'

require("dotenv").config()
let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
    type Author {
        name: String!
        id: String!
        born: Int
        bookCount: Int 
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
    type User {
      username: String!
      favouriteGenre: String!
      id: ID!
    }
    type Token {
      value: String!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
          name: String!
          born: Int!
        ): Author
        createUser(
          username: String!
          favouriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {
          let booksToReturn = await Book.find({}).populate('author')
            if(!args.author && !args.genre){

              return booksToReturn
            }

            if(args.author) 
                booksToReturn = booksToReturn.filter(b => b.author === args.author)
             
            if(args.genre){
                booksToReturn = booksToReturn.filter(
                        (b) => b.genres.findIndex((g) => g == args.genre) !== -1
                )
            }

            return booksToReturn
        },
        allAuthors: async () => {
          const authors = await Author.find({})
          const books = await Book.find({}).populate('author')
            return authors.map((author) => {
                const bookCount = books.filter(b => b.author.name === author.name )

                return {
                    name: author.name,
                    id: author.id,
                    born: author.born,
                    bookCount: bookCount.length
                }
            })
        },
        me: (root, args, context) => {
          return context.currentUser
        }
        
    },
    Mutation: {
        addBook: async (root, args, context) => {
          if( !context.currentUser ) {
            throw new AuthenticationError('not logged in')
          }
          const authors = await Author.find({})

          if(authors.find(author => author.name === args.author) === undefined){
              let newAuthor = new Author({ name: args.author })

              try {
                await newAuthor.save()
              } catch (error) {
                throw new UserInputError(error.message, {
                  invalidArgs: args
                })
              }
          }
          const newAuthor = await Author.findOne({ name: args.author })

          const book = new Book({ ...args, author: newAuthor })
          return book.save()
        },
        editAuthor: async (root, args, context) => {
          if( !context.currentUser ) {
            throw new AuthenticationError('not logged in')
          }
          const author = await Author.findOne({ name: args.name })

          if(!author){
            return null
          }
          author.born = args.born
          return author.save()
        },
        createUser: async (root, args) =>{
          const user = new User({ 
            username: args.username,
            favouriteGenre: args.favouriteGenre
          })

          return user.save()
            .catch(error => {
              throw new UserInputError(error.message,  {
                invalidArgs: args
              })
            })
        },
        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })

          if( !user || args.password !== 'secret' ) {
            throw new UserInputError('wrong creds')
          }

          const userForToken = {
            username: user.username,
            id: user._id
          }

          return {
            value: jwt.sign( userForToken, JWT_SECRET )
          }
        }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})