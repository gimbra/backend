import express from 'express';
import Order from '../../db/models/orderSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express();

router.post('/',checkToken(['USER']), async (req, res) => {
  try {
    const ord = await Order.create(req.body);
    res.status(200).json({ message: 'confirmed' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/',checkToken(['USER']), async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/:id',checkToken(['USER']), async (req, res) => {
  try {
    const { id } = req.params;
    const ord = await Order.findById(id);
    return res.status(200).json(ord);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.patch('/:id',checkToken(['USER']), async (req, res) => {
  try {
    const { id } = req.params;
    const ord = await Order.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: 'order updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.delete('/:id',checkToken(['USER']), async (req, res) => {
  try {
    const { id } = req.params;
    const ord = await Order.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Order cancelled' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
