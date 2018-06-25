import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteCreator  } from '../../action/profileActions';
// import Example from '../../components/add-credentials/Youtube';

class VideoCreator extends React.Component {
  onDeleteRef(id) {
    this.props.deleteCreator(id)
  }



  render() {

    const creator = this.props.creator.map(create => (
      <tr key={create._id}>
        <td><a href={create.image} target="_blank"><img className="displayImg" src={create.image} alt={create.title}/></a></td>
        <td>{create.title}</td>
        <td>{create.typeofgears}</td>
        <td>{create.description}</td>
        <td><a href={create.url} className={(create.url === null || create.url === '' ? 'disabled' : 'btn btn-primary')} target="blank">Voir la fiche</a></td>
        <td><button onClick={this.onDeleteRef.bind(this, create._id)} className="btn btn-danger">Supprimer </button> </td>
      </tr>
    ))

    return (

      <div className={this.props.creator !== undefined ? "active" : "disabled"}>
        <h3 className="mb-4">Votre matériel de captation</h3>
          <table className="table table-striped table-bordered table-list">
            <thead>
              <tr>
                <th />
                <th>Nom</th>
                <th>Type</th>
                <th>Description</th>
                <th className="matos"><i className="far fa-eye"></i></th>
                <th className="matos"><i className="fas fa-trash-alt"></i></th>
              </tr>
            {creator}
            </thead>
          </table>

      </div>

    )
  }
}
VideoCreator.propTypes = {
  deleteCreator: PropTypes.func.isRequired


}


export default connect(null, { deleteCreator })(withRouter(VideoCreator));
