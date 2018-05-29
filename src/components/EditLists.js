import React from "react";
import ReactDOM from "react-dom";

const getMyList = () => {
  window.alert("Clicked on MyPage button");
};

var createReactClass = require('create-react-class');
var ListItems = createReactClass ({
    getInitialState : function() {
        return (
                {
                    movies : {
                        'movie-1' : 'shrek',
                        'movie-2' : 'shrek 2',
                    }
                }
        );
    },
    addMovie : function(movie) {
        var timestamp = (new Date()).getTime();
        this.state.movies['movie-' + timestamp] = movie;
        this.setState({movies : this.state.movies});
        console.log("hallo");
    },
    render: function() {
        return (
                <div>
                <ListRender movies={this.state.movies} />
                <AddMovieForm addMovie={this.addMovie} />
                </div>
                );
    }
});

var ListRender = createReactClass ({
         render: function() {
            return (
                <div className="edit-list">
                    <div className="movielist-items">
                        <ol className="movie-items"> 
                        { Object.keys(this.props.movies).map(function(key){
                            return <li>{this.props.movies[key]}</li>;
                            }.bind(this))}
                        </ol>
                    </div>
                </div>
            );
         }  
    });
    
var AddMovieForm = createReactClass ({
   createMovie : function(e) {
       e.preventDefault();
       var movie = this.refs.movieName.value;
       if(typeof movie === 'string' && movie.lenght > 0) {
           this.props.addMovie(movie);
           console.log("hallo");
           this.refs.movieForm.reset();
       }
   },
   render : function() {
       return (
        <form className="" ref="movieForm" onSubmit={this.addMovie}>
          <div className="form-group">
            <label>
              Movie Name
              <input type="text" id="movieItem" placeholder="e.x.star wars" ref="movieName" className="form-control" />
            </label>
            <button type="submit" className="btn btn-primary">Add movie</button>
          </div>
         </form>
               );
   }
    
});
    
const EditLists = props => (        
        <div className="feedItems_container">
        
            <div className="feed">
                <div className="scrollbar feed_comments" id="style-2">
                    <div className="media">
                        <h3><span className="badge list-badge">Edit List:</span></h3>
                        <ListItems />
                            </div>
                        </div>
                    </div>
                </div>
    
);

export default EditLists;


