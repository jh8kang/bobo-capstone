import React, {Component} from 'react';
import './SignUpPage.scss';
import {auth, db} from '../../../firebase';
import {Redirect} from 'react-router-dom';

class SignUpPage extends Component {
    state = {
        error:"",
        useruid: "",
        image: null,
    }
    signup = (e)=>  {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.username.value, e.target.password.value)
        .then(user=> {
            this.setState({
                useruid: user.user.uid
            })
            var userRef = db.collection("usertype").add({
                name: e.target.name.value,
                username: e.target.username.value,
                location:e.target.location.value,
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

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
        }
      };

    render() {
        if (this.state.useruid) {
            return <Redirect to="/login"/>
        }
    
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.signup} className="signupForm">
                    <div>
                        <label htmlFor="name">name</label>
                        <input type="text" id="name" name="name"/>
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
                    <button >Sign up</button>
                </form>
                {/* <div className="">
                    <input type="file" name="myImage" onChange={this.onImageChange} />
                </div>
                <img src={`${this.state.image}`}/> */}
            </div>
        )

    }
}

export default SignUpPage