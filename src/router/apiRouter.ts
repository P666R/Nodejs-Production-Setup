import express from 'express';
import apiController from '../controller/apiController';

const router = express.Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);

export default router;
