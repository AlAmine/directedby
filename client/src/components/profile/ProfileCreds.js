import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty'


class ProfileCreds extends React.Component {
  render () {
    const { videoCreatorGears } = this.props;
    const gearsItem = videoCreatorGears.map(gear => (
      <div key={gear._id} className="col-xl-4 col-md-6 col-sm-12 mt-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
            {isEmpty(gear.image) ? (<img className="card-img img-fluid mb-1 nopix" src="/nopix.jpg" alt={gear.title} />) : <img className="card-img img-fluid mb-1" src={gear.image} alt={gear.title} />}
              <h4 className="card-title mt-3">{gear.title.substr(0, 24)}</h4>
              <h6 className="card-subtitle text-muted"><i>{gear.typeofgears}</i></h6>
                <p className="card-text">{gear.description.substr(0, 150)}...</p>
                <a href={gear.url} target="_blank" className="btn btn-primary">Voir la fiche</a>
            </div>
          </div>
        </div>
      </div>

    ))
    return (
      <div className="materiel">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-primary mb-3">Matériels</h3>
          {gearsItem.length > 0 ? (<div className="row">{gearsItem}</div>) : <p className="text-center">Pas de matériel</p>}
        </div>
    </div>
    )
  }
}
ProfileCreds.propTypes = {
  videoCreatorGears : PropTypes.array.isRequired,
}
export default ProfileCreds;
