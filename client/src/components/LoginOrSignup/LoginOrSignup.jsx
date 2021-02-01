import React, {Component} from 'react';
import UserLoginPage from '../pages/UserLoginPage/UserLoginPage';
import {Redirect} from 'react-router-dom';

class LoginOrSignup extends Component {
    state = {
        signup: true,
        login: false,
    }

// signupRouter changes state so that the signup page renders
    signupRouter = (e) => {
        e.preventDefault();
        this.setState({
            signup: false,
        })
    }

    render() {
       
        if(!this.state.signup) {
            return <Redirect to="/signup"/>
        } else {
            return <UserLoginPage typeHandler={this.props.typeHandler} signupRouter = {this.signupRouter} />
        }
    }
}
export default LoginOrSignup
