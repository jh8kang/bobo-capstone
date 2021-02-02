import React, {useState, useEffect} from 'react';
import './PointsPage.scss';
import Footer from '../../Footer/Footer';
import PointCard from '../../PointCard/PointCard';
import {auth, db} from '../../../firebase';
import {v4 as uuid} from 'uuid';
import firebase from '../../../firebase';

function PointsPage() {
    const [stores, setStores] = useState([]);
    const [storeDeleted, setStoreDeleted] = useState(null);

    useEffect(()=> {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setStores(doc.data().stores)
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

    return (
        <div>
            <div className="points">
                <h1 className="points__title">YOUR POINTS</h1>
                {stores.map(store=> <PointCard store={store} key={uuid()} deleteStore={deleteStore}/>)}
            </div>
            <Footer/>
        </div>
    )
        
    
}

export default PointsPage