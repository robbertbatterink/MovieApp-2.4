import React from "react";
import "./App.css";

//LeftView components
import EditList from "./components/EditList";
import Watched from "./components/WatchedBtn";
import WelcomeImage from "./components/WelcomeImage"
import LoginPage from "./components/LoginPage";
import RegisterView from "./components/RegisterView";
import Feedlist from "./components/feed";
import MovieDetailImage from "./components/MovieDetailImage";
//rightView components
import MovieMetaData from "./components/MovieMetaData"
import Titles from "./components/Titles";
import Movieslist from "./components/Movieslist";
import PersonMovie from "./components/PersonMovie";
import PersonInfo from "./components/PersonPage";
import Personal from "./components/PersonalPage";
//rightSide Buttons
import Logout from "./components/Logout"; 
import Events from "./components/EventBtn";
import Reviews from "./components/ReviewsBtn";
import Top5List from "./components/Top5Btn";
import MyPage from "./components/GoToMyPage";

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
          //WelcomeImageBool:       true,     // Display the welcome image, BROKEN?!                        (leftside)   
          LoginViewBool:          false,    // Display the login view                                     (leftside)          
          ShowRegisterBool:       false,    // Displays the register view                                 (leftside)
          EditListBool:           false,    // Displays the view for editing movielists                   (leftside)
          //ShowPersonInfoBool:     false,    // Displays the personalized information of a user.           
          ShowDetailImageBool:    false,    // Displays the corresponding movie image in the detail view  (leftside)         
          ShowFeed:               false,    // Displays the feed                                          (leftside)
          ShowPerson:             false,    // Displays the profile of another user                       (leftside & rightside)   
          ShowPersonalPage:       false,    // Displays personal page                                     (rightside)
          LoggedinBool:           true,     // Displays the login and register buttons                    (rightside)                 
          ShowMetaDataBool:       false,    // Displays MetaData from a movie                             (rightside)
          ShowMovieReccListBool:  true,     // Displays the generic movie reccomendations list            (rightside)
    }
  }

  toggleLoginView = () => {
    this.toggleResetView();
    this.setState({      
      LoginViewBool:          true,       // Display the login view                                     (leftside)
      ShowMovieReccListBool:  true,       // Displays the generic movie reccomendations list            (rightside)
      LoggedinBool:           true,       // Displays the login and register buttons                    (rightside)
    })
};

toggleRegisterView = () => {
    this.toggleResetView();
    this.setState({    
      ShowRegisterBool:       true,    // Displays the register view                                 (leftside)
      ShowMovieReccListBool:  true,    // Displays the generic movie reccomendations list            (rightside)
      LoggedinBool:           true,    // Displays the login and register buttons                    (rightside)
    })
  };

toggleDetailView = () => {
  this.toggleResetView();
  this.setState({
    WelcomeTitle: 'MovieName',
    SubTitle: '2018 (not released)',
    ShowMetaDataBool:       true,     // Displays MetaData from a movie                             (rightside)
    ShowDetailImageBool:    true,     // Displays the corresponding movie image in the detail view  (leftside) 
    LoggedinBool:           true,     // Displays the login and register buttons                    (rightside)
    MovieMetaData: [
      {ReleaseDate: '12-12-13'},
      {Duration: 'xx:xx:xx'},
      {Genre: 'Action'},
      {PC: 'PEGI16'},
      {Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, massa eget gravida suscipit, diam tortor gravida lacus, non convallis ipsum lacus vitae felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in erat iaculis justo sollicitudin mattis'}
    ],
  })
};

// Gets the original Welcome view back
toggleWelcomeView = () => {
  this.toggleResetView();
  this.setState({
    WelcomeTitle: 'MovieAppName',
    SubTitle: 'Check out new movies based on your friends recommendations',
    // BOOLEANS
      WelcomeImageBool:       true,     
      ShowMovieReccListBool:  true,        
      LoggedinBool:           true,          
  })
};

//Shows account when login is pressed
toggleAccount = () => { 
  this.toggleResetView();
  this.setState({    
    ShowMovieReccListBool:    true,     
    ShowFeed:                 true,    
    ShowPersonalPage:         true,     
  })      
};
togglePerson = () => {
    this.toggleResetView();
    this.setState({      
      ShowMovieReccListBool:  true,        
      ShowPerson:             true,        
    })
};
toggleEditList =() => {
    this.toggleResetView();
    this.setState({        
        EditListBool:        true,      
    })
};
toggleResetView =() => {
  this.setState({
    WelcomeImageBool:       false,    
    LoginViewBool:          false,    
    ShowMetaDataBool:       false,    
    ShowRegisterBool:       false,    
    ShowPersonInfoBool:     false,    
    ShowDetailImageBool:    false,    
    ShowMovieReccListBool:  false,    
    ShowFeed:               false,    
    ShowPersonalPage:       false,    
    LoggedinBool:           false,    
    ShowPerson:             false,    
    EditListBool:           false,       
  })
};

  render() {
    return (

        <div className="wrapper">
          <div className="main">            
              <div className="row">

                {/**LEFT PART */}
                <div className="col-xs-5 title-container">
                  {this.state.WelcomeImageBool ? <WelcomeImage/> : null}
                  {this.state.ShowDetailImageBool ? <MovieDetailImage /> : null}
                  {this.state.LoginViewBool ? <LoginPage toggleAccount={this.toggleAccount}/> : null }
                  {this.state.ShowRegisterBool ? <RegisterView /> : null}
                  {this.state.ShowFeed ? <Feedlist getPerson={this.togglePerson}/> : null}
                  {this.state.EditListBool ? <EditList back={this.toggleAccount}/> : null}
                  {this.state.ShowPerson ? <PersonInfo /> : null}
                </div>


                {/**RIGHT PART */}
                <div className="col-xs-7 form-container">
                  {this.state.ShowPersonalPage ? <Personal /> : null}
                  {this.state.ShowPersonalPage ? <div> <Logout logout={this.toggleWelcomeView}/> 
                  <Top5List /> <Watched back={this.toggleAccount} watchedList={this.toggleEditList}/> <Reviews /> <Events /></div>: null}
                  {this.state.ShowPerson ? <PersonMovie /> : null}
                  {this.state.ShowPerson ? <MyPage myPage={this.toggleAccount}/> : null}
                  {this.state.LoggedinBool ? 
                  <div>
                  <button onClick={this.toggleLoginView}>Login</button>
                  <button onClick={this.toggleRegisterView}>Register</button>
                  <Titles title={this.state.WelcomeTitle} subtitle={this.state.SubTitle}/>               
                    </div>: null }
                    {this.state.ShowMetaDataBool ?
                    <div><MovieMetaData
                            metaReleaseDate={this.state.MovieMetaData[0].ReleaseDate}
                            metaDuration={this.state.MovieMetaData[1].Duration}
                            metaGenre={this.state.MovieMetaData[2].Genre}
                            metaPC={this.state.MovieMetaData[3].PC}
                            metaDescription={this.state.MovieMetaData[4].Description}/>
                    </div> : null }
                        {this.state.ShowMovieReccListBool ? <Movieslist click={this.toggleDetailView} /> :   <button onClick={this.toggleWelcomeView}>Go Back</button>}
              </div>
            </div>
          </div>
        </div>

    ); // End of return
  }
};

export default App;
