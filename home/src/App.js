import React , { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import { CssBaseline , MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles'
import './App.css'
import theme from './theme'
import MyAppBar from './containers/AppBar'
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()
class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup ();
    }

    render () {
        return (
            <div className='app' style={{margin: 0}}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Router history={history}>
                        <MyAppBar/>
                        <BaseRouter/>
                    </Router>
                </ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null ,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch (actions.authCheckState ())
    }
}

export default connect (mapStateToProps , mapDispatchToProps) (App);
