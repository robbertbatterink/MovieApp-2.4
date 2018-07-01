import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
  
class SearchPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            resultMovie: [],
            resultUser: []
        }
        this.handleQuery = this.handleQuery.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    
    handleQuery() {
        axios.get('http://localhost:5000/api/searchuserandmovie?query=' + this.state.query)
                .then(response => {console.log(response)
                this.setState({resultMovie: [],
                resultUser: []});
            
                var myObj, x, y;
                myObj = response.data;
                y = myObj[1].length;
                x = myObj[0].length;
                
                for(var i = 0; i < x; i++){
                    const { resultMovie } = this.state;
                    const nextMovieState = [myObj[0][i].movie_name, ...resultMovie];
                    this.setState({resultMovie: nextMovieState})
                };
                
                for(var i = 0; i < y; i++){
                    const { resultUser } = this.state;
                    const nextUserState = [myObj[1][i].user_name, ...resultUser];
                    this.setState({resultUser: nextUserState})
                };
            })
    }
    
      handleChange (event) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [event.target.name]: event.target.value });
  }
    render() {
        return(
                <div>
                    <h1>Search for friends and movies</h1>
                    <div>
                    <form>
                        <input type="text" name="query" value={this.state.query} onChange={this.handleChange} placeholder="search friends/movies" />
                    </form>
                    <button onClick={this.props.passQuery} value={this.state.query}>Search</button>
                    </div>
                </div>
        );
    }
}

export default SearchPage;


