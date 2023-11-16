const express = require('express');

const router = express.Router();

router.get('/booking',(req, res) => {
	console.log(req);
})

module.exports = router;