import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./LoginPage.css";
import axios from 'axios'

class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        email: '',
        password: ''
    }
    
    
    this.handleChange = this.handleChange.bind(this)
    this.handleGet = this.handleGet.bind(this)
    this.handlePost = this.handlePost.bind(this)
}

   handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleGet () {
    axios.get('http://localhost:5000/')
      .then(response => this.setState({username: response.data.username}))
  }
  sendhData = (props) => {
                    var id = "5";
              this.props.sendData(id)
  }
  handlePost = () => {
	axios.post('http://localhost:5000/api/login', {
        "email": this.state.email, 
        "wachtwoord": this.state.password
        }).then(response => { 
              console.log(response)
              this.setState({error: response.data.error,title: response.data.title, message: response.data.message, username: response.data.username, userid: response.data.userid})

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
            <div class="form">
            <form onSubmit={this.handlePost}>
                <table>
                    <tr><td> E-mail: </td><td><input type="E-mail" name="email" value={this.state.email} onChange={this.handleChange}/></td></tr>
                    <tr><td> Wachtwoord: </td><td><input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></td></tr>
                </table>
            </form>
            <button onClick={this.handlePost}>login</button>
            <button onClick={this.sendhData}>send data</button>
            </div>
          <Link to="/Users/Gerard"><button type="button" onClick={this.handleGet} >Login!</button></Link>
        </div>
        <div>
        
        {this.state.title}<br/>
        {this.state.message}
        </div>
      </div>
    </div>
    )
  }
}
export default LoginPage;
