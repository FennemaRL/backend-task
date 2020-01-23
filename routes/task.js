const router = require('express').Router();
const Task = require('../models/task');

router.route('/').get((req,res) => { /*tareas*/ 
    Task.find()
        .then(tasks => res.status(200).json(tasks))
        .catch(err  => res.status(400).json('Error al buscar tareas: '+err));
});
router.route('/:taskId').get((req,res) =>{/*tarea de id: */
    let tid= req.params.taskId;
    Task.findById(tid)
        .then(task => res.status(200).json(task))
        .catch(err  => res.status(400).json(`Error al buscar la tarea ${tid} : `+err));

});

router.route('/').post((req, res)=>{ /*nueva tarea*/
    let task = new Task();
    task.name = req.body.name ;
    task.estimatedTime = Number(req.body.estimatedTime) ;
    task.proyect = req.body.proyect ;
    task.status = 'pendiente' ;

    tasksave(req, res, task);

});
router.route('/:taskId').put((req, res)=>{ /*modificar tarea*/
    let tid= req.params.taskId;
    Task.findById(tid)
        .then( task   => {
            task.name = req.body.name;
            task.estimatedTime = Number(req.body.estimatedTime) ;
            task.proyect = req.body.proyect ;

            tasksave(req, res, task);

        })
        .catch(err => {res.status(400).json( `Error al borrar en la db ${err}`); console.log(err); });

});
router.route('/:taskId').delete((req, res)=>{ /*borrar tarea*/
    let tid= req.params.taskId;
    Task.findByIdAndDelete(tid)
        .then(()   => res.status(200).json("Se elimino con exito"))
        .catch(err =>{ res.status(400).json( `Error al borrar en la db ${err}`); console.log(err); });

});

function tasksave(req, res, task){
    task.save()
    .then(()   => res.status(200).json(task))
    .catch(err => res.status(400).json( `Error al guardar en la db ${err}`));
}

module.exports = router;