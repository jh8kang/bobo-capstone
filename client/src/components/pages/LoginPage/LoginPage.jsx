import React, {Component} from 'react';
import {auth} from '../../../firebase';
import './LoginPage.scss';
import {Link} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import UserLoginPage from '../../UserLoginPage/UserLoginPage';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
            user: {},
            type: "collector"
        }
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    componentDidMount() {
        this.authListener() 
    }

    authListener() {
        auth.onAuthStateChanged((user)=>{
            if(user) {
                this.setState({user: user});
            } else {
                this.setState({user: null})
            }
        }) 
    }
    
    handleChange = (e)=> {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    login(e) {
        e.preventDefault();
        console.log(e.target)
        auth.signInWithEmailAndPassword(this.state.username, this.state.password)
        .then(u=>{})
        .catch(err=>{
            console.log(err)
            this.setState({
                error: err.message
            })
        })
    }

    signup(e)  {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.username, e.target.password)
        .catch(err=>{
            this.setState({
                error: err.message
            })
        })
    }

    render() {
        return(
            this.state.user? <HomePage/> : <UserLoginPage handleChange={this.handleChange} login={this.login} signup={this.signup}/>
        )

    }
}

export default LoginPage