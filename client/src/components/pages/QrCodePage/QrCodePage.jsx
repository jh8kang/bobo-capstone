import React, {Component} from 'react';
import './QrCodePage.scss';
import Footer from '../../Footer/Footer';
import QRCode from 'qrcode'
import {auth} from '../../../firebase';

function generateQR(uid) {
    // let useruid = "fake"
    console.log(uid)
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
                console.log(useruid)
                generateQR(useruid)
                
            } else {
                console.log('there is no user')
            }
        })
    }

    render() {
        return (
            <div className="codePage">
                <canvas id="canvas" className="canvas"></canvas>
                <Footer/>
            </div>
        )
    }
    

}

export default QrCodePage