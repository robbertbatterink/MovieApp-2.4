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
                    <tr><td>Voornaam: </td><td><input type="text" name="vnaam" /></td></tr>
                    <tr><td> Achternaam: </td><td><input type="text" name="anaam" /></td></tr>
                    <tr><td> E-mail: </td><td><input type="E-mail" name="email" /></td></tr>
                    <tr><td> Wachtwoord: </td><td><input type="password" name="ww" /></td></tr>
                    </table>
                    <input className="button" onClick={handleSubmit} value="Registreer" />
                </form>
            </div>
        </div>
      </div>
    );

}




  export default RegisterView;
