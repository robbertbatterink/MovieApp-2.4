import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Movieslist from "./components/Movieslist";
import Login from "./components/Login";
//import icons from 'glyphicons'

class App extends React.Component {

  render() {
    return (
      <div>
        <div className="wrapper">

          <div className="main">
            <div className="container">
              <div className="row">

                <div className="col-xs-5 title-container">
                  <div id="MovieDetail">
                    <p>.</p>
                  </div>
                </div>
                <div className="col-xs-7 form-container">
                  <Login />
                  <Titles />
                  <Form getWeather={this.getWeather} />
                  <Movieslist getDetailPage />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ); // End of return
  }
};

export default App;
