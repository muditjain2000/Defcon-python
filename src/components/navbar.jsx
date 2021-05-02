import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './sidebar';
import './dashboard.css';
import Typewriter from "typewriter-effect";
// import { currentUser } from '../services/authService';


class Navbar extends Component {
    
     
    render() { 
        const { user } = this.props;
        return ( 
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-mine ">
                    <div className="container-fluid">
                        <Sidebar/>
                        <NavLink className="nav-link navbar-brand" to="/defcon">
                        <Typewriter
  
                            onInit={(typewriter)=> {

                            typewriter
                            
                            .typeString("Defcon")
                                
                            .pauseFor(1000)
                            
                            
                            .start();
                            }}
                            />
                        </NavLink>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                        </ul>
      
                    </div>
                   
									
								
                    </div>
                    <div id="user">
                    <ul className="navbar-nav">
                        {user && (
                        <React.Fragment>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/account">
                                Welcome
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">
                                Logout
                            </NavLink>
                            </li>
                        </React.Fragment>
                        )}
                        {!user && (
                        <React.Fragment>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/register">
                                Register
                            </NavLink>
                            </li>
                        </React.Fragment>
                        )}
                    </ul>
                    </div>
                </nav>
            </React.Fragment>
         );
    }
}
 
export default Navbar;