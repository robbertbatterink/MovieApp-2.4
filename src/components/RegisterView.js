import React, { Component } from "react";
import "./RegisterView.css";

const RegisterView = (props) => {
  const email = undefined
  const password = undefined
  const firstName = undefined
  const LastName = undefined

  const handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  const handleSubmit = event => {
    console.log("registratie succesvol");
  }
    return (
      <div class = "RegisterView" >
        <div className="Login">
            <div class="form">
                <form action="http://localhost:5000/api/registreren" method="post">
                <table>
                    <tr> Voornaam: <input type="text" name="vnaam" /></tr>
                    <tr> Achternaam: <input type="text" name="anaam" /></tr>
                    <tr> E-mail: <input type="E-mail" name="email" /></tr>
                    <tr> Wachtwoord: <input type="password" name="ww" /></tr>
                    <tr><input className="button" type="submit" value="Registreer" /></tr>
                </table>
                </form>
            </div>
        </div>
      </div>
    );

}




  export default RegisterView;
