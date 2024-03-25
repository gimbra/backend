import { Schema, model } from 'mongoose';

const orderSchema = Schema({
  medicine: {
    type: Schema.Types.ObjectId,
    ref: 'Medicine',
  },
  totalprice: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Order = model('Order', orderSchema);

export default Order;
