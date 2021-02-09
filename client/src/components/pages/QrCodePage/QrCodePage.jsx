import React, {useState, useEffect} from 'react';
import './QrCodePage.scss';
import Footer from '../../Footer/Footer';
import QRCode from 'qrcode'
import {auth} from '../../../firebase';
import {db} from '../../../firebase';
import Header from '../../Header/Header';

// generateQR creates a qr code with the users uid on it
function generateQR(uid) {
    QRCode.toCanvas(document.getElementById('canvas'), uid, function(error) {
        if (error) console.error(error)
    })
}

function QrCodePage() {
    let [userInfo, setUserInfo] = useState({});

    useEffect(()=> {
        let useruid;
        auth.onAuthStateChanged(function(user){
            if (user){
                useruid = user.uid
                generateQR(useruid)
                
            } else {
                console.log('there is no user')
            }
        })
        db.collection('usertype')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setUserInfo(doc.data())
                }
            })
        })
        .catch(err=> console.log(err))

    }, [])

    if (userInfo) {
        return (
            <div className="code-page">
                <Header userInfo={userInfo}/>
                <div className="code-page__container">
                    <div className="code-page__qr">
                        <canvas id="canvas" className="canvas"></canvas>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
    return <p>loading</p>
    
}

export default QrCodePage