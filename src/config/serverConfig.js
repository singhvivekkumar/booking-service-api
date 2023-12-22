const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	FLIGHT_URL: process.env.FLIGHT_SERVICE_URL,
	REMINDER_URL: process.env.REMINDER_SERVICE_URL,
	USER_URL: process.env.USER_SERVICE_URL,
	MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
	EXCHANGE_NAME: process.env.EXCHANGE_NAME,
	BINDING_KEY: process.env.BINDING_KEY
}