const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'alumni', 'teacher', 'admin'],
    default: 'student'
  },
  // Alumni specific fields
  alumniInfo: {
    graduationYear: Number,
    batch: String,
    currentCompany: String,
    position: String,
    linkedIn: String
  },
  // Teacher specific fields
  teacherInfo: {
    department: String,
    designation: String,
    joinedYear: Number,
    specialization: [String],
    officeHours: String,
    facultyId: String
  },
  // Common fields
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  bio: String,
  university: {
    name: {
      type: String,
      required: true
    },
    department: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpires: Date
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);