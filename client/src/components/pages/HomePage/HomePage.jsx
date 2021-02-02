import React, {useState, useEffect} from 'react';
import {db} from '../../../firebase';
import './HomePage.scss';
import Footer from '../../Footer/Footer';
import SearchBar from '../../SearchBar/SearchBar';
import ScrollHero from '../../ScrollHero/ScrollHero';
import StoreList from '../../StoreList/StoreList';


function HomePage()  {
  const [stores, setStores] = useState(null);
  const [searchStore, setSearchStore] = useState(null);
  let [pageLoader, setPageLoader] = useState(false);

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
  }, [searchStore, pageLoader])

let pageLoadHandler = () => {
  setPageLoader(!pageLoader)
}

// searchHandler changes the render depending on what the user inputs
  let searchHandler = (e) => {
    e.preventDefault();
    stores.forEach(store => {
      if (store.name.toLowerCase() === e.target.search.value.toLowerCase()) {
        setSearchStore(store);
      } else if (e.target.search.value === "") {
        setSearchStore(null);
      }
    })
  }

  return (
    <div className="home">
        <SearchBar searchHandler={searchHandler}/>
        <ScrollHero stores={stores} pageLoadHandler={pageLoadHandler}/>
        <StoreList stores={stores} searchStore={searchStore}/>
        <Footer type="home"/>
      </div>
  )
    
}

export default HomePage
