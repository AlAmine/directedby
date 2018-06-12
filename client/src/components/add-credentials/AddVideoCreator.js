import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup  from '../common/TextFieldGroup';
import TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addVideoCreator } from '../../action/profileActions';



class AddVideoCreator extends React.Component {
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
    this.onSubmit = this.onSubmit.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const videoCreatorData = {
      title: this.state.title,
      typeofgears: this.state.typeofgears,
      description: this.state.description,
      file: this.state.file,
      url: this.state.url,
      image:this.state.image
    }
        this.props.addVideoCreator(videoCreatorData, this.props.history)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }



  render() {
    const { errors } = this.state;

    // Liste des choix pour le type de matériel
    const options = [
      { label: '* Indiquer le type', value: 0 },
      { label: 'Caméra', value: 'Caméra' },
      { label: 'Objectif', value: 'Objectif' },
      { label: 'Lumière', value: 'Lumière' },
      { label: 'Stabilisateur', value: 'Stabilisateur' },
      { label: 'Microphone', value: 'Microphone' },
      { label: 'Ordinateur', value: 'Ordinateur' },
      { label: `Logiciel d'édition`, value: `Logiciels d'édition` },
      { label: 'Logiciel audio', value: 'Lumière' },
      { label: 'Ecran', value: 'Ecran' },
      { label: 'Casque', value: 'Casque' },
      { label: 'Souris', value: 'Clavier' },
      { label: 'Disque Dur', value: 'Disque Dur' },
      { label: 'Autre', value: 'Autre' }
    ]
    return (
      <div className="add-video-creator">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Retour au Dashboard
              </Link>
              <h1 className="display-4 text-center">Ajouter votre matériel</h1>
              <p className="lead text-center">Caméras, objectifs, stabilisateurs... Ajoutez le matériel dont vous disposez pour la réalisation de vos contenus.</p>
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
                  placeholder="URL de votre produit"
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
                <input type="submit" value="Ajouter" className="btn btn-primary btn-block mt-10" />

              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
AddVideoCreator.propTypes = {
  profile: PropTypes.object.isRequired,
  addVideoCreator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addVideoCreator })(withRouter(AddVideoCreator))
