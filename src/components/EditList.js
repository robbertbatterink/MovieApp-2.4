import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const ListItem = ({ value, onClick, onItemClick }) => (
  <li onClick={onClick}>{value} <button type="button" value={value} className="close" aria-hidden="false" onClick={onItemClick}>&times;</button> </li>
);

const List = ({ items, onItemClick }) => (
<div className="edit-list">
    <div className="movielist-items">
        <ul className="movie-items">
          {
          items.map((item, i) => <ListItem key={i} value={item} onItemClick={onItemClick}/>)
          }
        </ul>
    </div>
</div>
);

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      movies: ['Shrek', 'Shrek 2', 'Shrek 3']
    };
  }

  onClick = () => {
    const { inputValue, movies } = this.state;
    if (inputValue) {
      const nextState = [inputValue, ...movies];
      this.setState({ movies: nextState, inputValue: '' });
    }
  }
  
  onDelete = (e) => {
      var array = [...this.state.movies];
      var index = array.indexOf(e.target.value);
      array.splice(index, 1);
      this.setState({movies: array});
  }
  
  onChange = (e) => this.setState({ inputValue: e.target.value });

  handleItemClick = (e) => {console.log(e.target.innerHTML)}

  render() {
    const { movies, inputValue } = this.state;
    return (
      <div>
        <input class="inputField" type="text" value={inputValue} onChange={this.onChange} />
        <button onClick={this.onClick}>Add</button>
        <List items={movies} onItemClick={this.onDelete} />
      </div>
    );
  }
}

const EditList = (props) => {   
    return (  
        <div className="feedItems_container">
        
            <div className="feed">
            <h3><span className="badge list-badge">Edit List:</span></h3>
            <Link to="/Users/Gerard"><button type="button" className="back-button" onClick={props.back} >Back</button></Link>
                <div className="scrollbar feed_comments" id="style-2">
                    <ListItems />
                </div>
            </div>
        </div>
        );
    };

export default EditList;

