import express from 'express';
import apiController from '../controller/apiController';

const router = express.Router();

router.route('/self').get(apiController.self);

export default router;
