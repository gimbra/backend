import { Schema, model } from 'mongoose';

const medicineSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trime: true,
  },
  image: {
    type: String,
    // required: true,
  },
  expiryDate: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Medicine = model('Medicine', medicineSchema);

export default Medicine;
