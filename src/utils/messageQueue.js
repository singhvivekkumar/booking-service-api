const amqplib = require('amqplib');

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

const createChannel = async () => {
	try {
		const connection = await amqplib.connect(MESSAGE_BROKER_URL);
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
		// which queue do you want to subscribe assert that queue
		const applicationQueue = await channel.assertQueue('AIRLINE_QUEUE');
		channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

		channel.consume(applicationQueue.queue, (msg) => {
			console.log('recevied data');
			console.log(msg.content.toString());
			console.log(msg);
			channel.ack(msg);
		})
	} catch(error) {
		console.log("error in subscribing message queue")
		throw error;
	}
}

const publishMessage = async (channel, binding_key, message) => {
	try {
		// insert new queue or tell channel to bind with this queue
		await channel.assertQueue('AIRLINE_QUEUE')
		// channel publish data through exchange distributor and which queue by binding_key.
		const published = await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
		// if published it will return true
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