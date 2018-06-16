import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./LoginPage.css";
import axios from 'axios'

class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        username: ''
    }
    this.handleGet = this.handleGet.bind(this)
    this.handlePost = this.handlePost.bind(this)
}

  handleGet () {
    axios.get('http://localhost:5000/')
      .then(response => this.setState({username: response.data.username}))
  }
  
  handlePost () {
	axios.post('http://localhost:5000/api/registreren', {
        "naam": "barry", 
        "email": 'barrybatsbak@hotmail.com', 
        "wachtwoord": "geheimpje"
        }).then(response => { 
              console.log(response)
        })
        .catch(error => {
          console.log(error.response)
      });
  }
  render() {
      return (      
        <div className = "LoginPage" >
        <div>
        <div className="Login">
        <form>
          <input className="inputLoginField" id="email"
                 placeholder="E-mail"
                 type="email"/>
            
            
              <input className="inputLoginField" id="password"
                    type="password"
                    placeholder="password"/>
            </form>
          <Link to="/Users/Gerard"><button type="button" onClick={this.handleGet} >Login!</button></Link>
        </div>
      </div>
    </div>
    )
  }
}
export default LoginPage;
