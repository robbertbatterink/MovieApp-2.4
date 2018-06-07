import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Titles from "./components/Titles";
import Feedlist from "./components/feed";
import Logout from "./components/Logout";
import Personal from "./components/PersonalPage";
import PersonInfo from "./components/PersonPage";
import PersonMovie from "./components/PersonMovie";
import MyPage from "./components/GoToMyPage";
import EditList from "./components/EditList";
import Movieslist from "./components/Movieslist";
import WelcomeImage from "./components/WelcomeImage"
import MovieMetaData from "./components/MovieMetaData"
import LoginBtn from "./components/LoginBtn";
import LoginPage from "./components/LoginPage";
import Loginhandler from "./components/LoginPage";
import RegisterView from "./components/RegisterView";
import MovieDetailImage from "./components/MovieDetailImage";
import Events from "./components/EventBtn";
import Reviews from "./components/ReviewsBtn";
import Top5List from "./components/Top5Btn";
import Watched from "./components/WatchedBtn";
//import icons from 'glyphicons'

import "./App.css";
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

        WelcomeTitle: 'MovieAppName',
        SubTitle: 'Check out new movies based on your friends recommendations',
        MovieMetaData: [
            {ReleaseDate: undefined},
            {Duration: undefined},
            {Genre: undefined},
            {PC: undefined},
            {Description: undefined}
        ],

          // All the booleans
          booleanListLeftpart: [],        // array of booleans, use this to store new booleans
          booleanListRightpart: [],       // array of booleans containg all the booleans of the RIGHT PART

                                            // Individual booleans
          WelcomeImageBool:       true,     // To display the list of recommendations
          LoginViewBool:          false,    // Enables/disables the login view
          ShowMetaDataBool:       false,    // Needs to be false initially
          ShowRegisterBool:       false,    // Enables/disables the register view in the LEFT PART
          ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
          ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view on the LEFT PART
          ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list
          ShowFeed:               false,    // Enables the Feed in the LEFT PART
          ShowPersonalPage:       false,    // Enables the personal page in the RIGHT PART
          LoggedinBool:           true,    // Enables/disables the login and register buttons
          ShowPerson:             false,    // Displays the profile of another user
          EditListBool:           false,    //enables/disables the view for editing movielists
    }}

  /*
  TOGGLE LOGIN VIEW Function
  checks the LoginViewBool and WelcomeImageBool,
  and sets them accordingly to display the login view correctly
  */
  toggleLoginView = () => {
    this.setState({
      WelcomeImageBool:       false,    // To display the list of recommendations
      LoginViewBool:          true,     // Enables/disables the login view
      ShowMetaDataBool:       false,    // Needs to be false initially
      ShowRegisterBool:       false,    // Enables/disables the register view in the LEFT PART
      ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
      ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view on the LEFT PART
      ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list
      ShowFeed:               false,    // Enables the Feed in the LEFT PART
      ShowPersonalPage:       false,    // Enables the personal page in the RIGHT PART
      ShowPerson:             false,    // Displays the profile of another user
      EditListBool:           false,    // Enables/disables the view for editing movielists
    })

  };

toggleRegisterView = () => {
    this.setState({
      WelcomeImageBool:       false,    // To display the list of recommendations
      LoginViewBool:          false,     // Enables/disables the login view
      ShowMetaDataBool:       false,    // Needs to be false initially
      ShowRegisterBool:       true,    // Enables/disables the register view in the LEFT PART
      ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
      ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view on the LEFT PART
      ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list
      ShowFeed:               false,    // Enables the Feed in the LEFT PART
      ShowPersonalPage:       false,    // Enables the personal page in the RIGHT PART
      ShowPerson:             false,    // Displays the profile of another user
      EditListBool:           false,    // Enables/disables the view for editing movielists
    })
  };

