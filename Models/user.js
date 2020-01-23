
const Bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 4,
    },
    password:{ type: String }
    ,
    signupDate:{ type: Date, default: Date.now()}
});

UserSchema.pre('save',function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    try{
        user.password = Bcrypt.hashSync(user.password,10);
        next();
    }catch(err){
        next(err);
    }
        
    
});
UserSchema.statics.findByName = function(name){
    return this.find({username: new RegExp(name, 'i')});
}

module.exports = mongoose.model('User', UserSchema);