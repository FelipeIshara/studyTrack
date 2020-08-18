if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const session = require('express-session')
const flash = require('express-flash')
const mongoose = require('mongoose')
const express = require('express')
const app = express();
const espressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const passport = require('passport')
//import routes
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const indexRouter = require('./routes/index')
const sessionRouter = require('./routes/session')
const logoutRouter = require('./routes/logout')

//passport config
const initializePassport = require('./passport-config.js')
const user = require('./models/user')
initializePassport()

//layout, view engine configs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout', 'layouts/layoutb')


app.use(espressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

//mongoose
//mongoose config
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection
db.on('error', error => console.error(error)) 
db.once('open', () => console.log('Connected to Mongoose' + process.env.DATABASE_URL )) 

app.use(methodOverride('_method'))

//para mostrar os erros
app.use(flash())
app.use(session({
  secret: 'fuck',
  resave: true,
  saveUninitialized: false,
}));

//iniciando midlewares
app.use(passport.initialize());
app.use(passport.session());

//methodOverride

//routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/session', sessionRouter)
app.use('/logout', logoutRouter)
app.listen(3000)