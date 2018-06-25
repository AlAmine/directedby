import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEditor } from '../../action/profileActions';


class VideoEditor extends React.Component {

  onDeleteRef(id) {
    this.props.deleteEditor(id);
  }

  render() {
    const editor = this.props.editor.map(edit => (

      <tr key={edit._id}>

        <td>{edit.title}</td>
        <td>{edit.typeofgears}</td>
        <td>{edit.description}</td>
        <td className="matos"><a href={edit.url} className={(edit.url === null || edit.url === '' ? 'disabled' : 'btn btn-primary')} target="blank">Voir la vidéo</a></td>
        <td className="matos"><button onClick={this.onDeleteRef.bind(this)} className="btn btn-danger">Supprimer</button></td>
      </tr>
    ))

    return (
      <div className={this.props.editor !== undefined ? "pa" : "disabled"}>
        <h3 className="mb-4">Vos vidéos</h3>

          <table className="table table-striped table-bordered table-list">
            <thead>
              <tr>

                <th>Nom</th>
                <th>Type</th>
                <th>Description</th>
                <th className="matos"><i className="far fa-eye"></i></th>
                <th className="matos"><i className="fas fa-trash-alt"></i></th>
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
