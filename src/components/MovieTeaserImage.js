// Author           : Sietze Min
// Date of creation : 26-06-2018
// Last modified    : 27-06-2018/15:19:10
// Description      : This component represents an individual MovieTeaserImage, which displays in the bottom right corner of the right part.
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'

class MovieTeaserImage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      movieThumbnail: '../img/thumbnail.jpg',
      movieID: 2,
      movieName: '',
      inputValue: '',
      baseURL: 'test', // this changes after the getBaseURL function gets called inside the getMovieData function
      movieIDArray: [], // this array needs to hold all the active movie_id's.
      fillMovieIDBool: false
    } // end of state
    this.getMovieData = this.getMovieData.bind(this)
    this.getBaseURL = this.getBaseURL.bind(this)
    this.fillMovieIDArray = this.fillMovieIDArray.bind(this)

} // end of constructor

// Creates the URL composition to go to the movie detail page. This needs to have the corresponding movie_id
getBaseURL() {
  const baseURL = '/api/filminfo/'                      // defines the static portion of the url to go to.
  let secondURL = baseURL.concat(this.state.movieName)  // Adds the corresponding movie name to the URL
  let newURL = secondURL.concat(this.state.movieID)     // Adds the corresponding movie ID to the URL
  this.setState({baseURL: newURL})                      // Sets the state to the newly created URL
}

// This function fills an array with all the movie ID's that are in use in the datababse.
// This needs to happen because, all the movie id's are needed to correctly handle the getMovieData function
fillMovieIDArray = () => {
  let retrievedData = undefined // test variable
  axios.get('http://localhost:5000/api/getmovieid').then(
    response => {

      for (var i = 0; i < response.data.length; i++) {
        this.setState({inputValue: response.data[i].movie_id})
        const {inputValue, movieIDArray} = this.state;
        const nextState = [inputValue, ...movieIDArray];
        this.setState({movieIDArray: nextState, inputValue: ''});

      } // end of the for loop
    //  this.setState({fillMovieIDBool: true})
    this.getMovieData()
      console.log(this.state.movieIDArray);
    }) // end of axios request
    .catch(error => {
      console.log(error.response);
    })
} // end of fillMovieIDArray


getMovieData () {
  let ranVar = this.state.movieIDArray[Math.floor(Math.random() * this.state.movieIDArray.length)]; // Generates a random number obtained from the movieIDsubset array
  //add second axios get request to only retrieve the movie id corresponding the corret film. so no local array is needed
  axios.get('http://localhost:5000/api/filminfo?movie_id=' + ranVar
      ).then(response => {
          console.log(response);
          this.setState({ movieThumbnail: response.data.movie_thumbnail,
                          // Sets the state variable movieID to current value of ranVar. THIS needs to happen before the getBaseURL function gets called
                          movieID: response.data.movie_id,
                          movieName: response.data.movie_name
                        })
          this.getBaseURL() // This call to this function needs to happend after the first call to the getMovieData() function
      })
      .catch(error => {
        console.log(error.response)
    });
}


// Initiates the getMovieData function on componentDidMount time
// componentDidMount initiates BEFORE componentDidUpdate
componentDidMount() {
    this.fillMovieIDArray()

}
  render() {
    let style = {
      backgroundColor: 'white',
      width: '150px',
      height: '250px',
      cursor: 'pointer'
    }

    return (
      // the link object links currently to a static link provided in the state of this class
      <Link to={this.state.baseURL}>
      <div style={style}>

        <img src={this.state.movieThumbnail} width="150" height="250"></img>
      </div>
    </Link>
    )
  } // end of render

  }
export default MovieTeaserImage
