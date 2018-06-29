import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import MovieTeaserImage from "./MovieTeaserImage";


class Movieslist extends React.Component{
	constructor(props){
		super(props)
		this.state = {
				counter: 3 // use this counter to increment / decrement the amount of teaser recommendation movies to be displayed
		}
	}

	// This function makes it possible to dynamically adjust the amount of recommended movies to be displayed
	counterFunction(){
		let movieTeaserArray = []
		for (let i = 0; i < this.state.counter; i++) {
			movieTeaserArray.push(<MovieTeaserImage/>)
		}
		return (
			<div>
				<ul>
							 {movieTeaserArray.map(function(movie, index){
									 return <li key={ index }>{movie}</li>;
								 })}
					 </ul>
			</div>
		)
	} // end of counterFunction

		render() {
			return(
				<div className="movieList_container">

					<h3>Recently recommended</h3>
					<p>{this.counterFunction()}</p>
				</div>
			)
		}
}
export default Movieslist
