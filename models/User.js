// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Password is not required for social logins
    required: function () {
      return !this.googleId;
    },
  },
  username: {
    type: String,
    required: true,
  },
  profileImagePath: {
    type: String,
  },
  description: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
