import React, { Component } from "react";
import ReactDOM from "react-dom";

const ListItem = ({ value, onClick }) => (
  <li onClick={onClick}>{value}</li>
);

const List = ({ items, onItemClick }) => (
<div className="edit-list">
    <div className="movielist-items">
        <ul className="movie-items">
          {
            items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
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
      const nextState = [...movies, inputValue];
      this.setState({ movies: nextState, inputValue: '' });
    }
  }

  onChange = (e) => this.setState({ inputValue: e.target.value });

  handleItemClick = (e) => {console.log(e.target.innerHTML)}

  render() {
    const { movies, inputValue } = this.state;
    return (
      <div>
        <List items={movies} onItemClick={this.handleItemClick} />
        <input class="inputField" type="text" value={inputValue} onChange={this.onChange} />
        <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

const EditList = (props) => {   
    return (  
        <div className="feedItems_container">
        
            <div className="feed">
                <div className="scrollbar feed_comments" id="style-2">
                    <div className="media">
                        <h3><span className="badge list-badge">Edit List:</span></h3>
                        <ListItems />
                        <button type="button" onClick={props.back} >Back</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };

export default EditList;

