import React, {Component} from 'react';
import './StoreListItem.scss';
import store1 from '../../assets/images/store1.jpg'
import {db, auth}from '../../firebase';
import firebase from 'firebase';

class StoreListItem extends Component {
    clickHandler = () => {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    let storesArray = db.collection("usertype").doc(`${doc.id}`)
                    storesArray.update({
                        stores: firebase.firestore.FieldValue.arrayUnion({ id: this.props.store.uid, points: 0, name: this.props.store.name, pointmax: this.props.store.pointmax})
                    })
                }
            })
        })
        .catch(err=> console.log(err))

        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                // console.log(this.props.store.uid)
                // console.log(doc.data().uid)
                if (doc.id == this.props.store.uid) {
                    console.log("hi")
                    let storesArray = db.collection("stores").doc(`${doc.id}`)
                    storesArray.update({
                        users: firebase.firestore.FieldValue.arrayUnion(`${auth.currentUser.uid}`)
                    })
                }
            })
        })
        .catch(err=> console.log(err))
    }

    render() {
        return (
            <div className="item">
            <div className="item__imgBox">
                <img className="item__img"src={`${store1}`}/>
            </div>
            <div className="item__info">
                <div>
                    <p className="item__info__storename">{this.props.store.name}</p>
                    <p className="item__info__des">{this.props.store.description}</p>
    
                </div>
            <button onClick={this.clickHandler} id={this.props.store.uid} className="item__info__btn">Start Collecting</button>
            </div>
        </div>
        )

    }
    
    

}


export default StoreListItem