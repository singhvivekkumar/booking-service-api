const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index');

const bookingService = new BookingService();

const create = async (req, res) => {
	try {
		const response = await bookingService.createBooking(req.body);
		console.log("response by ",response)
		return res.status(StatusCodes.OK).json({
			data: response,
			success: true,
			message: "successful request ",
			err: {}
		})
	} catch (error) {
		console.log("error",error)
		return res.status(error.statusCode).json({
			data: {},
			success: false,
			message: error.message,
			err: error
		})
	}
}

module.exports = {
	create
}