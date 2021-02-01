import React, {useState, useEffect} from 'react';
import './PointManagePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import PointAdderModal from '../../PointAdderModal/PointAdderModal';
import {db, auth} from '../../../firebase';

export default function PointManagePage() {
    let [show, setShow] = useState(false);
    let [userInfo, setUserInfo] = useState({});
    let [storeId, setStoreId] = useState({});
    let [pageLoader, setPageLoader] = useState(false);

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
                }
            })
        })
        .catch(err=> console.log(err))
    }

    let pageLoadHandler = () => {
        setPageLoader(!pageLoader)
    }

    return (
        <div className="point-manager">
            <h1>Point Manager</h1>
            <form onSubmit={showUserProfile} id="userSearchBar">
                <label htmlFor="searchUser">Search user by username</label>
                <input type="text" id="searchUser" name="searchUser"/>
            </form>
            <PointAdderModal show={show} hideUserProfile={hideUserProfile} userInfo={userInfo} storeId={storeId} pageLoadHandler={pageLoadHandler}/>
            <FooterStore/>
        </div>
    )
}
