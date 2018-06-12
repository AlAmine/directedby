import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-2" />Modifier votre profil
      </Link>
      <Link to="/add-video-creator" className="btn btn-light">
        <i className="fas fa-video text-info mr-2" />Ajouter votre matériel de captation
      </Link>
      <Link to="/add-video-editing" className="btn btn-light">
        <i className="fab fa-youtube text-info mr-2" />Ajouter vos réalisations
      </Link>
    </div>
  )
}

export default ProfileActions;
