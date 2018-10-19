import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')
    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3333/api/users', reqOptions)
      .then(response => {
        console.log(response);
        this.setState({ users: response.data })
      })
      .catch(err => {
        console.error(err);
        alert("You don't have access. Please sign in!")
        this.props.history.push('/signin')
      })
  }


  render() {
    return (
      <React.Fragment>
        {this.state.users.map(user => (
          <div>
          <h2>Username: {user.username}</h2>
          <h3>Deparment: {user.department}</h3>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default Users
