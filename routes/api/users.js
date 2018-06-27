const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require ('passport');

// Chargement des fonctions de validation des champs
const validateRegisterInput = require ('../../validation/register');
const validateLoginInput = require ('../../validation/login');

// Chargemement du model pour les User
const User = require('../../models/User')

// @route GET api/users/test
// @ desc Tests post routes
// @acces Public

router.get('/test', (req, res) => res.json({ msg: 'Users Works'}));

// @route POST api/users/register
// @ desc Inscription des users
// @acces Public

router.post('/register', (req, res) => {
  // initialisation de la fonction de verification
  const { errors, isValid } = validateRegisterInput(req.body);
  // Vérification des champs
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if(user) {
      errors.email = `Ce mail a déjà été utilisé pour créer un compte`;
      return res.status(400).json({errors})
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '150',
        r: 'pg',
        d: 'robohash'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

// bcrypt => encoder et securise le password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        })
      })
    }
  });
});

// @route GET api/users/login
// @ desc Connexion des users
// @acces Public
router.post('/login', (req, res) => {
  // initialisation de la fonction de verification
  const { errors, isValid } = validateLoginInput(req.body);
  // Vérification des champs
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  // Trouver l'user via l'email
  User.findOne({email}).then(user => {
    // Est ce qu'il existe ?
    if(!user) {
      errors.email =  `Cet utilisateur n'existe pas`;
      return res.status(404).json(errors);
    }

    // Vérification du password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {
        // User reconnu
        const payload = { id: user.id, name: user.name, avatar: user.avatar } // Création du Token JWT


        // Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({succes: true, token: 'Bearer ' + token})
        });

      } else {
        errors.password = `Le mot de passe est incorrect`;
        return res.status(400).json(errors)
      }
    })
  });
});

// @route GET api/users/current
// @ desc Affiche l'user courant
// @acces Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
});
module.exports = router;
