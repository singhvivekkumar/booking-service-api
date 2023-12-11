const { default: axios } = require("axios");

const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

class BookingService {
	constructor() {
		this.bookingRepository = new BookingRepository();
	}

	async createBooking(data) {
		try {
			const flightId = data.flightId;
			console.log(data);
			//template string of flights url
			const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
			const response = await axios.get(getFlightRequestURL);
			const flightData = response.data.data;

			if (data.noOfSeats > flightData.totalSeats) {
				console.log(flightData.totalSeats);
				throw new ServiceError(
					"something went wrong in booking process",
					"Insufficient seats in the filght"
				);
			}
			let priceOfTheFlight = flightData.price;
			const totalCost = priceOfTheFlight * data.noOfSeats;
			const bookingPayload = { ...data, totalCost };
			const booking = await this.bookingRepository.create(bookingPayload);

			//update flights remaining number of seats
			const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
			// console.log(updateFlightRequestURL,flightData.totalSeats-booking.noOfSeats);
			await axios.patch(updateFlightRequestURL, {
				totalSeats: flightData.totalSeats - booking.noOfSeats,
			});

			const finalBooking = await this.bookingRepository.update(
				booking.id,
				{
					status: "Booked",
				}
			);

			return finalBooking;
		} catch (error) {
			console.log(error);
			if (
				error.name == "RepositoryError" ||
				error.name == "ValidationError"
			) {
				throw error;
			}
			throw new ServiceError(error);
		}
	}

	async getBooking(data) {
		try {
			console.log(data);
			const booking = await this.bookingRepository.getById(data.id);
			return booking;
		} catch (error) {
			console.log(error);
			if (
				error.name == "RepositoryError" ||
				error.name == "ValidationError"
			) {
				throw error;
			}
			throw new ServiceError(error);
		}
	}
}

module.exports = BookingService;
