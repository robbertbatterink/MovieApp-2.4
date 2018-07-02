import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
import "./MMD.css";
  

class MovieMetaData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLoggedIn: true,
            buttonState: 2,
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
        this.handleUser = this.handleUser.bind(this)
        this.rateMovieUp = this.rateMovieUp.bind(this)
        this.rateMovieDown = this.rateMovieDown.bind(this)
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
    this.handleUser()

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

    handleUser () {
	axios.post('http://localhost:5000/api/gebruiker'
        ).then(response => { 
            console.log(response);
            if(response.data.error === "true"){
                this.setState({ userLoggedIn: false })
            } else {
                this.setState({ userName: response.data.username, userID: response.data.userid, userLoggedIn: true});              
            }
            this.getMovieList();
        })
        .catch(error => {
          console.log(error.response)
      });
  }
  
  rateMovieUp() {
      this.setState({buttonState: 1})
      axios.post('http://localhost:5000/api/registreerrating', {
          "movie_id": this.state.movieID,
          "rating": this.state.buttonState,
      }).then(response => {console.log(response)         
        })
  }
  
  rateMovieDown() {
    this.setState({buttonState: 0})
      axios.post('http://localhost:5000/api/registreerrating', {
          "movie_id": this.state.movieID,
          "rating": this.state.buttonState,
      }).then(response => {console.log(response)         
        }).catch(error => {
            console.log(error.response)
});
  }
  
  addWatched() {
      axios.post('http://localhost:5000/api/registreerstatus', {
          "movie_id": this.state.movieID,
          "status": "watched"
      }).then(response => {
        console.log(response)  
      }).catch(error => {
            console.log(error.response)
        });
  }
    
    render() {
	return (
                <div>
                <div>
                    <h1>{this.state.movieName}</h1><br/>
                </div>
		<div className="container">
			 ReleaseDate : {this.state.movieReleaseDate}<br/>
			 Duration : {this.state.movieRunTime} Min<br/>
			 Genre : {this.state.movieCat}<br/>
                         <br/><br/><br/>
                         <h3>Description :</h3><br/> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla paria"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."tur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."{this.state.Disc}<br/>
		</div>
                <Buttons userLoggedIn={this.state.userLoggedIn} watched={this.addWatched} upvote={this.rateMovieUp} downvote={this.rateMovieDown}/>
                </div>
	)
    }
};

const Buttons = (props) => {
    if(props.userLoggedIn === true){
        return (<div className="buttons">
        <button onclick={props.watched} >Add to Watched!</button> 
        <button value={1} onClick={props.upvote}>Like</button>
        <button value={0} onClick={props.downvote}>Dislike</button>
        </div>)
    } 
}

export default withRouter(MovieMetaData);
