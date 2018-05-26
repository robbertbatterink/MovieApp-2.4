import React, { Component } from "react";

class Loginhandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = event => {
    //event.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);    
  }
  
  render() {   
      return (
      <div class = "feedItems_container" >
      <div className="Login">
		<form>
		 <input id="email"
		      	placeholder="E-mail"
            type="email"
            value={this.state.email}
            onChange={this.handleChange} />
        </form>
       <form>
         <input id="password"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange} />
        </form>
        <button type="button" onClick={this.handleSubmit} >Login!</button>  
      </div>
      </div>	
    );
  }
}
export default Loginhandler;
  