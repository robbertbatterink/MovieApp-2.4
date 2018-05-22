import React from "react";

const getLogout = () => {
  window.alert("Clicked on Logout button");
};

const Logout = () => (
    <div class="login_container">
        <button onClick={getLogout}>Logout</button>
    </div>
);

export default Logout;


