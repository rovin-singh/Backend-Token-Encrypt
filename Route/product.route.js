const express = require("express");
const jwt = require("jsonwebtoken");
ProductRoute = express.Router();

ProductRoute.get("/", (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	jwt.verify(token, "secret", function (err, decoded) {
		if (err) {
			res.send("Please Login again ...");
		} else {
			console.log(decoded);
			res.send("Important Data is Access");
		}
	});
});

module.exports = { ProductRoute };
