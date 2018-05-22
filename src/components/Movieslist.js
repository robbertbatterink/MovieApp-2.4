import React from "react";

const getDetailPage = () => {
	console.log("Get Detail");
}
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
	<div class="movieList_container">

		<h3>Recently recommended</h3>
		<ul class="movie_list">

			<li>
				<div class="innerMovie">
					<div class="innerMovie_Image" onClick={getDetailPage}></div>
				</div>
			</li>
			<li>
				<div class="innerMovie im2">
					<div class="innerMovie_Image2" onClick={getDetailPage}></div>
				</div>
			</li>
			<li>
				<div class="innerMovie im3">
					<div class="innerMovie_Image3" onClick={getDetailPage}></div>
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
