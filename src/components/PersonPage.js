import React from "react";

const getDetailPage = () => {
	console.log("Get Detail");
};

const PersonInfo = props => (        
        <div class="feedItems_container">
        
            <div class="feed">
                <div class="scrollbar feed_comments" id="style-2">
                    <div class="media">
                        <div class="media-left">
                            <div class="media-object person_image2"></div>
                        </div>
                        <div class="media-body person-info">
                            <div class="person-text">
                              <h4 class="media-heading">Henk</h4>
                              <p>Welkom op de pagina van Henk! </p>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                              <p>It has survived not only five centuries, but also the leap into electronic typesetting,</p>
                              <p>remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	</div>
    
);

export default PersonInfo;