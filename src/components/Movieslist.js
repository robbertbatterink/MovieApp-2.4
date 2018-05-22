import React from "react";

/*
const getDetailPage = () =>{
	const updatePage = React.createClass({
		getInitialState: function(){
			return { showResults: false};
		},
		onClick
	})

	<div id="MovieDetail">

		<p>Detail page : Lorem ipsum</p>

	</div>
};
*/
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


/**
<form onSubmit={props.getWeather}>
	<input type="text" name="city" placeholder="City..."/>
	<input type="text" name="country" placeholder="Country..."/>
	<button>Get Movie</button>
</form>
);

*/
