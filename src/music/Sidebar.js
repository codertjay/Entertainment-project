import React , {
    useState ,
    useEffect
} from 'react';
import { Container , Typography , Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import image1 from '../images/image1.jpeg'
import SidebarOption from './SidebarOption'

import './Sidebar.css'

const Sidebar = () => {

    return (
        <div className={'sidebar'}>
            <img className={'sidebar__logo'}
                 src={image1} alt="The image"/>
            <SidebarOption title={'Home'}/>
            <SidebarOption title={'Search'}/>
            <SidebarOption title={'Albums'}/>
            <SidebarOption title={'Music'}/>
        </div>
    )
}

export default Sidebar;