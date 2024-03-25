import express from 'express';
import Medicine from '../../db/models/medicineSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express();

router.get('/',checkToken(['USER']), async (req, res) => {
  try {
    const meds = await Medicine.find();
    return res.status(200).json(meds);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post('/',checkToken(['DOCTOR']), async (req, res) => {
  try {
    const med = await Medicine.create(req.body);
    return res.status(200).json({ message: 'Medicine added' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/:id',checkToken(['USER']), async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Medicine.findById(id);
    return res.status(200).json(med);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.delete('/:id',checkToken(['DOCTOR']), async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Medicine.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Medicine deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.patch('/:id',checkToken(['DOCTOR']), async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Medicine.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: 'updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
