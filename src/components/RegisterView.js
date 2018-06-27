import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import "./RegisterView.css";
import axios from 'axios'

class RegisterView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        confirm: false,
        userName: '',
        email: '',
        password: '',
        bio: ''
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleGet = this.handleGet.bind(this)
    this.handlePost = this.handlePost.bind(this)
}

  handleGet () {
    axios.get('http://localhost:5000/Login')
      .then(response => console.log(response))
  }
  
  handlePost () {
	axios.post('http://localhost:5000/api/registreren', {
        "naam": this.state.userName, 
        "email": this.state.email, 
        "wachtwoord": this.state.password,
        "bio": this.state.bio
        }).then(response => { 
            if(response.data.error !== "True"){
              this.setState({ confirm: true});
                }
              console.log(response);
        })
        .catch(error => {
          console.log(error.response)
      });
  }
  
  handleChange (event) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
      const { confirm } = this.state;
      
      if (confirm) {
          return <Redirect to="/Login"/>;
      }
      return (
      <div class = "RegisterView" >
        <div className="Login">
            <div class="form">
                <form onSubmit={this.handlePost}>
                <table>
                    <tr> Username <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} /></tr>
                    <tr> E-mail: <input type="E-mail" name="email" value={this.state.email} onChange={this.handleChange}/></tr>
                    <tr> Wachtwoord: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></tr>
                    <tr> Bio: <input type="text" name="bio" value={this.state.bio} onChange={this.handleChange}/></tr>
                </table>
                </form>
                <button onClick={this.handlePost}>register</button>
            </div>
        </div>
      </div>
    );
  }
};

export default RegisterView;
