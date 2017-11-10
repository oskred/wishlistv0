var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var dbConnection = require("./src/utils/db");
//for when we need to hash passwords
//var passport = require("./src/utils/passport");

var app = express();
var PORT = process.env.PORT || 3001;
	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));
	app.use(
	session({
		secret: process.env.APP_SECRET || "this is the default passphrase",
		store: new MongoStore({ mongooseConnection: dbConnection}),
		resave: false,
		saveUninitialized: false
	})
)
	app.use(function(req, res, next) {
	console.log("=== passport user ===");
	console.log(req.session);
	console.log(req.user);
	console.log("=== END ===");
	next()
})

//app.use(passport.initialize())
//app.use(passport.session())

// === if production env
if (process.env.NODE_ENV === 'production') {
	const path = require("path")
	console.log("YOU ARE IN THE PRODUCTION ENV")
	app.use("/static", express.static(path.join(__dirname, + "../build/static")))
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

//app.use("/auth", require("./src/utils/auth"))
//require("./src/utils/routes/router.js")(app, passport)
//app.use(express.static("build"));

require("./src/utils/db")
const db = mongoose.connection;		
db.once("open", function() {
	console.log("Mongoose connection is go")
})

app.listen(PORT, function(){
	console.log("It's aLive" + PORT)
})