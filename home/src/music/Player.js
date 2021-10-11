import React , {
    useState ,
    useEffect
} from 'react';
import { Container , Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from './Sidebar'
import Body from './Body'
import './Player.css'
import Footer from './Footer'

const Player = () => {

    return (
        <div className={'player'}>
            <div className={'player__body'}>
                <Sidebar/>
                <Body/>

            </div>
            <Footer/>
        </div>
    )
}

export default Player;