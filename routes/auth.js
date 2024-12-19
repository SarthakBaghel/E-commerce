const express = require('express');
const User = require('../models/User');
const passport  = require('passport');
const router = express.Router() //mini instance

//to show form of user
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

//actually want to register in db
router.post('/register',async (req,res)=>{
    try{
        let {email,password,username} = req.body
        const user = new User({email,username})
        const newUser = await User.register(user,password)
        // res.redirect('/login') //after registering have to login again
        req.login(newUser,function(err){     //no need to login again after registerin direct to products page
            if(err){return next(err)}
            req.flash('success','vadacum sir')
            return res.redirect('/products')
        })
    }
    catch(e){
        req.flash('error',e.message)
        return res.redirect('/register')
    }
})


//to get to login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})


//to actually login via db
router.post('/login',
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }),(req,res)=>{
        req.flash('success','Welcome Back')
        res.redirect('/products')
})


//logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout()
    }
    req.flash('success','adios amigos')
    res.redirect('/login')
})










module.exports = router;