import React, {Component} from 'react'
import UserLoginPage from '../pages/UserLoginPage/UserLoginPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage';

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
        return (
            <div>
                {this.state.signup? <UserLoginPage typeHandler={this.props.typeHandler}signupRouter = {this.signupRouter} loginHandler={this.props.loginHandler} />: <SignUpPage signup={this.signup}/>}
            </div>
        )
    }
}
export default LoginOrSignup
