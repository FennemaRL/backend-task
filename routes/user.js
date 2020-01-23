const router = require('express').Router();
const User = require('../models/user');
const Bcrypt = require('bcrypt');
require('dotenv').config();
var Jwt = require('jsonwebtoken');

const secret = process.env.jwt;
router.route('/register').post((req,res) => { /*tareas*/ 
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    console.log("before save");
    user.save()
        .then(() => res.status(201).json(user.username))
        .catch(err=> res.status(400).json('Error no se pudo guardar el usuario'+ err));

});
router.route('/signIn').post((req,res)=>{/*auth method Bcrypt.compareSync(req.body.password, user.password)*/ 
     User.findByName(req.body.username)
        .then(user=>
            {/*jwc*/
                if (Bcrypt.compareSync(req.body.password, user.password)) res.status(200).json({token:Jwt.sign({name:user.username,firstname: "pepe"},secret,  { expiresIn: '24h' })});
        })
        .catch(err=>console.log(err));
})

module.exports = router;