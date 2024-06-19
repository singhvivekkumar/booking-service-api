const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
	
	constructor(error) {
		let explanation = [];
		// because we know that sequelize return errors in this format so that we need to do like fashion
		error.errors.forEach((err) => {
			explanation.push(err.message);
		});
		this.name = "ValidationError";
		this.message = message;
		this.explanation = explanation;
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = ValidationError;