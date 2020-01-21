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
})
app.get('/task/:taskId', (req, res)=> {
    console.log('get /TASKid');
    console.log(req.body);

})
app.post('/task', (req, res)=>{

    let task = new Task();
    task.name = req.body.name ;
    task.estimatedTime = req.body.estimatedTime ;
    task.proyect = req.body.proyect ;
    task.status = 'pendiente' ;

    task.save((err, taskStored) =>{
        if(err) {
            res.status(500).send({message: `Error al guardar en la db ${err}`})
             return;}
        
        res.status(200).send({task: taskStored});
    });
});
app.put('/task/:taskId', (req, res)=>{
})

app.delete('/task/:taskId', (req, res) =>{

})
connection.once('open', ()=>{
    console.log("MOngoDB database connection established ssfly");

    app.listen(port, ()=>{
        console.log(`Server is running on port:${port}`);
    });
});