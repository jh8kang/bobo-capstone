import React from 'react';
import {db, auth} from './firebase';
import SignUpPage from './components/pages/SignUpPage/SignUpPage.jsx';
import HomePage from './components/pages/HomePage/HomePage.jsx';
import LoginPage from './components/pages/LoginPage/LoginPage.jsx';
import LandingPage from './components/pages/LandingPage/LandingPage';
import StoreHomePage from './components/pages/StoreHomePage/StoreHomePage.jsx';
import StoreLoginPage from './components/pages/StoreLoginPage/StoreloginPage';


import {BrowserRouter, Route, Switch} from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" exact component={LoginPage}/> */}
            {/* <Route path="/" component={this.state.user ? (HomePage):(LoginPage)}/> */}
            <Route path="/" exact component={()=> <LandingPage/>}/>
            <Route path="/home" component={LoginPage}/>
            <Route path="/storelogin" component={StoreLoginPage}/>
            {/* <Route path="/home" component={HomePage}/> */}
            {/* <Route path="/store" component={StoreHomePage}/> */}
          </Switch>
        </BrowserRouter>

        
      </div>
    );

  }
}

export default App;