// This method checks if the variable checkDetailViewBool is true/false
/*
toggleMovieList = () => {
  const doesShow = this.state.WelcomeImageBool;
  this.setState({WelcomeImageBool: !doesShow}); // when its true, set this variable to false, and vice versa.
  const doesShowMetaData = this.state.ShowMetaDataBool;
  this.setState({ShowMetaDataBool: !doesShowMetaData});
}
*/
toggleDetailView = () => {
  this.setState({
    WelcomeTitle: 'MovieName',
    SubTitle: '2018 (not released)',
    // BOOLEANS
      WelcomeImageBool:       false,    // To display the list of recommendations
      LoginViewBool:          false,     // Enables/disables the login view
      ShowMetaDataBool:       true,    // Needs to be false initially
      ShowRegisterBool:       false,    // Enables/disables the register view in the LEFT PART
      ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
      ShowDetailImageBool:    true,    // Displays the corresponding movie image in the detail view on the LEFT PART
      ShowMovieReccListBool:  false,     // Displays the generic movie reccomendations list
      ShowFeed:               false,    // Enables the Feed in the LEFT PART
      ShowPersonalPage:       false,    // Enables the personal page in the RIGHT PART
      ShowPerson:             false,    // Displays the profile of another user
      EditListBool:           false,    // Enables/disables the view for editing movielists

    MovieMetaData: [
      {ReleaseDate: '12-12-13'},
      {Duration: 'xx:xx:xx'},
      {Genre: 'Action'},
      {PC: 'PEGI16'},
      {Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, massa eget gravida suscipit, diam tortor gravida lacus, non convallis ipsum lacus vitae felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in erat iaculis justo sollicitudin mattis'}
  ],

  })
}

// Gets the original Welcome view back
toggleWelcomeView = () => {
  this.setState({
    WelcomeTitle: 'MovieAppName',
    SubTitle: 'Check out new movies based on your friends recommendations',
    // BOOLEANS
      WelcomeImageBool:       true,    // To display the list of recommendations
      LoginViewBool:          false,     // Enables/disables the login view
      ShowMetaDataBool:       false,    // Needs to be false initially
      ShowRegisterBool:       false,    // Enables/disables the register view in the LEFT PART
      ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
      ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view on the LEFT PART
      ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list
      ShowFeed:               false,    // Enables the Feed in the LEFT PART
      ShowPersonalPage:       false,    // Enables the personal page in the RIGHT PART
      LoggedinBool:           true,     // Enables/disables the login and register buttons
      ShowPerson:             false,    // Displays the profile of another user
      EditListBool:           false,    // Enables/disables the view for editing movielists
  })
}

//Shows account when login is pressed
toggleAccount = () => {
      this.setState({
      WelcomeImageBool:       false,    // To display the list of recommendations
      LoginViewBool:          false,     // Enables/disables the login view
      ShowMetaDataBool:       false,    // Needs to be false initially
      ShowRegisterBool:       false,    // Enables/disables the register view in the LEFT PART
      ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
      ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view on the LEFT PART
      ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list
      ShowFeed:               true,    // Enables the Feed in the LEFT PART
      ShowPersonalPage:       true,    // Enables the personal page in the RIGHT PART
      LoggedinBool:           false,    // Enables/disables the login and register buttons
      ShowPerson:             false,    // Displays the profile of another user
      EditListBool:           false,    // Enables/disables the view for editing movielists
      
    })      
};
togglePerson = () => {
    this.setState({
      WelcomeImageBool:       false,    // To display the list of recommendations
      LoginViewBool:          false,     // Enables/disables the login view
      ShowMetaDataBool:       false,    // Needs to be false initially
      ShowRegisterBool:       false,    // Enables/disables the register view in the LEFT PART
      ShowPersonInfoBool:     false,    // Enables/disables the personalized information of a user.
      ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view on the LEFT PART
      ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list
      ShowFeed:               false,    // Enables the Feed in the LEFT PART
      ShowPersonalPage:       false,    // Enables the personal page in the RIGHT PART
      LoggedinBool:           false,    // Enables/disables the login and register buttons 
      ShowPerson:             true,    // Displays the profile of another user
      EditListBool:           false,    // Enables/disables the view for editing movielists
    })
}
toggleEditList =() => {
    this.setState({
        ShowFeed:            false,    // Enables the Feed in the LEFT PART
        EditListBool:        true,      // Enables/disables the view for editing movielists
    })
}

  render() {
    return (
        <Router>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">

                {/**LEFT PART */}
                <Switch>
                    <div className="col-xs-5 title-container">
                        <Route exact path="/" component={HomePageL} />
                        <Route path="/Login" component={Login} />
                        <Route exact path="/Users/Gerard" component={Feed} />
                        <Route path="/Users/Gerard/List/Watched" component={WatchedMovies} />
                        <Route exaxt path="/Users/Gerard/Friends/Henk" component={PersonPageL}/>
                    </div>
                </Switch>

                {/**RIGHT PART */}
                <Switch>
                <div className="col-xs-7 form-container">
                    <Route exact path="/" component={HomePageR} />
                    <Route exact path="/Login" component={HomePageR} />
                    <Route exact path="/Users/Gerard" component={PersonalPage}/>
                    <Route exact path="/Users/Gerard/Friends/Henk" component={PersonPageR}/>
                 {this.state.ShowPersonalPage ? <Personal /> : null}
                  {this.state.ShowPersonalPage ? <div> <Logout logout={this.toggleWelcomeView}/> <Top5List /> <Watched back={this.toggleAccount} watchedList={this.toggleEditList}/> <Reviews /> <Events /></div>: null}
                  {this.state.ShowPerson ? <PersonMovie /> : null}
                  {this.state.ShowPerson ? <MyPage myPage={this.toggleAccount}/> : null}
                  </div>
                </Switch>

              </div>
            </div>
          </div>
        </div>
    </Router>
    ); // End of return
  }
};

const HomePageL = () => {
    return <WelcomeImage />
};

const HomePageR = () => {
    return (
    <div>
    <Movieslist click={this.toggleDetailView} />
        <div>
        <Link to="/Login"><button onClick={this.toggleLoginView}>Login</button></Link>
        <Link to="/Register"><button onClick={this.toggleRegisterView}>Register</button></Link>
        </div>
        <Titles />
    </div>
    );
};

const Login = () => {
    return <LoginPage /> 
}

const Feed = () => {
    return <Feedlist />
}

const PersonalPage = () => {
    return (
    <div>
    <Personal />
    <Link to="/"><Logout /></Link>
    <Link to="/Users/Gerard/List/Watched"><Watched /></Link>
    <Link to="/Users/Gerard/List/Top5"><Top5List /></Link>
    <Link to="/Users/Gerard/List/Reviews"><Reviews /></Link>
    <Link to="/Users/Gerard/List/Events"><Events /></Link>
    <Movieslist click={this.toggleDetailView} />
    </div>
    );
}

const WatchedMovies = () => {
    return (
        <EditList />
    );
}

const PersonPageR = () => {
    return (
        <div>
        <PersonMovie />
        <Movieslist click={this.toggleDetailView} />
        </div>)
}

const PersonPageL = () => {
    return <PersonInfo />
}
export default App;
