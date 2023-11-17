const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index');
// Here sometime we don't need to write index.js. it will automatically get access to errors.
const { ValidationError, AppError } = require('../utils/errors');

class BookingRepository {

	async create(data) {
		try {
			const booking = await Booking.create(data);
			return booking;
		} catch (error) {
			if (error.name == 'SequelizeValidateError') {
				throw new ValidationError(error);
			}
			throw new AppError(
				'RepositoryError',
				'Cannot create Booking',
				'There are some issue creating the booking',
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
}

module.exports = BookingRepository;