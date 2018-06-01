import React, { Component }  from "react";
import { findDOMNode } from "react-dom";
import $ from 'jquery';

const getDetailPage = () => {
	console.log("Get Detail");
};

const getPerson = () => {
  window.alert("Ga naar dit profiel");
};

const Feedlist = props => (
	<div class="feedItems_container">
        
            <div class="feed">

		<h3><span class="badge">Personal Feed:</span></h3>
                <div class="scrollbar feed_comments" id="style-2">
		<ul class="feed_items">

			<li onClick={props.getPerson} id="1" >
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
    
);

export default Feedlist

