import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {auth} from '../../../firebase';

class StoreLoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
            type: "store"
        }
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    login(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.username, this.state.password)
        .then(u=>{})
        .catch(err=>{
            console.log(err)
            this.setState({
                error: err.message
            })
        })
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <p>{this.state.error}</p>
                <form>
                    <label htmlFor="username">username: </label>
                    <input value={this.state.username} onChange={this.handleChange} type="email" id="username" name="username"/>
                    <label htmlFor="password">password: </label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" id="password" name="password"/>
                    <button onClick={this.login}type="submit">Login</button>
                    <p>Don't have an account?</p>
                    <Link to="/signup">
                        <button>Sign up</button>
                    </Link>
              
                </form>
            </div>
        )

    }
}

export default StoreLoginPage