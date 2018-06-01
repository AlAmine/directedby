import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';


class Landing extends React.Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashbord');
    }
  }

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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Landing);
