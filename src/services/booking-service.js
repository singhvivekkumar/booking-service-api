const { default: axios } = require("axios");

const { BookingRepository } = require("../repository/index");
const { FLIGHT_URL, USER_URL, BINDING_KEY } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");
const reminderService = require("../utils/reminderService");
const { createChannel, publishMessage } = require("../utils/messageQueue");

class BookingService {
	constructor() {
		this.bookingRepository = new BookingRepository();
	}

	async createBooking(data) {
		try {
			const flightId = data.flightId;
			console.log(data);
			// string template of flights url
			const getFlightRequestURL = `${FLIGHT_URL}/api/v1/flights/${flightId}`;
			const response = await axios.get(getFlightRequestURL);
			const flightData = response.data.data;

			// check available seat
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
			const updateFlightRequestURL = `${FLIGHT_URL}/api/v1/flights/${booking.flightId}`;
			// console.log(updateFlightRequestURL,flightData.totalSeats-booking.noOfSeats);
			await axios.patch(updateFlightRequestURL, {
				totalSeats: flightData.totalSeats - booking.noOfSeats,
			});

			// change status to confirm
			const finalBooking = await this.bookingRepository.update(
				booking.id,
				{ status: "Booked" }
			);

			// get user email
			const user = await axios.get(`${USER_URL}/api/v1/details`, { params: {id: booking.userId}});
			console.log(user.data.data.email);
			const email = user.data.data.email;

			// call reminder service
			const reminderPayload = {
				recepientEmail: email,
				subject: `Booking confirm`,
				content: `Dear user your flight from ${flightData.departureAirport} to ${flightData.arrivalAirport} is ready to fly`,
				notificationTime: `${flightData.departureTime}`,
			};
			// normal http call
			// await reminderService(reminderPayload);
			// message queue by the help of rabbitmq with ampqlib(nodejs client)
			const channel = await createChannel();
			publishMessage(channel, BINDING_KEY, JSON.stringify(reminderPayload));

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
