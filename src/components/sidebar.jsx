import React, { Component } from 'react';


import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import './sidebar.css';
import { IconContext } from 'react-icons';

class Sidebar extends Component {
    state = {
        navbar: false
    };
    
   showSidebar = () => {
        this.setState({navbar:true});
    };

    hideSidebar = () => {
        this.setState({navbar:false});
    };

    render() { 
        return (  
            <React.Fragment>
                <IconContext.Provider value={{color: 'white'}}>
                    <div className="sidebar">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars onClick={this.showSidebar}/>
                        </Link>
                    </div>
                    <nav className={this.state.navbar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={this.hideSidebar}>
                            <li className='navbar-toggle'>
                                <Link to="#" className="menu-bars">
                                    <AiIcons.AiOutlineClose/>
                                </Link>
                            </li>
                            {SidebarData.map((item,index)=>{
                                return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                    </IconContext.Provider>
            </React.Fragment>
        );
    }
}
 
export default Sidebar;