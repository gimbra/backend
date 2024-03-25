import express from 'express';
import Slot from '../../db/models/slotSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const slot = await Slot.create(req.body);
    return res.status(201).json({ message: 'Slot Added' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    return res.status(200).json(slots);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/doctor/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const slots = await Slot.find({ doctor: docId });
    return res.status(200).json(slots);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.patch('/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: 'updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Slot cancelled' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
