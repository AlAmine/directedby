const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile')
const post = require('./routes/api/post')


const app = express();

// Database configuration
const db = require('./config/keys').mongoURI;

// Connection à MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB is in the building'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`We are in the building on floor ${port}`));
