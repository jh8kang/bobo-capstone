import React, {Component} from 'react';
import {auth} from '../../../firebase';

class UserLoginPage extends Component {
    state ={
        error: "",
    }

    login=(e)=> {
        e.preventDefault();
        auth.signInWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            this.props.typeHandler(user.user);
            // sessionStorage.setItem('username', e.target.username.value);
            // sessionStorage.setItem('password', e.target.password.value);
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                error: err.message
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <p></p>
                <form onSubmit={this.login}>
                    <label htmlFor="username">username: </label>
                    <input type="email" id="username" name="username"/>
                    <label htmlFor="password">password: </label>
                    <input  type="password" id="password" name="password"/>
                    <button type="submit">Login</button>
                </form>
                    <button onClick={this.props.signupRouter}>Sign up</button>
            </div>
        )
    }
}

export default UserLoginPage