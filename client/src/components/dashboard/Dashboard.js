import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends React.Component {

  componentDidMount () {
      this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Verifie sur l'utilisateur connecté à des infos dans son profil
      if(Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
      } else {
        // l'utilisateur connecté n'a pas de profil
        dashboardContent = (
          <div>
            <p className="lead text-muted">Bienvenue { user.name }</p>
            <p>Vous n'avez pas encore crée votre profil, merci de le compléter afin de montrer votre travail aux autres membres</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Créez votre profil
            </Link>
          </div>
        )
      }
    }


    return(
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )

  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
