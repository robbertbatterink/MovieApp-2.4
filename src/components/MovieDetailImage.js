// Date last modified : 29-06-2018

import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters

class MovieDetailImage extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        movieID: 'f',
        movieThumbnail: '',
        movieTrailerURL: 'test movieTrailerURL',
        location: props.location.pathname,         // holds the current location parameter
        playButton: '../img/play.png',
      } // end of state
      this.getLastNumberOfString = this.getLastNumberOfString.bind(this)
  } // end of constructor

  static propTypes = {
      match: PropTypes.object.isRequired,         // The match parameter for match location paths.
      location: PropTypes.object.isRequired,      // The location parameter for holding the current location pathname
      history: PropTypes.object.isRequired        // The history parameter for holding the last visited locations
    }

  // This function retrieves the current pathname, it uses the static propTypes defined above and sets the state with the retrieved location parameter.
  getCurrentPath(){
    const { match, location, history } = this.props // retrieves the static propTypes
    this.setState({location: location.pathname})    // sets the state with the location pathname
    this.getLastNumberOfString(this.state.location)
    //console.log(this.state.location);
  }

// this function constructs the new image url
getLastNumberOfString(str){
  let allNumbers = str.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
  let id = parseInt(allNumbers[allNumbers.length - 1], 10);
  this.setState({movieID: id})
  return parseInt(allNumbers[allNumbers.length - 1], 10);
}

getMovieData () {
  axios.get('http://localhost:5000/api/filminfo?movie_id=' + this.state.movieID
      ).then(response => {
          console.log(response);
          this.setState({ movieThumbnail: response.data.movie_thumbnail,
                          movieTrailerURL: response.data.movie_trailer,
                        })
      })
      .catch(error => {
        console.log(error.response)
    });
  }

  componentWillMount() {
    this.getCurrentPath()

    //this.getLastNumberOfString()
  }

  componentDidMount() {
    this.getMovieData()
  }

  render() {
    this.getMovieData
    let style = {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${this.state.movieThumbnail})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'

    }
    const innerStyle = {
      width: '100%',
      height: '100%',
      opacity: '0.7',
      backgroundColor: '#000',
      paddingTop: '350px'
    }

    const playButton = {
      cursor: 'pointer'
    }

    return (
    <div className="" style={style}>
      <div style={innerStyle}>
      <a href={this.state.movieTrailerURL} target="_new"><img style={playButton} src="../../img/play.png"></img></a>
      </div>
    </div>
  )} // end of render
}

export default withRouter(MovieDetailImage)