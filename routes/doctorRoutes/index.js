import express from 'express';
import Doctor from '../../db/models/doctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json(doctors);
  } catch {
    res.status(500).json(e);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ email: body.email });
    if (doctor) {
      return res
        .status(404)
        .json({ message: 'Doctor with this email already exists' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(404).json({ message: 'Passwords doesnot match' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const addDoctor = await Doctor.create(body);
    res.status(201).json(addDoctor);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ email: body.email });
    if (!doctor) {
      return res.status(403).json({ message: 'email or password incorrect' });
    }
    const isMatching = await bcrypt.compare(body.password, doctor.password);
    if (!isMatching) {
      return res.status(403).json({ message: 'email or password incorrect' });
    }
    const token = jwt.sign(
      {
        id: doctor._id,
        role: 'DOCTOR',
      },
      'shdbibjujubferubfenhdfrnvbjernvbndebjbf',
      { expiresIn: '7d' }
    );
    res.status(200).json({ message: 'Logged In', token: token });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/department/:depId', async (req, res) => {
  try {
    const { depId } = req.params;
    const doctors = await Doctor.find({ department: depId });
    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = await Doctor.findById(id);
    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
