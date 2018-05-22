import React from "react";
import './MovieDetail.css';
const MovieDetailText = (props) => {
	return (
		<div className="movieDetailText">

			{props.detailText}

		</div>
	)
};
export default MovieDetailText;
