const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(session({
  name: 'something catchy',
  secret: 'do not set here',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false, // Needs to be true in production!!!!!!
    httpOnly: true // Should always be set to true
  },
  resave: false,
  saveUninitialized: false, // GOVT Regulation states this needs to be false, client must agree for GDDR Compliance
  store: new KnexSessionStore({
    knex: db,
    createTable: true
  })
}))

server.use('/', () => {
  res.status(200).json({ message: 'Working' })
})

module.exports = server