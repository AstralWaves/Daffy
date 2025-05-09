const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    text: {
      type: String,
      required: true
    },
    media: [{
      type: {
        type: String,
        enum: ['image', 'video', 'document'],
        required: true
      },
      url: {
        type: String,
        required: true
      },
      thumbnail: String,
      metadata: {
        size: Number,
        format: String,
        duration: Number // for videos
      }
    }]
  },
  visibility: {
    type: String,
    enum: ['public', 'friends', 'university', 'private'],
    default: 'public'
  },
  category: {
    type: String,
    enum: ['general', 'academic', 'event', 'question', 'project'],
    default: 'general'
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    name: String
  },
  reactions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
      default: 'like'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    media: [{
      type: String,
      url: String
    }],
    replies: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    uniqueViews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      timestamp: Date
    }]
  }
}, {
  timestamps: true
});

// Indexes for better query performance
postSchema.index({ 'content.text': 'text', tags: 'text' });
postSchema.index({ location: '2dsphere' });
postSchema.index({ createdAt: -1 });
postSchema.index({ 'reactions.type': 1 });

module.exports = mongoose.model('Post', postSchema);