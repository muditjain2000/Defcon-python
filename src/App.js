import React,{Component} from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Account from './components/account';
import Logout from './components/Logout';
import { currentUser } from './services/authService';

// import Python from './components/python';
// import Python1 from './components/python1';

class App extends Component {
  state = {}
  componentDidMount(){
    const user = currentUser();
    this.setState({user})
  }
  render() { 
    return ( <React.Fragment>
      <ToastContainer />
      
      <Navbar user={this.state.user} />
      <img src="/back1.jpg" alt="BackgroundImage" itemType="jpg" id="bg" />
      
    <main className="container">
      <Switch>
      <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/home" component={Home} />
          <Route path="/account" component={Account} />
          {/* <Route path="/python" component={Python} />
          <Route path="/python1" component={Python1} /> */}
          <Redirect from="/" exact to="/home" />
      </Switch>
    </main>
    </React.Fragment> );
  }
}
 
export default App;


