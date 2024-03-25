import express from 'express';
import Department from '../../db/models/departmentSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const department = await Department.create(body);
    return res.status(200).json({ message: 'Added' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findById(id);
    return res.status(200).json(dep);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findByIdAndDelete(id);
    return res.status(200).json({ message: 'department deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: 'department updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
