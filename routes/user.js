const router = require('express').Router();
const User = require('../models/user');

router.route('/register').post((req,res) => { /*tareas*/ 
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    console.log("before save");
    user.save()
        .then(() => res.status(201).json(user.username))
        .catch(err=> res.status(400).json('Error no se pudo guardar el usuario'+ err));

});
router.route('/signIn').post((req,res)=>{
     User.findByName(req.body.username)
        .then(user=>res.status(201).json({user}))
        .catch(err=>console.log(error));
})

module.exports = router;