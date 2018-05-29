import React from "react";
const MovieMetaData = (props) => {
	return (
		<div className="">
			 ReleaseDate :{props.metaReleaseDate}<br/>
			 Duration : {props.metaDuration}<br/>
			 Genre : {props.metaGenre}<br/>
			 PC : {props.metaPC} <br/><br/>
			 Description : {props.metaDescription}<br/>
		</div>
	)
};
export default MovieMetaData;
