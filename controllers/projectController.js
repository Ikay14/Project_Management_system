const Project = require('../models/project')
const { CustomAPIError, createCustomError } = require('../errors/custom-errors')
const asyncWrapper = require('../middleware/async')


// Creating of new Projects
const createProject = asyncWrapper(async (req, res, next) => {
    const project = await Project.create(req.body)
    res.status(200).json({ project })
})

// fetching all Projects
 const getAllProject = asyncWrapper (async (req, res, next) => { 
    const project = await Project.find({})
    res.status(201).json({ project })
 })

// Updating of Projects by user
const updateProject = asyncWrapper (async (req, res, next) => {
    const projectId = req.params.id
    const project = await Project.findByIdAndUpdate(
        projectId,
        req.body,
        { new: true, runValidators: true }
      );

      if(!project){
        return next(createCustomError(`No Project with ID ${projectId}`))
      }
      res.status(200).json({ project })
})

//  Deleting a Project
const deleteProject = asyncWrapper (async ( req, res, next) => {
    const projectId = req.params.id
    const project = await Project.findByIdAndDelete({__id: projectId})

    if(!project){
        return next(createCustomError(`No Project with ID ${projectId}`))
    }
    res.status(200).json({ project })
})  

// Fetching a single task
const GetASingleProject = asyncWrapper ( async (req, res, next) => {
    const projectId = req.params.id 
    const project = await Project.findOne({__id: projectId})

    if(!project){
        return next(createCustomError(`No Project with ID ${projectId}`))
    }
    res.status(200).json( project )
}) 





module.exports = {
    createProject,
    getAllProject,
    updateProject,
    deleteProject,
    GetASingleProject

}