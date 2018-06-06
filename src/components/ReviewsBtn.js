import React, { Component } from "react";

const Reviews = (props) => {
   return (
    <div class="pageBtn_container">
        <button type="button" onClick={props.reviewList} >Your Reviews</button>
    </div>
    );
};

export default Reviews;