const express = require('express')
const router = express.Router()


const {
    createTask,
    getAllTask,
    updateTask,
    deleteTask,
    GetASingleTask
} = require('../controllers/taskController')

router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(GetASingleTask).patch(updateTask).delete(deleteTask)


module.exports = router