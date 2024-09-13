import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  googleId: { type: String, unique: true },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
