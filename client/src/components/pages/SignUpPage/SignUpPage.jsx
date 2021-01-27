import React, {Component} from 'react';
import './SignUpPage.scss';
import {auth, db} from '../../../firebase';
import {Redirect} from 'react-router-dom';

class SignUpPage extends Component {
    state = {
        error:"",
        useruid: "",
    }
    signup = (e)=>  {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            this.setState({
                useruid: user.user.uid
            })
            var userRef = db.collection("usertype").add({
                name: "",
                location: "",
                uid: user.user.uid,
                stores: [],
                type: "collector",
            })
        })
        .catch(err=>{
            this.setState({
                error: err.message
            })
        })

    }

    render() {
        if (this.state.useruid) {
            return <Redirect to="/login"/>
        }
    
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.signup}>
                    <label htmlFor="username">email</label>
                    <input type="email" id="username" name="username"/>
                    <label htmlFor="name">password</label>
                    <input type="password" id="password" name="password"/>
                    <button >Sign up</button>
                </form>
            </div>
        )

    }
}

export default SignUpPage