

const taskModel = require('../model/taskSchema')
const { validationResult }= require('express-validator');
const {functionHandler} = require('../helpers/errorHandling')

// Get all tasks
const getAllTasks = async (request, response) => {
    let newTaskList = []
    const allTasks = await taskModel.find({})
    allTasks.forEach((task) => newTaskList.push(task))
    response.render('tasks', {newTaskList: newTaskList})
}


// Add a new task
const postTask = async (request, response) => { 
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        functionHandler(request, response, errors, "","Task is invalid")
        return;
    }
    const newTask = new taskModel(request.body)
    await newTask.save((err) => {
        functionHandler(request, response,err,"Task successfully added", "Task couldn't be added")
        
    })
}



// Update a task
const updateTask = async (request, response) => {

    const errors = validationResult(request)
    if(!errors.isEmpty()){
        functionHandler(request, response, errors, "","Task is invalid")
        return;
    }
    const id = parseInt(request.params.id )
    console.log(id, typeof id)
    console.log(request.body, "---------")
    taskModel.findOneAndUpdate({taskid:id},request.body,(err) => {
        functionHandler(request, response,err,"Task successfully updated", "Task couldn't be updated")
    })
}


// Delete a task
const deleteTask = async (request, response) => {

    await taskModel.deleteOne({taskid:request.params.id},(err) =>{
        functionHandler(request, response,err,"Task successfully deleted", "Task couldn't be deleted")
    })
}

module.exports = {
    getAllTasks,
    postTask,
    updateTask,
    deleteTask
}