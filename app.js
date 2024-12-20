const { log } = require('console');
const express  = require('express');
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./seed')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/User')



const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')


mongoose.connect('mongodb://127.0.0.1:27017/shopping-sart-app')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error");
    console.log(err)
})

//seeding database
// seedDB();
// running once and commenting becaause nodemon on every change runs app.js and multiple time same datta may be inserted in DB

let configSession = {              //-> refer express-session doc 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
}

app.engine('ejs',ejsMate)
app.set('view engine','ejs') 
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true})) //to send data from form 
app.use(methodOverride('_method'))
app.use(session(configSession))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    app.locals.success = req.flash('success')
    app.locals.error = req.flash('error')
    next()
})

//passport 
passport.use(new LocalStrategy(User.authenticate()));


app.use(productRoutes) //should check path for every incoming request -> use 
app.use(reviewRoutes)
app.use(authRoutes)
app.use(cartRoutes)





 
app.listen(8080,()=>{
    console.log('server connected at port 8080');
})