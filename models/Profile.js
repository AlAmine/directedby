const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },

  videoCreatorGears: [
    {
      title: {
        type: String,
        required: true
      },
      typeofgears: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      url: {
        type: String
      },
      image: {
        type: String
      }
    }
  ],
  videoEditingGears: [
    {
      title: {
        type: String,
        required: true
      },
      typeofgears: {
        type: [String],
        required: true
      },
      description: {
        type: String
      },
      url: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
