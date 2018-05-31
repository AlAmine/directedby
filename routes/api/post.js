const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Chargemement du model pour les posts
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Chargement des elements de validation
const validatePostInput = require('../../validation/post');

// @route GET api/post/test
// @ desc Tests post routes
// @acces Public

router.get('/test', (req, res) => res.json({ msg: 'Post Works'}));

// @route GET api/post
// @ desc Affichage des statuts
// @acces Public
router.get('/', (req, res) => {
  Post.find().sort({ date: -1}).then(post => res.json(post)).catch(err => res.status(404).json({ nopostsfound: `Il n'y a aucun statut à afficher`}));
});

// @route GET api/post
// @ desc Affichage d'un statut par id
// @acces Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id).sort({ date: -1}).then(post => res.json(post)).catch(err => res.status(404).json({ nopostfound: `Aucun statut ne correspond à cet ID`}));
})


// @route POST api/post
// @ desc Creation d'un post
// @acces Private

router.post('/', passport.authenticate('jwt', { session:false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Verification de la validation, si erreur on envoie un objet contenant la liste des erreurs
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route DELETE api/post/:id
// @ desc Supprimer un statut
// @acces Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Vérifier si le statut appartient à l'users
        if(post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized : `Vous n'avez pas les droits cette action`})
        }

        // Suppression du status
        Post.remove().then(() => res.json({ succes: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: `Nous ne trouvons pas ce statut`}))
  })
});

// @route POST api/post/like/:id
// @ desc Ajouter un like
// @acces Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Vérifier si l'user a deja liké le statut
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadylike : `Vous avez déjà liké ce statut`})
        }

        // Ajout de l'user au tableau des likes
        post.likes.unshift({ user: req.user.id});

        // sauvegarde dans la base de donnée
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: `Nous ne trouvons pas ce statut`}))
  })
});

// @route POST api/post/unlike/:id
// @ desc Supprimer un like
// @acces Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Vérifier si l'user a deja liké le statut
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ notlike : `Vous n'avez pas liké ce statut`})
        }

        // Supprimer l'user au tableau des likes
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        // sauvegarde dans la base de donnée
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: `Nous ne trouvons pas ce statut`}))
  })
});

// @route POST api/post/comment/:id
// @ desc Ajouter un commentaire
// @acces Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false}), (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);

  // Verification de la validation, si erreur on envoie un objet contenant la liste des erreurs
  if(!isValid) {
    return res.status(400).json(errors)
  }

  Post.findById(req.params.id).then(post => {
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    }

    // Ajout du commentaire dans le tableau
    post.comments.unshift(newComment);

    // sauvegarde dans la BDD
    post.save().then(post => res.json(post))
  })
  .catch(err => res.status(404).json({ postnotfound: `Nous ne trouvons pas ce statut`}));
});

// @route DELETE api/post/comment/:id/:comment_id
// @ desc Supprimer un commentaire
// @acces Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Post.findById(req.params.id).then(post => {
    // Vérifie si le commentaire existe
    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
      return res.status(404).json({ commentnoexists : `Ce commentaire n'existe pas`})
    }

    // Suppression du commentaire dans le tableau
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);

    // sauvegarde dans la BDD
    post.save().then(post => res.json(post))
  })
  .catch(err => res.status(404).json({ postnotfound: `Nous ne trouvons pas ce commentaire`}));
});


module.exports = router;
