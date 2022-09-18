const express = require("express");
const { UserModel } = require("../Model/user.model");
// token
const jwt = require("jsonwebtoken");
// encrypt password as well.
const bcrypt = require("bcrypt");

const UserController = express.Router();
UserController.get("/users", async (req, res) => {
	const result = await UserModel.find();
	res.send(result);
});

UserController.post("/signup", async (req, res) => {
	let { email, password, age } = req.body;
	let en_password = "";
	// password ans saltsRouds passed here.
	bcrypt
		.hash(password, 6)
		.then(async function (hash) {
			// Store hash in your password DB.
			const new_User = new UserModel({ email, password: hash, age });
			await new_User.save();
			res.send("Successful Signup");
		})
		.catch((e) => {
			res.send("Something went wrong...");
		});
});

// Login Without encrpted comparison:

// UserController.post("/login", async (req, res) => {
// 	console.log(req.body);
// 	const valid = await UserModel.findOne(req.body);
// 	console.log(valid);
// 	if (valid) {
// 		const token = jwt.sign({ email: req.body.email }, "secret");
// 		res.send({ message: "Logged In", token: token });
// 	} else {
// 		res.send("Something error plz try again.");
// 	}
// });

UserController.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });
	let hash = user.password;
	bcrypt.compare(password, hash).then(function (result) {
		if (result) {
			const token = jwt.sign({ email: req.body.email }, "secret");
			res.send({ message: "Logged In", token: token });
		} else {
			res.send("Login Failed, try again ...");
		}
	});
});

// UserController.delete("/users/:userName", async (req, res) => {
// 	console.log(req.params.userName);
// 	const result = await UserModel.remove({ email: req.params.userName });
// 	console.log(result);
// 	res.send("Data is Deleted Successfully");
// });

module.exports = { UserController };
