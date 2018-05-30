import React, { Component } from "react";

const Logout = (props) => {
   return (
    <div class="login_container">
        <button type="button" onClick={props.logout} >Logout</button>
    </div>
    );
};

export default Logout;


