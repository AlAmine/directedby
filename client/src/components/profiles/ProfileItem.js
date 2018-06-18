import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItems extends React.Component {

  render () {
    const { profile } = this.props
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt={profile.user.name} className="rounded-circle" />
          </div>
          <div className="col-6">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{isEmpty(profile.company) ? null : (<span className="profiles">chez {profile.company}
              </span>)}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (<span className="profiles">à {profile.location}
              </span>)}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-primary">Voir le profil</Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h5>Spécialités</h5>
            <ul className="list-group">
              {profile.skills.slice(0, 5).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" /> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
ProfileItems.propTypes= {
  profile: PropTypes.object.isRequired
}

export default ProfileItems;
