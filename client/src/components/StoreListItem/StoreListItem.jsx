import React, {Component} from 'react';
import './StoreListItem.scss';
import defaultImage from '../../assets/images/default.jpg'
import {db, auth}from '../../firebase';
import firebase from 'firebase';

function StoreListItem({store}) {
// variables
let storeImage;

// sets store image 
if (store.image) {
    storeImage = store.image
} else {
    storeImage = defaultImage;
}

// clickHandler connects usertype and stores databases - Added store to users stores list and user to store users list 
    let clickHandler = () => {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    let storesArray = db.collection("usertype").doc(`${doc.id}`)
                    storesArray.update({
                        stores: firebase.firestore.FieldValue.arrayUnion({ id: store.uid, points: 0, name: store.name, pointmax: store.pointmax})
                    })
                }
            })
        })
        .catch(err=> console.log(err))

        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.id === store.uid) {
                    let storesArray = db.collection("stores").doc(`${doc.id}`)
                    storesArray.update({
                        users: firebase.firestore.FieldValue.arrayUnion(`${auth.currentUser.uid}`)
                    })
                }
            })
        })
        .catch(err=> console.log(err))
    }


    
        return (
            <div className="item">
            <div className="item__imgBox">
                <img className="item__img"src={`${storeImage}`} alt="store"/>
            </div>
            <div className="item__info">
                <div>
                    <p className="item__info__storename">{store.name}</p>
                    <p className="item__info__des">{store.description}</p>
                </div>
            <button onClick={clickHandler} id={store.uid} className="item__info__btn">Start Collecting</button>
            </div>
        </div>
        )
    
}

export default StoreListItem