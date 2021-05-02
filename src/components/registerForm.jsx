import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import './dashboard.css';
import { register } from "../services/userService";
import { loginWithJwt } from "../services/authService";
import Particles from "react-tsparticles";
//import  axios  from 'axios';



class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
    
  };

  schema = {
    // file: Joi.string().required().label("Profile Photo"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  /*doSubmit = () => {
    
      axios.post("http://localhost:4000/app/register",{
        email: this.state.data.email,
        name: this.state.data.name,
        password: this.state.data.password
    })
    .then(response => console.log(response.data))
    window.location = "/";
    
    this.setState({data:{
      email: "", password: "", name: ""
    } })
  };*/

  // handleChange1=(event)=>{
  //   const errors = { ...this.state.errors };
  //   const errorMessage = this.validateProperty(event.currentTarget);
  //   if (errorMessage) errors[event.currentTarget.name] = errorMessage;
  //   else delete errors[event.currentTarget.name];
  //     const data= {...this.state.data};
  //     data[event.currentTarget.name]=URL.createObjectURL(event.currentTarget.files[0])
  //     console.log(event.currentTarget.files[0])
  //     this.setState({
  //       data ,errors
  //     })
      
  // }

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
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
      <div>
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
                        value_area: 1000,
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
      <div className="registerform">
        <br/><br/>
        <h1>Register</h1>
        <br/>
        <form onSubmit={this.handleSubmit}>
        {/* <div classname="mb-3">
              <label for="formFile" className="form-label">Profile Photo</label>
              <input className="form-control choose" name="file" type="file" id="formFile" onChange={this.handleChange1}/>
              <img src={this.state.data.file}/>
        </div> */}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div></div></div>
    );
  }
}

export default RegisterForm;
