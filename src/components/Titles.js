import React from "react";

const Titles = (props) => (
	<div>
		<h1 className="title-container__title">{props.title}</h1>
		<h3 className="title-container__subtitle">{props.subtitle}</h3>
	</div>
);

export default Titles;
