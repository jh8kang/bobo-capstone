import React, {useState, useEffect} from 'react';
import './ProfilePage.scss';
import Footer from '../../Footer/Footer';
import profile from '../../../assets/icons/profile.svg';
import edit from '../../../assets/icons/edit.svg';
import {db, auth} from '../../../firebase';
import EditModal from '../../EditModal/EditModal';
import firebase from 'firebase';
import Header from '../../Header/Header';

export default function ProfilePage(props) {
    const [userInfo, setUserInfo] = useState({});
    const [storeCount, setStoreCount] = useState(0);
    const [pageLoader, setPageLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

// variables 
    let imageUrl;
    
// sets default image to store profile page
    if (userInfo.image === null) {
        imageUrl = profile;
    } else {
        imageUrl = userInfo.image;
    }

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
    }, [pageLoader, fileUrl])

// updates user information in firestore when you click okay on edit modal
    let updateUserInfo = (e) => {
        e.preventDefault();
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    let name = doc.data().name;
                    let location = doc.data().location;
                    let image = doc.data().image;
                    if (e.target.name.value) {
                        name = e.target.name.value;
                    }
                    if (e.target.location.value) {
                        location = e.target.location.value;
                    }
                    if (e.target.file.value) {
                        image = fileUrl;
                    }
                    let userInfo = db.collection("usertype").doc(`${doc.id}`)
                    userInfo.update({
                        name: name,
                        location: location,
                        image: image,
                    })
                }
                setPageLoad(!pageLoader);
                hideEdit()
                // document.getElementById('signup-form').reset();
                
            })
        })
        .catch(err=> console.log(err))
    }

// creates fileurl from user file input
    let onPhotoChange = async (e) => {
        if (e.target.files[0]) {
            var file = e.target.files[0];
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child(file.name);
            await fileRef.put(file)
            setFileUrl(await fileRef.getDownloadURL());
        }
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

    if (userInfo === null) {
        return <p>loading</p>
    } else {
        return (
            <div className="profile">
    
                <div className="profile__header">
                <Header fileUrl={fileUrl} userInfo={userInfo}/>
                </div>
                <div className="profile__info">
                    <div className="profile__info__head">
                        <img className="profile__info__head__edit"src={edit} onClick={showEdit} alt="edit"/>
                    </div>
                    <img className="profile__info__img"src={imageUrl} alt="user profile"/>
                    <p className="profile__info__name">{userInfo.name}</p>
                    <p className="profile__info__field">email: <span className="profile__info__field--value">{userInfo.username}</span> </p>
                    <p className="profile__info__field">location: <span className="profile__info__field--value">{userInfo.location}</span> </p>
                    <p className="profile__info__field">Collecting from <span className="profile__info__field--value">{storeCount}</span> boba stores</p>
                    <button className="profile__header__logout" onClick={logout}>LOGOUT</button>
                </div>
                
                <EditModal show={show} userInfo={userInfo} updateUserInfo={updateUserInfo} fileUrl={fileUrl} hideEdit={hideEdit} onPhotoChange={onPhotoChange}/>
                <Footer/>
            </div>
        )

    }

}
