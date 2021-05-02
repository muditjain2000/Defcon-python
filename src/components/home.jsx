import React, { Component } from 'react';
import ImageCarousel from './common/carousel';
import { Link } from 'react-router-dom';
import Particles from "react-tsparticles";

import './dashboard.css';  
import { python, python1 } from './../services/userService';


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="home">
            <Particles
                id="tsparticles"
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
            <br/><br/>
            
            <ImageCarousel image1="images/1_T9ijxp8KOaxiMpwVfwQviw.png" image2="images/233bea466a.png" image3="images/maxresdefault.jpg"/><br/>
            <div id="home-main-wrapper">
                <br/>
            <div className="text">
            
                <h1>Unwarranted Hostile Action Understanding and Analysis</h1><br/>
                <h5>The basic idea was to create something that lacks on a large scale in the field of security industry and mental health concerning institutions.</h5>
            </div>
            <div className="row">
            <div className="text1 col-3">
                <h4> Face Counter</h4>
            {/* <Link to="/python"> */}
            <button onClick={()=>python()} id="start-watching">Start Face Counter</button>
          {/* </Link> */}
          </div>
          <div className="text2 col-3">
              <h4>Face Detection</h4>
          {/* <Link to="/python1"> */}
            <button onClick={()=>python1()} id="start-watching1">Start Face Detection</button>
          {/* </Link> */}
          </div></div></div>
            </div>
         );
    }
}
 
export default Home;