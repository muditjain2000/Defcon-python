import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { NavLink } from "react-router-dom";
import '../CSS/loginform.css';
import { login } from "../services/authService";
import Particles from "react-tsparticles";
import { currentUser } from "./../services/authService";
import { Redirect } from "react-router-dom";
/*import  axios  from 'axios';*/


class LoginForm extends Form {
    state = { 
        data: { email: "", password: "" },
        errors: {},
     }

     schema = {
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),
      };
      /*doSubmit = () => {
        
        axios.post("http://localhost:4000/app/login", { email: this.state.data.email,password: this.state.data.password })
      
       
      .then(response => console.log(response.data))
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/home";
      
      this.setState({data:{
        email: "", password: "", name: ""
      } })
    };*/

    doSubmit = async () => {
      try {
        const { email, password } = this.state.data;
        
        await login(email, password);
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/home";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.username = ex.response.data;
          this.setState({ errors });
        }
      }
    };

    render() { 
        return ( 
          <React.Fragment>
            <Particles
                id="tsparticles2"
                options={{
                // background: {
                //     color: {
                //     value: "#0d47a1",
                //     },
                // },
                fpsLimit: 60,
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                    },
                    modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                    },
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    },
                },
                particles: {
                    color: {
                    value: "#ffffff",
                    },
                    links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 1,
                    width: 1,
                    },
                    collisions: {
                    enable: true,
                    },
                    move: {
                    direction: "none",
                    enable: true,
                    outMode: "bounce",
                    random: false,
                    speed: 6,
                    straight: false,
                    },
                    number: {
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                    value: 80,
                    },
                    opacity: {
                    value: 0.5,
                    },
                    shape: {
                    type: "circle",
                    },
                    size: {
                    random: true,
                    value: 5,
                    },
                },
                detectRetina: true,
                }}
            />
            <div id="movies-main-wrapper">
        <div className="loginform">
          <br/><br/>
            <h1>Login</h1>
            <br/>
            <form onSubmit={this.handleSubmit}>
            
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
    
              {this.renderButton("Login")}
              
            </form>
            
            <NavLink className="nav-link register" to="/register">
                  <h6>Register?</h6>
              </NavLink>
          </div> </div>
          </React.Fragment>
          );
    }
}
 
export default LoginForm;