import React, {Component} from 'react'
import UserLoginPage from '../pages/UserLoginPage/UserLoginPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import {Redirect} from 'react-router-dom';

class LoginOrSignup extends Component {
    state = {
        signup: true,
        login: false,
    }

    signupRouter = (e) => {
        e.preventDefault();
        this.setState({
            signup: false,
        })
    }


    render() {
       
        if(!this.state.signup) {
            // return <SignUpPage signup={this.signup}/>
            return <Redirect to="/signup"/>
        } else {
            return <UserLoginPage typeHandler={this.props.typeHandler} signupRouter = {this.signupRouter} loginHandler={this.props.loginHandler} />
        }
            // <div>
            //     {this.state.signup? <UserLoginPage typeHandler={this.props.typeHandler}signupRouter = {this.signupRouter} loginHandler={this.props.loginHandler} />: <SignUpPage signup={this.signup}/>}
            // </div>
        
    }
}
export default LoginOrSignup
