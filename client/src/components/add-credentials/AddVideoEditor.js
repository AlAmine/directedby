import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup  from '../common/TextFieldGroup';
import TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addVideoEditor } from '../../action/profileActions';




class AddVideoEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      typeofgears: '',
      description: '',
      url: '',
      file: '',
      image:'',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const videoEditorData = {
      title: this.state.title,
      typeofgears: this.state.typeofgears,
      description: this.state.description,
      url: this.state.url,
      image: this.state.image,
      file: this.state.file
    }
        this.props.addVideoEditor(videoEditorData, this.props.history)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { errors } = this.state;

    // Liste des choix pour le type de matériel
    const options = [
      { label: '* Indiquez le type', value: 0 },
      { label: 'Court-Métrage', value: 'Ordinateur' },
      { label: `Clip`, value: `Logiciels d'édition` },
      { label: `Vidéo d'entreprise`, value: 'Lumière' },
      { label: 'Film', value: 'Ecran' },
      { label: 'Animation', value: 'Casque' },
      { label: 'Film Amateur', value: 'Clavier' },
      { label: 'Animation', value: 'Disque Dur' },
      { label: 'Autre', value: 'Autre' }
    ]
    return (
      <div className="add-video-editor">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Retour au Dashboard
              </Link>
              <h1 className="display-4 text-center">Ajoutez vos vidéos</h1>
              <p className="lead text-center">Du film amateur, en passant par des clips et jusqu'à Hollywood. <br />Ajoutez toutes vos réalisations</p>
              <small className="d-block pb-3">* = champs obligatoires</small>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="* Nom du matériel"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <SelectListGroup
                  name="typeofgears"
                  value={this.state.typeofgears}
                  onChange={this.onChange}
                  options={options}
                  error={errors.typeofgears}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="URL vers le produit"
                  name="url"
                  value={this.state.url}
                  onChange={this.onChange}
                  error={errors.url}
                  info="Amazon, PriceMinister, CDiscount..."
                />

                <TextFieldGroup
                  placeholder="Visuel de votre produit"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                  info="Afin de garantir la qualité des visuels, veuillez utiliser un lien (Google Image, Amazon ou site officiel de votre produit...)"
                />

                <input type="submit" value="Ajouter" className="btn btn-primary btn-block mt-4" />

              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
AddVideoEditor.propTypes = {
  profile: PropTypes.object.isRequired,
  addVideoEditor: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addVideoEditor })(withRouter(AddVideoEditor))
