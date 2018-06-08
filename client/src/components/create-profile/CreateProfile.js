import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../action/profileActions';

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      youtube: '',
      twitter: '',
      facebook: '',
      instagram: '',
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
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }
    this.props.createProfile(profileData, this.props.history)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    const { errors, displaySocialInputs } = this.state;

    // Affichage des réseaux sociaux
    let socialInputs;

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Lien vers votre compte Twitter"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Lien vers votre compte Facebook "
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Lien vers votre compte YouTube"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Lien vers votre compte Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )

    }

    // Liste des choix pour le status
    const options = [
      { label: '* Indiquer votre rôle', value: 0 },
      { label: 'Réalisateur', value: 'Réalisateur' },
      { label: 'Producteur', value: 'Producteur' },
      { label: 'Cadreur', value: 'Cadreur' },
      { label: 'Monteur', value: 'Monteur' },
      { label: 'Chef Opérateur', value: 'Chef Opérateur' },
      { label: 'Eclairagiste', value: 'Eclairagiste' },
      { label: 'Régisseur', value: 'Régisseur' },
      { label: 'Photographe', value: 'Photographe' },
      { label: 'Autre', value: 'Autre' }
    ]
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Créez votre profil</h1>
              <p className="lead text-center">
                Afin de créez votre profil <i>DirectedBy</i>,<br /> merci de bien vouloir renseigner les informations suivantes.
              </p>
              <small className="d-block pb-3">* = champs obligatoires</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Votre pseudo"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Votre pseudo sera utilisé pour créer l'url de votre profil"
                />

                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Veuillez indiquer votre rôle au sein de votre organisation"
                />

                <TextFieldGroup
                  placeholder="Votre entreprise"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  placeholder="Votre ville"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />

                <TextFieldGroup
                  placeholder="Votre site"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />

                <TextFieldGroup
                  placeholder="* Vos Hashtags"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Utilisez des virgules pour les séparer (ex: 360°, Drone, Court-Métrage...)."
                />

                <TextAreaFieldGroup
                  placeholder="Biographie"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Dites-nous en un peu plus sur vous."
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs : !prevState.displaySocialInputs
                    }))
                  }} className="btn btn-light">Ajouter vos réseaux sociaux
                  </button>
                  <span className="ml-3 text-muted">Optionnel</span>
                </div>
                {socialInputs}
                <input type="submit" value="Envoyer" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// Mapping des states avec les props
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})


export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
