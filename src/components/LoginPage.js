import React from "react";
import "./LoginPage.css";

const LoginPage = (props) => {
  //const checkBool = props.checkBoolean
  const email = undefined
  const password = undefined

  //  let handleChange = event => {
  //    this.setState({[event.target.id]: event.target.value});
  //  }
    return (
      <div className = "LoginPage" >
        <div>
          <div className="Login">
            <br></br>
          <form>
            <input className="inputLoginField" id="email"
                 placeholder="E-mail"
                 type="email"
                 value={email}
                 onChange={this.handleChange} />
          </form>
          <form>
              <input className="inputLoginField" id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={this.handleChange} />
          </form>
          <button type="button" onClick={props.toggleAccount} >Login!</button>
        </div>
      </div>
    </div>
      );
    }
export default LoginPage;
