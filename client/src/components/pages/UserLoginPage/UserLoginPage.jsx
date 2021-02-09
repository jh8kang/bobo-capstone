import React, {Component} from 'react';
import {auth} from '../../../firebase';
import {Link} from 'react-router-dom';
import './UserLoginPage.scss';

class UserLoginPage extends Component {
    state ={
        error: "",
    }

    login=(e)=> {
        e.preventDefault();
        auth.signInWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            this.props.typeHandler(user.user);
            sessionStorage.setItem('username', e.target.username.value);
            sessionStorage.setItem('password', e.target.password.value);
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
            <div className="login">
                <div className="login__container">
                    <h1 className="login__title">Log In to</h1>
                    <h1 className="login__title__logo">BOBO</h1>
                    <form onSubmit={this.login} className="login-form">
                        <div className="login-form__items">
                            <input className="login-form__items__input" placeholder="email" type="email" id="username" name="username"/>
                        </div>
                        <div>
                            <input className="login-form__items__input" placeholder="password" type="password" id="password" name="password"/>
                        </div>
                        <p className="login-form__error-message">{this.state.error}</p>
                        <button className="login-form__submit"type="submit">Login</button>
                    </form>
                    <div className="login__links">
                        <Link to='/signup' className="login__links__link">
                            <p className="login__links__link__text">Sign up as a point collector</p>
                        </Link>
                        <br></br>
                        <Link to='/signup/store' className="login__links__link">
                            <p className="login__links__link__text">Register your store</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserLoginPage