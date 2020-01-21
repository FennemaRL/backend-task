const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Task = require('./models/task');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
    );

const connection = mongoose.connection;


app.get('/task', (req, res)=>{
    Task.find({}, (err, tasks) =>{
        if( err) return res.status(500).send({message:`Error al realizar la busqueda ${err}`});
        if (!tasks)  return res.status(404).send({message:`Error no se encontraron tareas `});
        res.send(200,{tasks})
    });
});
app.get('/task/:taskId', (req, res)=> {
    let tid= req.params.taskId;
    Task.findById(tid,(err,taskfind)=>{
        if( err) return res.status(500).send({message:`Error al realizar la busqueda ${err}`});
        if (!taskfind)  return res.status(404).send({message:`Error no se encontro la tarea con esa id ${tid}`});
       res.status(200).send({taskfind});
    });
})
app.post('/task', (req, res)=>{

    let task = new Task();
    task.name = req.body.name ;
    task.estimatedTime = req.body.estimatedTime ;
    task.proyect = req.body.proyect ;
    task.status = 'pendiente' ;

    task.save((err, taskStored) =>{
        if(err) 
            return res.status(500).send({message: `Error al guardar en la db ${err}`});        
        res.status(200).send({task: taskStored});
    });
});
app.put('/task/:taskId', (req, res)=>{
    let tid = req.params.taskId;
    let updatetask = req.body;

    Task.findByIdAndUpdate(tid, updatetask, (err,taskupdate) => {
        if( err) return res.status(500).send({message:`Error al actualizar la busqueda ${err}`});

        res.status(200).send({updatetask});
    });
});
app.delete('/task/:taskId', (req, res) =>{
    let tid= req.params.taskId;
    Task.findById(tid,(err,taskrm)=>{
        if( err) return res.status(500).send({message:`Error al realizar la busqueda ${err}`});
        taskrm.remove(err =>{
            if( err) return res.status(500).send({message:`Error al borrar la busqueda ${err}`});
            res.status(200).send({message:"La tarea se borro correctamente"});    
        });
       
    });
});
connection.once('open', ()=>{
    console.log("MOngoDB database connection established ssfly");

    app.listen(port, ()=>{
        console.log(`Server is running on port:${port}`);
    });
});