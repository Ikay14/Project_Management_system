const express = require('express')
const router = express.Router()

const {
    createProject,
    getAllProject,
    updateProject,
    deleteProject,
    GetASingleProject
} = require('../controllers/projectController')


router.route('/').get(getAllProject).post(createProject);
router.route('/:id').get(GetASingleProject).patch(updateProject).delete(deleteProject)

module.exports = router