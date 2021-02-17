import React, {Component} from 'react';
import './SignUpPage.scss';
import {auth, db} from '../../../firebase';
import {Redirect} from 'react-router-dom';

class SignUpPage extends Component {
    state = {
        error:"",
        useruid: "",
    }

// adds collector to firestore
    signup = (e)=>  {
        console.log(e.target.name.value)
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            this.setState({
                useruid: user.user.uid
            })

            db.collection("usertype").add({
                name: e.target.name.value,
                username: e.target.username.value,
                location:e.target.location.value,
                uid: user.user.uid,
                stores: [],
                type: "collector",
                image: null,
                bbtcount: 0,
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
            <div className="signup">
                <div className="signup__container">
                    <h1 className="signup__title">Sign Up To</h1>
                    <h1 className="signup__title__logo">BOBO</h1>
                    <form onSubmit={this.signup} className="signup-form">
                            <input className="signup-form__input" placeholder="Name" type="text" id="name" name="name"/>
                            <input className="signup-form__input" placeholder="email"type="email" id="username" name="username"/>
                            <input className="signup-form__input" placeholder="password" type="password" id="password" name="password"/>
                            <div className="signup-form__input--location">
                                <label className="signup-form__label" htmlFor="location">location</label>
                                <select className="signup-form__location__select" id="location" name="location">
                                    <option value="vancouver">Vancouver</option>
                                    <option value="toronto">Toronto</option>
                                    <option value="toronto">Calgary</option>
                                </select>
                            </div>
                    
                        <button className="signup-form__button">Sign up</button>
                    </form>

                </div>
            </div>
        )
    }
}

export default SignUpPage