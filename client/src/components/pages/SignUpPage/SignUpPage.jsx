import React, {Component} from 'react';
import './SignUpPage.scss';
import {auth} from '../../../firebase';

class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            // username: "",
            // password: "",
            error: "",
        }
        this.signup = this.signup.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    signup(e)  {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.username, e.target.password)
        .catch(err=>{
            console.log(err.message);
            this.setState({
                error: err.message
            })
        })
        if (!this.state.error) {
            this.props.history.push("/");
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <p>{this.state.error}</p>
                <form>
                    <label htmlFor="username">email</label>
                    <input onChange={this.handleChange} type="email" id="username" name="username"/>
                    <label htmlFor="name">password</label>
                    <input onChange={this.handleChange}type="password" id="password" name="password"/>
                    <button onClick={this.signup}>Sign up</button>
                </form>
            </div>
        )

    }
}

export default SignUpPage