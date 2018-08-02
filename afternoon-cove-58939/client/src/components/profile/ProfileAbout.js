import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends React.Component {
  render () {
      const { profile } = this.props;

      // récupérer le prénom
      const firstName = profile.user.name.trim().split(' ')[0];

      // récupérer les spécialites
      const skills = profile.skills.map((skill, index)=> (
        <div key={index} className="p-3 text-center">
           <i className="fab fa-slack-hash pr-1" />{skill.trim().split(' ')[0]}
        </div>
      ))
    return (
      <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h4 className="text-primary">En savoir plus sur {firstName}</h4>
                <p className="lead">{isEmpty(profile.bio) ? (<span>{firstName} n a pas renseigné de biographie</span>) : <span>{profile.bio}</span>}
                </p>
                <hr className="dash"/>
                <h4 className="text-primary">Spécialtés</h4>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }
}
ProfileAbout.propTypes = {
  profile : PropTypes.object.isRequired
}
export default ProfileAbout;
