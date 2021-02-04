import React, {Component} from 'react';
import './QrCodePage.scss';
import Footer from '../../Footer/Footer';
import QRCode from 'qrcode'
import {auth} from '../../../firebase';

// generateQR creates a qr code with the users uid on it
function generateQR(uid) {
    QRCode.toCanvas(document.getElementById('canvas'), uid, function(error) {
        if (error) console.error(error)
    })
}

class QrCodePage extends Component {
    componentDidMount() {
        let useruid;
        auth.onAuthStateChanged(function(user){
            if (user){
                useruid = user.uid
                generateQR(useruid)
                
            } else {
                console.log('there is no user')
            }
        })
    }

    render() {
        return (
            <div className="code-page">
                <div className="code-page__container">
                    <h1 className="code-page__title">SCAN YOUR CODE</h1>
                    <div className="code-page__qr">
                        <canvas id="canvas" className="canvas"></canvas>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default QrCodePage