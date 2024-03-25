import express from 'express';
import Appointment from '../../db/models/appointmentSchema.js';
import Slot from '../../db/models/slotSchema.js';
import User from '../../db/models/userSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.user) {
      return res.status(400).json({ message: 'User information is missing' });
    }

    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const appointment = await Appointment.create({
      ...req.body,
    });
    const slot = await Slot.findByIdAndUpdate(req.body.slot, {
      status: 'BOOKED',
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aneetatrose01@gmail.com',
        pass: 'wzlx qcmq opyl uqjk',
      },
    });

    const mailOptions = {
      from: 'aneetatrose01@gmail.com',
      to: 'rejitomy@gmail.com',
      subject: 'Appointment Confirmed',
      text: `Dear ,

      This is to confirm that your appointment with Dr. [Doctor's Name] has been successfully booked for the following details:
      
      - Date: [Appointment Date]
      - Time: [Appointment Time]
      - Department: [Doctor's Department]
      - Clinic: [Clinic Name/Location]
      
      If you have any questions or need to reschedule, please feel free to contact us.
      
      Thank you for choosing our hospital. We look forward to seeing you soon.
      
      Best regards,
      [Hospital Name]`,
    };

    transporter.sendMail(mailOptions);
    return res.status(201).json({ message: 'Appointment booked' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/doctor/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const appointments = await Appointment.find({ doctor: docId });
    return res.status(200).json(appointments);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.find({ user: id });
    return res.status(200).json(appointments);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    await Appointment.findByIdAndUpdate(id, { status: 'CANCELLED' });
    await Slot.findByIdAndUpdate(appointment.slot, { status: 'FREE' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/pdf/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate([
    'slot',
    'user',
    'doctor',
  ]);
  console.log(appointment);
  res.render('pdf.ejs', { appointment: appointment });
});

export default router;
