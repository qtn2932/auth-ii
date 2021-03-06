import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    };
  }
  componentDidMount(){
    this.authenticate()
  }
  authenticate=() =>{
    const token= localStorage.getItem('stop_hacking');
    const options= {
      headers:{
        authorization: token
      }
    }
    if(token){
      axios.get('http://localhost:3300/api/users',options)
        .then((res)=>{
          if(res.status===200 && res.data){
            this.setState({loggedIn:true, users:res.data})
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
        <h1>Users</h1>
        <ol>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
