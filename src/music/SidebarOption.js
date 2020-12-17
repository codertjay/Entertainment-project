import React , { Component } from 'react';
import './SidebarOption.css'


const SidebarOption = ({title , Icon}) => {

    return (
        <div className={'sidebarOption'}>
            <p>{title}</p>
        </div>
    );
}

export default SidebarOption;