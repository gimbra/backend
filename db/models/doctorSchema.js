import { Schema, model } from 'mongoose';

const doctorSchema = Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  password: {
    type: String,
    required: true,
  },
});

const Doctor = model('Doctor', doctorSchema);

export default Doctor;
