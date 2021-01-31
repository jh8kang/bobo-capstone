import React, {useState} from 'react';
import './StoreSignupPage.scss';
import {auth, db} from '../../../firebase';
import {Redirect} from 'react-router-dom';


export default function StoreSignupPage() {
    let [useruid, setUserUid] = useState("");

    let signup = (e)=>  {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            setUserUid(user.user.uid)
            var userRef = db.collection("stores").add({
                uid: user.user.uid,
                name: e.target.name.value,
                description: e.target.description.value,
                username: e.target.username.value,
                pointmax: e.target.pointmax.value,
                location:e.target.location.value,
                users: [],
                type: "storekeeper",
            })
        })
        .catch(err=>{
            console.log(err)
        })

    }
    if (useruid) {
        return <Redirect to="/login"/>
    }
    return (
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={signup} className="signupForm">
            <div>
                <label htmlFor="name">Store Name</label>
                <input type="text" id="name" name="name"/>
            </div>
            <div>
                <label htmlFor="description">Description(shows on the client page)</label>
                <textarea id="description" name="description" className="store__description"/>
            </div>
            <div>
                <label htmlFor="username">email</label>
                <input type="email" id="username" name="username"/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password"/>
            </div>
            <div>
                <label htmlFor="location">location</label>
                <select id="location" name="location">
                    <option value="vancouver">Vancouver</option>
                    <option value="toronto">Toronto</option>
                    <option value="toronto">Calgary</option>
                </select>
            </div>
            <div>
                <label htmlFor="pointmax">Maxium Points(number)</label>
                <input id="pointmax" name="pointmax" type="number"/>
            </div>
            <button >Sign up</button>
        </form>
    </div>
    )
}
