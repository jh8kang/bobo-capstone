import React, {useState, useEffect} from 'react';
import './ProfilePage.scss';
import Footer from '../../Footer/Footer';
import profile from '../../../assets/icons/profile.svg';
import edit from '../../../assets/icons/edit.svg';
import {db, auth} from '../../../firebase';
import firebase from 'firebase';
import EditModal from '../../EditModal/EditModal';

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({});
    const [storeCount, setStoreCount] = useState(0);
    const [pageLoader, setPageLoad] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(()=> {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    setUserInfo(doc.data())
                    console.log(doc.data().stores)
                    setStoreCount(doc.data().stores.length)
                }
            })
        })
        .catch(err=> console.log(err))
    }, [pageLoader])

    let updateUserInfo = (e) => {
        e.preventDefault();
        // console.log(e.target.name.value)
        // console.log(e.target.username.value)
        // console.log(e.target.location.value)
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    let userInfo = db.collection("usertype").doc(`${doc.id}`)
                    userInfo.update({
                        name: e.target.name.value,
                        username: e.target.username.value,
                        location: e.target.location.value
                    })
                }
                setPageLoad(!pageLoader);
                hideEdit()
            })
        })
        .catch(err=> console.log(err))
    }

    let hideEdit = () => {
        setShow(false);
    }

    let showEdit = () => {
        setShow(true)
    }

  

    return (
        <div className="profile">
            <div className="profile__header">
                <img className="profile__header__edit"src={edit} onClick={showEdit}/>
            </div>
            <div className="profile__info">
                <img className="profile__info__img"src={profile}/>
                <p>{userInfo.name}</p>
                <p className="store">Collecting points from <span className="store-count">{storeCount}</span> boba stores</p>
                <p>location: <span className="store-count">{userInfo.location}</span> </p>
                <p>email: <span className="store-count">{userInfo.username}</span> </p>
            </div>
            <EditModal show={show} userInfo={userInfo} updateUserInfo={updateUserInfo} hideEdit={hideEdit}/>
            <Footer/>
        </div>
    )
}
