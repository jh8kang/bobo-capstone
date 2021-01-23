import React, {Component} from 'react';
// import {auth} from '../../../firebase';
import {db, auth} from '../../../firebase';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
          stores: null,
          user: {},
          type: "",
        }
        this.logout = this.logout.bind(this)
      }

      componentDidMount() {
        console.log("mounted")
        db.collection('stores')
          .get()
          .then(snapshot=> {
            const stores = []
            snapshot.forEach(doc=> {
              const data = doc.data()
              stores.push(data)
            })
            this.setState({
              stores: stores
            })
          })
          .catch(err=> console.log(err))
    
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
     
    logout() {
        auth.signOut();
    }

    render() {
        return (
            <div>
                <button onClick={this.logout} >logout</button>
                
            </div>
        )
    }
}

export default HomePage
