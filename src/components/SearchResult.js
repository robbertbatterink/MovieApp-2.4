import React, { Component }from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect  } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
import "../App.css";
import "./Search.css"

const MovieListItem = ({ value, onItemClick, id }) => (
  <li id={id} value={value} onClick={onItemClick}>{value}</li>
);

const MovieList = ({ items, ids, onItemClick }) => (
<div className="edit-list">
    <div className="movielist-items">
        <ul className="movie-items">
          {
          items.map((item, i) => <MovieListItem key={i} value={item} id={ids[i]} onItemClick={onItemClick}/>)
          }
        </ul>
    </div>
</div>
);

const UserListItem = ({ value, onClick }) => (
  <li onClick={onClick}>{value}</li>
);

const UserList = ({ items }) => (
<div className="edit-list">
    <div className="movielist-items">
        <ul className="movie-items">
          {
          items.map((item, i) => <UserListItem key={i} value={item}  />)
          }
        </ul>
    </div>
</div>
);

class SearchResult extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: '',
            redirect: false,
            redirectName: '',
            redirectID: '',
            movieLabel: 'display:none',
            userLabel: 'display:none',
            resultMovie: [],
            resultMovieID: [],
            resultUser: [],
            resultUserID: [],
        }
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleQuery = this.handleQuery.bind(this)
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.query !== prevProps.query) {
            let query = this.props.query
            console.log("hallo")
            this.setState({query: query})
            this.handleQuery(query)
        }
    }
    
        handleQuery(query) {
        axios.get('http://localhost:5000/api/searchuserandmovie?query=' + query)
                .then(response => {console.log(response)
                this.setState({resultMovie: [],
                resultUser: []});
            
                var myObj, x, y;
                myObj = response.data;
                if(response.data.error !== "true"){
                y = myObj[1].length;
                x = myObj[0].length;
                
                for(var i = 0; i < x; i++){
                    const { resultMovie, resultMovieID } = this.state;
                    const nextMovieState = [myObj[0][i].movie_name, ...resultMovie];
                    const nextMovieIDState = [myObj[0][i].movie_id, ...resultMovieID];
                    this.setState({resultMovie: nextMovieState, resultMovieID: nextMovieIDState})
                };
                
                for(var i = 0; i < y; i++){
                    const { resultUser } = this.state;
                    const nextUserState = [myObj[1][i].user_name, ...resultUser];
                    this.setState({resultUser: nextUserState})
                };
                console.log(this.state.resultMovie, this.state.resultUser)
            }
            })
    }
    
    onMovieClick = (e) => {
        console.log('ik ben hier');
        var name = e.target.getAttribute('value'); 
        var index = e.target.id;
        console.log(e.target.getAttribute('value'));
        this.setState({
            redirectName: name,
            redirectID: index,
            redirect: true
        })        
    }
    
    onUserClick = (e) => {
        
    }
    
    render() {
        const {resultMovie, resultUser, resultMovieID, redirect} = this.state;
        
        if(redirect){
            return <Redirect to={"/filminfo/"+this.state.redirectName+"/"+this.state.redirectID} />   
        }
        return(      
            <div id="container_results">
                <div class="movies">
                    <span class="badge">Found Movies:</span>
                    <MovieList items={resultMovie} ids={resultMovieID} onItemClick={this.onMovieClick} />
                </div>
                <div class="users">
                    <span class="badge">Found Users:</span>
                    <UserList items={resultUser} />
                </div>
            </div>           
        );
        }
    }


class Lists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
        }
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.query !== prevProps.query) {
            let query = this.props.query
            console.log("hallo")
            this.setState({query: query})
            //this.handleQuery(query)
        }
    }
    
    render() {
    return (
        <div class="feedItems_container">  
            <div class="feed">
                <h3><span class="badge">Search Results:</span></h3>
                    <div class="scrollbar feed_comments" id="style-2">
                        <SearchResult query={this.state.query}/>
                    </div>
                </div>
            </div>      
    );
    }
}

export default Lists


