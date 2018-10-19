import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');


class SignUp extends Component {
  state = {
    username: '',
    password: '',
    department: '',
    registered: false
  }

  componentDidMount() {
    this.setState({ registered:false })
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name] : value})
  }

  signUp = (e) => {
    e.preventDefault();
    let newUser = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department,
    }
    axios
    .post('http://localhost:3333/api/register', newUser)
    .then(res => {
        console.log('Axios SignIn - res:', res);
        if (res.data){
          localStorage.setItem('jwt', res.data.token)
          this.setState({ registered: true })
        }
        })
        .catch(error => {
          console.error('Server Error', error);
        });
  }

  render() {
    if (this.state.registered) {
     return <Redirect to='/users' />
   }
    return (
      <form onSubmit={this.signUp}>
        <label>Username</label>
        <input
          name='username'
          type='text'
          placeholder='username'
          value={this.state.username}
          onChange={this.handleChange}
          >
        </input>
        <label>Password</label>
        <input
          name='password'
          type='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handleChange}
          >
        </input>
        <label>Department</label>
        <input
          name='department'
          type='text'
          placeholder='department'
          value={this.state.department}
          onChange={this.handleChange}
          >
        </input>
        <button> Sign Up </button>
      </form>
    )
  }
}

export default SignUp
