import React, {useState, useEffect} from 'react';
import './StoreProfilePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import {db, auth} from '../../../firebase';
import firebase from 'firebase';
import editBtn from '../../../assets/icons/edit.svg';
import StoreEditModal from '../../StoreEditModal/StoreEditModal';
import defaultImage from '../../../assets/images/default.jpg';


export default function StoreProfilePage(props) {
    const [storeInfo, setStoreInfo] = useState({});
    const [pageLoader, setPageLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [fileUrl, setFileUrl] = useState(null)

// variables 
    let imageUrl;
    
// sets default image to store profile page
    if (storeInfo.image == null) {
        imageUrl = defaultImage;
    } else {
        imageUrl = storeInfo.image
    }

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setStoreInfo(doc.data())
                }
            })
        })
        .catch(err=> console.log(err))
    }, [pageLoader, fileUrl])

// logout function
    let logout =()=> {
        auth.signOut();
        props.history.push('/')
      }

// updates store info on form submit
    let updateStoreInfo = (e)=> {
        e.preventDefault();
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    let storeInfo = db.collection("stores").doc(`${doc.id}`)
                    console.log(fileUrl)
                    storeInfo.update({
                        name: e.target.name.value,
                        description: e.target.description.value,
                        location: e.target.location.value,
                        image: fileUrl,
                    })
                }
                setPageLoad(!pageLoader);
                hideEdit()
            })
        })
        .catch(err=> console.log(err))
    }

// closes the edit modal
    let hideEdit = () => {
        setShow(false);
    }

// opens up the edit modal
    let showEdit = () => {
        setShow(true)
    }

// saves image from edit modal 
    let onPhotoChange = async (e) => {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(file.name);
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL());
    }

    if (storeInfo.users) {
        return (
            <div className="store-profile">
                <section className="profile__hero">
                    <div className="profile__header">
                        <button onClick={logout} className="store__logout">LOGOUT</button>
                    </div>
                    <p className="store__name">{storeInfo.name.toUpperCase()}</p>
                </section>
                <section className="profile__store-info">

                    <img className="icon-edit"src={editBtn} onClick={showEdit} alt="edit"/>
                 
                    <img className="store-info__img"src={imageUrl} alt="store profile"/>
                    <div className="store-info__container">
                        <p className="store-info__label">STORE NAME:</p>
                        <p className="store-info__value">{storeInfo.name}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">USERNAME:</p>
                        <p className="store-info__value">{storeInfo.username}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">DESCRIPTION:</p>
                        <p className="store-info__value">{storeInfo.description}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">LOCATION:</p>
                        <p className="store-info__value">{storeInfo.location}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">MAX POINT:</p>
                        <p className="store-info__value">{storeInfo.pointmax}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">NUM OF COLLECTORS:</p>
                        <p className="store-info__value">{storeInfo.users.length}</p>
                    </div>
                </section>
                <StoreEditModal show={show} storeInfo={storeInfo} updateStoreInfo={updateStoreInfo} hideEdit={hideEdit} onPhotoChange={onPhotoChange}/>
                <FooterStore/>
            </div>
        )

    }
    return <p>loading page...</p>

}
