import React, { Component } from "react";
import "./LoginPage.css";

const LoginPage = (props) => {
  //const checkBool = props.checkBoolean
  const email = undefined
  const password = undefined

  let handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  let handleSubmit = event => {
    //event.preventDefault();
  //  console.log(this.state.email);
  //  console.log(this.state.password);
  };
    return (
      <div className = "LoginPage" >
        <div>
        <div className="Login">
        <form>
          <input className="inputLoginField" id="email"
                 placeholder="E-mail"
                 type="email"
                 value={email}
                 onChange={handleChange} />
            </form>
            <form>
              <input className="inputLoginField" id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handleChange} />
            </form>
          <button type="button" onClick={this.handleSubmit} >Login!</button>
        </div>
      </div>
    </div>

      );
    }
export default LoginPage;
