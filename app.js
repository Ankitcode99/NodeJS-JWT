const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'})
const express = require('express');
const connect = require('./db');
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const {requiredAuth, checkUser} = require('./middleware/authmiddleware');

connect();

app.set('view engine','ejs');

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser());

app.get('*',checkUser)// ensures all the GET routes
app.get('/',requiredAuth,(req,res)=>{
    res.render('home');
})

app.get('/smoothies',requiredAuth,(req,res)=>{
    res.render('smoothies')
})

app.use(authRoutes);

app.listen(PORT,()=>console.log(`Server started at PORT = ${PORT}`));