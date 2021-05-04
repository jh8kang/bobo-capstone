import React, {useState, useEffect} from 'react';
import './StoreProfilePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import {db, auth} from '../../../firebase';
import firebase from 'firebase';
import editBtn from '../../../assets/icons/edit.svg';
import StoreEditModal from '../../StoreEditModal/StoreEditModal';
import defaultImage from '../../../assets/images/default.jpg';
import Header from '../../Header/Header';

export default function StoreProfilePage(props) {
    const [storeInfo, setStoreInfo] = useState({});
    const [pageLoader, setPageLoad] = useState(false);
    const [show, setShow] = useState(false);
    // const [fileUrl, setFileUrl] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    // let [image, setImage] = useState(null);

// variables 
    let imageUrl;
    
// sets default image to store profile page
    if (storeInfo.image === null) {
        imageUrl = defaultImage;
    } else {
        imageUrl = storeInfo.image;
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
    }, [pageLoader])


// logout function
    let logout =()=> {
        auth.signOut();
        props.history.push('/')
      }

// updates store info on form submit
    let updateStoreInfo = (e)=> {
        e.preventDefault();
        let eName = e.target.name.value;
        let eDescription = e.target.description.value;
        let eLocation = e.target.location.value;
        let eImage = e.target.file.value;
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    let name = doc.data().name;
                    let description = doc.data().description;
                    let location = doc.data().location;
                    let tempImage = doc.data().image;
                    if (eName) {
                        name = eName;
                        console.log(eName);
                    }
                    if (eDescription !== "") {
                        description = eDescription;
                    }
                    if (eLocation !== "") {
                        location = eLocation
                    } 
                    if (eImage !== "") {
                        tempImage = fileUrl
                    }
                    let storeInfo = db.collection("stores").doc(`${doc.id}`)
                    storeInfo.update({
                        name: name,
                        description: description,
                        location: location,
                        image: tempImage,
                    })
                }
                setPageLoad(!pageLoader);
                hideEdit()
                document.getElementById('edit-form').reset();
            })
        })
        .catch(err=> console.log(err))
    }

// closes the edit modal and resets fileUrl
    let hideEdit = () => {
        setShow(false);
        setFileUrl(null);
    }

// opens up the edit modal
    let showEdit = () => {
        setShow(true)
    }

// saves image from edit modal 
    let onPhotoChange = async (e) => {
        if (e.target.files[0]) {
            var file = e.target.files[0];
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child(file.name);
            await fileRef.put(file)
            setFileUrl(await fileRef.getDownloadURL());
        }
    }

    if (storeInfo === null) {
        return <p>loading page...</p>
    } else {
        console.log(defaultImage)
        return (
            <div className="store-profile">
                <Header userInfo={storeInfo}/>
                <section className="profile__store-info">
                    <div className="profile__hero">
                        <img className="store-info__img"src={imageUrl} alt="store profile"/>
                        <p className="profile__hero__text">{storeInfo.name}</p>
                    </div>
                    <section className="store-info__content">
                        <img className="icon-edit"src={editBtn} onClick={showEdit} alt="edit"/>
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
                            {/* <p className="store-info__value">{storeInfo.users.length}</p> */}
                        </div>
                        <button onClick={logout} className="store__logout profile__logout">LOGOUT</button>
                    </section>
                </section>
                <StoreEditModal show={show} storeInfo={storeInfo} fileUrl={fileUrl} updateStoreInfo={updateStoreInfo} hideEdit={hideEdit} onPhotoChange={onPhotoChange}/>
                <FooterStore/>
            </div>
        )

    }

}
