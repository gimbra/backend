import { Schema, model } from 'mongoose';

const appSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  status: {
    type: String,
    enum: ['BOOKED', 'CANCELLED'],
    default: 'BOOKED',
  },
});

const Appointment = model('Appointment', appSchema);

export default Appointment;
