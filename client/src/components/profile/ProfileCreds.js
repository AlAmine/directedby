import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty'


class ProfileCreds extends React.Component {
  render () {
    const { videoCreatorGears } = this.props;
    const gearsItem = videoCreatorGears.map(gear => (
      <div className="col-xs-3 p-3">
      <div key={gear._id} className="card" style={{width: "20rem"}}>
        {isEmpty(gear.image) ? (<img className="card-img-top nopix" src="/nopix.jpg" alt={gear.title} />) : <img className="card-img-top" src={gear.image} alt={gear.title} />}
            <div className="card-body">
              <h5 className="card-title">{gear.title.substr(0, 24)}</h5>
              <h6 className="card-title"><i>{gear.typeofgears}</i></h6>
                <p className="card-text">{gear.description.substr(0, 150)}...</p>
                <a href={gear.url} target="_blank" className="btn btn-primary">Voir la fiche</a>
            </div>
      </div>
    </div>

    ))
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
          <h3 className="text-primary mb-3">Matériels</h3>
          {gearsItem.length > 0 ? (<div className="row" style={{valign: "top"}}>{gearsItem}</div>) : null}
        </div>
      </div>
    </div>
    )
  }
}
ProfileCreds.propTypes = {
  videoCreatorGears : PropTypes.object.isRequired,
}
export default ProfileCreds;
