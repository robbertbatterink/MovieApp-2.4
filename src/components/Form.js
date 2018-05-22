import React from "react";
import icons from 'glyphicons'

const getSearch = () => {
	window.alert("Clicked on Search button");
};

const Form = props => (

	<form onSubmit={props.getWeather}>

		<button onClick={getSearch}><span>{icons.heart}</span>Search</button>

	</form>
);
console.info('I' + icons.heart + ' Glyphicons!')
export default Form;
/**
<form onSubmit={props.getWeather}>
	<input type="text" name="city" placeholder="City..."/>
	<input type="text" name="country" placeholder="Country..."/>
	<button>Get Movie</button>
</form>
);

*/
