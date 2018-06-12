const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Chargement des elements de validation
const validateProfileInput = require('../../validation/profile');
const validateEgearsInput = require('../../validation/videoediting');
const validateCgearsInput = require('../../validation/videocreators');

// Chargemement du model pour les profils
const Profile = require('../../models/Profile');

// Chargement du model pour le profil des utilisateurs
const user = require('../../models/User');

// @route GET api/profile/test
// @ desc Tests post routes
// @acces Public

router.get('/test', (req, res) => res.json({ msg: 'Profile Works'}));

// @route GET api/profile
// @ desc Profil de l'utilisateur
// @acces Private

router.get('/', passport.authenticate('jwt', { session: false}), (req,res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = `Il n'y a pas de profil correspondant à cet utilisateur`;
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err))
});

// @route GET api/profile/all
// @ desc Afficher tous les profils
// @acces Public

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.noprofile = `Il n'y a aucun profil à afficher`;
      return res.status(404).json(errors)
    }
    res.json(profiles);
  })
  .catch(err =>
    res.status(404).json({profile: `Il n'y a aucun profil à afficher`})
  );
})

// @route GET api/profile/handle/:handle
// @ desc Afficher le profil via l'handle
// @acces Public

router.get('/handle/:handle', (req, res)=> {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = `Il n'y a pas de profil correspondant à cet utilisateur`;
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @ desc Afficher le profil via l'id de l'user
// @acces Public

router.get('/user/:user_id', (req, res)=> {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = `Il n'y a pas de profil correspondant à cet utilisateur`;
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json({profile: `Il n'y a pas de profil correspondant à cet utilisateur`}));
});

// @route POST api/profile
// @ desc Création/Modification du Profil de l'utilisateur
// @acces Private

router.post('/', passport.authenticate('jwt', { session: false}), (req,res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Verification
  if(!isValid) {
    return res.status(400).json(errors)
  }

    // récupération des champs
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Skills - c'est un tableau
    if(typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Réseaux Sociaux
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;


    Profile.findOne({ user: req.user.id})
    .then(profile => {
      if(profile) {
        // Modification et mise à du profil
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
        .then(profile => res.json(profile));
      } else {
        // Création du profile

        // Vérifie si le profil existe
        Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          if(profile) {
            erros.handle = "Ce profil existe déjà";
            res.status(400).json(errors);

          }
          // Enregistrement du profil
          new Profile(profileFields).save().then(profile => res.json(profile))
        })
      }
    })
});
// @route POST api/profile/creatorsgears
// @ desc Ajout du matériel au profil
// @acces Private

router.post('/creatorsgears', passport.authenticate('jwt', { session: false}), (req,res) => {
  const { errors, isValid } = validateCgearsInput(req.body);

  // Verification des champs
  if(!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newCgear = {
      title: req.body.title,
      typeofgears: req.body.typeofgears,
      description: req.body.description,
      url: req.body.url,
      image:req.body.image,
      file: req.body.file
    }
    // Ajouter au tableau videoEditingGears
    profile.videoCreatorGears.unshift(newCgear);

    profile.save().then(profile => res.json(profile));
  })
});

// @route POST api/profile/editinggears
// @ desc Ajout du matériel au profil
// @acces Private

router.post('/editinggears', passport.authenticate('jwt', { session: false}), (req,res) => {
  const { errors, isValid } = validateEgearsInput(req.body);

  // Verification des champs
  if(!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newEgear = {
      title: req.body.title,
      typeofgears: req.body.typeofgears,
      description: req.body.description,
      url: req.body.url,
      image:req.body.image,
      file: req.body.file
    }
    // Ajouter au tableau videoEditingGears
    profile.videoEditingGears.unshift(newEgear);

    profile.save().then(profile => res.json(profile));
  })
});

// @route DELETE api/profile/creatorsgears/:cre_id
// @ desc Efface le matériel de creation du profil
// @acces Private

router.delete('/creatorsgears/:cre_id', passport.authenticate('jwt', { session: false}), (req,res) => {

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const deleteIndex = profile.videoCreatorGears.map(item => item.id).indexOf(req.params.cre_id);

    // Effacer du tableau
    profile.videoCreatorGears.splice(deleteIndex, 1);

    profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
});

// @route POST api/profile/creatorsgears/:cre_id
// @ desc Modifie le matériel de creation du profil
// @acces Private

router.post('/creatorsgears/:cre_id', passport.authenticate('jwt', { session: false}), (req,res) => {
  const { errors, isValid } = validateCgearsInput(req.body);
  // récupération des champs
  const editorFields = {};
  editorFields.user = req.user.id;
  if(req.body.title) editorFields.videoCreatorGears.title = req.body.title;
  if(req.body.typeofgears) editorFields.videoCreatorGears.typeofgears = req.body.typeofgears;
  if(req.body.description) editorFields.videoCreatorGears.description = req.body.description;
  if(req.body.file) editorFields.videoCreatorGears.file = req.body.file;
  if(req.body.url) editorFields.videoCreatorGears.url = req.body.url;
  if(req.body.image) editorFields.videoCreatorGears.image = req.body.image;


  Profile.findOne({ user: req.user.id})
  .then(profile => {
    if(profile) {
      // Modification et mise à du profil
      Profile.findOneAndUpdate({ videoCreatorGears_id : req.params.cre_id }, { $set: editorFields }, { new: true }).then(profile => {
    res.json(profile)

  })

    // Ajouter au tableau videoEditingGears
    profile.videoCreatorGears.unshift(editorFields);

    profile.save().then(profile => res.json(profile));
  }

})
})

// @route DELETE api/profile/editinggears/:edi_id
// @ desc Efface le matériel d'edit du profil
// @acces Private

router.delete('/editinggears/:edi_id', passport.authenticate('jwt', { session: false}), (req,res) => {

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const deleteIndex = profile.videoEditingGears.map(item => item.id).indexOf(req.params.edi_id);

    // Effacer du tableau
    profile.videoEditingGears.splice(deleteIndex, 1);

    profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
});

// @route DELETE api/profile/
// @ desc Efface le profil et l'utilisateur
// @acces Private

router.delete('/', passport.authenticate('jwt', { session: false}), (req,res) => {

  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
  res.json({ succes: true }))
    })
  }
);

module.exports = router;
