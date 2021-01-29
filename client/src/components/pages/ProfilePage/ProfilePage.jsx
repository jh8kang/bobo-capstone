import React, {useState, useEffect} from 'react';
import './ProfilePage.scss';
import Footer from '../../Footer/Footer';
import profile from '../../../assets/icons/profile.svg';
import edit from '../../../assets/icons/edit.svg';
import {db, auth} from '../../../firebase';
import firebase from 'firebase';

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=> {
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid == auth.currentUser.uid) {
                    setUserInfo(doc.data())
                    console.log(doc.data())
                }
            })
        })
        .catch(err=> console.log(err))
    }, [])


    return (
        <div className="profile">
            <div className="profile__header">
                <img className="profile__header__edit"src={edit}/>
            </div>
            <div className="profile__info">
                <img className="profile__info__img"src={profile}/>
                <p>{userInfo.name}</p>
            </div>
            <Footer/>
        </div>
    )
}
