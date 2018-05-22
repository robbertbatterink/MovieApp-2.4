import React, { Component } from "react";

class RegistreerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstname:"",
      lastname:""
    };
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = event => {  
    console.log("registratie succesvol");
  }

  render() {
    return (
      <div class = "feedItems_container" >
      <div className="Login">

      <form><input 
            id="email"
			      placeholder="E-mail"
            type="email"
            value={this.state.email}
            onChange={this.handleChange} />
        </form>

       <form><input 
            id="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange} />
        </form>

      <form><input 
            id="firstName"
            type="firstName"
            placeholder="firstName"
            value={this.state.firstName}
            onChange={this.handleChange} />
        </form>

        <form><input id="lastName"
            type="lastName"
            placeholder="lastName"
            value={this.state.password}
            onChange={this.handleChange} />
        </form>

        <button type="button" onClick={this.handleSubmit} >Registreer!</button>  
      </div>
      </div>
    );
  }
}


  
  
  export default RegistreerPage;
  