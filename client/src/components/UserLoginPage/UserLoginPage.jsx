import React, {Component} from 'react'

class UserLoginPage extends Component {

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <p></p>
                <form>
                    <label htmlFor="username">username: </label>
                    <input onChange={this.props.handleChange} type="email" id="username" name="username"/>
                    <label htmlFor="password">password: </label>
                    <input onChange={this.props.handleChange} type="password" id="password" name="password"/>
                    <button onClick={this.props.login}type="submit">Login</button>
                    <button onClick={this.props.signup}>Sign up</button>
                </form>
            </div>
        
        )

    }

}

export default UserLoginPage