import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';               // needed for passing location parameters (Install dependency : "npm install -- save prop-types")

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
import SearchPage from "./components/SearchPage";
import Lists from "./components/SearchResult";
//import icons from 'glyphicons'

import "./App.css";
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        userID: '',
        username: '',
        query: '',
        resultUser: [],
        loginSuccesfull: false,
        loggedIn: 'false',
        confirm: false,
        userEmail: '',
        userPassword: '',
    }   
    this.handleGet = this.handleGet.bind(this)
    this.handleUser = this.handleUser.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    }

    formSearchPage(params) {
        this.setState({
            resultMovie: params
        })
    }
    
    setQuery = (event) => {
        this.setState({query: event.target.value})
    }
    
    setEmail = (event) => {
        console.log(event.target.value)
        this.setState({userEmail: event.target.value})
    }
    
    setPassword = (event) => {
        this.setState({userPassword: event.target.value})
    }
    
    logoutUser() {
        console.log('hallo');
        axios.get('http://localhost:5000/api/logout')
          .then(response => {if(response.data.error === "False"){
                this.setState({ confirm: true })
          }})
        }

  
    handleGet () {
      axios.get('http://localhost:5000/')
        .then(response => this.setState({username: response.data.username}))
    }
    handleUser () {
	axios.post('http://localhost:5000/api/gebruiker'
        ).then(response => { 
            console.log(response);
            this.setState({loggedIn: response.data.error});
        })
        .catch(error => {
          console.log(error.response)
      });
  }
   handlePost() {
	axios.post('http://localhost:5000/api/login',  {
        "email": this.state.userEmail, 
        "wachtwoord": this.state.userPassword
        }).then(response => { 
              console.log(response)
              this.setState({error: response.data.error,title: response.data.title, message: response.data.message, username: response.data.username, userID: response.data.userid})
              if(response.data.error !== "True") {
                  this.setState({ loginSuccesfull: true})
              }

        })
        .catch(error => {
          console.log(error.response)
      });
  }
  
  componentDidMount() {
     // this.handleUser()
  }
  
render() {
    const { loginSuccesfull, confirm } = this.state;
    
      if (confirm) {
            this.setState({confirm: false})
            return <Router><Redirect to={"/"} /></Router>;
      }
      
      if (loginSuccesfull) {
          this.setState({loginSuccesfull: false})
          return <Router><Redirect to={"/Users/"+ this.state.userID} /></Router>;
      }
    return (
        <Router>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">

                {/**LEFT PART */}
                <Switch>
                    <div className="col-xs-5 title-container">
                        <Route exact path="/" render={()=><WelcomeImage />} />
                        <Route path="/Login" render={()=><LoginPage passUN={this.setEmail} passPW={this.setPassword} login={this.handlePost}/> } />
                        <Route path="/Register" component={Register} />
                        <Route path="/Search" render={()=><Lists query={this.state.query}/>} />
                        <Route exact path="/Users/:userID" component={Feed} />
                        <Route path="/Users/:userID/List/:movieList" component={WatchedMovies} userID={this.state.userID} />
                        <Route exact path="/filminfo/:movieName/:movieID" component={MovieDetailL}/>
                        <Route exact path="/userinfo/:userID" render={()=><PersonInfo />}/>
                    </div>
                </Switch>

                {/**RIGHT PART */}
                <Switch>
                <div className="col-xs-7 form-container">
                    <Route exact path="/" render={()=> <div>
                        <Movieslist />
                        <Buttons loggedIn={this.state.loggedIn} logoutUsers={this.logoutUser}/>
                        <Titles />
                        </div>}/>
                    <Route path="/Login" render={()=> <div>
                        <Movieslist />
                        <Buttons loggedIn={this.state.loggedIn} logoutUsers={this.logoutUser}/>
                        <Titles />
                        </div>}/>
                    <Route path="/Register" render={()=> <div>
                        <Movieslist />
                        <Buttons loggedIn={this.state.loggedIn} logoutUsers={this.logoutUser}/>
                        <Titles />
                        </div>}/>
                    <Route path="/Search" render={()=><div><SearchPage passQuery={this.setQuery}/> <Movieslist /></div>} />
                    <Route path="/Users/:userID" render={()=><div><Personal /><Logout logout={this.logoutUser} /><Movieslist /></div>}/>
                    <Route path="/Users/:userID/List" />
                    <Route exact path="/filminfo/:movieName/:movieID" component={MovieDetailR}/>
                    <Route exact path="/userinfo/:userID" render={()=> <div><PersonMovie /><Movieslist /></div>} />

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

const Buttons = (props) => {
    if(props.loggedIn == 'true'){
        return (        
                <div>
                    <Link to="/Login"><button>Login</button></Link>
                    <Link to="/Register"><button>Register</button></Link>
                    <Link to="/Search"><button>Search</button></Link>
                </div>)
    } else {
        return <div><Link to="/Search"><button>Search</button></Link><Logout logout={props.logoutUsers} /></div>
    }
}

const MovieDetailL = () => {
    return <MovieDetailImage />
}

const MovieDetailR = () => {
    return <MovieMetaData />
}


const SearchR = () => {
    return (
    <div>
        <SearchPage />
        <Movieslist />
    </div>
    );
}




const Register = () => {
    return <RegisterView />
}

const Feed = () => {
    return <Feedlist />
}



const WatchedMovies = ({ match }) => {
    return  <EditList/>
}

export default App;
