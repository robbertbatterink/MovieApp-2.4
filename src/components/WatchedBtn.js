import React, { Component } from "react";

const Watched = (props) => {
   return (
    <div class="pageBtn_container">
        <button type="button" onClick={props.watchedList} >Your watched movies</button>
    </div>
    );
};

export default Watched;