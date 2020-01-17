const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(session(sessionConfig))

server.use('/', () => {
  res.status(200).json({ message: 'Working' })
})

module.exports = server