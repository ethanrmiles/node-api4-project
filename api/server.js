const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

const Users = require('./user-model')

// | Method | URL           | Description                                                                                         |
//     | ------ | ------------- | ----------------------------------------------------------------------------------------------      |
//     | GET    | /api/users    | Returns an array users.                                                                             |
//     | POST   | /api/register | Creates a user from { username, password } in the `request body`, responds with newly created user. |
//     | POST   | /api/login    | Checks { username, password } in the `request body`, responds with a welcome message.               |

server.get('/', (req,res) => {
    Users.findAll()
    .then(user => {
        res.json(user)
    })
})

server.post('/api/register', (req, res) => {
    let newUser = req.body
    Users.create(newUser)
    .then(user => {
        res.status(201).json(user)
    })
})

server.post('/api/login', (req,res) => {
    let loginParam = req.body
    Users.login(loginParam)
    .then(user => {
        res.status(200).json({ message: 'Welcome!'})
    })
    .catch(err => {
        res.status(500).json({ message: 'oops! Something went wrong.'})
    })
})

module.exports = server