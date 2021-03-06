//Parent Schema
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;
var Schema = mongoose.Schema;

//This wisher is the only change that's been made from youngMoney
var wisher = new Schema({
	firstName: {
		type: String,
		//required: true
	},

	lastName: {
		type: String,
		//required: true
	},

	email: {
		type: String,
		//required: true,
		unique: true,
		validate: [
		function(input){
			input.length >= 3;
		},
		"Email must be a valid email"
		]
	},

	password: {
	type: String,
	//required: true,
	validate: [
		function(input){
			input.length >= 6;
		},
		"Password must be at least 6 characters"
		]
	},

	wishes: [{ 
		type: Schema.Types.ObjectId,
		ref: "Wish"
	}],
	completedWishes: [{
		type: Schema.Types.ObjectId,
		ref: "Chore"
	}],

	friends: [{
		type: Schema.Types.ObjectId,
		ref: "Child"
	}]
})

ParentSchema.methods = {
	checkPassword: function(password){
		return bcrypt.compareSync(password, this.password)
	},
	hashPassword: function(password){
		console.log(password)
		return bcrypt.hashSync(password, 10)
	}
}

ParentSchema.pre("save", function(next) {
	this.password = this.hashPassword(this.password)
	next()
})

var Parent = mongoose.model("Parent", ParentSchema);

module.exports = Parent;