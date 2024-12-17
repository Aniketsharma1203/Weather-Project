import express from "express";
import {handleUserWeatherInfo} from '../controllers/weather.js';
import {handleWeatherReport} from '../controllers/weather.js';

const router = express.Router();

router.post('/weatherinfo', handleUserWeatherInfo);
router.get('/weatherreport', handleWeatherReport);

export default router;