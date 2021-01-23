import React from 'react'

export default function Login() {
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
            
            <button onClick={this.signup}>Sign up</button>
            
      
        </form>
    </div>
    )
}
