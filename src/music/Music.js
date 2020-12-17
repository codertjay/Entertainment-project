import React , {
    useState ,
    useEffect
} from 'react';
import { Container , Typography , Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Player from './Player'

const Music = () => {

    return (
        <div>
            <Box mt={8} p={0} ml={0} mr={0}>
                <Player/>
            </Box>
        </div>
    )
}

export default Music;