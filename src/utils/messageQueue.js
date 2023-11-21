const ampqlib = require('amqplib');

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

const createChannel = async () => {
	try {
		const connection = await ampqlib.connect(MESSAGE_BROKER_URL);
		const channel = await connection.createChannel();
		await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
		return channel;
	} catch(error) {
		console.log("error in create channel message queue")
		throw error;
	}
}

const subscribeMessage = async (channel, service, binding_key) => {
	try {
		const applicationQueue = await channel.assertQueue('QUEUE_NAME');
		channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

		channel.consume(applicationQueue.queue, (msg) => {
			console.log('recevied data');
			console.log(msg.content.toString());
			channel.ack(msg);
		})
	} catch(error) {
		console.log("error in subscribing message queue")
		throw error;
	}
}

const publishMessage = async (channel, binding_key, message) => {
	try {
		await channel.assertQueue('AIRLINE_QUEUE')
		const published = await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
		return published;
	} catch(error) {
		console.log("error in publishing message queue")
		throw error;
	}
}

module.exports = {
	createChannel,
	subscribeMessage,
	publishMessage
}