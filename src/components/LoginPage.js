import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import "./LoginPage.css";
import axios from 'axios'

class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        loginSuccesfull: false,
        userID: '',
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
              this.setState({error: response.data.error,title: response.data.title, message: response.data.message, username: response.data.username, userID: response.data.userid})
              if(response.data.error !== "True") {
                  this.setState({ loginSuccesfull: true})
              }

        })
        .catch(error => {
          console.log(error.response)
      });
  }
  render() {
      const { loginSuccesfull } = this.state;
      
      if (loginSuccesfull) {
          return <Redirect to={"/Users/"+ this.state.userID} />;
      }
      return (      
        <div className = "LoginPage" >
        <div>
        <div className="Login">
            <div class="form">
            <form onSubmit={this.handlePost}>
                <table>
                    <tr><td> E-mail: </td><td><input type="E-mail" name="email"  onChange={this.props.passUN}/></td></tr>
                    <tr><td> Wachtwoord: </td><td><input type="password" name="password" onChange={this.props.passPW}/></td></tr>
                </table>
            </form>
            <button onClick={this.props.login}>login</button>
            </div>
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
