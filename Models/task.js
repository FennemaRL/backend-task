const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, minlength: 5 },
    //owner : {type: Schema.ObjectId, ref:"Autor"},
    creationDate:{ type: Date, default: Date.now() },
    estimatedTime:{ type: Number, default:1},
    proyect :{ type: String, minlength: 5},
    status: { type: String, enum: ['pendiente', 'encurso', 'terminada'] }
});

module.exports = mongoose.model('Task', taskSchema)