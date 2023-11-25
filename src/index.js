const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
// const PORT = 3004

const app = express();

const SetUpAndStartServer = () => {

	// we setting up body-parser as middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true}));

	app.post('/bookingservice/bookings', (req, res) => {
		console.log(req.body);
		console.log("hit by api gateway")
		return res.json({
			message: "hitted by api gate way in booking service"
		})
	});

	app.use('/bookingservice/api',apiRoutes);
	app.use('/api',apiRoutes);

	app.listen(PORT, ()=> {
		console.log("----------server started on port number---------- : ", PORT);

		if (process.env.SYNC_DB) {
			db.sequelize.sync({alter: true});
		}
	});
}

SetUpAndStartServer();