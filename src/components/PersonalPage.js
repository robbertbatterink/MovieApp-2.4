import React from "react";

const getPersonalPage = () => {
	console.log("Get Detail");
}

const Personal = props => (
    <div class="media">
        <div class="media-left">
            <div class="media-object person_image2"></div>
        </div>
        <div class="media-body person-info">
              <h4 class="media-heading">Gerard</h4>
              <p>Hallo Gerard! </p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting,</p>
              <p>remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    </div>

);
export default Personal