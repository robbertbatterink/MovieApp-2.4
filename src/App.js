import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
import SearchResult from "./components/SearchResult";
//import icons from 'glyphicons'

import "./App.css";
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        userid: '',
        username: '',
        query: '',
        resultUser: [],
    }   
    this.handleGet = this.handleGet.bind(this)
    this.handleUser = this.handleUser.bind(this)
    }

    formSearchPage(params) {
        this.setState({
            resultMovie: params
        })
    }
    
    setQuery = (event) => {
        this.setState({query: event.target.value})
    }
  
    handleGet () {
      axios.get('http://localhost:5000/')
        .then(response => this.setState({username: response.data.username}))
    }
    handleUser () {
	axios.post('http://localhost:5000/api/gebruiker'
        ).then(response => { 
            console.log(response);
            this.setState({ userName: response.data.username, userID: response.data.userid});
        })
        .catch(error => {
          console.log(error.response)
      });
  }
  
  componentDidMount() {
      this.handleUser()
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
                        <Route path="/Register" component={Register} />
                        <Route path="/Search" render={()=><SearchResult query={this.state.query}/>} />
                        <Route exact path="/Users/:userID" component={Feed} />
                        <Route path="/Users/:userID/List/:movieList" component={WatchedMovies} userID={this.state.userID} />
                        <Route exaxt path="/Users/:userID/Friends/:userID" component={PersonPageL}/>
                        <Route exact path="/filminfo/:movieName/:movieID" component={MovieDetailL}/>
                    </div>
                </Switch>

                {/**RIGHT PART */}
                <Switch>
                <div className="col-xs-7 form-container">
                    <Route exact path="/" component={HomePageR} />
                    <Route path="/Login" component={HomePageR} />
                    <Route path="/Register" component={HomePageR} />
                    <Route path="/Search" render={()=><div><SearchPage passQuery={this.setQuery}/> <Movieslist /></div>} />
                    <Route exact path="/Users/:userID" component={PersonalPage}/>
                    <Route path="/Users/:userID/List" component={PersonalPage}/>
                    <Route exact path="/Users/:userID/Friends/:userID" component={PersonPageR}/>
                    <Route exact path="/filminfo/:movieName/:movieID" component={MovieDetailR}/>

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

const MovieDetailL = () => {
    return <MovieDetailImage />
}

const MovieDetailR = () => {
    return <MovieMetaData />
}

const HomePageL = () => {
    return <WelcomeImage />
};

const HomePageR = () => {
    return (
    <div>
    <Movieslist />
        <div>
        <Link to="/Login"><button>Login</button></Link>
        <Link to="/Register"><button>Register</button></Link>
        <Link to="/Search"><button>Search</button></Link>
        </div>
        <Titles />
    </div>
    );
};

const SearchR = () => {
    return (
    <div>
        <SearchPage />
        <Movieslist />
    </div>
    );
}

const SearchL = () => {
    return <SearchResult />
}

const Login = () => {
    return <LoginPage /> 
}

const Register = () => {
    return <RegisterView />
}

const Feed = () => {
    return <Feedlist />
}

const PersonalPage = () => {
    return (
    <div>
    <Personal />
    <Movieslist />
    </div>
    );
}

const WatchedMovies = ({ match }) => {
    return (
            <div>
        <EditList/>
                </div>
    );
}

const PersonPageR = () => {
    return (
        <div>
        <PersonMovie />
        <Link to="/Users/Gerard"><MyPage /></Link>
        <Movieslist />
        </div>)
}

const PersonPageL = () => {
    return <PersonInfo />
}
export default App;
