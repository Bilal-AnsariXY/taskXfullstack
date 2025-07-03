const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    
})

const TaskModel = mongoose.model('taskx',taskSchema);
module.exports = TaskModel