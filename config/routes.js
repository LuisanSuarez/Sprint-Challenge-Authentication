const axios = require('axios');
const bcrypt = require('bcryptjs')

const { authenticate, generateToken } = require('./middlewares');

const db = require('../database/dbConfig.js')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', users)
};

function register(req, res) {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  db('users')
    .insert(user)
    .then(response => {
      console.log(response);
      const token = generateToken(response)
      res.status(201).json({response, token})
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).json({message: err.message})
    })

}

function login(req, res) {
  const creds = req.body

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user)
        res.status(200).send({ welcome: creds.username, token })
      } else {
        res.status(401).send({ message: 'Unauthorized'})
      }
    })
    .catch(err => {
      console.error(err.message);
      res.status(400).send({ message: err.message })
    })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

// ******************
// ***Helpers*********
// ******************


function users(req, res) {
  db('users')
  .then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(400).send(err.message)
  })
}
