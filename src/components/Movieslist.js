import React from "react";

const Movieslist = props => (
	<div className="movieList_container">

		<h3>Recently recommended</h3>
		<ul className="movie_list">

			<li>
				<div className="">
					<div className="innerMovie_Image" onClick={props.click}></div>
				</div>
			</li>
			<li>
				<div className="">
					<div className="im2" onClick={props.click}></div>
				</div>
			</li>
			<li>
				<div className="">
					<div className="im3" onClick={props.click}></div>
				</div>
			</li>

		</ul>

	</div>
);

export default Movieslist
