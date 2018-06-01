import React from "react";
import "./RegisterView.css";

const RegisterView = (props) => {
  const email = undefined
  const password = undefined
  const firstName = undefined
  const lastName = undefined

  //  const handleChange = event => {
  //     this.setState({[event.target.id]: event.target.value});
  //  }

  const handleSubmit = event => {    
    alert("a confirmation email has been sent")    
  }
    return (
      <div class = "RegisterView" >
      <div className="Login">
      <br></br>
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
            value={lastName}
            onChange={this.handleChange} />
        </form>

        <button type="button" onClick={handleSubmit} >Registreer!</button>
      </div>
      </div>
    );

}




  export default RegisterView;
