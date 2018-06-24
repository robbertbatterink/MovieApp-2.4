import React, { Component }  from "react";
import { findDOMNode } from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from 'axios'
import PersonInfo from "./PersonPage";
import $ from 'jquery';

class Feedlist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            thisUser: true,
            userName: '',
            userID: ''
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
            this.setState({ userName: response.data.username, userID: response.data.userid});
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
                        <PersonInfo />
                    );
        }
        else {
      return(
  
	<div class="feedItems_container">
        
            <div class="feed">

		<h3><span class="badge">Personal Feed:</span></h3>
                <div class="scrollbar feed_comments" id="style-2">
		<ul class="feed_items">
                
			<li id="1" >
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <Link to="/Users/Gerard/Friends/Henk"><h4 class="media-heading">Henk</h4></Link>
                                      <p>comment met allemaal informatie </p>
                                </div>
                            </div>
			</li>
                        
			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Piet</h4>
                                      <p>comment met allemaal informatie</p>
                                </div>
                            </div>
			</li>
			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Jan</h4>
                                      <p>comment met allemaal informatie</p>
                                </div>
                            </div>
			</li>
                        			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Henk</h4>
                                      <p>comment met allemaal informatie </p>
                                </div>
                            </div>
			</li>
			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Piet</h4>
                                      <p>comment met allemaal informatie</p>
                                </div>
                            </div>
			</li>
			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Jan</h4>
                                      <p>comment met allemaal informatie</p>
                                </div>
                            </div>
			</li>
                        			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Henk</h4>
                                      <p>comment met allemaal informatie </p>
                                </div>
                            </div>
			</li>
			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Piet</h4>
                                      <p>comment met allemaal informatie</p>
                                </div>
                            </div>
			</li>
			<li>
                            <div class="media">
                                <div class="media-left">
                                    <div class="media-object person_image"></div>
                                </div>
                                <div class="media-body">
                                      <h4 class="media-heading">Jan</h4>
                                      <p>comment met allemaal informatie</p>
                                </div>
                            </div>
			</li>

		</ul>
                </div>
                </div>
	</div>
    )
    }
    };
    }
export default Feedlist

