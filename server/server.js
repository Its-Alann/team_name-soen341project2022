const express = require("express"); //Imports express
const app = express();
const cors = require("cors");
const mySql = require("mysql");
const db = require("./db");

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://heagle.herokuapp.com"); // update to match the domain you will make the request from
	//res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

//-----------------------------api endpoints----------------------------------------------------//

//Root endpoint (when accessing the base url of the server)
app.get("/", (req, res) => {
	//req is the request (input) and res is the response (output)
	res.send(
		"This is the heagle backend. You can access the main website at this URL: https://heagle.herokuapp.com"
	);
});

//Retrieve Individual Product from Db
app.get("/getProduct/:id", (req, res) => {
	const searchId = req.params.id;
	const sqlQuery =
		"SELECT * FROM e5zkwad79wtbvjrc.products WHERE id='" + searchId + "'";
	db.query(sqlQuery, (err, results) => {
		if (err) {
			throw err;
		} else {
			res.send(results);
		}
	});
});

//Retrieve Products from Db 
app.get("/fetchProductList", (req, res) => {
	const sqlQuery = `SELECT * FROM  e5zkwad79wtbvjrc.products
	`;
	db.query(sqlQuery, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

//Insert User Info to Db
app.post("/registerUser", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	const sqlQuery = `INSERT INTO e5zkwad79wtbvjrc.temp_users (email, password, firstName, lastName)
		VALUES (?,?,?,?)`;

	db.query(sqlQuery, [email, password, firstName, lastName], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send("User Successfully Registered");
			console.log(result);
		}
	});
});

//Retrieve User Info from Db
app.get("/getUser/:id", (req, res) => {
	const searchId = req.params.id;
	const sqlQuery =
		"SELECT * FROM e5zkwad79wtbvjrc.temp_users WHERE id='" + searchId + "'";
	db.query(sqlQuery, (err, results) => {
		if (err) {
			throw err;
		} else {
			res.send(results);
		}
	});
});

//Update User Info to Db
app.post("/updateUser", (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const typeUser = req.body.typeUser;
	const typeSeller = req.body.typeSeller;
	const searchId = req.body.userID;

	const sqlQueryParams =
		"email = '" + email + "', " + 
		"password = '" + password + "', " + 
		"firstName = '" + firstName + "', " + 
		"lastName = '" + lastName + "', " + 
		"phoneNumber = '" + phoneNumber + "', " + 
		"typeUser = '" + typeUser + "', " +
		"typeSeller = '" + typeSeller + "'";

	const sqlQuery = "UPDATE e5zkwad79wtbvjrc.temp_users SET " + sqlQueryParams + " WHERE id = '" + searchId + "'";

	db.query(sqlQuery, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send("User Successfully Updated Info");
			console.log(result);
		}
	});
});

//Retrieve Seller's Product(s) from Db
app.get("/getSellerProducts/:userId", (req, res) => {
	const searchId = req.params.id;
	const sqlQuery =
		"SELECT * FROM e5zkwad79wtbvjrc.products WHERE sellerID='" + searchId + "'";
	db.query(sqlQuery, (err, results) => {
		if (err) {
			throw err;
		} else {
			res.send(results);
		}
	});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
