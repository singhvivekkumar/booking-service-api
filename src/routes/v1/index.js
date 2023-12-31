const express = require('express');
const { BookingController } = require('../../controllers/index');

const router = express.Router();

const bookingController = new BookingController();

router.post('/bookings', bookingController.create);
router.get('/bookings', bookingController.get);
router.post('/publish', bookingController.sendMessageQueue);

module.exports = router;