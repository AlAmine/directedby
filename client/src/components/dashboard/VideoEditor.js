import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEditor } from '../../action/profileActions';
import { withRouter } from 'react-router-dom';

class VideoEditor extends React.Component {

  onDeleteRef(id) {
    this.props.deleteEditor(id);
  }

  render() {
    const editor = this.props.editor.map(edit => (
      <div key={edit._id} className="col-xl-4 col-md-6 col-sm-12 mt-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">

              <h4 className="card-title mt-3">{edit.title.substr(0, 24)}</h4>
              <h6 className="card-subtitle text-muted"><i>{edit.typeofgears}</i></h6>


                <p className="card-text">{edit.description.substr(0, 150)}...</p>
                <a href={edit.url} className={(edit.url === null || edit.url === '' ? 'disabled' : 'btn btn-primary mt-3 mr-3')} target="blank">Voir la vidéo</a>
                <button onClick={this.onDeleteRef.bind(this, edit._id)} className="btn btn-danger mr-3 mt-3">Supprimer</button>

          </div>
        </div>
      </div>
    </div>

    ))

    return (
      <div className="video">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-primary mb-3">Vos vidéos</h3>
            {editor.length > 0 ? (<div className="row">{editor}</div>) : <p className="text-center">Pas de vidéo</p>}
          </div>
        </div>

    )
  }
}


VideoEditor.propTypes = {
  deleteEditor: PropTypes.func.isRequired
}

export default connect(null, { deleteEditor })(withRouter(VideoEditor));
