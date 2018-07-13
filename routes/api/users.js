const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require ('passport');
const nodemailer = require('nodemailer');


// Chargement des fonctions de validation des champs
const validateRegisterInput = require ('../../validation/register');
const validateLoginInput = require ('../../validation/login');
const validateForgotInput = require ('../../validation/forgot');
const validateResetInput = require ('../../validation/reset');

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

let sentPassword =  function(email, name, url){

  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'directedby2k18@gmail.com',
        pass:'alpa94700!directedby'
      }
    });

    let mailOptions = {
      from:'"DirectedBy"<exemple@of.fr>',
      subject:'Information sur votre compte',
      to:email,
      replyTo:'directedby2k18@gmail.com',
      text:'Bonjour, Afin de modifier votre mot de passe , nous vous invitons à cliquer sur le lien',
      html:'<p>Bonjour ' + name +' <br> Afin de vous modifier votre mot de passe, nous vous invitions à cliquer sur le lien suivant : '+ url +' </p> '
    };
    transporter.sendMail(mailOptions, (error, info) => {
         if(error){
           return console.log(error)
         }
         console.log('Message sent : %s', info.messageId)
    })
  });

}
// @route POST api/users/forgot_password
// @ desc Modification du mot de passe par email
// @acces Public
router.post('/forgot-password', (req, res) => {
  // initilisation de la fonction de vérificiation
  const { errors, isValid } = validateForgotInput(req.body);

  // Vérification des champs
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email;

  User.findOne({email}).then(user => {
    // Est ce qu'il existe ?
    console.log(user)
    if(!user) {
      errors.email =  `Cett adresse mail n'est pas liée à un compte`;
      return res.status(404).json(errors);
    } else {
      const name = user.name;
      const token = jwt.sign({  data: 'resetLink'}, keys.secretOrKey, { expiresIn: '300' });
      const url = "http://localhost:3000/reset-password/" + token

      User.update({email}, { $set: {passwordReset: token}}, function(error, feedback) {
        if (error) return res.send(error);
        else {
          console.log('envoyé le mail')
          sentPassword(email, name, url)
          res.send({success:'Un mail vient de vous être envoyé, merci de verifier votre boite et suivre les instructions pour modifier votre mot de passe.'});
        }
      })

      }
    })
  });

router.post('/reset-password/:token', (req, res) => {
  // initilisation de la fonction de vérificiation
  const { errors, isValid } = validateResetInput(req.body);
  // Vérification des champs
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { passwordReset, newpassword } = req.body
  console.log(req.body.passwordReset)
  User.findOne({passwordReset}).then(user => {
    console.log(user)
    if(!user) {
      console.log('Personne ')
      // errors.passwordReset = `Ce lien est expiré`;
      // return res.status(400).json({errors})
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newpassword, salt, (err, hash) => {
          if(err) throw err;
          user.password = hash;
          User.update({passwordReset}, { $set: { password: user.password, passwordReset: ""}}, function(error, feedback) {
                if(error) return res.send(error);
                return res.send(feedback)
            })
          })
        })
      }
    })
  })


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
