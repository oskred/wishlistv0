const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.serializeUser((user, done) => {
	console.log(user.id)
	console.log(user.email)
	console.log("^^^SERIALIZATION^^^")
	done(null, {_id: user._id, email: user.email }) //take out email in production?
	//done(null, { _id: user._id, email: user.email }) // take out email in production
})


//This needs to be rewritten from scratch. Please See passport documentation


passport.deserializeUser((id, done) => {
	Parent.findOne({_id: id }, "email", (err, user) => {
		if (!user){
			Child.findOne({_id: id }, "email", (err, user) => {
				done(null, user)
			})
		}else{
			done(null, user)
		}
	})
})
// passport.deserializeUser((id, done) => {
// 	Parent.findOne({_id: id }, "email", (err, user) => {
// 	done(null, user)
// 	})
// })