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

      <form><input className="inputLoginField"
            id="email"
			      placeholder="E-mail"
            type="email"
            value={email}
            onChange={this.handleChange} />
        </form>

       <form><input className="inputLoginField"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange} />
        </form>

      <form><input className="inputLoginField"
            id="firstName"
            type="firstName"
            placeholder="firstName"
            value={firstName}
            onChange={this.handleChange} />
        </form>

        <form><input className="inputLoginField" id="lastName"
            type="lastName"
            placeholder="lastName"
            value={password}
            onChange={this.handleChange} />
        </form>

        <button type="button" onClick={this.handleSubmit} >Registreer!</button>
      </div>
      </div>
    );

}




  export default RegisterView;
