import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';

// Import actions
import { setCurrentUser } from './action/authActions';
import { logoutUser } from './action/authActions';
import { clearCurrentProfile } from './action/profileActions';

// Import Utils
import setAuthToken from './utils/setAuthToken';

// Import PrivateRoute
import PrivateRoute from './components/common/PrivateRoute';

// Import Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddVideoCreator from './components/add-credentials/AddVideoCreator';
import AddVideoEditor from './components/add-credentials/AddVideoEditor';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/NotFound';

// Import CSS
import './App.css';

// Vérification de la présence du token dans le localStorage
if(localStorage.jwtToken) {
  //s'il est présent on l'assigne dans le header
  setAuthToken(localStorage.jwtToken);
  // décrypte le token pour obtenir les userData et la période de validité du token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Parametrage de l'user et de la valeur isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // on vérifie si le token n'est pas expiré
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // s'il est expiré on déconnecte l'utilisateur
    store.dispatch(logoutUser());
    // clear le current Profile
    store.dispatch(clearCurrentProfile());
    //redirect vers la page login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={ Landing } />
          <div className="container">
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/profiles" component={ Profiles } />
            <Route exact path="/profile/:handle" component={ Profile } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-video-creator" component={ AddVideoCreator } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-video-editing" component={ AddVideoEditor } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={ Posts } />
            </Switch>
            <Route exact path="/not-found" component={ NotFound } />
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
  }
}

export default App;
