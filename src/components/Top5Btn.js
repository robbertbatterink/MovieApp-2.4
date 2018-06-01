import React, { Component } from "react";

const Top5List = (props) => {
   return (
    <div class="pageBtn_container">
        <button type="button" onClick={props.top5List} >Your Top 5</button>
    </div>
    );
};

export default Top5List;