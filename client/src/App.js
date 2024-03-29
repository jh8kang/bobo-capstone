import React from 'react';
import ReactDOM from 'react-dom';
import LoginOrHome from './components/LoginOrHome/LoginOrHome.jsx';
import LandingPage from './components/pages/LandingPage/LandingPage';
import StoreHomePage from './components/pages/StoreHomePage/StoreHomePage.jsx';
import QrCodePage from './components/pages/QrCodePage/QrCodePage';
import HomePage from './components/pages/HomePage/HomePage';
import SignUpPage from './components/pages/SignUpPage/SignUpPage';
import PointsPage from './components/pages/PointsPage/PointsPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import StoreSignupPage from './components/pages/StoreSignupPage/StoreSignupPage';
import StoreProfilePage from './components/pages/StoreProfilePage/StoreProfilePage';
import PointManagePage from './components/pages/PointManagePage/PointManagePage';
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';



class App extends React.Component {
  state ={

  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Provider store={store}>
            <Switch>
                <Route path="/" exact component={()=> <LandingPage/>}/>
                <Route path="/login" exact component={(routerProps)=><LoginOrHome {...routerProps}/>}/>
                <Route path="/signup" exact component={(routerProps)=><SignUpPage {...routerProps}/>}/>
                <Route path="/signup/store" component={(routerProps)=> <StoreSignupPage {...routerProps}/>}/>
                <Route path="/home" exact component={(routerProps)=><HomePage {...routerProps}/>}/>
                <Route path="/home/store" exact component={StoreHomePage}/>
                <Route path="/points" component={PointsPage}/>
                <Route path="/user/profile" exact component={(routerProps)=> <ProfilePage {...routerProps}/>}/>
                <Route path="/store/profile" exact component={(routerProps)=><StoreProfilePage {...routerProps}/>}/>
                <Route path="/home/user/qr" component={QrCodePage}/>
                <Route path="/store/users/manage" component={PointManagePage}/>
            </Switch>
          </Provider>
        </BrowserRouter>

        
      </div>
    );

  }
}

export default App;
