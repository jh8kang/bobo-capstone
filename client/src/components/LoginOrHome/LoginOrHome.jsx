import React, {Component} from 'react';
import {auth, db} from '../../firebase';
import './LoginOrHome.scss';
import UserLoginPage from '../pages/UserLoginPage/UserLoginPage'
import {Redirect} from 'react-router-dom';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
            user: {},
            type: "",
        }
    }

    componentDidMount=() => {
        this.authListener() 
    }
    
    typeHandler = (e)=> {
        db.collection('usertype')
            .get()
            .then(snapshot=> {
                snapshot.forEach(doc=> {
                    if (doc.data().uid === e.uid) {
                        console.log(doc.data().type)
                        this.setState({
                            type: doc.data().type
                        })
                    }
                })
            })
            .catch(err=> console.log(err))

        db.collection('stores')
            .get()
            .then(snapshot=> {
                snapshot.forEach(doc=> {
                    if (doc.data().uid === e.uid) {
                        this.setState({
                            type: doc.data().type
                        })
                    }
                })
            })
            .catch(err=> console.log(err))
    }

    authListener = ()=> {
        auth.onAuthStateChanged((user)=>{
            if(user) {
                this.setState({user: user});
                console.log("user is logged in")
            } else {
                this.setState({user: null})
                console.log("user is out")
            }
        }) 
    }

    render() {
        if (this.state.user && (this.state.type === 'collector')) {
            return <Redirect to="/home"/>
        } else if (this.state.user &&(this.state.type === 'storekeeper')) {
            return <Redirect to='/home/store'/>

        } else {
            return <UserLoginPage typeHandler={this.typeHandler}/>
        }
    }
}

export default LoginPage