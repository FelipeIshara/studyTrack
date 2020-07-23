const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const bcrypt = require('bcrypt')
function initializePassport(){
  async function verifyCallback(username, password, done) {

      user = await User.findOne({ username: username })
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (await bcrypt.compare(password, user.password)) {
        console.log("User authenticated")
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
  }
  passport.use(new LocalStrategy(verifyCallback));
  passport.serializeUser((user,done) => done(null, user.id)) 
  passport.deserializeUser((userId, done)=> done(null, user))
  
}



module.exports = initializePassport;