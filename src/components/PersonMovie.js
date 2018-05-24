import React from "react";
import ReactTooltip from 'react-tooltip'

const getDetailPage = () => {
	console.log("Get Detail");
};


const PersonMovie = props => (
    <div class="movie-lists">
        <div class="top-5">
            <h3><span class="badge">His Top 5 Movies:</span></h3>
            <div class="movielist-items">
            <ol class="movie-items">
                <li>The Dictator</li>
                <li>Top Gun</li>
                <li>Bohemian Rhapsody</li>
                <li>Guardians of the Galaxy: vol 1</li>
                <li>Mission Impossible 5</li>                
            </ol>
            </div>
        </div>
        <div class="watched">
            <h3><span data-tip="Click to see all watched movies!" class="badge list-badge">His Watched Movies:</span></h3>
            <div class="movielist-items">
            <ol class="movie-items">
                <li>Avengers: infinity war</li>
                <li>Deadpool 2</li>
                <li>A Quiet Place</li>
                <li>Breaking in</li>
                <li>Rampage</li>                
            </ol>
            </div>
        </div>
        <div class="reviews">
            <h3><span data-tip="Click to see all reviewed movies!" class="badge">His Reviews About:</span></h3>
            <div class="movielist-items">
            <ol class="movie-items">
                <li>Logan</li>
                <li>DunKirk</li>
                <li>WonderWoman</li>
                <li>Guardians of the Galaxy: vol 1</li>
                <li>SW: The Last Jedi</li>                
            </ol>
            </div>
        </div>
        <div class="events">
            <h3><span data-tip="Click to see all events!" class="badge list-badge">His Planned Events:</span></h3>
            <div class="movielist-items">
            <ol class="movie-items">
                <li>Movie night "date"</li>
                <li>Cinema</li>
                <li>Cinema</li>                
            </ol>
            </div>
        </div>
        <ReactTooltip />
    </div>
    
);

export default PersonMovie;
