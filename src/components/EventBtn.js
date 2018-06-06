import React, { Component } from "react";

const Events = (props) => {
   return (
    <div class="pageBtn_container">
        <button type="button" onClick={props.eventlist} >Your Events</button>
    </div>
    );
};

export default Events;


