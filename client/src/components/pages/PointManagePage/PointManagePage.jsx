import React, {useState, useEffect} from 'react';
import './PointManagePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import PointAdderModal from '../../PointAdderModal/PointAdderModal';
import {db, auth} from '../../../firebase';
import QrReader from 'react-qr-scanner';



export default function PointManagePage() {
    let [show, setShow] = useState(false);
    let [userInfo, setUserInfo] = useState({});
    let [storeId, setStoreId] = useState({});
    let [pageLoader, setPageLoader] = useState(false);
    let [currentPoints, setCurrentPoints] = useState(0);
    let [restOfPoints, setRestOfPoints] = useState(0);
    let [delay] = useState(100);
    let [result, setResult] = useState("no result"); 

    const previewStyle = {
        height: 240,
        width: 320
    }

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setStoreId(doc.id)
                }
            })
        })
        .catch(err=> console.log(err))
    }, [pageLoader])


// closes the edit modal
    let hideUserProfile = () => {
        setShow(false);
        setUserInfo({})
        document.getElementById("userSearchBar").reset();
    }

// opens up the edit modal
    let showUserProfile = (e) => {
        e.preventDefault();
        setShow(true)
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().username === e.target.searchUser.value) {
                    setUserInfo(doc.data())
                    doc.data().stores.map(store=> {
                        if (store.id === storeId) {
                            setCurrentPoints(store.points)
                            let restPoints = store.pointmax - store.points;
                            setRestOfPoints(restPoints)
                        }
                    })
                }
            })
        })
        .catch(err=> console.log(err))
    }

    let pageLoadHandler = () => {
        setPageLoader(!pageLoader)
    }

// Adds a point to state and to the database
    let currentPointsHandler = ()=> {
        setCurrentPoints(currentPoints + 1);
        setRestOfPoints(restOfPoints - 1);
        db.collection("usertype")
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc => {
                if (doc.data().uid === userInfo.uid) {
                    let data = doc.data().stores
                    let store = data.find(store=> store.id === storeId)
                    store.points +=1
                    db.collection("usertype").doc(`${doc.id}`).update({
                        stores: data
                    })
                }
            })
        })
        pageLoadHandler();
    }

    let handleScan = (data)=> {
        // setResult(data)
        setShow(true)
        if (data !== null) {
            console.log(data.text)
            setResult(data.text)
            db.collection("usertype")
            .get()
            .then(snapshot=> {
                snapshot.forEach(doc=> {
                    if (doc.data().uid === data.text) {
                        setUserInfo(doc.data())
                        doc.data().stores.map(store=> {
                            if (store.id === storeId) {
                                setCurrentPoints(store.points)
                                let restPoints = store.pointmax - store.points;
                                setRestOfPoints(restPoints)
                            }
                        })
                    }
                })
            })
        }
    }

    let handleError = (err) => {
        console.log(err)
    }

    return (
        <div className="point-manager">
            <h1 className="point-manager__title">Point Manager</h1>
            <form onSubmit={showUserProfile} id="userSearchBar" className="point-form">
                <input className="point-form__search-bar" type="text" placeholder="Search user by username" id="searchUser" name="searchUser"/>
            </form>
            <div className="point-manager__scanner">
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
            </div>
                <p>{result}</p>
            <PointAdderModal show={show} restOfPoints={restOfPoints} currentPoints={currentPoints} currentPointsHandler={currentPointsHandler}hideUserProfile={hideUserProfile} userInfo={userInfo} storeId={storeId} pageLoadHandler={pageLoadHandler}/>
            
            <FooterStore/>
        </div>
    )
}
