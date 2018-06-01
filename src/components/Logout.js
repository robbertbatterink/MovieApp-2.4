import React from "react";

const Logout = (props) => {
   return (
    <div class="pageBtn_container">
        <button type="button" onClick={props.logout} >Logout</button>
    </div>
    );
};

export default Logout;


