import React, { Component } from "react";
import "./RegisterView.css";
import axios from 'axios'

class RegisterView extends React.Component {
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
      <div class = "RegisterView" >
        <div className="Login">
            <div class="form">
                <form method="post">
                <table>
                    <tr> Voornaam: <input type="text" name="vnaam" /></tr>
                    <tr> Achternaam: <input type="text" name="anaam" /></tr>
                    <tr> E-mail: <input type="E-mail" name="email" /></tr>
                    <tr> Wachtwoord: <input type="password" name="ww" /></tr>
                    <tr><input className="button" type="submit" onClick={this.handlePost} value="Registreer" /></tr>
                </table>
                </form>
            </div>
        </div>
      </div>
    );
  }
};

export default RegisterView;
