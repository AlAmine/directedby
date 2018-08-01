const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const nodemailer = require('nodemailer');
const path = require('path')

// Déclaration des routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');


const app = express();

// Middleware pour Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database configuration
const db = require('./config/keys').mongoURI;

// Connection à MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB is in the building'))
  .catch(err => console.log(err));

// Middleware pour Passport
app.use(passport.initialize());


// Passport Configuration
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

// Parametre pour l'environnement de prod
if(process.env.NODE_ENV === 'production') {
  // Configuration du dossier Static
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`We are in the building at floor ${port}`));
