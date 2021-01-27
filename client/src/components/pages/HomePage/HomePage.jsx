import React, {Component} from 'react';
import {db, auth} from '../../../firebase';
import './HomePage.scss';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import SearchBar from '../../SearchBar/SearchBar';
import ScrollHero from '../../ScrollHero/ScrollHero';
import StoreList from '../../StoreList/StoreList';
import {Route} from 'react-router-dom';
import QrCodePage from '../../pages/QrCodePage/QrCodePage';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
          stores: null,
        }
      }

      componentDidMount() {
        console.log("mounted")
        db.collection('stores')
          .get()
          .then(snapshot=> {
            const stores = []
            snapshot.forEach(doc=> {
              const data = doc.data()
              stores.push(data)
            })
            this.setState({
              stores: stores
            })
          })
          .catch(err=> console.log(err))
      }

     
      logout =()=> {
        auth.signOut();
        this.props.history.push('/login')
    }

    render() {
        return (
          <div className="home">
              <SearchBar/>
              <ScrollHero/>
              <button onClick={this.logout} >logout</button>
              <StoreList/>

              <Footer type="home"/>

                
            </div>
        )
    }
}

export default HomePage
