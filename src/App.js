import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Search";
import Weather from "./components/Weather";
import Movieslist from "./components/Movieslist";
import Login from "./components/Login";
import Feedlist from "./components/feed";
import Logout from "./components/Logout";
import Personal from "./components/PersonalPage";
import PersonInfo from "./components/PersonPage";
import PersonMovie from "./components/PersonMovie";
import MyPage from "./components/GoToMyPage";
import EditLists from "./components/EditLists";
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
                    <p className=""></p>
                  </div>
                  <EditLists  />
                </div>
                <div className="col-xs-7 form-container">
                  <Logout />
                  <MyPage />
                  <Form getWeather={this.getWeather} />
                  <PersonMovie />
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
