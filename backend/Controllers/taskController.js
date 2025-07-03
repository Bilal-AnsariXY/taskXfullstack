const taskModel = require('../Models/taskModel');

const createTask = async(req,res)=>{
    try{
        const data = req.body;
        const model = new taskModel(data);
        await model.save();

        res.status(201).json({
            message:"task created successfully",
            success:true
        })

    }catch(err){
        res.status(500).json({
            message:"failed to creating the task",
            success:false
        })
    }
}


const getAllTask = async(req,res)=>{
    try{
        const data = await taskModel.find({}); 
        res.status(201).json({
            message:"task list",
            success:true,
            data:data
        })

    }catch(err){
        res.status(500).json({
            message:"failed to getting the task",
            success:false
        })
    }
}



const updateTask = async(req,res)=>{
    try{
        const id = req.params.id;
        const body = req.body;
        // $set is a MongoDB operator that updates only the specified fields without changing the rest of the document.
        const obj = {$set: {...body}};
        const data = await taskModel.findByIdAndUpdate(id,obj);
        res.status(201).json({
            message:"task updated",
            success:true,
            data:data
        })

    }catch(err){
        res.status(500).json({
            message:"failed to updating the task",
            success:false
        })
    }
}



const deleteTask = async(req,res)=>{
    try{
        const id = req.params.id;
        // these both data are similar 
        
        // const data = await taskModel.findByIdAndDelete({_id:id})
        const data = await taskModel.findByIdAndDelete(id)
       
        res.status(201).json({
            message:"task delete",
            success:true,
            data:data
        })

    }catch(err){
        res.status(500).json({
            message:"failed to deleting the task",
            success:false
        })
    }
}


module.exports = {
    createTask,
    getAllTask,
    updateTask,
    deleteTask
}