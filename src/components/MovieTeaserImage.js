import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'

class MovieTeaserImage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      movieThumbnail: '../img/thumbnail.jpg',
      movieID: 2,
      baseURL: 'test' // this changes after the getBaseURL function gets called inside the handleUser function
    }
    this.handleUser = this.handleUser.bind(this)
    this.getBaseURL = this.getBaseURL.bind(this)
} // end of state

// Creates the URL composition to go to the movie detail page. This needs to have the corresponding movie_id
getBaseURL() {
  const baseURL = '/api/filminfo/:'            // defines the static portion of the url to go to.
  //let movie_id = this.state.movieID            // this variable holds the 'old' state movieID value, which is (2)
                                              // this is the result variable. concats baseURL and movie_id to one string as a new URL
  let newURL = baseURL.concat(this.state.movieID)
  this.setState({baseURL: newURL})
  //return this.state.combinedURL

}

handleUser () {
let movieIDsubset = [1,8,9,6,4,10,11,12,7,13] // a subset of the current movieID's whichs are in use, and contain a link to a thumbnail.
let ranVar = movieIDsubset[Math.floor(Math.random() * movieIDsubset.length)]; // Generates a random number obtained from the movieIDsubset array


axios.get('http://localhost:5000/api/filminfo?movie_id=' + ranVar
    ).then(response => {
        console.log(response);
        this.setState({ movieThumbnail: response.data.movie_thumbnail})
        // Sets the state variable movieID to current value of ranVar. THIS needs to happen before the getBaseURL function gets called
        this.setState({movieID: response.data.movie_id})
        this.getBaseURL()
    })
    .catch(error => {
      console.log(error.response)
  });

}


// Initiates the handleUser function on componentDidMount time
// componentDidMount initiates BEFORE componentDidUpdate
componentDidMount() {
    this.handleUser()

}
  render() {
    let style = {
      backgroundColor: 'white',
    //background-image: url("../img/BohemianRapsody_teaser.jpg");
    //  backgroundImage: 'url("../img/BohemianRapsody_teaser.jpg")',
      width: '150px',
      height: '250px',
      cursor: 'pointer'
    }

    return (
      // the link object links currently to a static link provided in the state of this class
      <Link to={this.state.baseURL}>
      <div style={style}>
        <p>{this.state.movieID}</p>
        <img src={this.state.movieThumbnail} width="150" height="250"></img>
      </div></Link>
    )
  } // end of render

  }
export default MovieTeaserImage
