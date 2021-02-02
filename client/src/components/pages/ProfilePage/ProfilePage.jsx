import React, {useState, useEffect} from 'react';
import './ProfilePage.scss';
import Footer from '../../Footer/Footer';
import profile from '../../../assets/icons/profile.svg';
import edit from '../../../assets/icons/edit.svg';
import {db, auth} from '../../../firebase';
import EditModal from '../../EditModal/EditModal';
import firebase from 'firebase';

export default function ProfilePage(props) {
    const [userInfo, setUserInfo] = useState({});
    const [storeCount, setStoreCount] = useState(0);
    const [pageLoader, setPageLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(()=> {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setUserInfo(doc.data())
                    setStoreCount(doc.data().stores.length)
                }
            })
        })
        .catch(err=> console.log(err))
    }, [pageLoader])

// updates user information in firestore
    let updateUserInfo = (e) => {
        e.preventDefault();
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    let userInfo = db.collection("usertype").doc(`${doc.id}`)
                    userInfo.update({
                        name: e.target.name.value,
                        location: e.target.location.value
                    })
                }
                setPageLoad(!pageLoader);
                hideEdit()
            })
        })
        .catch(err=> console.log(err))
    }

// creates fileurl from user file input
    let onPhotoChange = async (e) => {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(file.name);
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL());
    }

// closes edit modal
    let hideEdit = () => {
        setShow(false);
    }

// shows edit modal
    let showEdit = () => {
        setShow(true)
    }

// logs user out and redirects to langing page
    let logout =()=> {
        auth.signOut();
        props.history.push('/')
      }

    return (
        <div className="profile">
            <div className="profile__header">
                <button className="profile__header__logout" onClick={logout}>LOGOUT</button>
            </div>
            <div className="profile__info">
                <img className="profile__header__edit"src={edit} onClick={showEdit} alt="edit"/>
                <h1 className="profile__header__title">PROFILE</h1>
                <img className="profile__info__img"src={profile} alt="user profile"/>
                <p className="profile__info__name">{userInfo.name}</p>
                <p className="profile__info__field">email: <span className="profile__info__field--value">{userInfo.username}</span> </p>
                <p className="profile__info__field">location: <span className="profile__info__field--value">{userInfo.location}</span> </p>
                <p className="profile__info__field">Collecting from <span className="profile__info__field--value">{storeCount}</span> boba stores</p>
            </div>
            
            <EditModal show={show} userInfo={userInfo} updateUserInfo={updateUserInfo} hideEdit={hideEdit}/>
            <Footer/>
        </div>
    )
}
