const axios = require('axios');
const bcrypt = require('bcryptjs')

const { authenticate } = require('./middlewares');

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
      res.status(201).send(response)
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).send(err.message)
    })

}

function login(req, res) {
  // implement user login
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
