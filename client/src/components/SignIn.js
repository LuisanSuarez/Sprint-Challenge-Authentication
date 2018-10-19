import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class SignIn extends Component {
  state = {
    username: '',
    password: '',
    registered: false
  }


componentDidMount() {
  this.setState({ registered:false })
}
  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name] : value})
  }


  signIn = (event) => {
    event.preventDefault();
    let newUser = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department,
    }
    axios
    .post('http://localhost:3333/api/login', newUser)
    .then(res => {
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
      <form onSubmit={this.signIn}>
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
        <button> Sign In</button>
      </form>
    )
  }
}

export default SignIn
