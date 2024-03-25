import { Schema, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = model('User', userSchema);

export default User;
