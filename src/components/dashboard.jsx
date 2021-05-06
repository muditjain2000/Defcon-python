import React, { Component } from 'react';
import WidgetBar from './common/widgetBar';
import './dashboard.css';
import LineChart from './common/lineChart';
import { getFaceData } from '../services/userService';
import PyramidChart from './common/pyramidChart';
import TimeChart from './common/timeChart';
import ChartViewer from './common/frequencyChart';
import Particles from "react-tsparticles";
import {Carousel} from '3d-react-carousal';

 import VideoPlayer from 'react-video-js-player';
// import Output from '.../public/output.avi';
import { getCountData } from './../services/userService';
 import MyComponent from './common/canvasChart';




class Dashboard extends Component {
    state = { 
      chartData:[],
      chartData1:[],
      mudit:[],
      elon:[],
      bill:[],
      modi:[],
      name:[],
      detect:[],
      frequency:[],
     }

     async componentDidMount() {
      
      const { data: faceData } = await getFaceData();
      const {data: countData}=await getCountData();
        console.log(faceData)
        console.log(countData)
        this.setData(faceData)
        this.setNumber(faceData)
        this.setMudit(faceData)
        this.setElon(faceData)
        this.setModi(faceData)
        this.setBill(faceData)
         let frequencyObject=[];
        
         
         countData.forEach((element)=>{
          const date=new Date(element.date)
          const x = (`${date.toLocaleDateString()}-${date.toLocaleTimeString()}`)
          const y =element.count
          frequencyObject.push({"label":x,"value": y } )
        })

        this.setState({
          frequency: [...frequencyObject]})
        console.log(this.state.frequency)

      
    }
    setMudit=(faceData)=>{
      let filtered1=faceData.filter((m)=> m.face==="MUDIT JAIN")
      let date=[],i=0;
        let graphObject = [];
        
        
        filtered1.forEach((element)=>{
          date[i]=new Date(element.date)
          i++
          
        })
        date.forEach((element)=>{
          const x = element.getDate();
          const y = parseFloat(`${element.getHours()}.${element.getMinutes()}`);
          graphObject.push({x, y } )
        })
        this.setState({
          mudit:[...graphObject],})
    }

    setModi=(faceData)=>{
      let filtered4=faceData.filter((m)=> m.face==="NARENDRA MODI")
      let date=[],i=0;
        let graphObject = [];
        
        
        filtered4.forEach((element)=>{
          date[i]=new Date(element.date)
          i++
          
        })
        date.forEach((element)=>{
          const x = element.getDate();
          const y = parseFloat(`${element.getHours()}.${element.getMinutes()}`);
          graphObject.push({x, y } )
        })
        this.setState({
          modi:[...graphObject],})
    }
    setElon=(faceData)=>{
      let filtered2=faceData.filter((m)=> m.face==="ELON MUSK")
      let date=[],i=0;
        let graphObject = [];
        
        
        filtered2.forEach((element)=>{
          date[i]=new Date(element.date)
          i++
          
        })
        date.forEach((element)=>{
          const x = element.getDate();
          const y = parseFloat(`${element.getHours()}.${element.getMinutes()}`);
          graphObject.push({x, y } )
        })
        this.setState({
          elon:[...graphObject],})
    }
    setBill=(faceData)=>{
      let filtered3=faceData.filter((m)=> m.face==="BILL GATES")
      let date=[],i=0;
        let graphObject = [];
        
        
        filtered3.forEach((element)=>{
          date[i]=new Date(element.date)
          i++
          
        })
        date.forEach((element)=>{
          const x = element.getDate();
          const y = parseFloat(`${element.getHours()}.${element.getMinutes()}`);
          graphObject.push({x, y } )
        })
        this.setState({
          bill:[...graphObject],})
    }

    

    setData=(faceData)=>{
      let i=0
      faceData.forEach((element,index) => {
        const prevDate=new Date(faceData[i].date);
        const newDate=new Date(element.date);
        if(prevDate<newDate){
          i=index;
        }
      }
      
      );
      
      this.setState({chartData:[
        {label:"Bill Gates",value:faceData[i].detect[0]},
        {label:"Elon Musk",value:faceData[i].detect[1]},
        {label:"Mudit Jain",value:faceData[i].detect[2]},
        {label:"Narendra Modi",value:faceData[i].detect[3]}
    ]})
      
    }

    setNumber=(faceData)=>{
      let count1=0,count2=0,count3=0,count4=0;
        faceData.forEach((element)=>{
          if(element.face==="MUDIT JAIN"){
            count1=count1+1;
          }
          else if(element.face==="ELON MUSK"){
            count2=count2+1;
          }
          else if(element.face==="BILL GATES"){
            count3=count3+1;
          }
          else if(element.face==="NARENDRA MODI"){
            count4=count4+1;
          }
        });
        
        this.setState({chartData1:[
          {label:"Bill Gates",value:count3},
          {label:"Elon Musk",value:count2},
          {label:"Mudit Jain",value:count1},
          {label:"Narendra Modi",value:count4}
      ]})
    }

    
    render() { 
      
      
        
          
          
        return ( 
          <>
          <Particles
                id="tsparticles1"
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
                        value_area: 1300,
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
          <div className="dashboard">
            <div className="widgetbar">
              
                <WidgetBar  data={this.state.chartData}/>
                
            </div>
            <div className="pyramidchart">
            
              <PyramidChart data={this.state.chartData1}/>
            </div>
            {/* <div className="linechart">
            <div className="hide1"></div>
              <LineChart data={this.state.chartData}/>
            </div> */}
            </div>
            {/* <div className="dashboard">
            
            <div className="timechart">
            <div className="hide3"></div>
              <TimeChart data={this.state.mudit} name="Mudit"/>
            </div>
            <div className="timechart">
            <div className="hide3"></div>
              <TimeChart data={this.state.elon} name="Elon Musk"/>
            </div>
            </div>
            <div className="dashboard">
            <div className="timechart">
            <div className="hide3"></div>
              <TimeChart data={this.state.bill} name="Bill Gates"/>
            </div>
            <div className="timechart">
            <div className="hide3"></div>
              <TimeChart data={this.state.modi} name="Narendra Modi"/>
            </div>
            
            </div> */}
            
            <div>
            <Carousel slides={
               [
                 <TimeChart data={this.state.bill} name="Bill Gates"  />  ,
                 <TimeChart data={this.state.elon} name="Elon Musk"  />  ,
                 <TimeChart data={this.state.mudit} name="Mudit"  />,
                <TimeChart data={this.state.modi} name="Narendra Modi"  />  
                   ]
            } autoplay={true} interval={5000}/></div><br/><br/><br/>
            <div className="dashboard">
            
              
                <LineChart   data={this.state.frequency}/>
                
            
            </div><br/><br/><br/>
            <div className="dashboard">
            
            <VideoPlayer className="video" src="/output.mp4" width="720" height="480"/>
          
          </div><br/><br/><br/>
          {/* <div className="dashboard">
            <div className="linechart">
              
                <ChartViewer  data={[["30-3-21", 133],["1-3-21", 233],["15-3-21", 543]]}/>
                
            </div>
            </div> */}
            
            </>
            
         );
    }
}
 
export default Dashboard;