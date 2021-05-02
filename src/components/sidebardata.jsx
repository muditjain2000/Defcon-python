import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";


export const SidebarData = [
    {
        title:'Home',
        path: '/home',
        icon: <RiIcons.RiHome3Line/>,
        cName: 'nav-text'
    },
    {
        title:'Dashboard',
        path: '/dashboard',
        icon: <RiIcons.RiDashboardLine/>,
        cName: 'nav-text'
    },
    {
        title:'Account',
        path: '/account',
        icon: <RiIcons.RiAccountCircleLine/>,
        cName: 'nav-text'
    }
]