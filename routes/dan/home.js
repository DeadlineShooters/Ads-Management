import express from 'express';
import controller from '../../controllers/dan.js';
const router = express.Router();

router.get('/', controller.home);
router.get('/adboards/:id', controller.getAdBoard);
router.get('/violatedpoint/:id', controller.getViolatedPoint);
router.get('/ward', controller.getWard)

export default router;
