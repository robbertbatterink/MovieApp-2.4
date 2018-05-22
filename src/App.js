import React from "react";

import Titles from "./components/Titles";
import Movieslist from "./components/Movieslist";
import LeftImage from "./components/LeftImage"
import MovieMetaData from "./components/MovieMetaData"
//import icons from 'glyphicons'
import Login from "./components/Login";
import Loginhandler from "./components/LoginPage";

import Registreer from "./components/Registreer";
import RegistreerPage from "./components/RegistreerPage";

class App extends React.Component {
  constructor(props){
    super(props)  
    this.state = {
        showlogin: false, 
        showregister: false,  
        WelcomeTitle: 'MovieAppName',
        SubTitle: 'Check out new movies based on your friends recommendations',
        MovieMetaData: [
            {ReleaseDate: undefined},
            {Duration: undefined},
            {Genre: undefined},
            {PC: undefined},
            {Description: undefined}
        ],
          // use this to check if the movieList recommendations shoudl be displayed.
          checkMovieListBool: true, // initially this needs to be set to true, to display the list
          checkMetaDataBool: false // needs to be false initially
                 
    }}

toggleLoginView = () => {
    if (this.state.showlogin === true){
        this.setState({              
            showlogin: false
        });
    }else if (this.state.showlogin === false){
        this.setState({
            showlogin: true,
            showregister: false,
            checkMetaDataBool: false,
            checkMovieListBool: true,
            WelcomeTitle: 'MovieAppName',
            SubTitle: 'Check out new movies based on your friends recommendations',
        });            
    }}
toggleRegisterView = () => {  
    if (this.state.showregister === true){
      this.setState({
          showregister: false
      })
    }else if (this.state.showregister === false){
      this.setState({
          showregister: true,
          showlogin: false,
          checkMetaDataBool: false,
          checkMovieListBool: true,
          WelcomeTitle: 'MovieAppName',
          SubTitle: 'Check out new movies based on your friends recommendations',
      })
    }            
  }
// This method checks if the variable checkMovieListBool is true/false
toggleMovieList = () => {
  const doesShow = this.state.checkMovieListBool;
  this.setState({checkMovieListBool: !doesShow});

  const doesShowMetaData = this.state.checkMetaDataBool;
  this.setState({checkMetaDataBool: !doesShowMetaData});

}


toggleDetailView = () => {
  this.toggleMovieList()
  this.setState({
    WelcomeTitle: 'MovieName',
    SubTitle: '2018 (not released)',
    showlogin: false,
    showregister: false,
    MovieMetaData: [
      {ReleaseDate: '12-12-13'},
      {Duration: 'xx:xx:xx'},
      {Genre: 'Action'},
      {PC: 'PEGI16'},
      {Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, massa eget gravida suscipit, diam tortor gravida lacus, non convallis ipsum lacus vitae felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in erat iaculis justo sollicitudin mattis'}
  ]
  })

}
// Gets the original Welcome view back
toggleWelcomeView = () => {
  this.toggleMovieList()
  this.setState({
    WelcomeTitle: 'MovieAppName',
    SubTitle: 'Check out new movies based on your friends recommendations',
    showlogin: false,
    showregister: false,    
  })
}

  render() {
    return (
      
        <div className="wrapper">
          <div className="main">
            <div className="container">            
              <div className="row">                
                          
                          <LeftImage checkMetaBool={this.state.checkMetaDataBool}/>         
                          {this.state.showlogin && (<Loginhandler />)}
                          {this.state.showregister && (<RegistreerPage />)}
                      
                <div className="col-xs-7 form-container">
                  <Login action={this.toggleLoginView}/>                  
                  <Registreer action = {this.toggleRegisterView}/>
                  <Titles
                    title={this.state.WelcomeTitle}
                    subtitle={this.state.SubTitle}/>
                    {this.state.checkMetaDataBool ?
                    <div>
                      <MovieMetaData
                      metaReleaseDate={this.state.MovieMetaData[0].ReleaseDate}
                      metaDuration={this.state.MovieMetaData[1].Duration}
                      metaGenre={this.state.MovieMetaData[2].Genre}
                      metaPC={this.state.MovieMetaData[3].PC}
                      metaDescription={this.state.MovieMetaData[4].Description}/> 
                    </div> : null }
                    {this.state.checkMovieListBool ? // Ternary operator to check boolean value
                    <div>                   
                        <Movieslist toggle={this.toggleMovieList} click={this.toggleDetailView} test={this.toggleDetailView}/>
                    </div> 
                    :<button onClick={this.toggleWelcomeView}>Go Back</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      
    ); // End of return
  }
};

export default App;
