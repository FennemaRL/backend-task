const bcrypt = require('bcrpyt-nodejs');

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 4,
    },
    password:{
        type: String,
        select: false
    },
    signupDate:{ type: Date, default: Date.now()}
});

UserSchema.pre('save',(next) =>{
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10,(erro, salt )=>{
        if(erro) return next();

        bcrypt.hash(user.password, salt, null, (erro, hash)=>{
            if (error) return next(error);
            
            user.password = hash;
            next();
        });
    })
})