import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Director Network
              </h1>
              <p className="lead">
                Créez votre profil, partagez vos actus, vidéos, astuces et échangez avec les autres membres.
                </p>
              <hr/>
              <Link to="/register" className="btn btn-lg btn-info mr-3">Inscription</Link>
              <Link to="/login" className="btn btn-lg btn-light">Connexion</Link>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}
export default Landing;
