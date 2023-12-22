const axios = require('axios');
const { REMINDER_URL, BINDING_KEY } = require('../config/serverConfig');
const { createChannel } = require('./messageQueue');

const reminderService = async (data) => {
	try {
		const reminderLink = `${REMINDER_URL}/api/v1/tickets`;
		const reminder = await axios.post(reminderLink, data);
		return reminder;
	} catch (error) {
		throw { error: `error while reminder service is calling`}
	}
}

module.exports = reminderService;