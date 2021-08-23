const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requiredAuth = (req,res,next)=>{

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
            if(err){
                res.redirect('/login')
            }else{
                next();
            }
        });
    }
    else{
        res.redirect('/login')
    }
};

const ensureGuest = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        res.redirect('/');
    }else{
        next();
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,data)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(data.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user=null;
        next();
    }
}

module.exports = {requiredAuth, ensureGuest, checkUser};
