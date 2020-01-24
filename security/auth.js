const Bcrypt = require('bcrypt');
require('dotenv').config();
var Jwt = require('jsonwebtoken');
const secret = process.env.jwt;

function encrypt(password){
 return Bcrypt.hashSync(password,10);
}

const compare = (password, encryptpassword) => {
    return Bcrypt.compareSync(password, encryptpassword);
}

const tokengen = username =>{
   return {token:Jwt.sign({name:username,firstname: "pepe"},secret,{ expiresIn: '1h' })};
}

module.exports={
    encrypt, compare, tokengen
}