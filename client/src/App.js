import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Users from './components/Users.js'

class App extends Component {

  signOut = e => {
    e.preventDefault();
    localStorage.removeItem('jwt')
    alert("You've been signed out")
    this.props.history.push('/signin')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/users' component={Users} />
          <Link to='/signup'><div>Sign Up</div></Link>
          <Link to='/signin'><div>Sign In</div></Link>
          <Link to='/users'><div>Users</div></Link>
          <button onClick={this.signOut}>SignOut</button>

        </header>
      </div>
    );
  }
}

export default App
