import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//<button type="button" value={value} className="close" aria-hidden="false" onClick={onItemClick}>&times;</button> 
const ListItem = ({ value, onItemClick, id }) => (
  <li id={id} value={value} onClick={onItemClick}>{value} </li>
);

const List = ({ items, onItemClick, ids }) => (
<div className="edit-list">
    <div className="movielist-items">
        <ul className="movie-items">
          {
          items.map((item, i) => <ListItem key={i} value={item} id={ids[i]} onItemClick={onItemClick}/>)
          }
        </ul>
    </div>
</div>
);

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match)
    this.state = {
      redirect: false,
      userID: '',
      inputValue: '',
      resultMovie: [],
      resultMovieID: [],
    };
  }

//  onClick = () => {
//    const { inputValue, movies } = this.state;
//    if (inputValue) {
//      const nextState = [inputValue, ...movies];
//      this.setState({ movies: nextState, inputValue: '' });
//    }
//  }
//  
//  onDelete = (e) => {
//      var array = [...this.state.movies];
//      var index = array.indexOf(e.target.value);
//      array.splice(index, 1);
//      this.setState({movies: array});
//  }
  
  componentDidMount(){
      this.handleUser();
     //this.handleMovies('Watched')
  }
//        <input class="inputField" type="text" value={inputValue} onChange={this.onChange} />
//        <button onClick={this.onClick}>Add</button>
    handleUser () {
	axios.post('http://localhost:5000/api/gebruiker'
        ).then(response => { 
            console.log(response);
            if(response.data.error === "true"){
                this.setState({ thisUser: false })
            } else {
                this.setState({ userName: response.data.username, userID: response.data.userid});              
            }
            this.getMovieList();
        })
        .catch(error => {
          console.log(error.response)
      });
  }
    getMovieList() {
        axios.get('http://localhost:5000/api/status/bekeken?user_id=' + this.state.userID)
            .then(response => {console.log(response);
            this.setState({resultMovie: []});
            var myObj, x;
            myObj = response.data;
            if(response.data.error !== 'true'){
                x= myObj.length
                for(var i = 0; i < x; i++){
                    const { resultMovie, resultMovieID } = this.state;
                    const nextMovieState = [myObj[i].movie_name, ...resultMovie];
                    const nextMovieIDState = [myObj[i].movie_id, ...resultMovieID];
                    this.setState({resultMovie: nextMovieState, resultMovieID: nextMovieIDState})
                }
                console.log(this.state.resultMovie)
            }
            
        })
        
    }
    
    onMovieClick = (e) => {
        var name = e.target.getAttribute('value'); 
        var index = e.target.id;
        this.setState({
            redirectName: name,
            redirectID: index,
            redirect: true
        })        
    }
  
  onChange = (e) => this.setState({ inputValue: e.target.value });

  handleItemClick = (e) => {console.log(e.target.innerHTML)}

  render() {
    const {resultMovie, resultMovieID, redirect} = this.state;
        
        if(redirect){
            return <Redirect to={"/filminfo/"+this.state.redirectName+"/"+this.state.redirectID} />   
        }
    return (
      <div>
        <List items={resultMovie} ids={resultMovieID} onItemClick={this.onMovieClick} />
      </div>
    );
  }
}

const getUserID = ({ match }) => {
    this.setState({userID: match.params.userID})
}

class EditList extends React.Component {  
        constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
    return (  
        <div className="feedItems_container">
        
            <div className="feed">
            <h3><span className="badge list-badge">Edit List:</span></h3>
            <Link to={"/Users/" + this.state.userID}><button type="button" className="back-button" >Back</button></Link>
                <div className="scrollbar feed_comments" id="style-2">
                    <ListItems />
                </div>
            </div>
        </div>
        );
    };
    };

export default EditList;

