import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
import { followMember, unFollowMember } from '../../action/profileActions'

class ProfileHeader extends React.Component {
  componentWillReceiveProps(nextProps){
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })

    }
  }
  onFollow() {
    const friendsId = this.props.profile.user;
    this.props.followMember(friendsId)
    console.log(friendsId)

  }

  onUnFollow(id) {
    this.props.unFollowMember(id)
  }
  render () {
    const { profile } = this.props;
    return (
      <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-primary text-white mb-3">
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-xl-4 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-5 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.status}{isEmpty(profile.company) ? null : (<span className="profile">chez {profile.company}
                  </span>)}<br />
                  {isEmpty(profile.location) ? null : (<span className="profile">à {profile.location}
                </span>)}
                  </p>
                  <p>
                    {isEmpty(profile.website) ? null : (
                      <a className="text-white p-2" href={profile.website} target="_blank">
                        <i className="fas fa-globe fa-2x"></i>
                      </a>
                    )}
                    {isEmpty(profile.social && profile.social.twitter) ? null : (
                      <a className="text-white p-2" href={profile.social.twitter}  target="_blank">
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a className="text-white p-2" href={profile.social.facebook}  target="_blank">
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.instagram) ? null : (
                    <a className="text-white p-2" href={profile.social.instagram}  target="_blank">
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a className="text-white p-2" href={profile.social.youtube}  target="_blank">
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )}
                  </p>
                  <p>
                    <button onClick={this.onFollow.bind(this)}type="button" className="btn btn-light mr-1">
                      <i className='fas fa-user-plus'></i>
                    <span className="badge badge-light"></span>
                    </button></p>
                </div>

              </div>
            </div>
          </div>


    )
  }
}
ProfileHeader.propTypes = {
  profile : PropTypes.object.isRequired,
  followMember: PropTypes.func.isRequired
}
export default connect(null, { followMember, unFollowMember })(ProfileHeader);
