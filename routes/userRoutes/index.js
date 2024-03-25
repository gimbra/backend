import express from 'express';
import User from '../../db/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res
        .status(404)
        .json({ message: 'User with this email already exists' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(404).json({ message: 'Passwords doesnot match' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const addUser = await User.create(body);
    res.status(201).json(addUser);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ message: 'email or password incorrect' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(403).json({ message: 'email or password incorrect' });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: 'USER',
      },
      'shdbibjujubferubfenhdfrnvbjernvbndebjbf',
      { expiresIn: '7d' }
    );
    res.status(200).json({ message: 'Logged In', token: token });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
