import React from 'react';
import LoginOrHome from './components/LoginOrHome/LoginOrHome.jsx';
import LandingPage from './components/pages/LandingPage/LandingPage';
import StoreHomePage from './components/pages/StoreHomePage/StoreHomePage.jsx';
import StoreLoginPage from './components/pages/StoreLoginPage/StoreloginPage';
import QrCodePage from './components/pages/QrCodePage/QrCodePage';
import HomePage from './components/pages/HomePage/HomePage';
import SignUpPage from './components/pages/SignUpPage/SignUpPage';
import PointsPage from './components/pages/PointsPage/PointsPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import './App.scss';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


class App extends React.Component {
  state ={

  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" exact component={LoginPage}/> */}
            {/* <Route path="/" component={this.state.user ? (HomePage):(LoginPage)}/> */}
            <Route path="/" exact component={()=> <LandingPage/>}/>
            <Route path="/login" exact component={(routerProps)=><LoginOrHome {...routerProps}/>}/>
            <Route path="/signup" exact component={(routerProps)=><SignUpPage {...routerProps}/>}/>
            <Route path="/home" exact component={(routerProps)=><HomePage {...routerProps}/>}/>
            <Route path="/points" component={PointsPage}/>
            <Route path="/storehome" component={(routerProps)=><StoreLoginPage {...routerProps}/>}/>
            <Route path="/user/profile" exact component={ProfilePage}/>
            <Route path="/home/user/qr" component={QrCodePage}/>
            {/* <Route path="/home" component={HomePage}/> */}
            {/* <Route path="/store" component={StoreHomePage}/> */}
          </Switch>
        </BrowserRouter>

        
      </div>
    );

  }
}

export default App;
