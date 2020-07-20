const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const bcrypt = require('bcrypt')
function initializePassport(){
  async function verifyCallback(username, password, done) {
      console.log(username + password)
      user = await User.findOne({ username: username })
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (await bcrypt.compare(password, user.password)) {
        console.log("ok")
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
  }
  passport.use(new LocalStrategy(verifyCallback));
  passport.serializeUser((user,done) => done(null, user.id)) 
  passport.deserializeUser((userId, done)=> done(null, user))
  
  function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
  }
  
  //midleware para pgs em que o usuário não pode estar autenticado
  function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      return res.redirect('/')
    }
    next()
  
  }
}



module.exports = initializePassport;