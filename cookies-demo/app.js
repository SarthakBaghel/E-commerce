const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')


// app.use(cookieParser())
app.use(cookieParser('youneedabettersecret'))

app.get('/',(req,res)=>{
    console.log(req.cookies);
    
    // res.send(req.cookies) // all easy cookies (not signed)
    res.send(req.signedCookies) // all signed cookies

})

// signed cookie
app.get('/getsignedcookies',(req,res)=>{
    res.cookie('bindass','sarthak',{signed:true})
    res.send('cookies sent successfully')
})




// app.get('/setcookie',(req,res)=>{
//     res.cookie('mode','dark')          //server sends cookies -> res
//     res.cookie('location','delhi')
//     res.cookie('username','sarthak')
//     res.send('server sent you a cookie')

// })

// app.get('/getcookies',(req,res)=>{
//     let {mode,location,username} = req.cookies;               // stored at client side -> req
//     res.send(`hola my name is: ${username}, stay in ${location}, and theme is ${mode}`)
// })




app.listen(8080,()=>{
    console.log('server connected at 8080');
})

