import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCreator } from '../../action/profileActions';

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
        <td><button onClick={this.onDeleteRef.bind()} className="btn btn-success modif mb-3">Modifier</button><br />
            <button onClick={this.onDeleteRef.bind(this)} className="btn btn-danger">Supprimer</button>

        </td>
      </tr>
    ))

    return (
      <div>
        <h3 className="mb-4">Votre matériel de captation</h3>
          <table className="table">
            <thead>
              <tr>
                <th />
                <th>Nom</th>
                <th>Type</th>
                <th>Description</th>
                <th />
                <th />
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


export default connect(null, { deleteCreator })(VideoCreator);
