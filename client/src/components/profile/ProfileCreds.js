import React from 'react';
import PropTypes from 'prop-types';


class ProfileCreds extends React.Component {
  render () {
    const { videoCreatorGears } = this.props;
    const gearsItem = videoCreatorGears.map(gear => (
      <div key={gear._id} className="card" style={{width: "18rem"}}>
        <img className="card-img-top m-auto" src={gear.image} width="15%" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{gear.title}</h5>
              <h6 className="card-title">{gear.typeofgears}</h6>
                <p className="card-text">{gear.description}</p>
                <a href={gear.url} className="btn btn-primary">Go somewhere</a>
              </div>
      </div>

    ))
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
          <h3 className="text-primary">Matériels</h3>
          {gearsItem.length > 0 ? (<div className="col-md-4">{gearsItem}</div>) : null}
        </div>
      </div>
    </div>
    )
  }
}

export default ProfileCreds;
