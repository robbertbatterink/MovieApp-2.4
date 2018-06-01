import React from 'react';

const LeftImage = (props) => {
	const imgUrl = 'http://localhost:3000/static/media/BohemianRapsody_full.f80decef.jpg'
	const divStyle = {
		backgroudColor: '#000 !important',
		backgroundImage: 'url(' + imgUrl + ')',

	};
	return (

		<div style="{props.checkMetaBool ? divStyle : null }" className="col-xs-5 title-container">
			<div id="MovieDetail">
				<div className="content_placeholder">


				</div>
			</div>
		</div>

	)
};

export default LeftImage;
  // background: url("img/bg2.jpg") center center no-repeat;
