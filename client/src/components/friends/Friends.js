import React from 'react';
import PropTypes from 'prop-types';
import FriendsRequest from './FriendsRequest'
import { getCurrentProfile, acceptMember } from '../../action/profileActions';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';

class Friends extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile(acceptMember);
  }
  render () {
    const { profile, loading } = this.props;
    let friendsItems;

    if(profile === null || loading) {
      friendsItems = <Spinner />;
    }
    
    return (

      <div>Demande de connexion</div>

    )
  }
}
Friends.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}


export default connect(null, {getCurrentProfile})(Friends);
