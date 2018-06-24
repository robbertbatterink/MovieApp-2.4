import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from 'axios'

class Logout extends React.Component {
     constructor(props){
        super(props)
        this.state = {
            confirm: false
        }
        
        this.handleGet = this.handleGet.bind(this)
    }
    
    handleGet () {
    axios.get('http://localhost:5000/api/logout')
      .then(response => {if(response.data.error === "False"){
              this.setState({ confirm: true })
      }})
    }
    
    render() {
        const { confirm } = this.state;
      
        if (confirm) {
            return <Redirect to="/"/>;
        }
        
        return (
         <div class="pageBtn_container">
             <button type="button" onClick={this.handleGet} >Logout</button>
         </div>
         );
    }
};

export default Logout;


