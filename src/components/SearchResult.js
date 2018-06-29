import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types'                // needed for passing location parameters (Install dependency : "npm install -- save prop-types")
import { withRouter } from 'react-router'         // needed for passing location parameters
import "../App.css";

class SearchResult extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: props.query || '',
        }
    }
    render() {
        return(         
             <div class="feedItems_container">      
                <div class="feed">
                    <h3><span class="badge">Search Results:</span></h3>
                        <div class="scrollbar feed_comments" id="style-2">
                        <p>query: {this.state.query}</p>
                        </div>
                    </div>
                </div>           
        );
    }
}
export default SearchResult


