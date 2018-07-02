import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
import axios from 'axios'

class PersonInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userName: '',
            userID: '',
            userBIO: '',
            location: props.location.pathname,
        }
        
        this.getCurrentPath = this.getCurrentPath(this)
    }
    static propTypes = {
      match: PropTypes.object.isRequired,         // The match parameter for match location paths.
      location: PropTypes.object.isRequired,      // The location parameter for holding the current location pathname
      history: PropTypes.object.isRequired        // The history parameter for holding the last visited locations
    }
    
    getCurrentPath(){
        const { match, location, history } = this.props // retrieves the static propTypes
        this.setState({location: location.pathname})    // sets the state with the location pathname
        console.log(this.state.location)
        this.getLastNumberOfString(this.state.location)
    }
    
    getLastNumberOfString(str){
        var allNumbers = str.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
        console.log(parseInt(allNumbers[allNumbers.length - 1], 10));
        let id = parseInt(allNumbers[allNumbers.length - 1], 10);
        this.setState({otherUserID: id});
        //this.handleUser(id);
        this.getUserData(id);
        return id;
    }
    
    getUserData(id) {
    axios.get('http://localhost:5000/api/gebruiker?user_id=' + id)
        .then(response => this.setState({ userName: response.data.username, userBIO: response.data.userbio, userID: response.data.userid }))
    }
    
    componentDidMount() {
      this.getCurrentPath
      //this.handleUser()
    }
  
     render() {
         return(
        <div class="feedItems_container">
        
            <div class="feed">
                <div class="scrollbar feed_comments" id="style-2">
                    <div class="media">
                        <div class="media-left">
                            <div class="media-object person_image2"></div>
                        </div>
                        <div class="media-body person-info">
                            <div class="person-text">
                              <h4 class="media-heading">{this.state.userName}</h4>
                              <p>Welkom op de pagina van {this.state.userName}! </p>
                              <p>{this.state.userBIO}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	</div>
        )
     }
    }
    
    
export default withRouter(PersonInfo);
