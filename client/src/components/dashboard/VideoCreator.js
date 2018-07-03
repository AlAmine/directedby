import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteCreator  } from '../../action/profileActions';
import isEmpty from '../../validation/is-empty';
// import Example from '../../components/add-credentials/Youtube';

class VideoCreator extends React.Component {
  onDeleteRef(id) {
    this.props.deleteCreator(id)
  }



  render() {

    const creator = this.props.creator.map(create => (
      <div className="col-xl-4 col-md-6 col-sm-12 mt-3">
        <div key={create._id} className="card">
          <div className="card-content">
            <div className="card-body">
            {isEmpty(create.image) ? (<img className="card-img img-fluid mb-1 nopix" src="/nopix.jpg" alt={create.title} />) : <img className="card-img img-fluid mb-1" src={create.image} alt={create.title} />}
              <h4 className="card-title mt-3">{create.title.substr(0, 24)}</h4>
              <h6 className="card-subtitle text-muted"><i>{create.typeofgears}</i></h6>
                <p className="card-text">{create.description.substr(0, 150)}...</p>
                <div>
                  <a href={create.url} target="_blank" className="btn btn-primary mt-3 mr-3">Voir la fiche</a>
                  <button onClick={this.onDeleteRef.bind(this, create._id)} className="btn btn-danger mr-3 mt-3">Supprimer </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      // <tr key={create._id}>
      //   <th scope="row" />
      //   <td><a href={create.image} target="_blank"><img className="displayImg" src={create.image} alt={create.title}/></a></td>
      //   <td>{create.title}</td>
      //   <td>{create.typeofgears}</td>
      //   <td>{create.description}</td>
      //   <td><a href={create.url} className={(create.url === null || create.url === '' ? 'disabled' : 'btn btn-primary')} target="blank">Voir la fiche</a></td>
      //   <td><button onClick={this.onDeleteRef.bind(this, create._id)} className="btn btn-danger">Supprimer </button> </td>
      // </tr>
    ))

    return (
      <div className="materiel">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-primary mb-3">Votre matériel de captation</h3>
          {creator.length > 0 ? (<div className="row">{creator}</div>) : <p className="text-center">Pas de matériel</p>}
        </div>
    </div>
      // <div className={this.props.creator !== undefined ? "active" : "disabled"}>
      //   <h3 className="mb-4">Votre matériel de captation</h3>
      //     <table className="table table-sm ">
      //       <thead>
      //         <tr>
      //           <th scope="col"/>
      //           <th scope="col">Nom</th>
      //           <th scope="col">Type</th>
      //           <th scope="col">Description</th>
      //           <th scope="col" className="matos"><i className="far fa-eye"></i></th>
      //           <th scope="col" className="matos"><i className="fas fa-trash-alt"></i></th>
      //         </tr>
      //       {creator}
      //       </thead>
      //     </table>
      //
      // </div>

    )
  }
}
VideoCreator.propTypes = {
  deleteCreator: PropTypes.func.isRequired


}


export default connect(null, { deleteCreator })(withRouter(VideoCreator));
