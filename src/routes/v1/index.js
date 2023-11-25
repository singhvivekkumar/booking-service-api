const express = require('express');
const { BookingController } = require('../../controllers/index');

const router = express.Router();

const bookingController = new BookingController();

router.post('/bookings', bookingController.create);
router.post('/publish', bookingController.sendMessageQueue);
router.get('/bookings', (req, res) => {
	console.log("hit by api gateway")
	return res.json({
		message: "hitted by api gate way"
	})
})

module.exports = router;