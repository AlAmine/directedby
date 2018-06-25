import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileAbout from './ProfileAbout';
import ProfileYoutube from './ProfileYoutube';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../action/profileActions';

class Profile extends React.Component {
  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }
  render () {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if(profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Retour à la liste des membres
              </Link>
            </div>
          <div className="col-md-6"></div>
          </div>
            <ProfileHeader profile={profile}/>
            <ProfileAbout profile={profile}/>
            <ProfileCreds videoCreatorGears={profile.videoCreatorGears}/>
            <ProfileYoutube videoEditingGears={profile.videoEditingGears}/>
        </div>
      )
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>

      </div>
    )
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired

}

const mapStateToProps = state =>( {
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);