import React, {useState, useEffect} from 'react';
import './PointsPage.scss';
import Footer from '../../Footer/Footer';
import PointCard from '../../PointCard/PointCard';
import {auth, db} from '../../../firebase';
import {v4 as uuid} from 'uuid';
import firebase from '../../../firebase';

export default function PointsPage() {
    const [stores, setStores] = useState([]);
    const [storeDeleted, setStoreDeleted] = useState(null);
    // const [userPoints, setUserPoints] = useState(null);
    // const [maxPoints, setMaxPoints] = useState(null);

    useEffect(() => {
        console.log('useEffect')
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    setStores(doc.data().stores)
                }
            })
        })
        .catch(err=> console.log(err))
    }, [storeDeleted])

    let deleteStore = (e) => {
        // e.preventDefault();
        setStoreDeleted(e.target.id)

        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    let storesList = doc.data().stores;
                    console.log(storesList)
                    let newStoresList = storesList.filter(store=> store.id != e.target.id)
                    console.log(newStoresList)
                    let storesArray = db.collection("usertype").doc(`${doc.id}`)
                    storesArray.update({
                        stores: newStoresList,
                    })
                }
            })
        })
        .catch(err=> console.log(err))
    }

    return (

        <div>
            <div className="pointsPage">
                <h1>Your Points</h1>
                {stores.map(store=> <PointCard store={store} key={uuid()} deleteStore={deleteStore}/>)}
            </div>
            <Footer/>
        </div>
    )
}
