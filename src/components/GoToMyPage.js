import React from "react";

const getMyPage = () => {
  window.alert("Clicked on MyPage button");
};

const MyPage = () => (
    <div class="myPage_container">
        <button onClick={getMyPage}>My Page</button>
    </div>
);

export default MyPage

