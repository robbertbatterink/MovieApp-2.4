import React from "react";

const getLogin = () => {
  window.alert("Clicked on login button");
};

const getRegister = () => {
  window.alert("Clicked on Register button");
};

const getLogout = () => {
  window.alert("Clicked on Logout button");
};

const Login = () => (
	<div class="login_container">
	<button onClick={getLogin}>Login</button>
  <button onClick={getRegister}>Register</button>
	</div>
);

const Logout = () => (
    <div class="login_container">
        <button onClick={getLogout}>Logout</button>
    </div>
);

export default Login;
