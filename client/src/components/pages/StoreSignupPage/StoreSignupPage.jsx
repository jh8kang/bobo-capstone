import React, {useState} from 'react';
import './StoreSignupPage.scss';
import {auth, db} from '../../../firebase';
import {Redirect} from 'react-router-dom';


export default function StoreSignupPage() {
    let [useruid, setUserUid] = useState("");
    let [error, setError] = useState("");

// store to firestore
    let signup =  (e)=>  {
        e.preventDefault();
        let date = new Date();
        auth.createUserWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            setUserUid(user.user.uid)
            db.collection("stores").add({
                uid: user.user.uid,
                name: e.target.name.value,
                description: e.target.description.value,
                username: e.target.username.value,
                pointmax: parseInt(e.target.pointmax.value),
                location:e.target.location.value,
                users: [],
                type: "storekeeper",
                image: null,
                tracker: [0,0,0,0,0,0,0],
                timetracker: [date.getFullYear(), date.getMonth(), date.getDate(), date.getDay()]
            })
        })
        .catch(err=>{
            console.log(err.message)
            setError(err.message)
        })

    }
    if (useruid) {
        return <Redirect to="/login"/>
    }
    return (
        <div className="signup">
            <div className="signup__container">
                <h1 className="signup__title">Sign Up To</h1>
                <h1 className="signup__title__logo">BOBO</h1>
                <p>{error}</p>
                <form onSubmit={signup} className="signup-form">
                        <input className="signup-form__input" placeholder="Store Name" type="text" id="name" name="name"/>
                        <textarea className="signup-form__input" placeholder="Any text that clients will see..." id="description" name="description"/>
                        <input className="signup-form__input" placeholder="email" type="email" id="username" name="username"/>
                        <input className="signup-form__input" placeholder="password" type="password" id="password" name="password"/>
                        <input className="signup-form__input" placeholder="maximum points" id="pointmax" name="pointmax" type="number"/>
                        <div className="signup-form__input--location">
                            <label className="signup-form__label" htmlFor="location">location</label>
                            <select id="location" name="location">
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
