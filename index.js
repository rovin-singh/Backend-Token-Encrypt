const express = require("express");
const { connection } = require("./Config/db");
const { ProductRoute } = require("./Route/product.route");
const { UserController } = require("./Route/UserController");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Home Page.");
});
// user Route
app.use("/", UserController);

// product Route
app.use("/products", ProductRoute);

app.listen(8080, async (req, res) => {
	try {
		await connection;
		console.log("Conected to database");
	} catch (e) {
		console.log("Error:", e);
	}
});
