import React, {useState, useEffect} from 'react';
import './StoreProfilePage.scss';
import FooterStore from '../../FooterStore/FooterStore';
import {db, auth} from '../../../firebase';
import storePhoto from '../../../assets/images/store1.jpg';
import editBtn from '../../../assets/icons/edit.svg';
import StoreEditModal from '../../StoreEditModal/StoreEditModal';


export default function StoreProfilePage(props) {
    const [storeInfo, setStoreInfo] = useState({});
    const [pageLoader, setPageLoad] = useState(false);
    let [show, setShow] = useState(false);
    // console.log(auth.currentUser)
    // console.log(storeInfo)

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    setStoreInfo(doc.data())
                }
            })
        })
        .catch(err=> console.log(err))
    }, [pageLoader])

    let logout =()=> {
        auth.signOut();
        props.history.push('/')
      }

    let updateStoreInfo = (e)=> {
        e.preventDefault();
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    let storeInfo = db.collection("stores").doc(`${doc.id}`)
                    storeInfo.update({
                        name: e.target.name.value,
                        description: e.target.description.value,
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

    if (storeInfo.users) {
        return (
            <div className="store-profile">
                <section className="profile__hero">
                    <div className="profile__header">
                        <p className="store__username">{storeInfo.username}</p>
                        <button onClick={logout} className="store__logout">Logout</button>
                        <img className="icon-edit"src={editBtn} onClick={showEdit}/>
                    </div>
                    <p className="store__name">{storeInfo.name}</p>
                </section>
                <section className="profile__store-info">
                    <img className="store-info__img"src={storePhoto}/>
                    <div className="store-info__container">
                        <p className="store-info__label">Store Name:</p>
                        <p className="store-info__value">{storeInfo.name}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">Username:</p>
                        <p className="store-info__value">{storeInfo.username}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">Description:</p>
                        <p className="store-info__value">{storeInfo.description}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">Location:</p>
                        <p className="store-info__value">{storeInfo.location}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">Maximum Points:</p>
                        <p className="store-info__value">{storeInfo.pointmax}</p>
                    </div>
                    <div className="store-info__container">
                        <p className="store-info__label">Number of collectors:</p>
                        <p className="store-info__value">{storeInfo.users.length}</p>
                    </div>
                </section>
                <StoreEditModal show={show} storeInfo={storeInfo} updateStoreInfo={updateStoreInfo} hideEdit={hideEdit}/>
                <FooterStore/>
            </div>
        )

    }
    return <p>loading</p>

}
