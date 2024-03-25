import express from 'express';
import departmentRoutes from './departmentRoutes/index.js';
import doctorRoutes from './doctorRoutes/index.js';
import imageRoutes from './imageRoutes/index.js';
import medicineRoutes from './medicineRoutes/index.js';
import orderRoutes from './orderRoutes/index.js';
import userRoutes from './userRoutes/index.js';
import slotRoutes from './slotRoutes/index.js';
import appointmentRoutes from './appointmentRoutes/index.js';
import prescriptionRoutes from './prescriptionRoutes/index.js';

const router = express.Router();

router.use('/department', departmentRoutes);
router.use('/doctor', doctorRoutes);
router.use('/image', imageRoutes);
router.use('/medicine', medicineRoutes);
router.use('/order', orderRoutes);
router.use('/user', userRoutes);
router.use('/slot', slotRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/prescription',prescriptionRoutes)

export default router;
