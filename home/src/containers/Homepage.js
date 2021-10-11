import React from "react";
import * as actions from "../store/actions/auth";
import { connect } from 'react-redux'
import { Grid ,Container} from "@material-ui/core";
import ProfileList from "./ProfileList";



const Homepage = (props) => {
    console.log ('the props from home page')

    return (
        <>
            <Container fixed>
                <ProfileList/>
            </Container>
        </>

    );
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading ,
        error: state.auth.error ,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username , password) => dispatch (actions.authLogin (username , password))
    }
}

export default connect (mapStateToProps ,
    mapDispatchToProps) (Homepage);