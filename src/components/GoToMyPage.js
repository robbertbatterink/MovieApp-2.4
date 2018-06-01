import React from "react";

const getMyPage = () => {
  window.alert("Clicked on MyPage button");
};

const MyPage = props => (
    <div class="myPage_container">
        <button onClick={props.myPage}>My Page</button>
    </div>
);

export default MyPage

