const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
    );

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MOngoDB database connection established ssfly");
});

const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');

app.use('/task', taskRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
});