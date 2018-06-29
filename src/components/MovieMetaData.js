import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
  

class MovieMetaData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieID: '',
            movieName: '',
            movieRunTime: '',
            movieDisc: '',
            movieCat: '',
            movieTrailerRT: '',
            movieReleaseDate: '',
            movieDateAdded: '',
            movieImagePath: '../img',
            movieTrailerURL: 'test movieTrailerURL',
            location: props.location.pathname         // holds the current location parameter
        }
        this.getLastNumberOfString = this.getLastNumberOfString.bind(this)
        this.getMovieData = this.getMovieData.bind(this)
    }
    
    static propTypes = {
      match: PropTypes.object.isRequired,         // The match parameter for match location paths.
      location: PropTypes.object.isRequired,      // The location parameter for holding the current location pathname
      history: PropTypes.object.isRequired        // The history parameter for holding the last visited locations
    }
    
    getCurrentPath(){
    const { match, location, history } = this.props // retrieves the static propTypes
    this.setState({location: location.pathname})    // sets the state with the location pathname
    this.getLastNumberOfString(this.state.location)
  }

// this function constructs the new image url
  getCurrentMovieImagePath(){
    let currentLocation = this.state.location;    // this is the beginning parth of the new image url that does not change.

    console.log(currentLocation);

    this.setState({movieImagePath: ''})
    console.log(this.state.movieImagePath);
  }

  componentDidMount() {
    this.getCurrentPath()
    this.getCurrentMovieImagePath()

  }
  
getLastNumberOfString(str){
  var allNumbers = str.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
  console.log(parseInt(allNumbers[allNumbers.length - 1], 10));
  let id = parseInt(allNumbers[allNumbers.length - 1], 10);
  this.setState({movieID: id});
  this.getMovieData(id);
  return id;
}

getMovieData(id) {
    axios.get('http://localhost:5000/api/filminfo?movie_id=' + id)
        .then(response => this.setState({movieName: response.data.movie_name,
            movieRunTime: response.data.movie_runtime,
            movieDisc: response.data.movie_description,
            movieCat: response.data.movie_category,
            movieTrailerRT: response.data.movie_trailer_runtime,
            movieReleaseDate: response.data.movie_release_date,
            movieDateAdded: response.data.movie_added_date,}))
}
    
    render() {
	return (
                <div>
                <div>
                    <h1>{this.state.movieName}</h1><br/>
                </div>
		<div className="">
			 ReleaseDate : {this.state.movieReleaseDate}<br/>
			 Duration : {this.state.movieRunTime} Min<br/>
			 Genre : {this.state.movieCat}<br/>
                         <br/><br/><br/>
                         <h3>Description :</h3><br/> {this.state.Disc}<br/>
		</div>
                </div>
	)
    }
};

export default withRouter(MovieMetaData);
