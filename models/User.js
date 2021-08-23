const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter an Email'],
        unique:true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required:[true,'Please enter a Password'],
        minlength: [6, 'Password should be atleast 6 characters long']
    }
})

/**
 * Mongoose Hook
 * pre() -> Mongoose middleware which runs prior to any operation
 */
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();// next is important as it tell the server that middleware has done its role and now do other tasks
})

/**
 * Static Method to perform login
 */
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email:email});
    if(user){
        const authRes = await bcrypt.compare(password,user.password);
        if(authRes){
            return user;
        }
        throw Error('Password is incorrect!');
    }
    throw Error('No user exist with these credentials!')
    
}

const User = mongoose.model('user',userSchema);
module.exports = User;