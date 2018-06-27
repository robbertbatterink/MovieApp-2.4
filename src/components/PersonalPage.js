import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
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
        }
        
        this.handleUser = this.handleUser.bind(this)
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
      this.handleUser()
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
        <Logout />
        <Link to={"/Users/" + this.state.userID + "/List/Watched"}><Watched userID={this.state.userID}/></Link>
        <Link to={"/Users/" + this.state.userID + "/List/Top5"}><Top5List /></Link>
        <Link to={"/Users/" + this.state.userID + "/List/Reviews"}><Reviews /></Link>
        <Link to={"/Users/" + this.state.userID + "/List/Events"}><Events /></Link>
    </div>
        );
    }
    }
    };
export default Personal