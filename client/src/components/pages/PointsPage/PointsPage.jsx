import React, {useState, useEffect} from 'react';
import './PointsPage.scss';
import Footer from '../../Footer/Footer';
import PointCard from '../../PointCard/PointCard';
import {auth, db} from '../../../firebase';
import {v4 as uuid} from 'uuid';
import firebase from '../../../firebase';
import defaultImage from '../../../assets/icons/profile.svg';
import Header from '../../Header/Header';

function PointsPage() {
    const [stores, setStores] = useState([]);
    const [storeDeleted, setStoreDeleted] = useState(null);
    const [userInfo, setUserInfo] = useState({});

// variables 
    let imageUrl;
    
// sets default image to store profile page
    if (userInfo.image === null) {
        imageUrl = defaultImage;
    } else {
        imageUrl = userInfo.image;
    }

    useEffect(()=> {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setStores(doc.data().stores);
                    setUserInfo(doc.data());
                }
            })
        })
        .catch(err=> console.log(err))

        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === storeDeleted) {
                    let usersArray = db.collection("stores").doc(`${doc.id}`)
                    usersArray.update({
                        stores: firebase.firestore.FieldValue.arrayUnion(`${auth.currentUser.uid}`)
                    })
                }
            })
        })
        .catch(err=> console.log(err))
    }, [storeDeleted])

// deleteStore deletes a store from the users list of stores that its collecing from 
   let deleteStore = (e) => {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    let storesList = doc.data().stores;
                    let newStoresList = storesList.filter(store=> store.id !== e.target.id)
                    let storesArray = db.collection("usertype").doc(`${doc.id}`)
                    storesArray.update({
                        stores: newStoresList,
                    })
                    setStores(doc.data().stores)
                    setStoreDeleted(e.target.id)
                }
            })
        })
        .catch(err=> console.log(err))
    }

    if (userInfo.name) {
        return (
            <div>
                <div className="points">
                    <div className="points__hero">
                        <Header userInfo={userInfo}/>
                        <div className="points__hero__stat">
                            <p className="points__hero__stat__text">{stores.length} stores</p>
                        </div>
                    </div>
                    <div className="points__cards">
                        <h1 className="points__title">YOUR POINTS</h1>
                        {stores.map(store=> <PointCard store={store} key={uuid()} deleteStore={deleteStore}/>)}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
    return <p>loading</p>

}

export default PointsPage