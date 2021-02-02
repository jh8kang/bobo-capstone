import React from 'react';
import './FeaturedCard.scss';
import defaultImage from '../../assets/images/default.jpg';
import {db, auth} from '../../firebase';
import firebase from 'firebase';


export default function FeaturedCard({store}) {

// variables
    let storeImage;

// setting default store image if no image
    if (store.image) {
        storeImage = store.image
    } else {
        storeImage = defaultImage
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
        <div className="card">
            <div className="card__imgBox">
                <img onClick={clickHandler} className="card__img" src={`${storeImage}`} alt="store profile"/>
            </div>
            {/* <p className="card__name">{store.name}</p> */}
        </div>
    )
}
