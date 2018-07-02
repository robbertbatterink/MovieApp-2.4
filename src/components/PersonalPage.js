import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
import axios from 'axios'
import PersonMovie from "./PersonMovie";
import Logout from "./Logout";
import Events from "./EventBtn";
import Reviews from "./ReviewsBtn";
import Top5List from "./Top5Btn";
import Watched from "./WatchedBtn";

class Personal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            thisUser: true,
            userName: '',
            userID: '',
            userBIO: '',
            location: props.location.pathname,         // holds the current location parameter
        }
        
        this.handleUser = this.handleUser.bind(this)
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
        this.setState({userID: id});
        this.getUserData(id);
        console.log("test")
        return id;
    }
    
    getUserData(id) {
    axios.get('http://localhost:5000/api/gebruiker?user_id=' + id)
        .then(response => this.setState({ userName: response.data.username, userBIO: response.data.userbio, userID: response.data.userid}))
}
    
    handleUser () {
	axios.post('http://localhost:5000/api/gebruiker'
        ).then(response => { 
            console.log(response);
            if(response.data.message === "False"){
                this.setState({ thisUser: false })
            } else {
            this.setState({ userName: response.data.username, userID: response.data.userid, userBIO: response.data.userbio});
            }
        })
        .catch(error => {
          console.log(error.response)
      });
  }
  
  componentDidMount() {
      this.getCurrentPath
      //this.handleUser()
  }
  
    render() {
        const { thisUser } = this.state;
      
        if (!thisUser) {
            return (
                    <div>
                        <PersonMovie />
                    </div>
                    );
        }
        else {
        return (
    <div>
        <div class="media">
            <div class="media-left">
                <div class="media-object person_image2"></div>
            </div>
            <div class="media-body person-info">
                  <h4 class="media-heading">{this.state.userName}</h4>
                  <p>Hallo {this.state.userName}!</p>
                  <p>{this.state.userBIO}</p>
            </div>
        </div>
        
        <Link to={"/Users/" + this.state.userID + "/List/Watched"}><Watched userID={this.state.userID}/></Link>
        <Link to={"/Users/" + this.state.userID + "/List/Top5"}><Top5List /></Link>
        <Link to={"/Users/" + this.state.userID + "/List/Reviews"}><Reviews /></Link>
        <Link to={"/Users/" + this.state.userID + "/List/Events"}><Events /></Link>
    </div>
        );
    }
    }
    };
export default withRouter(Personal)