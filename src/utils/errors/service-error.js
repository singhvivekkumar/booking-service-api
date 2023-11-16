const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error {
	
	constructor(
		message = "something went wrong",
		explanation = "Error took place in service layer",
		statusCode = StatusCodes.INTERNAL_SERVER_ERROR
	) {
		this.name = "ServiceError";
		this.message = message;
		this.explanation = explanation;
		this.statusCode = statusCode;
	}
}

module.exports = ServiceError;