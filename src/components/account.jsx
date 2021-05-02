import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import './dashboard.css';
//import { getUser, saveUser, currentUser } from './../services/authService';
import { saveUser,currentUser } from './../services/authService';
import Particles from "react-tsparticles";


class Account extends Form {
    state = { 
        data: {  email: "",  name: "" },
        id:"",
        errors: {},
     };

    schema = {
        // file: Joi.string().required().label("Profile Photo"),
        email: Joi.string().email().required().label("Email"),
        // password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name"),
      };

      componentDidMount(){
        try {
            //const userId=this.props.match.params.id;
            
            //const {data:user}=await getUser(userId);
            const {user}=  currentUser();
            this.setState({id: user.id});
            this.setState({data: this.mapToViewModel(user)});
        } catch (error) {
            if (error.response && error.response.status === 404)
                this.props.history.replace("/not-found");
        }

      }

      mapToViewModel = (user)=>{
          return{
            //   file: user.file,
              name: user.name,
              email: user.email,
            //   password: user.password
          };
      };

      doSubmit = async () => {
        //const {user}=  currentUser();
        await saveUser(this.state.data,this.state.id);
        this.props.history.push("/account");
        window.location =  "/home";
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
                <div className="profile">
                <br/><br/>
                    <h1>My Profile</h1>
                    <br/>
                    <div className="info">
                        {/* <img className="pic" alt="file" src="blob:http://localhost:3000/e8bcf67c-7864-43ec-989d-5c2b5f3ee2c6"/> */}
                        
                        <form onSubmit={this.handleSubmit}>
                        {/* <div classname="mb-3">
                            <label for="formFile" className="form-label">Profile Photo</label>
                            <input className="form-control choose" name="file" type="file" id="formFile" onChange={this.handleChange1}/>
                            
                        </div> */}
                        {this.renderInput("email", "Email")}
                        {/* {this.renderInput("password", "Password", "password")} */}
                        {this.renderInput("name", "Name")}
                        {this.renderButton("Save")}
                        </form>
                    </div>
                </div></div>
            </React.Fragment>
          );
    }
}
 
export default Account;