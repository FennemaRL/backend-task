const router = require('express').Router();
const User = require('../models/user');
const auth = require('../security/auth');


router.route('/register').post((req,res) => { /*tareas*/ 
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save()
        .then(() => res.status(201).json(user.username))
        .catch(err=> res.status(400).json('Error no se pudo guardar el usuario'));

});
router.route('/signIn').post((req,res)=>{/*auth method */ 
     User.findByName(req.body.username)
        .then(user=>
            { if (auth.compare(req.body.password,user.password))
                      res.status(200).json(auth.tokengen(user.username));
              res.status(400).json(" Contraseña o Usuario incorrecto")
            })
        .catch(err=> res.status(400).json("No se encontro el usuario"));
})

module.exports = router;