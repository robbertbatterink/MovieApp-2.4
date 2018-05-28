import React from "react";

class Login extends React.Component {
    render() {
        return (
               <button onClick={this.props.action} >Login</button>
        )
    }
}
export default Login
