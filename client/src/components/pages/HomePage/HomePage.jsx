import React, {useState, useEffect} from 'react';
import {db, auth} from '../../../firebase';
import './HomePage.scss';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import SearchBar from '../../SearchBar/SearchBar';
import ScrollHero from '../../ScrollHero/ScrollHero';
import StoreList from '../../StoreList/StoreList';
import {Route} from 'react-router-dom';
import QrCodePage from '../../pages/QrCodePage/QrCodePage';

function HomePage()  {
  const [stores, setStores] = useState(null);
  const [searchStore, setSearchStore] = useState(null)

  useEffect(()=> {
    db.collection('stores')
    .get()
    .then(snapshot=> {
      const stores = []
      snapshot.forEach(doc=> {
        const data = doc.data()
        data.uid = doc.id
        stores.push(data)
      })
      setStores(stores)
    })
    .catch(err=> console.log(err))
  }, [searchStore])
  

    let searchHandler = (e) => {
      e.preventDefault();
      console.log(typeof e.target.search.value)

      stores.map(store => {
        if (store.name.toLowerCase() === e.target.search.value.toLowerCase()) {
          setSearchStore(store);
        } else if (e.target.search.value == "") {
          setSearchStore(null);
        }
      })
    }

    return (
      <div className="home">
          <SearchBar searchHandler={searchHandler}/>
          <ScrollHero/>
          <StoreList stores={stores} searchStore={searchStore}/>
          <Footer type="home"/>
        </div>
    )
    
}

export default HomePage
