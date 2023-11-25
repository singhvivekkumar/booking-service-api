const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController {

	constructor() {
	}
	async create(req, res) {
		try {
			const response = await bookingService.createBooking(req.body);
			return res.status(StatusCodes.OK).json({
				data: response,
				success: true,
				message: "successful request ",
				err: {}
		})
		} catch (error) {
			return res.status(error.statusCode).json({
				data: {},
				success: false,
				message: error.message,
				err: error
			})
		}
	}

	async sendMessageQueue(req, res) {
		try {
			const channel = await createChannel();
			console.log(channel);
			const data = { message: "SUCCESS" };
			const response = await publishMessage(channel, BINDING_KEY, JSON.stringify(data));
			console.log(response)
			return res.status(StatusCodes.OK).json({
				data: response,
				success: true,
				message: "successful published the event",
				err: {}
			})
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				data: {},
				success: false,
				message: "not able to publish an event",
				err: error
			})
		}
	}
}

module.exports = BookingController;