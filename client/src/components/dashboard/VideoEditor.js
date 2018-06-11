import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEditor } from '../../action/profileActions';

class VideoEditor extends React.Component {
  onDeleteRef(id) {
    this.props.deleteEditor(id)
  }
  render() {

    const editor = this.props.editor.map(edit => (

      <tr key={edit._id}>
        <td><a href={edit.image} target="_blank"><img className="displayImg" src={edit.image} alt={edit.title}/></a></td>
        <td>{edit.title}</td>
        <td>{edit.typeofgears}</td>
        <td>{edit.description}</td>
        <td><a href={edit.url} className={(edit.url === null || edit.url === '' ? 'disabled' : 'btn btn-primary')} target="blank">Voir la fiche</a></td>
        <td><button onClick={this.onDeleteRef.bind(this)} className="btn btn-danger">Supprimer</button></td>
      </tr>
    ))

    return (
      <div>
        <h3 className="mb-4">Vos logiciels d'édition</h3>
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
            {editor}
            </thead>
          </table>

      </div>
    )
  }
}


VideoEditor.propTypes = {
  deleteEditor: PropTypes.func.isRequired
}

export default connect(null, { deleteEditor })(VideoEditor);
