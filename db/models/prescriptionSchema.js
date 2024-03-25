import { Schema, model } from 'mongoose';

const prescriptionSchema = Schema({
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  medicine: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
    },
  ],
  message: {
    type: String,
  },
});

const Prescription = model('Prescription', prescriptionSchema);

export default Prescription;
