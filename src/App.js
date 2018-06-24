import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'

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
        userid: '',
        username: ''
    }
    
    this.handleGet = this.handleGet.bind(this)
    this.handleUser = this.handleUser.bind(this)
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
                        <Route exact path="/Users/:userID" component={Feed} />
                        <Route path="/Users/:userID/List/Watched" component={WatchedMovies} />
                        <Route exaxt path="/Users/:userID/Friends/:userID" component={PersonPageL}/>
                    </div>
                </Switch>

                {/**RIGHT PART */}
                <Switch>
                <div className="col-xs-7 form-container">
                    <Route exact path="/" component={HomePageR} />
                    <Route exact path="/Login" component={HomePageR} />
                    <Route exact path="/Register" component={HomePageR} />
                    <Route exact path="/Users/:userID" component={PersonalPage}/>
                    <Route path="/Users/:userID/List" component={PersonalPage}/>
                    <Route exact path="/Users/:userID/Friends/:userID" component={PersonPageR}/>
                  </div>
                </Switch>

              </div>
              hoi: {this.state.userid}<br/>
                      {this.state.username}
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
    <Movieslist />
        <div>
        <Link to="/Login"><button>Login</button></Link>
        <Link to="/Register"><button>Register</button></Link>
        </div>
        <Titles />
    </div>
    );
};

const Login = () => {
    return <LoginPage sendData={this.handler}/> 
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

const WatchedMovies = () => {
    return (
        <EditList />
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
