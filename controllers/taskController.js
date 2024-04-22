const Task = require('../models/tasks')
const { CustomAPIError, createCustomError } = ('../errors/custom-errors')
const asyncWrapper = require('../middleware/async')

// Creating of new Tasks
const createTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.create(req.body)
    res.status(200).json({ task })
})

// fetching all Tasks
 const getAllTask = asyncWrapper (async (req, res, next) => { 
    const task = await Task.find({})
    res.status(201).json({ task })
 })

// Updating of Tasks by user
const updateTask = asyncWrapper (async (req, res, next) => {
    const TaskId = req.params.id
    const task = await Task.findByIdAndUpdate(
        TaskId,
        req.body,
        { new: true, runValidators: true }
      );

      if(!task){
        return next(createCustomError(`No Task with ID ${TaskId}`))
      }
      res.status(200).json({ task })
})

//  Deleting a Task
const deleteTask = asyncWrapper (async ( req, res, next) => {
    const taskId = req.params.id
    const task = await Task.findByIdAndDelete({__id: taskId})

    if(!task){
        return next(createCustomError(`No task with ID ${taskId}`))
    }
    res.status(200).json({ task })ync
})  

// Fetching a single task
const ggetASingleTask = asyncWrapper ( async (req, res, next) => {
    const taskId = req.params.id 
    const task = await Project.findOne({__id: taskId})

    if(!task){
        return next(createCustomError(`No task with ID ${taskId}`))
    }
    res.status(200).json( task )
}) 




module.exports = {
    createTask,
    getAllTask,
    updateTask,
    deleteTask,
    getASingleTask
}